import makeActionCreator from '../../util/makeActionCreator'

export const $requestHub = 'REQUEST_HUB'
export const requestHub = makeActionCreator($requestHub, 'address')

export const $receiveHub = 'RECEIVE_HUB'
export const receiveHub = makeActionCreator($receiveHub, 'hub')

export default (state = {}, action) => {
  switch (action.type) {
    case $receiveHub:
      const id = action.hub.address
      return {
        ...state,
        [id]: action.hub 
      }
    default:
      return state
  }
}

export const getHubViaAddress = (state, address) => state.hubs[address]
