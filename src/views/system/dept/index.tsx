import { Form, Input, Button, Table, Space, Modal, message } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { useState, useEffect, useRef } from 'react'
import api from '@/api'
import { Dept } from '@/types/api'
import { IAction } from '@/types/modal'
import CreateDept from '../dept/CreateDept'
import { ColumnsType } from 'antd/es/table'
export default function DeptList() {
  const [form] = useForm()
  const [data, setData] = useState<Dept.DeptItem[]>([])

  const deptRef = useRef<{
    open: (type: IAction, data?: Dept.EditParams | { parentId: string }) => void
  }>()

  useEffect(() => {
    getDeptList()
  }, [])
  const getDeptList = async () => {
    const data = await api.getDeptList(form.getFieldsValue())
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

  const handleEdit = (record: Dept.DeptItem) => {
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
    getDeptList()
  }
  const columns: ColumnsType<Dept.DeptItem> = [
    {
      title: '部门名称',
      dataIndex: 'deptName',
      key: 'deptName',
      width: 200
    },
    {
      title: '负责人',
      dataIndex: 'userName',
      key: 'userName',
      width: 150
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime'
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
        <Form.Item label='部门名称' name='deptName'>
          <Input placeholder='部门名称' />
        </Form.Item>
        <Form.Item>
          <Button type='primary' className='mr10' onClick={getDeptList}>
            搜索
          </Button>
          <Button type='default' onClick={handleReset}>
            重置
          </Button>
        </Form.Item>
      </Form>
      <div className='base-table'>
        <div className='header-wrapper'>
          <div className='title'>部门列表</div>
          <div className='action'>
            <Button type='primary' onClick={handleCreate}>
              新增
            </Button>
          </div>
        </div>
        <Table bordered rowKey='_id' columns={columns} dataSource={data} pagination={false} />
      </div>
      <CreateDept mRef={deptRef} update={getDeptList} />
    </div>
  )
}
