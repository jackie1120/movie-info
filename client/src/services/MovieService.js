import request from './Api'

export default {
  create (data) {
    return request.post('/movies', data)
  },
  update (id, data) {
    return request.put(`/movies/${id}`, data)
  },
  getAll () {
    return request.get('/movies')
  },
  getById (id) {
    return request.get(`/movies/${id}`)
  }
}
