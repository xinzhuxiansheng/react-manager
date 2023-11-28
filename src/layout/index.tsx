import React, { useEffect } from 'react'
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons'
import { Layout, theme, Watermark } from 'antd'
import { Outlet } from 'react-router-dom'
import NavHeader from '@/components/NavHeader'
import NavFooter from '@/components/NavFooter'
import SideMenu from '@/components/Menu'
import api from '@/api'
import styles from './index.module.less'
import { useStore } from '@/store'
const { Header, Sider } = Layout

const App: React.FC = () => {
  const {
    token: { colorBgContainer }
  } = theme.useToken()

  const state = useStore()

  useEffect(() => {
    getUserInfo()
  }, [])
  const getUserInfo = async () => {
    const data = await api.getUserInfo()
    state.updateUserInfo(data)
  }

  return (
    <Watermark content='React'>
      <Layout>
        <Sider
        // breakpoint='lg'
        // collapsedWidth='0'
        // onBreakpoint={broken => {
        //   console.log(broken)
        // }}
        // onCollapse={(collapsed, type) => {
        //   console.log(collapsed, type)
        // }}
        >
          {/* <div className='demo-logo-vertical' />
        <Menu
          theme='dark'
          mode='inline'
          defaultSelectedKeys={['4']}
          items={[UserOutlined, VideoCameraOutlined, UploadOutlined, UserOutlined].map((icon, index) => ({
            key: String(index + 1),
            icon: React.createElement(icon),
            label: `nav ${index + 1}`
          }))}
        /> */}
          <SideMenu />
        </Sider>
        <Layout>
          <Header style={{ padding: 0, height: 50, background: colorBgContainer }}>
            <NavHeader />
          </Header>
          {/* <Content className={styles.content}> */}
          <div className={styles.wrapper}>
            <Outlet></Outlet>
          </div>
          {/* <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>content</div> */}
          <NavFooter />
          {/* <NavFooter />
          </Content> */}
          {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer> */}
        </Layout>
      </Layout>
    </Watermark>
  )
}

export default App
