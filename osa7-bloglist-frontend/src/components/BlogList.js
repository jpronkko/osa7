import React from 'react'
import { Link as RouterLink } from 'react-router-dom'

import { 
  Card, 
  CardActions, 
  CardContent, 
  Link,
  Paper,
  TableContainer,
  Table, 
  TableBody, 
  TableRow,
  TableCell, 
  Typography, 
  makeStyles 
} from '@material-ui/core' 


const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.5)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  }
})

const BlogList = ({title, blogs}) => {

  const classes = useStyles()
  const cell = (blog) => {
    return(
      <Card className={classes.root}>
        <CardContent>
        <Typography variant='h5'>
         {blog.title}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
        {blog.author}
        </Typography>
        </CardContent>
        <CardActions>
          <Link size='small' component={RouterLink} to={`/blogs/${blog.id}`}>Learn more</Link>
        </CardActions>
      </Card>
    )
  } 

  return(
   <div style={{padding: 5, margin: 1}}>
      <Typography variant='h4'>
        {title}
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {blogs.map(blog => (
              <TableRow key={blog.id}>
                <TableCell>
                 {cell(blog)}
                </TableCell>
              </TableRow>
          ))}
          </TableBody>
          </Table>
      </TableContainer>
      </div>
  )
}

//  <Link component={RouterLink} to={`/blogs/${blog.id}`} key={blog.id}>{blog.title}</Link>
export default BlogList