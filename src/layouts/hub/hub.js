import React, { Component } from 'react'
import { Button } from 'material-ui'
// import Button from 'material-ui/Button';
// import MembersList from '../../components/MembersList';

class HubPage extends Component {
  componentDidMount(){
    console.log('hubInstance:', this.props.hubInstance)
    if (!this.props.hubInstance) this.props.requestHub()
  }

  componentWillReceiveProps(nextProps){
    console.log('nextProps', nextProps)
  }

  render() {
    const { hubInstance = {} } = this.props
    console.log('rendered instance', hubInstance)
    // const address = window.web3 && window.web3.eth.accounts[0]
    // const fees = '10'
    // const blocks = '2'
    // const cost = '2'
    // const text = 'description text'
    // const handleCreateClick = hubInstance.createResourceProposal( address,fees,blocks,cost,text).then(res => {
    //   console.log('res:', res )
    // })
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>Hub {hubInstance.address}</h1>
            {/* <RaisedButton>Create Hub</RaisedButton> */}
            <Button>Register</Button>
            <Button>Create Proposal</Button>

            {/* <MembersList/> */}
            {/*JSON.stringify(Hub)*/}
          </div>
        </div>
      </main>
    )
  }
}

export default HubPage