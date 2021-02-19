import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom'
import { Typography } from '@material-ui/core'

import User from './components/User'
import UserStatus from './components/UserStatus'
import UserList from './components/UserList'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import { initUser } from './reducers/userReducer'
import { initUserInfo } from './reducers/userInfoReducer'
import Container from '@material-ui/core/Container'
import { errorMessage, message } from './reducers/notificationReducer'
import { initBlogs } from './reducers/blogReducer'
import BlogList from './components/BlogList'
import Error from './components/Error'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const allUsers = useSelector(state => state.userInfo)

  const allBlogs = useSelector(
    state => state.blogs.sort((a, b) => b.likes - a.likes) 
  )

  const blogPathMatch = useRouteMatch('/blogs/:id')
  const matchedBlog = blogPathMatch ? allBlogs.find(blog => blog.id === blogPathMatch.params.id) : null
  
  const userPathMatch = useRouteMatch('/users/:id')
  const matchedUser = userPathMatch ? allUsers.find(x => x.id === userPathMatch.params.id) : null 
  
  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initBlogs())
    .then(() => dispatch(message('All blogs loaded!')))
    .catch(error => dispatch(errorMessage(error.message)))
  }, [dispatch])

  useEffect(() => {
    dispatch(initUser())
    .then(() => dispatch(initUserInfo()))
    .catch(error => dispatch(errorMessage(error.message)))
  }, [dispatch])

  const loginForm = () => {
    return (
      <LoginForm />
    )
  }

  const Home = () => {
    return (
      <div>
        <Togglable buttonLabel='new blog' ref={blogFormRef}>
          <BlogForm  />
        </Togglable>
      
        <BlogList title={'All blogs'} blogs={allBlogs} />
      </div>
    )
  }

  const routerConstruct = () => {
    return (
      <div>
        <UserStatus />
        <Typography variant='h2'>
          Blog App
        </Typography>      
        <Notification />
        <Switch>   
          <Route path='/users/:id'>
            {matchedUser ? <User user={matchedUser} /> : <Redirect to="/error" />}
          </Route>

          <Route path="/users">
            <UserList />
          </Route>
          
          <Route path="/blogs/:id">
            {matchedBlog ? <Blog blog={matchedBlog}/> :
            <Redirect to="/error"/>}
          </Route>

          <Route path="/error">
            <Error />
          </Route>
          
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    )
  }

  return (
    <Container>
      <div>
        {!user ? loginForm() : routerConstruct()}
      </div>
    </Container>
  )
}

export default App