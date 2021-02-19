import React from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Typography } from '@material-ui/core'

const Error = () => {

  const history = useHistory()
  return (
    <div>
      <Typography variant='body2'>
        The item you are looking for can not be found!
      </Typography>
      <Button variant='contained' onClick={() => history.push('/')}>Go home</Button>
    </div>
  )
}

export default Error