import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import { addCommentToBlog, addLikeToBlog, deleteBlog } from '../reducers/blogReducer'
import { errorMessage, message } from '../reducers/notificationReducer'
import useField from './useField'

import {
  Button,
  Card,  
  CardContent, 
  TextField,
  Typography
} from '@material-ui/core'

const Blog = ({ blog }) => {
 
  const dispatch = useDispatch()
  const history = useHistory()

  const allUsers = useSelector(state => state.userInfo)
  const user = useSelector(state => state.user)

  const blogAdder = allUsers.find(x => x.id === blog.user)
  const ownBlog = blog.user === user.id

  const { reset: resetCommentText, ...commentText} = useField('text')

  const findUser = (id) => {
    const foundUser = allUsers.find(x => x.id === id)
    if(foundUser)
      return foundUser.name
    return null
  }

  const onAddLike = async () => {
    try {
      dispatch(addLikeToBlog(blog))
      dispatch(message(`Blog ${blog.title} liked.`))
      //updateBlogList(blogs.map(x => x.id === updatedBlog.id ? updatedBlog : x))
    } catch (error) {
      dispatch(errorMessage(error.message))
    }
  }

  const onAddComment = async (event) => {
    event.preventDefault()

    try {
      dispatch(addCommentToBlog(blog, commentText.value, user.id))
      dispatch(message('Added comment to blog '))
      resetCommentText()
    } catch (error) {
      dispatch(errorMessage(error.message))
    }
  }

  const onDeleteBlog = async () => {
    if(!window.confirm(`Do you really want to delete blog ${blog.title}?`))
      return

    try {
      dispatch(deleteBlog(blog))
      //updateBlogList(blogs.filter(x => x.id !== blog.id))
      //setUserBlogs(userBlogs.filter(x => x !== blog.id))
      history.push('/')
    } catch (error) {
      errorMessage(error.message)
    }
  }

  const showComments = () => {
    if(blog.comments) {
      return (
        <div>
          {blog.comments.map((comment) => 
            <Typography key={comment.id} variant='body2'>
              {comment.text} by {findUser(comment.postedBy)}
            </Typography>
          )}
        </div>
      )
    } else {
      return null
    }
  }

  if(!blog) {
    return(
      <div>
        <h1>No blog {JSON.stringify(blog)}</h1>
      </div>
    )
  } else {
    return (
    <div>
      <Card>
        <CardContent>
          <div>
          <Typography variant='h5'>{blog.title}</Typography>      
          {blogAdder ? <Typography variant='body2'>{'Added by ' + blogAdder.name}</Typography> : null}
          
          <Typography variant='body1'>Author: {blog.author}</Typography>
          <a href={blog.url}>{blog.url}</a>
          <Typography variant='body1'>{blog.likes} likes </Typography>
          <Button id='likesButton' variant='contained' onClick={() => onAddLike()}>Add</Button>
          {ownBlog ?
            <Button id='deleteButton' variant='contained' onClick={() => onDeleteBlog()}>Delete</Button> :
            null}
          </div>
          <div style={{marginTop: 15}}>
            <Typography variant='h5'>Comments</Typography>
              {showComments()}
            <form onSubmit={onAddComment}>
              <div style={{marginTop: 10, marginBottom: 10}}>
                <TextField label='New Comment' variant='filled'   {...commentText} />
              </div>
              <Button variant='contained' type='submit'>Send</Button>
            </form>
          </div>
        </CardContent> 
      </Card>
    </div>
    )
  }
}
    
Blog.propTypes = {
  blog: PropTypes.object.isRequired
}

export default Blog
