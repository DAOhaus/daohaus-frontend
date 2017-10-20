import { connect } from 'react-redux'
import { compose } from 'recompose'
import { withRouter } from 'react-router'
import { requestHub, getHubViaAddress, requestMembers, registerPhone } from './reducer'
import { getWeb3 } from '../../components/ethereum/reducer'
import Hub from './hub'

const mapStateToProps = (state, ownProps) => {
  const web3 = getWeb3(state)
  return {
    hubInstance: getHubViaAddress(state, ownProps.params.address),
    userAddress: web3 && web3.eth.accounts[0]
  }
}

const mapDispatchToProps = (dispatch, { params }) => {
  return {
    requestHub: () => dispatch(requestHub(params.address)),
    registerPhone: (number) => dispatch(registerPhone(number)),
    requestMembers: () => dispatch(requestMembers(params.address))
  }
}

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Hub)
