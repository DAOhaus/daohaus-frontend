import React, { Component } from 'react'
import { RaisedButton, TextField } from 'material-ui'

class HubPage extends Component {
  constructor(props) {
    super(props)
    const initialState = {
      phone: ''
    }
    this.state = initialState
  }
  componentDidMount(){
    console.log('hubInstance:', this.props.hubInstance)
    if (!this.props.hubInstance) this.props.requestHub()
  }

  componentWillReceiveProps(nextProps){
    console.log('nextProps', nextProps)
  }

  handlePhoneChange = (e) => this.setState({phone: e.target.value})

  render() {
    const { hubInstance = {} } = this.props
    const { phone } = this.state
    if (!hubInstance.address) return <div />
    hubInstance.getMembersCount().then(res=>console.log('members:', res.toString()))

    const handleRegistration = () => hubInstance.register(phone,  { from: window.web3.eth.accounts[0], gas: 3000000, value: 1000 }).then(() => {
      hubInstance.getMembers().then(res => console.log('members:',res))
    })
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1" style={{display: 'flex', alignItems:"center", flexDirection: 'column'}}>
            <h1>Hub {hubInstance.address.substring(0,5)}</h1>
            <div>
              <TextField 
                value={phone} 
                onChange={this.handlePhoneChange}
                name="phone" 
                placeholder="phone number" 
                style={{marginRight: '10px'}}
              />
              <RaisedButton onClick={handleRegistration}>Register</RaisedButton>
            </div>
          </div>
        </div>
      </main>
    )
  }
}

export default HubPage