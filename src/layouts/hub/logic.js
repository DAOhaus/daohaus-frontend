import { createLogic } from 'redux-logic'
import {
  $requestHub,
  receiveHub,
  $requestMembers,
  $registerPhone,
  receiveMembers,
  getHubViaAddress
} from './reducer'
import getContract from '../../util/getContract'
import HubJson from '../../../../daohaus-contracts/build/contracts/Hub.json'

export default [
  createLogic({
    type: $requestHub,
    process({ getState, action }, dispatch, done) {
      const Hub = getContract(HubJson)
      Hub.at(action.address).then(hubInstance => {
        dispatch(receiveHub(hubInstance))
        hubInstance.getMembers().then(members => {
          dispatch(receiveMembers(action.address, members))
          done()
        })
      })
    }
  }),
  createLogic({
    type: $requestMembers,
    process({ getState, action }, dispatch, done) {
      const Hub = getHubViaAddress(getState(), action.address)
      Hub.getMembers().then(members => {
        dispatch(receiveMembers(action.address, members))
        done()
      })
    }
  }),
  createLogic({
    type: $registerPhone,
    process({ getState, action }, dispatch, done) {
      // axios here
    }
  }),
]
