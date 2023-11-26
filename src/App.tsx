import { useState } from 'react'
import { RouterProvider, BrowserRouter } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import router from './router'
import './App.css'
import Router from './router'

function App() {
  // return <RouterProvider router={router} />
  return (
    // 组件路由
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#ed6c00'
        }
      }}
    >
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ConfigProvider>
  )
}

export default App
