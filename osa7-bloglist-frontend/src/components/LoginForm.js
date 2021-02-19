import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
//import PropTypes from 'prop-types'
import { Button, Container, Grid, TextField, Typography, makeStyles, Icon } from '@material-ui/core'
import useField from './useField'
import { loginUser } from '../reducers/userReducer'
import { errorMessage, message } from '../reducers/notificationReducer'
import NewUser from './NewUser'

const useStyles = makeStyles((theme) => ({
  container: {
    flexGrow: 1,
  },
  button: {
    padding: theme.spacing(1),
    marginTop: theme.spacing(2)
  },
  title:  {
    textAlign: 'center',
    margin: theme.spacing(2)
  },
  text:  {
    textAlign: 'left',
    padding: theme.spacing(1)
  }
}))

const LoginForm = () => {
  const [newUserVisible, setNewUserVisible] = useState(false)

  const dispatch = useDispatch()
  
  const { reset: resetUsername, ...username } = useField('text')
  const { reset: resetPassword, ...password } = useField('password')

  const classes = useStyles()
  
  const onLogin = async (event) => {
    event.preventDefault()

    resetUsername()
    resetPassword()

    dispatch(loginUser(username.value, password.value))
    .then(() => {
      dispatch(message('User ' + username.value + ' just logged in'))
    })
    .catch(error => {
      console.error('Login failed: ', error.message)
      if(error.response.status === 401) {
        dispatch(errorMessage('Wrong username or password!'))
      } else {
        dispatch(errorMessage('Error in login, check your network connection! Error:' + error.message))
      }
    })
  }

  const showLogin = () => {
    return (
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography className={classes.title} variant='h4'>
            Blog App
          </Typography>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={1}>
            <Icon className={classes.text}>person</Icon>
          </Grid>
          <Grid iten xs={11}>
            <Typography className={classes.text} variant='h5'>
              Login
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={20}>
         <form onSubmit={onLogin}>
           <Grid item xs={12}>
             <Grid container spacing={2}>
               <Grid item xs={12}>
                  <TextField fullWidth  label='Username' variant='outlined' size='small' {...username} />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label='Password' variant='outlined' size='small' {...password} />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Button fullWidth  id='login-button' className={classes.button} type='submit' variant='contained'>
                  Login
                </Button>
              </Grid> 
            </Grid>
          </form>
        </Grid>
        <Grid container spacing={20}>
          <Grid item xs={12}>
            <Typography className={classes.text} variant='subtitle1'>
              Do not have an account?
            </Typography>
          </Grid>
          <Grid item xs={12}>
              <Button variant='contained' color='primary' onClick={() => setNewUserVisible(true)}>Create an account</Button>
          </Grid>
        </Grid>
      </Grid>
    )
  }

  const showNewUser = () => {
    return (  
      <div>
      <NewUser></NewUser>
    </div>
    )
  }

  return(
    <Container className={classes.container} maxWidth='xs'>
      {newUserVisible ? showNewUser() : showLogin()}  
    </Container>
  )
}

export default LoginForm