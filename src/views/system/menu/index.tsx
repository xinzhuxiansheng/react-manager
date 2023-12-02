import { Form, Input, Button, Table, Space, Modal, message, Select } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { useState, useEffect, useRef } from 'react'
import api from '@/api'
import { Menu } from '@/types/api'
import { IAction } from '@/types/modal'
import { ColumnsType } from 'antd/es/table'
export default function DeptList() {
  const [form] = useForm()
  const [data, setData] = useState<Menu.MenuItem[]>([])

  const deptRef = useRef<{
    open: (type: IAction, data?: Menu.EditParams | { parentId: string }) => void
  }>()

  useEffect(() => {
    getMenuList()
  }, [])
  const getMenuList = async () => {
    const data = await api.getMenuList(form.getFieldsValue())
    setData(data)
  }

  const handleReset = () => {
    form.resetFields()
  }

  const handleCreate = () => {
    deptRef.current?.open('create')
  }

  const handleSubCreate = (id: string) => {
    deptRef.current?.open('create', { parentId: id })
  }

  const handleEdit = (record: Menu.MenuItem[]) => {
    deptRef.current?.open('edit', record)
  }
  const handleDelete = (id: string) => {
    Modal.confirm({
      title: '确认删除吗？',
      content: '确认删除该部门吗？',
      onOk() {}
    })
  }
  const handleDelSubmit = async (_id: string) => {
    await api.deleteDept({
      _id
    })
    message.success('删除成功')
    getMenuList()
  }
  const columns: ColumnsType<Menu.MenuItem> = [
    {
      title: '菜单名称',
      dataIndex: 'menuName',
      key: 'menuName',
      width: 200
    },
    {
      title: '菜单图表',
      dataIndex: 'icon',
      key: 'icon',
      width: 150
    },
    {
      title: '菜单类型',
      dataIndex: 'menuType',
      key: 'menuType',
      render(menuType: number) {
        return {
          1: '菜单',
          2: '按钮',
          3: '页面'
        }[menuType]
      }
    },
    {
      title: '权限标识',
      dataIndex: 'menuCode',
      key: 'menuCode'
    },
    {
      title: '路由地址',
      dataIndex: 'path',
      key: 'path'
    },
    {
      title: '组件名称',
      dataIndex: 'component',
      key: 'component'
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime'
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
      render(record) {
        return (
          <Space>
            <Button type='text' onClick={() => handleSubCreate(record._id)}>
              新增
            </Button>
            <Button type='text' onClick={() => handleEdit(record)}>
              编辑
            </Button>
            <Button type='text' onClick={() => handleDelete(record._id)}>
              删除
            </Button>
          </Space>
        )
      }
    }
  ]
  return (
    <div>
      <Form className='search-form' layout='inline' form={form}>
        <Form.Item label='菜单名称' name='menuName'>
          <Input placeholder='菜单名称' />
        </Form.Item>
        <Form.Item label='菜单状态' name='menuState'>
          <Select>
            <Select.Option value={1}>正常</Select.Option>
            <Select.Option value={2}>停用</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type='primary' className='mr10' onClick={getMenuList}>
            搜索
          </Button>
          <Button type='default' onClick={handleReset}>
            重置
          </Button>
        </Form.Item>
      </Form>
      <div className='base-table'>
        <div className='header-wrapper'>
          <div className='title'>菜单列表</div>
          <div className='action'>
            <Button type='primary' onClick={handleCreate}>
              新增
            </Button>
          </div>
        </div>
        <Table bordered rowKey='_id' columns={columns} dataSource={data} pagination={false} />
      </div>
    </div>
  )
}
