Frontend
===
These getting started instructions are a work in progress, if you have suggestions on how to make them better please submit a PR :)

## Pre-Deploy
Be sure you have truffle installed globally, also we make use of the truffle tool Ganache to manage our testrpc instance.
 - GasLimit to 9000000
 - Port Number to 7545 (Ganache)
 - Mnuemonic phrase
 - MetaMask
Daohaus-frontend needs Daohaus-contracts as a sibling repository.  Daohaus-contracts also need to be deployed with truffle in order to work.


## Deploy
Ganache - or other testrpc with correct parameters set - should be running
In `daohaus-contracts` run `truffle migrate --reset`
Ganache block viewer should display a block that says "Contract Deployed" - copy the address it was deployed to.

Now in `daohaus-frontend` command `npm i` and `npm start` and when the main page comes up, be sure you have installed MetaMask and set it to your custom Ganache rpc -- typically `localhost:7454`
You should also have loaded the users from when you spun up your original Ganache using the Mnuemonic phrase into MetaMask so that the accounts found have Ether on them in order to use the UI

Todos
===

- [x] Retrieval of "proposalCost" variable from resourceProposal contract not working
- [x] figure out why it takes so long to load
- [ ] add data points like the PVR, the proposal length, etc...
- [ ] check to make sure user isn't already member of hub before allowing to register
- [ ] check to make sure resource proposal isn't finished before allowing to vote -- currently can vote on finished proposals
- [ ] factor in block times.  Right now instant, I'll need to keep polling when I receive tx hash
- [ ] Refactor tests that are meant to "throw" to follow pattern that won't break ganache - http://truffleframework.com/tutorials/testing-for-throws-in-solidity-tests
- [ ] Refactor Hub & ResourceProposal reducers / logic to have shared balance, variable functions
- [ ] Allow switching between accounts on testrpc, or just hookup metamask
- [ ] remove "deadline" and replace it with a hub contract variable
- [ ] add in logos, change colors to match branding
- [ ] refactor spoke pitch
- [ ] subscribe to logs of resource so I can view when people vote
- [ ] longer form descriptions (one long and one short)
- [ ] check if member of hub before allowing to vote
