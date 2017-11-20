import React, { Component } from 'react'
import {
  RaisedButton,
  FlatButton,
  TextField,
  Card,
  CardText,
  CardActions
} from 'material-ui'
import Blockies from 'react-blockies'
import LoadingIcon from '../../components/loadingIcon'
import styled from 'styled-components'
import { Link } from 'react-router'
const StyledLink = styled(Link)`
  font-size: 12px;
  text-align: center;
  display: block;
  text-decoration: none;
  padding: 5px 10px;
  color: black;
  &:nth-child(odd) { background-color: #eee; }
`

class HubPage extends Component {
  constructor(props) {
    super(props)
    const initialState = {
      blockcomId: '',
      username: '',
      pledge: '',
      chairmanAddress: '',
      fees: '',
      blocks: '',
      cost: '',
      text: '',
      validationCode: '',
      open: false,
      createProposalOpen: false
    }
    this.state = initialState
  }
  componentDidMount() {
    if (!this.props.hubInstance) this.props.requestHub()
  }

  shouldComponentUpdate(){ return true }

  handleUsernameChange = (e) => this.setState({ username: e.target.value })
  handlePledgeChange = (e) => this.setState({ pledge: e.target.value })
  handleBlockcomChange = (e) => this.setState({ blockcomId: e.target.value })
  handleValidationCodeChange = (e) => this.setState({ validationCode: e.target.value })
  handleCreate = () => { // be careful to add enough gas here
    console.log('params sending to contract',this.props.userAddress,
    this.props.web3.toWei(this.state.fees),
    this.state.blocks,
    this.props.web3.toWei(this.state.cost),
    this.state.text, )
    this.props.hubInstance.createResourceProposal(
      this.props.userAddress,
      this.props.web3.toWei(this.state.fees),
      this.state.blocks,
      this.props.web3.toWei(this.state.cost),
      this.state.text,
      { from: this.props.userAddress, gas: 3000000 }
    ).then(res => { 
      console.log('response from creation:', res)
      this.setState({createProposalOpen: false}); 
      this.props.requestProposals();
    })
  }

  
  render() {
    console.log('version', React.version)
    const {
      hubInstance = {},
      requestMembers,
      userAddress,
      web3
    } = this.props
    const { 
      username, 
      fees, 
      cost, 
      blockcomId,
      pledge,
      text, 
      createProposalOpen
    } = this.state
    const {
      _members = [],
      address,
      _proposals=[]
    } = hubInstance
    const isMember = _members.includes(userAddress)
    console.log('rendering hub at address', address)
    if (!address) return <LoadingIcon fill />

    const handleRegistration = () => {
      console.log('useraddress', userAddress)
      if (!userAddress) console.error('no address found - need to unlock metamask')
      hubInstance.register(blockcomId, username, {
        from: userAddress,
        gas: 3000000,
        value: web3.toWei(pledge)
      }).then(requestMembers)
    }
    return (
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1" style={{ display: 'flex', alignItems: "center", flexDirection: 'column' }}>
            <div style={{width: '320px'}}>
              <h1 style={{textAlign: 'center'}}>Hub {address.substring(0, 5)}//{address.slice(-3)}</h1>
              <div style={{display:'flex', justifyContent:"center"}}>
              {_members.map((n, idx) =><div key={idx} style={{ display: 'inline', margin: '3px' }}> 
                <Blockies
                  seed={n}
                  size={10}
                  scale={3}
                /></div>
              )}
              </div>
              <div style={{textAlign:'center'}}>{`${_members.length} Members`}</div>
              {!isMember && <Card style={{marginTop: '20px'}}>
              <CardText>
                <h2>Join Group</h2>
                <TextField
                  value={pledge}
                  type="number"
                  fullWidth
                  onChange={this.handlePledgeChange}
                  name="pledge"
                  floatingLabelText="Ether Pledge"
                  style={{ display: 'block' }}
                />
                <TextField
                  value={username}
                  fullWidth
                  onChange={this.handleUsernameChange}
                  name="username"
                  floatingLabelText="Username (optional)"
                  style={{ display: 'block' }}
                />
                <TextField
                  value={blockcomId}
                  fullWidth
                  onChange={this.handleBlockcomChange}
                  name="blockcomId"
                  floatingLabelText="Blockcom Id (optional)"
                  style={{ marginBottom: '20px', display: 'block' }}
                />
                <RaisedButton
                  onClick={handleRegistration}
                  fullWidth
                  disabled={!pledge}
                  primary
                  style={{ display: 'block', color:'white' }}>Register</RaisedButton>
                </CardText>
              </Card>}
              {isMember && <Card style={{ marginTop: '40px', width: '320px' }} expanded={createProposalOpen}>
              <CardText> 
                  <h3 style={{margin: '0', textAlign: 'center'}}>Resource Proposals</h3> 
                </CardText> 
                {_proposals.length ? _proposals.map(proposal=> 
                  <StyledLink to={`/resourceProposal/${proposal}`} key={proposal}>{proposal}</StyledLink> 
                ) : <StyledLink> Proposal List Empty</StyledLink>} 
                {!createProposalOpen && <CardActions style={{marginTop: '5px'}}>
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
