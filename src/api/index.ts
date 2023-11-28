import request from '@/utils/request'
import { ResultData, Login, User, Databoard } from '@/types/api'
export default {
  login(params: Login.params) {
    return request.post<string>('/users/login', params, { showLoading: false })
  },
  getUserInfo() {
    return request.get<User.UserItem>('/users/getUserInfo')
  },
  // 获取工作台汇总数据
  getReportData() {
    return request.get<Databoard.ReportData>('/order/dashboard/getReportData')
  },
  getLineData() {
    return request.get<Databoard.LineData>('/order/dashboard/getLineData')
  },
  getPieCityData() {
    return request.get<Databoard.PieData[]>('/order/dashboard/getPieCityData')
  },
  getPieAgeData() {
    return request.get<Databoard.PieData[]>('/order/dashboard/getPieAgeData')
  },
  getRadarData() {
    return request.get<Databoard.RadarData>('/order/dashboard/getRadarData')
  },
  getUserList() {
    return request.get<ResultData<User.UserItem>>('/users/list')
  }
}
