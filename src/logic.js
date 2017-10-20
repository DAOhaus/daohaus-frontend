import { createLogicMiddleware } from 'redux-logic'
import hubLogic from './layouts/hub/logic'

export default createLogicMiddleware([
  ...hubLogic
])