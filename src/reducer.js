import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import userReducer from './user/userReducer'
import hubReducer from './layouts/hub/reducer'

const reducer = combineReducers({
  routing: routerReducer,
  user: userReducer,
  hubs: hubReducer
})

export default reducer
