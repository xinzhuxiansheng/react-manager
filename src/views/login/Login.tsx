import { useEffect, useState } from 'react'
import request from '@/utils/request'
import { Button, Form, Input } from 'antd'
import api from '@/api'
import styles from './index.module.less'
import storage from '@/utils/storage'
import { message } from '@/utils/AntdGlobal'
import store from '@/store'

export default function LoginFC() {
  const [loading, setLoading] = useState(false)
  const onFinish = async (values: any) => {
    try {
      setLoading(true)
      const data: any = await api.login(values)
      setLoading(false)
      storage.set('token', data)
      message.success('登录成功')
      const params = new URLSearchParams(location.search)
      setTimeout(() => {
        location.href = params.get('callback') || '/welcome'
      })
    } catch (error) {
      setLoading(false)
    }
  }

  return (
    <div className={styles.login}>
      <div className={styles.loginWrapper}>
        <div className={styles.title}>系统登录</div>

        <Form
          name='basic'
          initialValues={{ remember: true }}
          onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete='off'
        >
          <Form.Item name='userName' rules={[{ required: true, message: 'Please input your username!' }]}>
            <Input />
          </Form.Item>

          <Form.Item name='userPwd' rules={[{ required: true, message: 'Please input your password!' }]}>
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type='primary' block htmlType='submit' loading={loading}>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
