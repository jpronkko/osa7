
const notificationReducer = (state = '', action) => {
  switch(action.type) {
    case 'SHOW':
      return action.data
    case 'CLEAR':
      return ''
    default:
      return state
  }
}

export const show = (message, duration) => {
  return async dispatch => {
    dispatch({ 
      type: 'SHOW', 
      data: message
    })

    setTimeout(() => {
      dispatch({
        type: 'CLEAR'
      })
    }, duration * 1000);
  } 
}
export default notificationReducer