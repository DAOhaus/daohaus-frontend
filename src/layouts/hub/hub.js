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
      validationCode: '',
      open: false,
    }
    this.state = initialState
  }
  componentDidMount(){
    if (!this.props.hubInstance) this.props.requestHub()
  }

  handlePhoneChange = (e) => this.setState({phone: e.target.value})

  render() {
    const { hubInstance = {}, requestMembers, registerPhone } = this.props
    const { phone, validationCode } = this.state
    if (!hubInstance.address) return <div />

    const handlePhoneChange = (e) => this.setState({phone:e.target.value})
    const handleValidationCodeChange = (e) => this.setState({validationCode:e.target.value})
    const handlePhoneClick = () => {
      registerPhone(phone)
    }

    const handleRegistration = () => hubInstance.register(phone,  { from: window.web3.eth.accounts[2], gas: 3000000, value: 1000 }).then(() => {
      console.log(hubInstance.validationCode, this.state.validationCode)
      if (+hubInstance.validationCode !== +this.state.validationCode) {
        this.setState({open: true})
        return;
      }
      requestMembers(hubInstance.address);
    })
    return(
      <main className="container">
      <Snackbar
        open={this.state.open}
        message="Invalid code"
        autoHideDuration={4000}
      />
        <div className="pure-g">
          <div className="pure-u-1-1" style={{display: 'flex', alignItems:"center", flexDirection: 'column'}}>
            <h1>Hub {hubInstance.address.substring(0,5)}</h1>
            <div>
              <TextField
                value={phone}
                onChange={handlePhoneChange}
                name="phone"
                placeholder="phone number"
                style={{marginRight: '10px', display: 'block'}}
              />
              <RaisedButton onClick={handlePhoneClick} style={{display: 'block'}}>Register phone</RaisedButton>
              <TextField
                value={validationCode}
                onChange={handleValidationCodeChange}
                name="vCode"
                placeholder="validation code"
                style={{marginRight: '10px', display: 'block', marginBottom: '50px'}}
              />
              <RaisedButton onClick={handleRegistration} style={{display: 'block', marginBottom: '50px'}}>Register Member</RaisedButton>
            </div>
            {hubInstance._members.map((n, idx) => {
              return (
                <Blockies
                  key={idx}
                  seed={n}
                  size={10}
                  scale={3}
                  style={{display: 'inline', marginRight: '10px'}}
                />
              );
            })}
          </div>
        </div>
      </main>
    )
  }
}

export default HubPage
