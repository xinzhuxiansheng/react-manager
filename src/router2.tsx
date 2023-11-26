import { createBrowserRouter, Link, Navigate, useParams, Outlet, redirect, useLoaderData } from 'react-router-dom'

import App from './App'

function Order() {
  const data = useLoaderData()
  console.log('order...', data)
  const params = useParams()
  return <h2>订单组件,订单id：{params.id}</h2>
}
function orderLoader({ params }: any) {
  console.log('loader init...', params.id)
  if (!sessionStorage.token) return redirect('/login')
  return fetch(`/${params.id}.json`)
  // return {
  //   userName: 'jack',
  //   token: sessionStorage.token
  // }
}
function NotFound() {
  return <h2>404, 当前页面不存在</h2>
}

const routers = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/order/:id',
    element: <Order />, // 再加载 element
    loader: orderLoader // 优先加载 loader
  },
  {
    path: '*',
    element: <NotFound />
  }
])

export default routers
