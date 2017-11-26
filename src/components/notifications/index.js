import React from 'react'
import { connect } from 'react-redux'
import { getNotification, hideNotification } from './reducer'
import styled from 'styled-components'

const NotificationBar = styled('div')`
  display: ${({notification}) => notification.visible ? 'flex' : 'none'};
  background-color: ${({notification}) => {
    const classification = notification.classification
    if (classification === 'error') return 'red'
    else if (classification === 'warning') return 'orange'
    else if (classification === 'success') return 'green'
    }
  };
  color: white;
  width: 100%;
  padding: 10px;
  height: 40px;
  justify-content: center;
  align-items: center;
`
const CloseIcon = styled('span')`
  position: absolute;
  color: white;
  right: 10px;
  cursor: pointer;

`

const Notification = ({ notification, closeNotification }) =>
<NotificationBar notification={notification}>
  {notification.message}
  <CloseIcon onClick={closeNotification}>x</CloseIcon>
</NotificationBar>


const mapStateToProps = (state) => {
  return {
    notification: getNotification(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    closeNotification: () => dispatch(hideNotification())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notification)