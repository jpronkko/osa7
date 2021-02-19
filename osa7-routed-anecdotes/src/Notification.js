import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const message = useSelector(state => state)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 5,
    borderColor: 'green'
  }

  if(message === '')
    return null

  return (
    <div style={style}>
      {message}
    </div>
  )
}

export default Notification