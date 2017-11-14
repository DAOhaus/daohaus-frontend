import makeActionCreator from '../../util/makeActionCreator'

export const $requestContract = 'REQUEST_RESOURCE_PROPOSAL'
export const requestContract = makeActionCreator($requestContract, 'address')
export const $receiveContract = 'RECEIVE_RESOURCE_PROPOSAL'
export const receiveContract = makeActionCreator($receiveContract, 'contract')
export const $requestConstantVariable = 'REQUEST_CONSTANT_VARIABLE'
export const requestConstantVariable = makeActionCreator($requestConstantVariable, 'name', 'address')
export const $receiveConstantVariable = 'RECEIVE_CONSTANT_VARIABLE'
export const receiveConstantVariable = makeActionCreator($receiveConstantVariable, 'name', 'value', 'address')
export const $castVote = 'CAST_VOTE'
export const castVote = makeActionCreator($castVote, 'vote', 'address')
export const $executeProposal = 'EXECUTE_PROPOSAL'
export const executeProposal = makeActionCreator($executeProposal, 'address')

export default (state = {}, action) => {
  switch (action.type) {
    case $receiveContract:
      return {
        ...state,
        [action.contract.address]: { ...action.contract, _votes:[] }
      }
    case $receiveConstantVariable:
      if (!action.address || !action.name || !action.value) {
        return state
      }
      return {
        ...state,
        [action.address]: {
          ...state[action.address],
          ['_'+action.name]: (action.value.toString && action.value.constructor.name !== 'Array') ? action.value.toString() : action.value
        }
      }
    default:
      return state
  }
}

export const getLocalContract = (state, address) => state.resourceProposals[address]
