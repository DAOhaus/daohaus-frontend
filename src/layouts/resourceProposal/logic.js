import { createLogic } from 'redux-logic'
import { getAccount } from '../../components/ethereum/reducer'
import {
  $requestContract,
  receiveContract,
  requestConstantVariable,
  $requestConstantVariable,
  receiveConstantVariable,
  $executeProposal,
  $castVote,
  getLocalContract,
} from './reducer'
import getContract from '../../util/getContract'
import ResourceProposalJson from '../../../../daohaus-contracts/build/contracts/ResourceProposal.json'

export default [
  createLogic({
    type: $requestContract,
    process({ getState, action }, dispatch, done) {
      const ResourceProposal = getContract(ResourceProposalJson)
      ResourceProposal.at(action.address).then(resourceInstance => {
        const variables = [
          'chairman',
          'chairmanFee',
          'deadline',
          'owner',
          'proposalCost',
          'status',
          'proposalText'
        ]
        dispatch(receiveContract(resourceInstance))
        variables.forEach(name => dispatch(requestConstantVariable(name, action.address)))
        resourceInstance.getNumOfVotes().then(_votes => {
          dispatch(receiveConstantVariable('votes', _votes, action.address))
          done()
        })
      })
    }
  }),
  createLogic({
    type: $requestConstantVariable,
    process({ getState, action }, dispatch, done) {
      const Contract = getLocalContract(getState(), action.address)
      Contract[action.name]().then(variable => {
        console.log('recieved variable:', action.name, variable)
        dispatch(receiveConstantVariable(action.name, variable, action.address))
        done()
      })
    }
  }),
  createLogic({
    type: $executeProposal,
    process({ getState, action }, dispatch, done) {
      console.log('execute called', action)
      const Contract = getLocalContract(getState(), action.address)
      Contract.sendToHub({ from: getAccount(getState()),gas: 4000000}).then(status => {
        console.log('sent to hub with response', status)
        done()
      }).catch((res)=>{
        console.log('catch', res)
      })
    }
  }),
  createLogic({
    type: $castVote,
    process({ getState, action }, dispatch, done) {
      const Contract = getLocalContract(getState(), action.address)
      Contract.castVote(action.vote, { from: getAccount(getState()), gas: 4000000})
        .then(res => {
          console.log('cast res:', res)
          done()
        })
    }
  })
]
