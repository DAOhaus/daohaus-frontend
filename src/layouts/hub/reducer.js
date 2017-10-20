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
export const registerPhone = makeActionCreator($registerPhone, 'number')

export default (state = {}, action) => {
  switch (action.type) {
    case $receiveHub:
      return {
        ...state,
        [action.hub.address]: action.hub
      }
    case $receiveMembers:
      if (!action.address && !action.members) {
        console.error('Must have both address and members') 
        return state
      }
      return {
        ...state,
        [action.address]: { ...state[action.address], _members:action.members }
      }
    default:
      return state
  }
}

export const getHubViaAddress = (state, address) => state.hubs[address]
