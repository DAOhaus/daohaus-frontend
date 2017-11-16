import React from 'react'
const Icon = () => <span>Loading...</span>
export default ({ fill }) => {
  return fill 
    ? <main 
        className="container" 
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}> <Icon /> </main> 
    : <Icon />
}