import { connect } from 'react-redux'
import { compose } from 'recompose'
import { withRouter } from 'react-router'
import { requestHub, getHubViaAddress, requestMembers } from './reducer'
import Hub from './hub'

const mapStateToProps = (state, ownProps) => {
  const instance = getHubViaAddress(state, ownProps.params.address)
  return {
    hubInstance: instance,
    hubMembers: instance ? instance._members : []
  }
}

const mapDispatchToProps = (dispatch, { params }) => {
  return {
    requestHub: () => dispatch(requestHub(params.address)),
    requestMembers: () => dispatch(requestMembers(params.address))
  }
}

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Hub)
