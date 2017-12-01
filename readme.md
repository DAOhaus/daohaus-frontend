Frontend
===
These getting started instructions are a work in progress, if you have suggestions on how to make them better please submit a PR :)

## Pre-Deploy
Be sure you have [Truffle](http://truffleframework.com/) installed globally, also we make use of the truffle tool [Ganache](http://truffleframework.com/ganache/) to manage our testrpc instance and [MetaMask](https://metamask.io/) to sign transactions.  At this point go ahead and open and start Ganache.
 - Be sure to have Ganache gas limit to 9000000
 - Port Number to 7545 (Ganache Default)
 - Use the same Mnuemonic phrase each time you start.  The reason for this is because Ganache creates users, and you must import these acounts into MetaMask in order to have accounts with Ether in order to transact and interact with our contracts.  If you haven't done this yet, please do so now.  Find the "Users" tab of Ganache, copy the private key, and follow along with [this guide](https://support.metamask.io/kb/article/7-importing-accounts)

Now, Daohaus-frontend needs Daohaus-contracts as a sibling repository.  Daohaus-contracts also needs to be deployed with truffle in order to work.  We'll cover this in the next section.


## Deploy
Ganache should be running with correct parameters set as described above.
In terminal from the repo `daohaus-contracts` run command `truffle migrate --reset`
Ganache block viewer should display a block that says "Contract Deployed" - copy the address it was deployed to.

Now in your terminal inside of the `daohaus-frontend` repo run the command `npm i` and `npm start` and when the main page comes up, be sure you have installed MetaMask.  You'll need to set MetaMask to look for your local Ganache instance, so click in the top left corner of the extension where it says "Main Network", choose "Custom RPC" and put in `http://localhost:7545` and refresh the page if needed.

If you don't see any users in your Meta Mask that have account balances, please go back up to the Pre-Deploy section and read the bullet point on starting Ganache with a Mnuemonic phrase and importing private keys into Meta Mask from there.

The first page that shows up will ask which hub you want to view, at this point paste in the contract address that I had you copy in the first step of this progress and you should be good to go!

If you found any portion of this onboarding difficult to understand please make the changes and submit a PR or just create an issue on how to make it better.  Thank you, happy coding :)

Todos
===

- [x] Retrieval of "proposalCost" variable from resourceProposal contract
- [x] figure out why it takes so long to load
- [x] check to make sure resource proposal isn't over the available amount
- [ ] factor in block times.  Right now instant, I'll need to keep polling when I receive tx hash - also check for failed transactions in order to show messages to users on front end
- [ ] add data points like the PVR, the proposal length, etc... to the Hub Contract
- [ ] Refactor Hub & ResourceProposal reducers / logic to have shared balance, variable functions
- [ ] Allow switching between accounts on testrpc, or just hookup metamask
- [ ] remove "deadline" and replace it with a hub contract variable
- [ ] add in logos, change colors to match branding
- [ ] subscribe to logs of resource so I can view when people vote
- [ ] longer form descriptions (one long and one short)
- [ ] check if member of hub before allowing to vote
