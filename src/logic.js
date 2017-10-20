import { createLogicMiddleware } from 'redux-logic'
import hubLogic from './layouts/hub/logic'
import resourceProposalLogic from './layouts/resourceProposal/logic'

export default createLogicMiddleware([
  ...hubLogic,
  ...resourceProposalLogic
])