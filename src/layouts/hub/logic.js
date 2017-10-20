import { createLogic } from 'redux-logic'
import {
  $requestHub,
  receiveHub,
  $requestMembers,
  $registerPhone,
  receiveMembers,
  registerPhone,
  getHubViaAddress
} from './reducer'
import getContract from '../../util/getContract'
import HubJson from '../../../../daohaus-contracts/build/contracts/Hub.json'
import axios from 'axios'

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
      console.log('register phone called')
      axios.post('http://localhost:5000/message', {
        number: action.number,
      })
      .then(function (response) {
        dispatch(registerPhone(response))
        console.log('response from /message', response);
        done()
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }),
]
