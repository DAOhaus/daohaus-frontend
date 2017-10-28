import React, { Component } from 'react'
import { getStatus } from './utils'
import {
  RaisedButton,
  Card,
  CardText,
  CardActions
} from 'material-ui'
import { FirstLast } from '../../components'
import { Link } from 'react-router'
import styled from 'styled-components'
import Blockies from 'react-blockies';

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

  constructor(props){
    super(props);
    this.state = {watcher:false};
  }

 componentWillReceiveProps() {
    if(this.props.resourceProposalInstance && !this.state.watcher){
      console.log('adding watcher');
      const watchVotes = this.props.resourceProposalInstance.LogVoteCast({},{fromBlock:'latest'});
      this.setState({ watcher: true })
      watchVotes.watch(function(error, result){
        console.log("HEE:LLLLLLLLLLOOOOO", result);
        if(result){
          this.props.requestVotes();
        }
      })
    }
  }

  componentDidMount() { if (!this.props.resourceProposalInstance) this.props.requestContract() }
  handleYes = () => this.props.castVote(1)
  handleNo = () => this.props.castVote(2)
  executeProposal = () => this.props.executeProposal()

  componentWillReceiveProps() {
    if(this.props.resourceProposalInstance && !this.state.watcher){
      console.log('adding watcher');
      const watchVotes = this.props.resourceProposalInstance.LogVoteCast({},{fromBlock:'latest'});
      this.state.watcher =true;
      watchVotes.watch(function(error, result){
        console.log("HEE:LLLLLLLLLLOOOOO", result);
        if(result){
          this.props.requestVotes();
        }
      })
    }
  }

  render() {
    const {
      resourceProposalInstance = {},
      userAddress
    } = this.props
    const {
      address,
      _owner,
      _chairman,
      _chairmanFee,
      _deadline,
      _projectCost,
      _proposalText,
      _status,
      _votes
    } = resourceProposalInstance

    if (!address) return <span> Loading...</span>
    console.log('loggs',_chairman, _projectCost, resourceProposalInstance)
    const isChairman = userAddress === _chairman
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1" style={{ display: 'flex', alignItems: "center", flexDirection: 'column' }}>
            <h2 style={{textAlign: 'center', margin: '20px 0 0'}}>Resource Proposal</h2>
            <h2 style={{margin: '0'}}> {address.substring(0, 5)}//{address.slice(-3)}</h2>
            <Card style={{ width: '320px', marginTop: '30px' }}>
              <CardText>
                <h3 style={{ margin: '0', textAlign: 'center', marginBottom: '10px' }}>{_proposalText}</h3>
                <StyledItem> <span>Proposal Cost:</span><span> {_projectCost}</span></StyledItem>
                <StyledItem> <span>Chairman Fee:</span><span> {_chairmanFee}</span></StyledItem>
                <StyledItem> <span>Chairman:</span><span> {FirstLast(_chairman)}</span></StyledItem>
                <StyledItem> <span>Blocks Until Close:</span><span> {_deadline}</span></StyledItem>
                <StyledItem> <span>Parent Hub:</span><Link to={`/hub/${_owner}`} > {FirstLast(_owner)}</Link></StyledItem>
              </CardText>

                <CardActions style={{marginBottom: '15px', display: 'flex', justifyContent: 'space-around'}}>
                  <RaisedButton style={{color: 'white'}} secondary onClick={this.handleNo}>No ({_votes[1].toString()})</RaisedButton>
                  <RaisedButton style={{color: 'white'}} primary onClick={this.handleYes}>Yes ({_votes[0].toString()})</RaisedButton>
                </CardActions>
            </Card>
            <div style={{ margin: '20px 0', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
              <div style={{ margin: '5px 0' }}>Status: {getStatus(_status)}</div>
              {isChairman && _status==='0' &&
                <RaisedButton
                  primary
                  onClick={this.executeProposal}>
                  <span style={{ color: 'white', margin: '0 15px' }}>Execute Proposal</span>
                </RaisedButton>}
            </div>
          </div>
        </div>
      </main>
    )
  }
}

export default ResourceProposal
