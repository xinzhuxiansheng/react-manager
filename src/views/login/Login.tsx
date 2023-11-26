import axios from 'axios'
import { useEffect } from 'react'
import request from '@/utils/request'
import { Button, Form, Input } from 'antd'
import api from '@/api'
import { Login } from '@/types/api'
import styles from './index.module.less'
export default function LoginFC() {
  const onFinish = async (values: any) => {
    const data = await api.login(values)
    console.log('data', data)
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
          <Form.Item name='username' rules={[{ required: true, message: 'Please input your username!' }]}>
            <Input />
          </Form.Item>

          <Form.Item name='password' rules={[{ required: true, message: 'Please input your password!' }]}>
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type='primary' block htmlType='submit'>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
