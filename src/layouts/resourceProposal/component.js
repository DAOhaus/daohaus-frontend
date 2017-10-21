import React, { Component } from 'react'
import {
  RaisedButton,
  Card,
  CardText,
  CardActions
} from 'material-ui'
import { FirstLast } from '../../components'
import styled from 'styled-components'

const StyledItem = styled('span')`
  font-size: 12px;
  text-align: center;
  text-decoration: none;
  padding: 5px 10px;
  color: black;
  display: flex;
  justify-content: space-between;
  &:nth-child(odd) { background-color: #eee; }
`

class ResourceProposal extends Component {

  componentDidMount() { if (!this.props.resourceProposalInstance) this.props.requestContract() }
  handleYes = () => this.props.castVote(1)
  handleNo = () => this.props.castVote(2)
  
  render() {
    const {
      resourceProposalInstance = {}
    } = this.props
    const { 
      address,
      _chairman,
      _chairmanFee,
      _deadline,
      _projectCost,
      _proposalText,
      _status,
      _votes
    } = resourceProposalInstance
    if (!address) return <span> Loading...</span>
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1" style={{ display: 'flex', alignItems: "center", flexDirection: 'column' }}>
            <h2 style={{textAlign: 'center', margin: '20px 0 0'}}>Resource Proposal</h2>
            <h2 style={{margin: '0'}}> {address.substring(0, 5)}//{address.slice(-3)}</h2>
            {/* <span>({_status})</span> */}
            <Card style={{ marginTop: '20px', width: '320px' }}>
                <CardText>
                  <h3 style={{margin: '0', textAlign: 'center', marginBottom: '10px'}}>{_proposalText}</h3>
                  <StyledItem> <span>Proposal Cost:</span><span> {_projectCost}</span></StyledItem>
                  <StyledItem> <span>Chairman Fee:</span><span> {_chairmanFee}</span></StyledItem>
                  <StyledItem> <span>Chairman:</span><span> {FirstLast(_chairman)}</span></StyledItem>
                  <StyledItem> <span>Blocks Until Close:</span><span> {_deadline}</span></StyledItem>
                  {_votes.length ? <span>votes: {_votes}</span> : null}
                </CardText>
                
                <CardActions style={{marginBottom: '15px', display: 'flex', justifyContent: 'space-around'}}>
                  <RaisedButton style={{color: 'white'}} secondary onClick={this.handleNo}> No</RaisedButton>
                  <RaisedButton style={{color: 'white'}} primary onClick={this.handleYes}> Yes </RaisedButton>
                </CardActions>
                </Card>
          </div>
        </div>
      </main>
    )
  }
}

export default ResourceProposal