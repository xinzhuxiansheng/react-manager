import { createBrowserRouter, Link, Navigate, useParams, Outlet } from 'react-router-dom'

import App from './App'

function ReactDemo() {
  return (
    <h2>
      欢迎学习 React 课程 <Link to='..'>Back</Link>
    </h2>
  )
}
function ViteDemo() {
  return <h2>欢迎学习 Vite 4.0 课程</h2>
}
function Test() {
  return <h2>欢迎学习 React 课程，这是 Test 组件{<Navigate to='/react' />}</h2>
}
function NotFound() {
  return <h2>404, 当前页面不存在</h2>
}
function Apple() {
  return <h2>这是一个苹果组件 Apple 2</h2>
}
function Order() {
  const params = useParams()
  return <h2>订单组件,订单id：{params.id}</h2>
}
function Goods() {
  const params = useParams()
  return (
    <div>
      <h2>商品主页</h2>
      <p>
        <span>商品Id：{params.goodsId}</span>
        <span>订单Id：{params.orderId}</span>
      </p>
    </div>
  )
}
function Goods2() {
  const params = useParams()
  return (
    <div>
      <h2>商品主页</h2>
      <Outlet></Outlet>
    </div>
  )
}

const routers = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />
    },
    {
      path: '/order/:id',
      element: <Order />
    },
    {
      path: '/goods/:goodsId/order/:orderId',
      element: <Goods />
    },
    {
      path: '/react',
      element: <ReactDemo />
    },
    {
      path: '/vite',
      element: <ViteDemo />
    },
    {
      path: '/apple',
      element: <Apple />
    },
    {
      path: '*',
      element: <NotFound />
    },
    {
      path: '/goods',
      element: <Goods2 />,
      children: [
        {
          path: 'list', // 相对路径
          element: (
            <div>
              <p>商品一</p>
              <p>商品二</p>
            </div>
          )
        },
        {
          path: 'cart',
          element: (
            <div>
              <p>苹果手机, 价格5999</p>
              <p>小米手机, 价格2999</p>
            </div>
          )
        }
      ]
    }
  ],
  {
    basename: '/app'
  }
)

export default routers
