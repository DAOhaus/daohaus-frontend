import React, { Component } from 'react'
import { Link } from 'react-router'
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
    const networkId = window.web3.version.network
    return (
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1" style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <p style={{ color: networkId === '1' ? 'red' : 'initial'}}>You are currently using networkId {networkId}</p>
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

export default Home
