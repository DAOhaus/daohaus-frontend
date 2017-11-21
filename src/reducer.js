import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import userReducer from './user/userReducer'
import hubReducer from './layouts/hub/reducer'
import resourceProposalReducer from './layouts/resourceProposal/reducer'
import ethereumReducer from './components/ethereum/reducer'
import notificationReducer from './components/notifications/reducer'

const reducer = combineReducers({
  routing: routerReducer,
  user: userReducer,
  hubs: hubReducer,
  notification: notificationReducer,
  resourceProposals: resourceProposalReducer,
  ethereum: ethereumReducer
})

export default reducer
