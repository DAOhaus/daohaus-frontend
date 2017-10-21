import makeActionCreator from '../../util/makeActionCreator'

export const $requestHub = 'REQUEST_HUB'
export const requestHub = makeActionCreator($requestHub, 'address')
export const $receiveHub = 'RECEIVE_HUB'
export const receiveHub = makeActionCreator($receiveHub, 'hub')
export const $requestMembers = 'REQUEST_MEMBERS'
export const requestMembers = makeActionCreator($requestMembers, 'address')
export const $receiveMembers = 'RECEIVE_MEMBERS'
export const receiveMembers = makeActionCreator($receiveMembers, 'address', 'members')
export const $registerPhone = 'REGISTER_PHONE'
export const registerPhone = makeActionCreator($registerPhone, 'address', 'number')
export const $receiveValidationCode = 'RECEIVE_VALIDATION_CODE'
export const receiveValidationCode = makeActionCreator($receiveValidationCode, 'address', 'vCode')
export const $requestProposals = 'REQUEST_PROPOSALS'
export const requestProposals = makeActionCreator($requestProposals, 'address')
export const $receiveProposals = 'RECEIVE_PROPOSALS'
export const receiveProposals = makeActionCreator($receiveProposals, 'address', 'proposals')

export default (state = {}, action) => {
  switch (action.type) {
    case $receiveHub:
      return {
        ...state,
        [action.hub.address]: { ...action.hub, _members:[], _proposals: [] }
      }
    case $receiveMembers:
      if (!action.address && !action.members) {
        console.error('Must have both address and members')
        return state
      }
      console.log('reducer', action.members)
      return {
        ...state,
        [action.address]: { ...state[action.address], _members:action.members }
      }
    case $receiveProposals:
      if (!action.address && !action.proposals) {
        console.error('Must have both address and proposals')
        return state
      }
      return {
        ...state,
        [action.address]: { 
          ...state[action.address], 
          _proposals: action.proposals
        }
      }
    case $receiveValidationCode:
      return {
        ...state,
        [action.address]: { ...state[action.address], validationCode: action.vCode }
      }
    default:
      return state
  }
}

export const getHubViaAddress = (state, address) => state.hubs[address]
