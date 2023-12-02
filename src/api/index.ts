import request from '@/utils/request'
import { ResultData, Login, User, Databoard, Dept, Menu } from '@/types/api'
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
  getUserList(params: User.Params) {
    return request.get<ResultData<User.UserItem>>('/users/list', params)
  },
  createUser(params: User.CreateParams) {
    return request.post('/users/create', params)
  },
  editUser(params: User.EditParams) {
    return request.post('/users/edit', params)
  },
  delUser(params: { userIds: number[] }) {
    return request.post('/users/edit', params)
  },
  getDeptList(params?: Dept.Params) {
    return request.get<Dept.DeptItem[]>('dept/list', params)
  },
  getAllUserList() {
    return request.get<User.UserItem[]>('/users/all/list')
  },
  createDept(params: Dept.CreateParams) {
    return request.post('/dept/create', params)
  },
  editDept(params: Dept.EditParams) {
    return request.post('/dept/edit', params)
  },
  deleteDept(params: Dept.DelParams) {
    return request.post('/dept/delete', params)
  },
  getMenuList(params?: Menu.Params) {
    return request.get('/menu/list', params)
  }
}
