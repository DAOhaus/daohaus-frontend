import { createLogic } from 'redux-logic'
import Bluebird from 'bluebird'
import {
  $requestHub,
  receiveHub,
  $requestMembers,
  $registerPhone,
  receiveMembers,
  $requestProposals,
  receiveProposals,
  receiveHubVariable,
  getHubViaAddress
} from './reducer'
import getBalancePromise from '../../util/getBalancePromise'
import { getWeb3 } from '../../components/ethereum/reducer'
import getContract from '../../util/getContract'
import HubJson from '../../../../daohaus-contracts/build/contracts/Hub.json'

export default [
  createLogic({
    type: $requestHub,
    process({ getState, action }, dispatch, done) {
      const Hub = getContract(HubJson)
      const web3 = getWeb3(getState())
      Hub.at(action.address).then(hubInstance => {
        dispatch(receiveHub(hubInstance))
        const Promises = [
          hubInstance.getMembers().then(members=>dispatch(receiveMembers(action.address,members))),
          hubInstance.getProposals().then(proposals=>dispatch(receiveProposals(action.address,proposals))),
          hubInstance.availableBalance().then(_available=>dispatch(receiveHubVariable('availableBalance',_available.toString(), action.address))),
          getBalancePromise(web3.eth, hubInstance.address).then(_balance=>dispatch(receiveHubVariable('balance',_balance.toString(), action.address)))
        ]
        Bluebird.all(Promises).then(done)
      }).catch(done)
    }
  }),
  createLogic({
    type: $requestMembers,
    process({ getState, action }, dispatch, done) {
      const Hub = getHubViaAddress(getState(), action.address)
      // need to set some sort of interval to check for success
      // timeout for now with testrpc
      setTimeout(function() {
        Hub.getMembers().then(members => {
          console.log('members received', members)
          dispatch(receiveMembers(action.address, members))
          done()
        })
      }, 3000);
    }
  }),
  createLogic({
    type: $requestProposals,
    process({ getState, action }, dispatch, done) {
      const Hub = getHubViaAddress(getState(), action.address)
       // need to set some sort of interval to check for success
      // timeout for now with testrpc
      setTimeout(function() {
        Hub.getProposals().then(proposals => {
          dispatch(receiveProposals(action.address, proposals))
          done()
        })
      }, 3000);
    }
  }),
  createLogic({
    type: $registerPhone,
    process({ getState, action }, dispatch, done) {
      done()
      // axios.post('http://localhost:5000/register', {
      //   number: action.number,
      // }).then(function (response) {
      //   console.log('response from /message', response)
      //   dispatch(receiveValidationCode(action.address, response.data))
      //   done()
      // })
      // .catch(function (error) {
      //   console.log(error);
      //   done()
      // });
    }
  })
]
