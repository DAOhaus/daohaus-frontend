import makeActionCreator from '../../util/makeActionCreator'

export const $showNotification = 'SHOW_NOTIFICATION'
export const showNotification = makeActionCreator($showNotification, 'message', 'classification')

export const $hideNotification = 'HIDE_NOTIFICATION'
export const hideNotification = makeActionCreator($hideNotification)

export default (state = { visible: false, message: '', classification: ''} , action) => {
  switch (action.type) {
    case $showNotification:
      return {
        ...state,
        visible: true,
        message: action.message,
        classification: action.classification
      }
    case $hideNotification:
      return {
        ...state,
        visible: false,
        message: '',
        classification: ''
      }
    default:
        return state
  }
}

export const getNotification = (state) => state.notification