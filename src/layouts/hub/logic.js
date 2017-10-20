import { createLogic } from 'redux-logic'
import { $requestHub, receiveHub } from './reducer'
const Web3 = require("web3");
import HubJson from '../../../../daohaus-contracts/build/contracts/Hub.json'
const truffleContract = require("truffle-contract");
const Hub = truffleContract(HubJson);
window.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
Hub.setProvider(window.web3.currentProvider)

export default [
  createLogic({
    type: $requestHub,
    process({ getState, action }, dispatch, done) {
      Hub.at(action.address).then(hubInstance => {
        console.log('received:', hubInstance)
        dispatch(receiveHub(hubInstance))
        done()
      })
    }
  }),
]