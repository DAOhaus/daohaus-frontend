import Web3 from "web3";
window.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

export default (state = { web3: window.web3 }, action) => {
  switch (action.type) {
    default:
      return state
  }
}

export const getWeb3 = (state) => state.web3
