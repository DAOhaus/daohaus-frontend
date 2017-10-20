import React, { Component } from 'react'
import {
  RaisedButton,
  TextField,
  Snackbar
} from 'material-ui'

import Blockies from 'react-blockies';

class HubPage extends Component {
  constructor(props) {
    super(props)
    const initialState = {
      phone: '',
      username: '',
      chairmanAddress: '',
      fees: 10,
      blocks: 2,
      cost: 5,
      text: 1004,
      validationCode: '',
      open: false,
    }
    this.state = initialState
  }
  componentDidMount() {
    if (!this.props.hubInstance) this.props.requestHub()
  }

  handleUsernameChange = (e) => this.setState({ username: e.target.value })
  handlePhoneChange = (e) => this.setState({ phone: e.target.value })
  handleValidationCodeChange = (e) => this.setState({ validationCode: e.target.value })
  handlePhoneClick = () => this.props.registerPhone(this.state.phone)
  handleCreate = () => {
    this.props.hubIstance.createResourceProposal(
      this.props.address,
      this.state.fees,
      this.state.blocks,
      this.state.cost,
      this.state.text,
      { from: this.props.address }
    ).then(res => console.log('create res:', res))
  }

  render() {
    const {
      hubInstance = {},
      requestMembers,
      userAddress
    } = this.props
    const { phone, username, validationCode } = this.state
    const { _members = [], address } = hubInstance
    const isMember = _members.includes(userAddress)
    console.log('address', userAddress)
    console.log('state', this.state)
    console.log('props', this.props)
    // if (!hubInstance.address) return <span> Loading...</span>

    const handleRegistration = () => {
      if (+hubInstance.validationCode !== +this.state.validationCode) {
        this.setState({ open: true })
        return;
      }
      hubInstance.register(phone, username, {
        from: userAddress,
        gas: 3000000,
        value: 1000
      }).then(() => {
        requestMembers(hubInstance.address);
      })
    }
    return (
      <main className="container">
        <Snackbar
          open={this.state.open}
          message="Invalid code"
          autoHideDuration={4000}
        />
        <div className="pure-g">
          <div className="pure-u-1-1" style={{ display: 'flex', alignItems: "center", flexDirection: 'column' }}>
            <h1>Hub {address.substring(0, 5)}</h1>
            {!isMember && <div>
              <TextField
                value={username}
                onChange={this.handleUsernameChange}
                name="username"
                placeholder="username"
                style={{ display: 'block' }}
              />
              <TextField
                value={phone}
                onChange={this.handlePhoneChange}
                name="phone"
                placeholder="phone number"
                style={{ marginRight: '10px', display: 'block' }}
              />
              <RaisedButton onClick={this.handlePhoneClick} style={{ display: 'block' }}>Register phone</RaisedButton>
              <TextField
                value={validationCode}
                onChange={this.handleValidationCodeChange}
                name="vCode"
                placeholder="validation code"
                style={{ marginRight: '10px', display: 'block', marginBottom: '50px' }}
              />
              <RaisedButton onClick={handleRegistration} style={{ display: 'block', marginBottom: '50px' }}>Register Member</RaisedButton>
              {hubInstance._members.map((n, idx) => {
                return (
                  <Blockies
                    key={idx}
                    seed={n}
                    size={10}
                    scale={3}
                    style={{ display: 'inline', marginRight: '10px' }}
                  />
                );
              })}
              <div style={{ marginTop: '20px' }}>
                {isMember && <RaisedButton primary onClick={this.handleCreate} fullWidth> Create Proposal </RaisedButton>}
              </div>
            </div>}
          </div>
        </div>
      </main>
    )
  }
}

export default HubPage
