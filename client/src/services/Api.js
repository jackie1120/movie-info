import axios from 'axios'
import { Loading } from 'element-ui'
import store from '../store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const request = axios.create({
  headers: {
    showLoading: true
  }
})
NProgress.configure({ showSpinner: false })

request.interceptors.request.use(config => {
  NProgress.start()
  if (config.headers.showLoading) {
    let loadingService = Loading.service({
      text: '运行中',
      // spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)',
      fullscreen: true
    })
    store.dispatch('setLoadingService', loadingService)
    delete config.headers.showLoading
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

request.interceptors.response.use(response => {
  NProgress.done()
  let loadingService = store.state.loadingService
  if (loadingService) {
    loadingService.close()
  }
  return response
}, function (error) {
  NProgress.done()
  let loadingService = store.state.loadingService
  if (loadingService) {
    loadingService.close()
  }
  console.log(error)
  return Promise.reject(error)
})

export default request
