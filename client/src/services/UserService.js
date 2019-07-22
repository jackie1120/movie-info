import request from './Api'

export default {
  async getUserById (id) {
    const response = await request.get(`/users/${id}`)
    return response.data
  },
  login (data) {
    return request.post('/users/login', data)
  },
  register (data) {
    return request.post('/users', data)
  }
}
