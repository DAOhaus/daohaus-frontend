import makeActionCreator from '../../util/makeActionCreator'
export const $receiveWeb3 = 'RECEIVE_WEB3'
export const receiveWeb3 = makeActionCreator($receiveWeb3, 'web3')
import Web3 from "web3"

window.addEventListener('load', function() {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(window.web3.currentProvider);
  } else {
    console.log('No web3? You should consider trying MetaMask!')
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }
})

export default (state = { web3: null }, action) => {
  switch (action.type) {
  case $receiveWeb3:
    return {
      ...state,
      web3: action.web3
    }
    default:
      return state
  }
}

export const getWeb3 = (state) => window.web3
export const getAccount = state => window.web3.eth.accounts[0]
