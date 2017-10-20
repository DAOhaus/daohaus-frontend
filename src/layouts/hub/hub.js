import React, { Component } from 'react'
import {
  RaisedButton,
  FlatButton,
  TextField,
  Card,
  CardText,
  CardActions,
  Snackbar
} from 'material-ui'
import Blockies from 'react-blockies';
import styled from 'styled-components'
import { Link } from 'react-router'
const StyledLink = styled(Link)`
  font-size: 12px;
  text-align: center;
  display: block;
  padding: 5px 10px;
  & + & { border-top: 1px solid gray; }
`

class HubPage extends Component {
  constructor(props) {
    super(props)
    const initialState = {
      phone: '',
      username: '',
      chairmanAddress: '',
      fees: 2,
      blocks: 2,
      cost: 10,
      text: "Buy a potatoe",
      validationCode: '',
      open: false,
      createProposalOpen: false
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
    // be careful to add enough gas here
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
    const {
      hubInstance = {},
      requestMembers,
      requestProposals,
      userAddress
    } = this.props
    const { 
      phone, 
      username, 
      validationCode, 
      fees, 
      cost, 
      text, 
      createProposalOpen
    } = this.state
    const { 
      _members = [], 
      address, 
      _proposals=[] 
    } = hubInstance
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
              <h1 style={{textAlign: 'center'}}>Hub {address.substring(0, 5)}//{address.slice(-3)}</h1>
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
              {isMember && <Card style={{ marginTop: '40px', width: '320px' }} expanded={createProposalOpen}>
                <CardText>
                  <h3 style={{margin: '0', textAlign: 'center'}}>Resource Proposals</h3>
                </CardText>
                {_proposals.length ? _proposals.map(proposal=> 
                  <StyledLink to={`/resourceProposal/${proposal}`} key={proposal}>{proposal}</StyledLink>
                ) : <StyledLink> Proposal List Empty</StyledLink>}
                {!createProposalOpen && <CardActions>
                  <RaisedButton
                    primary
                    fullWidth={true}
                    onClick={() => this.setState({createProposalOpen: true})}>
                    <span style={{ color: 'white' }}>Create Proposal</span> 
                  </RaisedButton>
                </CardActions>}
                <CardText expandable={true}>
                  <TextField
                    value={text}
                    onChange={(e)=> this.setState({text: e.target.value})}
                    floatingLabelText="Short Description"
                    style={{ display: 'block'}}
                  />
                  <TextField
                    value={cost}
                    name="cost"
                    onChange={(e)=> this.setState({cost: e.target.value})}
                    floatingLabelText="Requested Amount"
                    style={{ display: 'block'}}
                  />
                  <TextField
                    value={fees}
                    name="fee"
                    onChange={(e)=> this.setState({fees: e.target.value})}
                    floatingLabelText="Your Service Fee"
                    style={{ display: 'block'}}
                  />
                </CardText>
                <CardActions expandable={true}>
                <RaisedButton
                  primary
                  onClick={this.handleCreate}
                  style={{ color: 'white', display: 'block', marginBottom: '10px' }}
                  fullWidth={true} >Finalize </RaisedButton>
                <FlatButton
                  onClick={() => this.setState({createProposalOpen: false })}
                  fullWidth={true} >Cancel </FlatButton>
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
