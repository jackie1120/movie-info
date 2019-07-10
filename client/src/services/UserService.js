import request from './Api'

export default {
  async getUserById (id) {
    const response = await request.get(`/users/${id}`)
    return response.data
  }
}
