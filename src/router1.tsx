import { useRoutes, Link, Navigate } from 'react-router-dom'
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
  return <h2>这是一个苹果组件</h2>
}

function BaseRouter() {
  const routers = useRoutes([
    {
      path: '/',
      element: <App />
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
    }
  ])
  return routers
}

export default BaseRouter
