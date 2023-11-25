import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App({ type }: { type: string }) {
  const p = <p>欢迎学习 React 通用后台开发</p>
  const isAdmin = false
  const style = { color: 'red', fontSzie: 22 }
  const name = <span style={style}>yzhou</span>
  const list = ['tom', 'Jack', 'Lucy', 'Lily']
  const handlerChange = (e: any) => {
    console.log(e.target.value)
  }

  return (
    <div className='App'>
      {p}
      <p>{isAdmin ? '您好：管理员' : <span>普通访客</span>}</p>
      {name}
      <p>用户列表: </p>
      <p>
        {list.map(item => {
          return <span key={item}>{item}</span>
        })}
      </p>
      <p>
        <input type='text' onChange={handlerChange} />
      </p>
    </div>
  )
}

export default App
