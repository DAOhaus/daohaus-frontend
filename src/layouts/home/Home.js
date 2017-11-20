import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { getWeb3 } from '../../components/ethereum/reducer'
import { TextField, RaisedButton } from 'material-ui'

class Home extends Component {
  constructor(props) { 
    super(props) 
    const initialState = { 
      hubAddress: '', 
    } 
    this.state = initialState 
  } 
 
  handleAddressChange = (e) => this.setState({hubAddress: e.target.value}) 

  render() {
    const { hubAddress } = this.state
    const { web3 } = this.props
    const networkId = web3.version.network
    console.log('id', networkId)
    return (
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1" style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            {networkId !== '5777' && <p style={{ color: 'red'}}>Not using local testrpc, for best results use Ganache</p>}
            <div>
              <span>Visit Hub @ </span>
              <TextField
                name="hub_address"
                placeholder="0xdd90c..."
                value={hubAddress}
                onChange={this.handleAddressChange} />
            </div>
            <Link to={`/hub/${hubAddress}`}>
              <RaisedButton primary style={{ color: 'white' }}> Visit Hub </RaisedButton>
            </Link>
          </div>
        </div>
      </main>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    web3: getWeb3(state)
  }
}

export default connect(mapStateToProps, null)(Home)
