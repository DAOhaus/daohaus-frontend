import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import userReducer from './user/userReducer'
import hubReducer from './layouts/hub/reducer'
import ethereumReducer from './components/ethereum/reducer'

const reducer = combineReducers({
  routing: routerReducer,
  user: userReducer,
  hubs: hubReducer,
  ethereum: ethereumReducer
})

export default reducer
