import makeActionCreator from '../../util/makeActionCreator'

export const $showNotification = 'SHOW_NOTIFICATION'
export const showNotification = makeActionCreator($showNotification, 'message', 'type')

export const $hideNotification = 'HIDE_NOTIFICATION'
export const hideNotification = makeActionCreator($hideNotification)

export default (state = { visible: true, message: 'test message', type: 'error'} , action) => {
  switch (action.type) {
  case $showNotification:
    return {
      ...state,
      visible: true,
      message: action.message,
      type: action.type
    }
    case $hideNotification:
    return {
      ...state,
      visible: false,
      message: '',
      type: ''
    }
    default:
      return state
  }
}

export const getNotification = (state) => state.notification