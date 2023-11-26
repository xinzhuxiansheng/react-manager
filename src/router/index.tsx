import { createHashRouter, createBrowserRouter, Navigate, useRoutes } from 'react-router-dom'
import Login from '@/views/login/Login'
import Welcome from '@/views/Welcome'
import Error403 from '@/views/403'
import Error404 from '@/views/404'

const route = [
  {
    path: '/',
    element: <Welcome />
  },
  {
    path: '/login',
    element: <Login />
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
