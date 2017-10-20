import React, { Component } from 'react'
import {
  FlatButton,
  Card,
  CardText,
  CardActions
} from 'material-ui'

class ResourceProposal extends Component {

  componentDidMount() {
    if (!this.props.resourceProposalInstance) this.props.requestContract()
  }
  
  render() {
    const {
      resourceProposalInstance = {}
    } = this.props
    const { 
      address 
    } = resourceProposalInstance
    if (!address) return <span> Loading...</span>
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1" style={{ display: 'flex', alignItems: "center", flexDirection: 'column' }}>
            <h1 style={{textAlign: 'center'}}>Resource Proposal {address.substring(0, 5)}//{address.slice(-3)}</h1>
            <Card style={{ marginTop: '40px', width: '320px' }}>
                <CardText>
                  <h3 style={{margin: '0', textAlign: 'center'}}>Votes</h3>
                </CardText>
                
                <CardActions style={{marginTop: '5px', display: 'flex', justifyContent: 'space-around'}}>
                  <FlatButton primary> Yes </FlatButton>
                  <FlatButton secondary> No</FlatButton>
                </CardActions>
                </Card>
          </div>
        </div>
      </main>
    )
  }
}

export default ResourceProposal