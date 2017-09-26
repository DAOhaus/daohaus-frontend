var app = window.angular.module('HubApp', []);

app.config(function( $locationProvider) {
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
});

app.controller("HubController", 
  [ '$scope', '$location', '$http', '$q', '$window', '$timeout', 
  function($scope, $location, $http, $q, $window, $timeout) {

  var hub;
  Hub.deployed().then(function(instance) {
    hub = instance;
    newCampaignWatcher = watchForNewCampaigns();
  });

  txn = {};                // workaround for repetitive event emission (testRPC)
  $scope.campaigns=[];     // array of structs
  $scope.campaignIndex={}; // row pointers
  $scope.campaignLog=[];   // verbose on-screen display of happenings
  $scope.new = {};         // new campaign
  $scope.campaignSelected; // campaign selector
  $scope.contribution;     // contribution field

  // INTERACTIONS

  // select account

  $scope.setAccount = function() {
    $scope.account = $scope.accountSelected;
    $scope.balance = web3.eth.getBalance($scope.account).toString(10);
    var countCampaigns = $scope.campaigns.length;
    // the "User Contributed" col needs a new context, so refresh them
    for(i=0; i<countCampaigns; i++) {
      upsertCampaign($scope.campaigns[i].campaign);
    }
    console.log('Using account',$scope.account);
  }

  // new campaign

  $scope.newCampaign = function() {
    if(parseInt($scope.new.goal) > 0 && parseInt($scope.new.duration) > 0) {
      hub.createCampaign($scope.new.duration, $scope.new.goal, {from: $scope.account, gas: 4000000})
      .then(function(txn) {
        $scope.new.goal = "";
        $scope.new.duration = "";
      });
    } else {
      alert('Integers over Zero, please');
    }
  }

  // contribute to campaign

  $scope.contribute = function() {
    if($scope.campaignSelected=="") return;
    if(parseInt($scope.contribution)<=0) return;
    var campaign = Campaign.at($scope.campaignSelected);
    var amount = $scope.contribution;
    $scope.contribution = "";
    campaign.contribute({from: $scope.account, value: parseInt(amount), gas: 4000000})
    .then(function(txn) {
      return;
    });
  }

  // claim a refund

  $scope.refund = function(campaign) {
    var campaign = Campaign.at(campaign);
    return campaign.requestRefund({from: $scope.account, gas: 4000000})
    .then(function(txn) {
      // an event will arrive
    });
  }

  // DISPLAY

  // watch hub campaigns created. UI starts here.

  function watchForNewCampaigns() {
    hub.LogNewCampaign( {}, {fromBlock: 0})
    .watch(function(err,newCampaign) {
      if(err) 
      {
        console.error("Campaign Error:",err);
      } else {
        // normalizing data for output purposes
        console.log("New Campaign", newCampaign);
        newCampaign.args.user   = newCampaign.args.sponsor;
        newCampaign.args.amount = newCampaign.args.goal.toString(10);     
        // only if non-repetitive (testRPC)
        if(typeof(txn[newCampaign.transactionHash])=='undefined')
        {
          $scope.campaignLog.push(newCampaign);         
          txn[newCampaign.transactionHash]=true;
          upsertCampaign(newCampaign.args.campaign);
        }
      }
    })
  };

  // watch functions for each campaign we know about

  // watch receipts

  function watchReceived(address) {
    var campaign = Campaign.at(address);
    var watcher = campaign.LogContribution( {}, {fromBlock: 0})
    .watch(function(err,received) {
      if(err)
      {
        console.error('Received Error', address, err);
      } else {
        console.log("Contribution", received);
        if(typeof(txn[received.transactionHash+'rec'])=='undefined')
        {
          received.args.user = received.args.sender;
          received.args.amount = parseInt(received.args.amount);
          received.args.campaign = address;
          $scope.campaignLog.push(received);
          upsertCampaign(address);
          txn[received.transactionHash+'rec']=true;
        }
      }
    });
  }

  // watch refunds

  function watchRefunded(address) {
    var campaign = Campaign.at(address);
    var watcher = campaign.LogRefundSent( {}, {fromBlock: 0})
    .watch(function(err,refunded) {
      if(err)
      {
        console.error('Refunded Error', address, err);
      } else {
        console.log("Refund", refunded);
        if(typeof(txn[refunded.transactionHash+'ref'])=='undefined')
        {
          refunded.args.user = refunded.args.funder;
          refunded.args.amount = parseInt(refunded.args.amount);
          refunded.args.campaign = address;
          $scope.campaignLog.push(refunded);
          upsertCampaign(address);
          txn[refunded.transactionHash+'ref']=true;
        }
      }
    });
  }

  // update display (row) and instantiate campaign watchers
  // safe to call for newly discovered and existing campaigns that may have changed in some way

  function upsertCampaign(address) {
    console.log("Upserting campaign", address);
    var campaign = Campaign.at(address);
    // console.log("Campaign", campaign);
    var campaignDeadline;
    var campaignGoal;
    var campaignFundsRaised;
    var campaignIsSuccess;
    var campaignHasFailed;

    return campaign.deadline.call({from: $scope.account})
    .then(function(_deadline) {
      campaignDeadline = _deadline;
      //console.log("Deadline", campaignDeadline);
      return campaign.goal.call({from: $scope.account});
    })
    .then(function(_goal) {
      campaignGoal = _goal;
      //console.log("Goal", campaignGoal);
      return campaign.fundsRaised.call({from: $scope.account});
    })
    .then(function(_fundsRaised) {
      campaignFundsRaised = _fundsRaised;
      //console.log("Funds Raised", campaignFundsRaised);
      return campaign.withdrawn.call({from: $scope.account});
    })
    .then(function(_withdrawn) {
      campaignWithdrawn = _withdrawn;
      //console.log("Withdrawn", _withdrawn);
      return campaign.sponsor.call({from: $scope.account});
    })
    .then(function(_sponsor) {
      campaignSponsor = _sponsor;
      //console.log("Sponsor", campaignSponsor);
      return campaign.isSuccess.call({from: $scope.account});
    })
    .then(function(_isSuccess) {
      campaignIsSuccess = _isSuccess;
      //console.log("is Success", campaignIsSuccess);
      return campaign.hasFailed.call({from: $scope.account});
    })
    .then(function(_hasFailed) {
      campaignHasFailed = _hasFailed;
      //console.log("has Failed", campaignHasFailed);

      // build a row step-by-step

      var c = {};
      c.campaign  = address;
      c.sponsor   = campaignSponsor;
      c.goal      = campaignGoal.toString(10);
      c.deadline  = parseInt(campaignDeadline.toString(10));
      c.accepted  = parseInt(campaignFundsRaised.toString(10));
      c.withdrawn = parseInt(campaignWithdrawn.toString(10));
      c.isSuccess = campaignIsSuccess;
      c.hasFailed = campaignHasFailed;
      c.status = "open";
      if(c.isSuccess) c.status = "success";
      if(c.hasFailed) c.status = "failed";

      if(typeof($scope.campaignIndex[address]) == 'undefined')
        {
          $scope.campaignIndex[c.campaign]=$scope.campaigns.length;
          $scope.campaigns.push(c);
          var receiveWatcher = watchReceived(address);
          var refundWatcher  = watchRefunded(address);
          $scope.$apply();
        } else {
          var index = $scope.campaignIndex[c.campaign];
          $scope.campaigns[index].accepted  = c.accepted;
          $scope.campaigns[index].refunded  = c.refunded;
          $scope.campaigns[index].withdrawn = c.withdrawn;
          $scope.campaigns[index].isSuccess = c.isSuccess;
          $scope.campaigns[index].hasFailed = c.hasFailed;
          $scope.$apply();
        }
      return getFunder(address);
    });
  }

   // Check contributions from the current user

  function getFunder(address) {
    var campaign = Campaign.at(address);
    var index = $scope.campaignIndex[address];
    return campaign.funderStructs.call($scope.account, {from: $scope.account})
    .then(function(funder) {
      // when a function returns multiple values, we get an array
      $scope.campaigns[index].userAccepted = parseInt(funder[0].toString(10));
      $scope.campaigns[index].userRefunded = parseInt(funder[1].toString(10));
      $scope.$apply();
      return true;;
    })
  }

  // work with the first account.

  web3.eth.getAccounts(function(err, accs) {
    if (err != null) {
      alert("There was an error fetching your accounts.");
      return;
    }
    if (accs.length == 0) {
      alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
      return;
    }
    $scope.accounts = accs;
    $scope.account = $scope.accounts[0];
    $scope.balance = web3.eth.getBalance($scope.account).toString(10);
    console.log('Using account',$scope.account);
  });

}]);