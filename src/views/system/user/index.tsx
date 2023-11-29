import { Button, Table, Form, Input, Select, Space } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { PageParams, User } from '@/types/api'
import { useEffect, useState } from 'react'
import api from '@/api'
import { formatDate } from '@/utils/index'
import CreateUser from './CreateUser'
export default function UserList() {
  const [form] = Form.useForm()
  const [data, setData] = useState<User.UserItem[]>([])
  const [total, setTotal] = useState(0)
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10
  })

  useEffect(() => {
    getUserList({
      pageNum: pagination.current,
      pageSize: pagination.pageSize
    })
  }, [pagination.current, pagination.pageSize])

  const handleReset = () => {
    form.resetFields()
  }

  const handleSearch = () => {
    getUserList({
      pageNum: 1,
      pageSize: pagination.pageSize
    })
  }

  const getUserList = async (params: PageParams) => {
    const values = form.getFieldsValue()
    const data = await api.getUserList({
      ...values,
      pageNum: params.pageNum,
      pageSize: params.pageSize
    })
    const list = Array.from({ length: 50 })
      .fill({})
      .map((item: any) => {
        item = { ...data.list[0] }
        item.userId = Math.random()
        return item
      })
    setData(list)
    setTotal(list.length)
    // setPagination({
    //   current: data.page.pageNum,
    //   pageSize: data.page.pageSize
    // })
  }

  const columns: ColumnsType<User.UserItem> = [
    {
      title: '用户ID',
      dataIndex: 'userId',
      key: 'userId'
    },
    {
      title: '用户名称',
      dataIndex: 'userName',
      key: 'userName'
    },
    {
      title: '用户邮箱',
      dataIndex: 'userEmail',
      key: 'userEmail'
    },
    {
      title: '用户角色',
      dataIndex: 'role',
      key: 'role',
      render(role: number) {
        return {
          0: '超级管理员',
          1: '管理员',
          2: '体验管理员',
          3: '普通管理员'
        }[role]
      }
    },
    {
      title: '用户状态',
      dataIndex: 'state',
      key: 'state',
      render(state: number) {
        return {
          1: '在职',
          2: '离职',
          3: '试用期'
        }[state]
      }
    },
    {
      title: '注册时间',
      dataIndex: 'createTime',
      key: 'addrcreateTimeess',
      render(createTime: string) {
        return formatDate(createTime)
      }
    },
    {
      title: '操作',
      render() {
        return (
          <Space>
            <Button type='text'>编辑</Button>
            <Button type='text' danger>
              删除
            </Button>
          </Space>
        )
      }
    }
  ]

  return (
    <div className='userList'>
      <Form className='search-form' form={form} layout='inline' initialValues={{ state: 1 }}>
        <Form.Item name='userId' label='用户ID'>
          <Input placeholder='请输入用户Id' />
        </Form.Item>
        <Form.Item name='userName' label='用户名称'>
          <Input placeholder='请输入用户名称' />
        </Form.Item>
        <Form.Item name='state' label='状态'>
          <Select style={{ width: 120 }}>
            <Select.Option value={0}>所有</Select.Option>
            <Select.Option value={1}>在职</Select.Option>
            <Select.Option value={2}>离职</Select.Option>
            <Select.Option value={3}>试用期</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name='userName' label='用户名称'>
          <Space>
            <Button type='primary' onClick={handleSearch}>
              搜索
            </Button>
            <Button type='default' onClick={handleReset}>
              重置
            </Button>
          </Space>
        </Form.Item>
      </Form>
      <div className='base-table'>
        <div className='header-wrapper'>
          <div className='title'>用户列表</div>
          <div className='action'>
            <Button type='primary' className='mr10'>
              新增
            </Button>
            <Button type='primary' danger>
              批量删除
            </Button>
          </div>
        </div>
        <Table
          bordered
          rowKey='userId'
          rowSelection={{ type: 'checkbox' }}
          dataSource={data}
          columns={columns}
          pagination={{
            position: ['bottomRight'],
            current: pagination.current,
            pageSize: pagination.pageSize,
            total,
            showQuickJumper: true,
            showSizeChanger: true,
            showTotal: function (total) {
              return `总共：${total}条`
            },
            onChange: (page, pageSize) => {
              setPagination({
                current: page,
                pageSize: pageSize
              })
            }
          }}
        />
      </div>

      <CreateUser />
    </div>
  )
}
