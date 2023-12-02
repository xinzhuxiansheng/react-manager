import { Menu } from 'antd'
import { DesktopOutlined, SettingOutlined, TeamOutlined } from '@ant-design/icons'
import styles from './index.module.less'
import { useNavigate } from 'react-router-dom'

const SideMenu = () => {
  const navigate = useNavigate()
  const items = [
    {
      label: '工作台',
      key: '1',
      icon: <DesktopOutlined rev={undefined} />
    },
    {
      label: '系统管理',
      key: '2',
      icon: <SettingOutlined rev={undefined} />,
      children: [
        {
          label: '用户管理',
          key: '3',
          icon: <TeamOutlined rev={undefined} />
        },
        {
          label: '部门管理',
          key: '4',
          icon: <TeamOutlined rev={undefined} />
        }
      ]
    }
  ]

  const handleClickLogo = () => {
    navigate('/welcome')
  }
  return (
    <div>
      <div className={styles.logo} onClick={handleClickLogo}>
        <img className={styles.img} src='/imgs/logo.png' />
        <span>慕慕货运</span>
      </div>
      <Menu defaultSelectedKeys={['1']} mode='inline' theme='dark' items={items} />
    </div>
  )
}
export default SideMenu
