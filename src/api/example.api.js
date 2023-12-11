import base from './base'
import axios from '@/utils/http'

const api = {
  getLogin (params) {
    return axios.post(`${base.baseUrl}/bigScreen/login/login/anon`, params)
  },
  getBranch () {
    return axios.get(`${base.baseUrl}/outletsDistribution/outletsLongitudeLatitude`)
  }
}

export default api
