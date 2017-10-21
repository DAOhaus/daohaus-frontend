import React, { Component } from 'react'
import squareLogo from '../src/img/brand/logo-square.png'

// Styles
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class App extends Component {
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

export default App
