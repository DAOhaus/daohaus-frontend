var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var Hub = artifacts.require("./Hub.sol");
var Campaign = artifacts.require("./Campaign.sol");

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(Hub);
  deployer.deploy(Campaign);
};
