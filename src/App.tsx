import { useState } from 'react'
import { RouterProvider, BrowserRouter } from 'react-router-dom'
import { ConfigProvider, App as AntdApp } from 'antd'
import Router from './router'
import AntdGlobal from './utils/AntdGlobal'
import './App.less'

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
      <AntdApp>
        <AntdGlobal />
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </AntdApp>
    </ConfigProvider>
  )
}

export default App
