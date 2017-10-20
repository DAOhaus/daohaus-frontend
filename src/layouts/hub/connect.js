import { connect } from 'react-redux'
import { compose } from 'recompose'
import { withRouter } from 'react-router'
import { requestHub, getHubViaAddress } from './reducer'
import Hub from './hub'

const mapStateToProps = (state, ownProps) => {
  return {
    hubInstance: getHubViaAddress(state, ownProps.params.address)
  }
}

const mapDispatchToProps = (dispatch, { params }) => {
  return {
    requestHub: () => dispatch(requestHub(params.address))
  }
}

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Hub)
