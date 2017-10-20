import { createLogic } from 'redux-logic'
import { $requestHub, receiveHub } from './reducer'
import getContract from '../../util/getContract'
import HubJson from '../../../../daohaus-contracts/build/contracts/Hub.json'
test

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
]