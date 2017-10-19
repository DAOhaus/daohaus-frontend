import React, { Component } from 'react'
const Web3 = require("web3");
import HubJson from '../../../../daohaus-contracts/build/contracts/Hub.json'
const truffleContract = require("truffle-contract");
const Hub = truffleContract(HubJson);
window.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545')); 
Hub.setProvider(window.web3.currentProvider)

// const Promise = require("bluebird");
// MetaCoin.setProvider(web3.currentProvider);
// Promise.promisifyAll(web3.eth, { suffix: "Promise" });
// Promise.promisifyAll(web3.version, { suffix: "Promise" });


class Home extends Component {
  
  render() {
    let hub
    Hub.deployed().then(_hub => {
      hub = _hub
      console.log(_hub)
    })
    console.log('hub', hub )
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>Daohaus</h1>
            {JSON.stringify(Hub)}
          </div>
        </div>
      </main>
    )
  }
}

export default Home
