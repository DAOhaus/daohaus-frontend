import makeActionCreator from '../../util/makeActionCreator'
export const $receiveWeb3 = 'RECEIVE_WEB3'
export const receiveWeb3 = makeActionCreator($receiveWeb3, 'web3')

export default (state = { web3: null }, action) => {
  switch (action.type) {
  case $receiveWeb3:
    return {
      ...state,
      web3: action.web3
    }
    default:
      return state
  }
}

export const getWeb3 = (state) => state.ethereum.web3
export const getAccount = state => state.ethereum.web3.eth.accounts[0]
