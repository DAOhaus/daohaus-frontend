import React, { Component } from 'react'
import {
  RaisedButton,
  TextField,
  Card,
  CardText,
  CardActions,
  Snackbar
} from 'material-ui'
import { Link } from 'react-router'

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
      text: "Buy a potatoe",
      validationCode: '',
      open: false,
    }
    this.state = initialState
  }
  componentDidMount() {
    console.log('mount' )
    if (!this.props.hubInstance) this.props.requestHub()
  }

  shouldComponentUpdate(){ return true}

  handleUsernameChange = (e) => this.setState({ username: e.target.value })
  handlePhoneChange = (e) => this.setState({ phone: e.target.value })
  handleValidationCodeChange = (e) => this.setState({ validationCode: e.target.value })
  handlePhoneClick = () => this.props.registerPhone(this.state.phone)
  handleCreate = () => {
    // be careful to add enough gas
    this.props.hubInstance.createResourceProposal(
      this.props.userAddress,
      this.state.fees,
      this.state.blocks,
      this.state.cost,
      this.state.text,
      { from: this.props.userAddress, gas: 1000000 }
    ).then(res => console.log('create res:', res))
  }

  render() {
    console.log('rendering:', this.props, this.state)
    const {
      hubInstance = {},
      requestMembers,
      requestProposals,
      userAddress
    } = this.props
    const { phone, username, validationCode } = this.state
    const { _members = [], address, _proposals=[] } = hubInstance
    const isMember = _members.includes(userAddress)
    if (!hubInstance.address) return <span> Loading...</span>

    const handleRegistration = () => {
      if (+validationCode !== +this.state.validationCode) {
        this.setState({ open: true })
        return;
      }
      hubInstance.register(phone, username, {
        from: userAddress,
        gas: 3000000,
        value: 1000
      }).then(() => {
        requestMembers(address);
        requestProposals(address);
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
            <div>
              <h1 style={{textAlign: 'center'}}>Hub {address.substring(0, 5)}</h1>
              <div style={{display:'flex', justifyContent:"center"}}>
              {_members.map((n, idx) => 
                <Blockies
                  key={idx}
                  seed={n}
                  size={10}
                  scale={3}
                  style={{ display: 'inline', marginRight: '10px' }}
                />
              )}
              </div>
              <div style={{textAlign:'center'}}>{`${_members.length} Members`}</div>
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
                  style={{ marginBottom: '20px', display: 'block' }}
                />
                <RaisedButton
                  onClick={this.handlePhoneClick}
                  fullWidth
                  primary
                  style={{ display: 'block', color:'white' }}>Register</RaisedButton>
                <div>
                  <TextField
                    value={validationCode}
                    onChange={this.handleValidationCodeChange}
                    name="vCode"
                    placeholder="validation code"
                    style={{ marginRight: '10px', display: 'block', marginBottom: '20px' }}
                  />
                  <RaisedButton
                    onClick={handleRegistration}
                    fullWidth
                    primary
                    style={{ display: 'block', color: 'white' }}> Complete Registration </RaisedButton>
                </div>
              </div>}
              {isMember && <Card style={{ marginTop: '40px' }}>
                {/* <CardHeader title="Proposals" titleStyle={{textAlign:'center'}}/> */}
                <CardText>
                  <h3 style={{margin: '0 0 10px 0', textAlign: 'center'}}>Resource Proposals</h3>
                </CardText>
                {_proposals && _proposals.map(proposal=> 
                  <Link key={proposal} style={{}}>{proposal}</Link>
                )}
                <CardActions>
                  <RaisedButton
                    primary
                    onClick={this.handleCreate}
                    fullWidth={true} > <span style={{ margin: '0 15px', color: 'white' }}>Create Proposal</span> </RaisedButton>
                </CardActions>
              </Card>}
            </div>
          </div>
        </div>
      </main>
    )
  }
}

export default HubPage
