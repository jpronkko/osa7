import axios from 'axios'
const loginUrl = '/api/login'
const userUrl = '/api/users'

const login = async (username, password) => {
  const response = await axios.post(loginUrl, { username, password })
  return response.data
}

const createUser = async (name, username, password) => {
  const response = await axios.post(userUrl, { name, username, password })
  return response.data
}

const getAll = async () => {
  const response = await axios.get(userUrl)
  return response.data
}

export default { login, createUser, getAll }
