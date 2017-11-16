import { connect } from 'react-redux'
import { compose } from 'recompose'
import { withRouter } from 'react-router'
import { 
  requestContract, 
  getLocalContract, 
  castVote,
  executeProposal,
  requestConstantVariable
} from './reducer'
import { getWeb3 } from '../../components/ethereum/reducer'
import ResourceProposal from './component'

const mapStateToProps = (state, ownProps) => {
  const web3 = getWeb3(state)
  return {
    resourceProposalInstance: getLocalContract(state, ownProps.params.address),
    userAddress: web3 && web3.eth.accounts[0],
    web3: web3
  }
}

const mapDispatchToProps = (dispatch, { params }) => {
  return {
    requestContract: () => dispatch(requestContract(params.address)),
    castVote: vote => dispatch(castVote(vote, params.address)),
    executeProposal: () => dispatch(executeProposal(params.address)),
    requestVotes: () => dispatch(requestConstantVariable(params.address))
  }
}

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(ResourceProposal)
