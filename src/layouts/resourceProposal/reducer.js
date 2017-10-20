import makeActionCreator from '../../util/makeActionCreator'

export const $requestContract = 'REQUEST_RESOURCE_PROPOSAL'
export const requestContract = makeActionCreator($requestContract, 'address')
export const $receiveContract = 'RECEIVE_RESOURCE_PROPOSAL'
export const receiveContract = makeActionCreator($receiveContract, 'contract')
export const $requestConstantVariable = 'REQUEST_CONSTANT_VARIABLE'
export const requestConstantVariable = makeActionCreator($requestConstantVariable, 'name', 'address')
export const $receiveConstantVariable = 'RECEIVE_CONSTANT_VARIABLE'
export const receiveConstantVariable = makeActionCreator($receiveConstantVariable, 'name', 'value', 'address')

export default (state = {}, action) => {
  switch (action.type) {
    case $receiveContract:
      return {
        ...state,
        [action.contract.address]: { ...action.contract, _votes:[] }
      }
    case $receiveConstantVariable:
      if (!action.address || !action.name || !action.value) {
        console.error('Must have address, name and value')
        return state
      }
      return {
        ...state,
        [action.address]: { ...state[action.address], ['_'+action.name]:action.value }
      }
    default:
      return state
  }
}

export const getLocalContract = (state, address) => state.resourceProposals[address]