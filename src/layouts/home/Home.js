import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Home extends Component {

  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>Daohaus</h1>
            <Link to="/hub/asdf">Hub</Link>
          </div>
        </div>
      </main>
    )
  }
}

export default Home
