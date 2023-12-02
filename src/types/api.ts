// 接口类型定义

export interface Result<T = any> {
  code: number
  data: T
  msg: string
}

export interface ResultData<T> {
  list: T[]
  page: {
    pageNum: number
    pageSize: number
    total: number | 0
  }
}

export interface PageParams {
  pageNum: number | undefined
  pageSize?: number
}

export namespace Login {
  export interface params {
    userName: string
    userPwd: string
  }
}

export namespace User {
  export interface Params extends PageParams {
    userId?: number
    userName?: string
    state?: number
  }

  export interface UserItem {
    _id: string
    userId: number
    userName: string
    userEmail: string
    deptId: string
    state: number
    mobile: string
    job: string
    role: number
    roleList: string
    createId: number
    deptName: string
    userImg: string
  }
  export interface CreateParams {
    userName: string
    userEmail: string
    mobile?: string
    deptId: string
    job?: string
    state?: number
    roleList: string[]
    userImg: string
  }

  export interface EditParams extends CreateParams {
    userId: number
  }
}

export namespace Dept {
  export interface Params {
    deptName?: string
  }
  export interface CreateParams {
    deptName: string
    parentId?: string
    userName: string
  }

  export interface EditParams extends CreateParams {
    _id: string
  }

  export interface DelParams {
    _id: string
  }

  export interface DeptItem {
    _id: string
    createTime: string
    updateTime: string
    deptName: string
    parentId: string
    userName: string
    children: DeptItem[]
  }
}

export namespace Menu {
  export interface Params {
    menuName: string
    menuState: string
  }
  export interface CreateParams {
    menuName: string
    icon?: string
    menuType: number
    menuState: number
    menuCode?: string
    parentId: string
    path?: string
    component?: string
  }
  export interface MenuItem extends CreateParams {
    _id: string
    createTime: string
    buttons: MenuItem[]
    children?: MenuItem[]
  }
}

export namespace Databoard {
  export interface LineData {
    label: string[]
    order: number[]
    money: number[]
  }

  export interface PieData {
    value: string
    name: string
  }

  export interface RadarData {
    indicator: Array<{ name: string; max: number }>
    data: {
      name: string
      value: number
    }
  }
  export interface ReportData {
    driverCount: number
    totalMoney: number
    orderCount: number
    cityNum: number
  }
}
