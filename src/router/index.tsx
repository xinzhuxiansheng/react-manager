import { createHashRouter, createBrowserRouter, Navigate, useRoutes } from 'react-router-dom'
import Login from '@/views/login/Login'
import Welcome from '@/views/welcome'
import Dashboard from '@/views/dashboard'
import User from '@/views/system/user'
import Error403 from '@/views/403'
import Error404 from '@/views/404'
import Layout from '@/layout'

const route = [
  {
    path: '/',
    element: <Navigate to='/welcome' />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    element: <Layout />,
    children: [
      {
        path: '/welcome',
        element: <Welcome />
      },
      {
        path: '/dashboard',
        element: <Dashboard />
      },
      {
        path: '/userList',
        element: <User />
      }
    ]
  },
  {
    path: '*',
    element: <Navigate to='/404' />
  },
  {
    path: '/404',
    element: <Error404 />
  },
  {
    path: '/403',
    element: <Error403 />
  }
]

export default function Router() {
  return useRoutes(route)
}

// export default createBrowserRouter(route)
