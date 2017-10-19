import React, { Component } from 'react'
import { withRouter } from 'react-router'
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
    let hub
    Hub.at(params.address)
      .then(hubInstance => {
        console.log('hub', hubInstance)
        hubInstance.getMembersCount().then(bn => console.log('count:', bn.toString()))
        hubInstance.members.call(res => console.log('res:',res))
        hubInstance.getMembers(res=> console.log('mem:', res))
        return hubInstance.getMembersCount();
      })
      .then(members => {
        console.log(members);
      })
    console.log('hub', hub )
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

export default withRouter(HubPage)