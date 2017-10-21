import { createLogic } from 'redux-logic'
import { getAccount } from '../../components/ethereum/reducer'
import {
  $requestContract,
  receiveContract,
  requestConstantVariable,
  $requestConstantVariable,
  receiveConstantVariable,
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
          'projectCost',
          'status',
          'proposalText'
        ]
        dispatch(receiveContract(resourceInstance))
        console.log('resourceInstance from req:', resourceInstance)
        variables.forEach(name => dispatch(requestConstantVariable(name, action.address)))
        done()
      })
    }
  }),
  createLogic({
    type: $requestConstantVariable,
    process({ getState, action }, dispatch, done) {
      const Contract = getLocalContract(getState(), action.address)
      Contract[action.name]().then(variable => {
        dispatch(receiveConstantVariable(action.name, variable, action.address))
        done()
      })
    }
  }),
  createLogic({
    type: $castVote,
    process({ getState, action }, dispatch, done) {
      const Contract = getLocalContract(getState(), action.address)
      Contract.castVote(action.vote, { from: getAccount(getState())})
        .then(res => {
          console.log('cast res:', res)
          done()
        })
    }
  })
]
