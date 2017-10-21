import React, { Component } from 'react'
import { Link } from 'react-router'

class Home extends Component {

  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>Daohaus</h1>
            <Link to="/hub/0x9ac063aeb584b479adcfa7615befc23875ba4de4">Hub</Link>
          </div>
        </div>
      </main>
    )
  }
}

export default Home
