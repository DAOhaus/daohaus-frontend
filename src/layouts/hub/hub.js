import React, { Component } from 'react'
import { RaisedButton, TextField } from 'material-ui'

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
      text: 1004
    }
    this.state = initialState
  }
  componentDidMount(){
    if (!this.props.hubInstance) this.props.requestHub()
  }

  handleUsernameChange = (e) => this.setState({username: e.target.value})
  handlePhoneChange = (e) => this.setState({phone: e.target.value})
  handlePhoneClick = () => this.props.registerPhone(this.state.phone)
  handleCreate = () => {
    console.log('state:', this.state)
    console.log('props:', this.props)
    this.props.hubInstance.createResourceProposal(
    null,
    this.state.fees,
    this.state.blocks,
    this.state.cost,
    this.state.text
  ).then(res => console.log('create res:', res))
}

  render() {
    const { 
      hubInstance = {}, 
      requestMembers, 
      userAddress
    } = this.props
    const { phone, username } = this.state
    const {_members = [], address} = hubInstance
    const isMember = _members.includes(userAddress)
    console.log('address', userAddress)
    if (!hubInstance.address) return <span> Loading...</span>

    const handleRegistration = () => hubInstance.register(phone, username,  { 
      from: userAddress, 
      gas: 3000000, 
      value: 1000 
    }).then(() => {
      requestMembers(hubInstance.address);
    })
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1" style={{display: 'flex', alignItems:"center", flexDirection: 'column'}}>
            <h1>Hub {address.substring(0,5)}</h1>
            {!isMember && <div>
              <TextField
                value={username}
                onChange={this.handleUsernameChange}
                name="username"
                placeholder="username"
                style={{display: 'block'}}
              />
              <TextField
                value={phone}
                onChange={this.handlePhoneChange}
                name="phone"
                placeholder="phone number"
                style={{display: 'block', marginBottom: '20px'}}
              />
              {/* <RaisedButton onClick={this.handlePhoneClick}>Phone Register</RaisedButton> */}
              <RaisedButton onClick={handleRegistration} fullWidth primary>Register Member</RaisedButton>
            </div>}
            {_members.map(member=><div key={member}>{member}</div>)}
            <div style={{marginTop: '20px'}}>
            {isMember && <RaisedButton primary onClick={this.handleCreate} fullWidth> Create Proposal </RaisedButton> }
            </div>
        </div>
        </div>
      </main>
    )
  }
}

export default HubPage
