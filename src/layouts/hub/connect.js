import { connect } from 'react-redux'
import { compose } from 'recompose'
import { withRouter } from 'react-router'
import Hub from './hub'

const mapStateToProps = (state) => {
  return {
    test: 'test works'
  }
}

export default compose(
  withRouter,
  connect(mapStateToProps, null)
)(Hub)
