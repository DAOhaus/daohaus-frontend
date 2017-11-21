import makeActionCreator from '../../util/makeActionCreator'

export const $showNotification = 'SHOW_NOTIFICATION'
export const showNotification = makeActionCreator($showNotification, 'title', 'message', 'type')

export const $hideNotification = 'HIDE_NOTIFICATION'
export const hideNotification = makeActionCreator($hideNotification)

export default (state = { web3: null }, action) => {
  switch (action.type) {
  case $showNotification:
    return {
      ...state,
      visibility: true,
      notification: {
        title: action.title,
        message: action.message,
        type: action.type
      }
    }
    case $hideNotification:
    return {
      ...state,
      visibility: false,
      notification: {}
    }
    default:
      return state
  }
}

export const getWeb3 = (state) => window.web3
export const getAccount = state => window.web3.eth.accounts[0]
