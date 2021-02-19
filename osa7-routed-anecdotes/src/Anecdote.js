import React from 'react'


const Anecdote = ({anecdote}) => {
  console.log("Anecdote ", anecdote)
  
  if(!anecdote) {
    return(
      <div>
        <h2>No such anecdote found!</h2>
      </div>
    )
  }

  return(
    <div>
      <h2>{anecdote.content} by {anecdote.author}</h2>
      <p>has {anecdote.votes} votes</p>
    <p>for more information see {anecdote.info}</p> 
    </div>
  )
}

export default Anecdote