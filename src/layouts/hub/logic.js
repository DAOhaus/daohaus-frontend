import { createLogic } from 'redux-logic'
import {
  $requestHub,
  receiveHub,
  $requestMembers,
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
        done()
      })
    }
  }),
  createLogic({
    type: $requestMembers,
    process({ getState, action }, dispatch, done) {
      const Hub = getHubViaAddress(action.address)
      Hub.getMembers().then(members => {
        dispatch(receiveMembers(members))
        done()
      })
    }
  }),
]
