import { createLogic } from 'redux-logic'
import {
  $requestContract,
  receiveContract,
  $requestConstantVariable,
  receiveConstantVariable,
  getContractViaAddress,
} from './reducer'
import getContract from '../../util/getContract'
import ResourceProposalJson from '../../../../daohaus-contracts/build/contracts/ResourceProposal.json'

export default [
  createLogic({
    type: $requestContract,
    process({ getState, action }, dispatch, done) {
      const ResourceProposal = getContract(ResourceProposalJson)
      ResourceProposal.at(action.address).then(resourceInstance => {
        dispatch(receiveContract(resourceInstance))
        done()
      })
    }
  }),
  createLogic({
    type: $requestConstantVariable,
    process({ getState, action }, dispatch, done) {
      const Contract = getContractViaAddress(getState(), action.address)
      Contract.getMembers().then(variable => {
        dispatch(receiveConstantVariable(action.name, variable, action.address))
        done()
      })
    }
  })
]
