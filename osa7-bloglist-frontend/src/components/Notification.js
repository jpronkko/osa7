import React from 'react'
import { useSelector } from 'react-redux'
import { Alert, AlertTitle } from '@material-ui/lab'

const Notification = () => {
  const notification = useSelector( state => state.notification )

  if(notification.notification) {
    if(notification.isError) {
      return (
        <Alert severity='error'>
          <AlertTitle>Error</AlertTitle>
          {notification.notification}
        </Alert>
      )
    } else {
      return (
        <Alert severity='info'>
          {notification.notification}
        </Alert>
      )
    }
  } else {
    return null
  }
}

//Notification.displayName = 'Notification'
export default Notification