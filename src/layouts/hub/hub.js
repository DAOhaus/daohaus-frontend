import React, { Component } from 'react'
const Web3 = require("web3");
import HubJson from '../../../../daohaus-contracts/build/contracts/Hub.json'
const truffleContract = require("truffle-contract");
const Hub = truffleContract(HubJson);
window.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
Hub.setProvider(window.web3.currentProvider)

// import MembersList from '../../components/MembersList';

// const Promise = require("bluebird");
// MetaCoin.setProvider(web3.currentProvider);
// Promise.promisifyAll(web3.eth, { suffix: "Promise" });
// Promise.promisifyAll(web3.version, { suffix: "Promise" });

class HubPage extends Component {
  render() {
    const { params } = this.props
    console.log('params:', params)
    console.log('props:', this.props)
    // let hubInstance
    // Hub.at(params.address)
    //   .then(_instance => {
    //     hubInstance = _instance
    //     console.log('hub', hubInstance)
    //     hubInstance.getMembersCount().then(bn => console.log('count:', bn.toString()))
    //     hubInstance.getMembers().then(bn => console.log('members:', bn.toString()))
    //     // hubInstance.members().then(res => console.log('res:',res))
    //     hubInstance.pvr().then(res => console.log('pvr res:',res.toString()))
    //     // hubInstance.getMembers(res=> console.log('mem:', res))
    //   })
    // const address = window.web3 && window.web3.eth.accounts[0]
    // const fees = '10'
    // const blocks = '2'
    // const cost = '2'
    // const text = 'description text'
    // const handleCreateClick = hubInstance.createResourceProposal( address,fees,blocks,cost,text).then(res => {
    //   console.log('res:', res )
    // })
    const handleCreateClick = () => console.log('clicked')
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>Daohaus</h1>
            <h3>Members List</h3>

            {/* <MembersList/> */}
            {/*JSON.stringify(Hub)*/}
          </div>
        </div>
      </main>
    )
  }
}

export default HubPage