import resso from 'resso'
import { create } from 'zustand'
import { User } from '@/types/api'
const store = resso({
  token: '',
  userInfo: {
    userEmail: '',
    userName: ''
  },
  updateUserInfo(userInfo: User.UserItem) {
    store.userInfo = userInfo
  }
})

export const useBearStore = create<{
  token: string
  userInfo: {
    userEmail: string
    userName: string
  }
  updateUserInfo: (userInfo: User.UserItem) => void
}>(set => ({
  token: '',
  userInfo: {
    userEmail: '',
    userName: ''
  },
  updateUserInfo: (userInfo: User.UserItem) => {
    set({ userInfo })
  }
}))

export default store
