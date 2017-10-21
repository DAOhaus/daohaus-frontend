import React, { Component } from 'react'
import squareLogo from '../src/img/brand/logo-square.png'
import Web3 from "web3";
import { connect } from 'react-redux'

// Styles
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class App extends Component {
  componentDidMount(){
    window.addEventListener('load', function() {
      // Checking if Web3 has been injected by the browser (Mist/MetaMask)
      if (typeof web3 !== 'undefined') {
        // Use Mist/MetaMask's provider
        window.web3 = new Web3(window.web3.currentProvider);
      } else {
        console.log('No web3? You should consider trying MetaMask!')
        // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
        window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
      }

    })
  }
  render() {
    return (
      <div className="App">
        <nav 
          className="navbar pure-menu pure-menu-horizontal" 
          style={{display: 'flex', justifyContent: 'center', padding: '10px', backgroundColor: 'white'}} >
          <span style={{display: 'flex', alignItems:"center"}}>
            <img src={squareLogo} alt="logo" style={{marginRight: '5px', width: '20px'}}/>
            Daohaus
          </span>
        </nav>

        {this.props.children}
      </div>
    );
  }
}
const mapDispatch = (dispatch) => {
  return {
    dispatchWeb3: dispatch()
  }
}

export default connect(null,mapDispatch)(App)
