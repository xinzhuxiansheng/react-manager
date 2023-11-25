import { memo, useMemo, useState, useCallback } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const total1 = () => {
    console.log('total1...')
    const list = [1, 3, 5, 7, 9]
    return list.reduce((prev, current) => prev + current, 0)
  }

  const total2 = useMemo(() => {
    console.log('total2...')
    const list = [1, 3, 5, 7, 9]
    return list.reduce((prev, current) => prev + current, 0)
  }, [])

  const handleClick = () => {
    setCount(count + 1)
  }
  const handleChildClick = useCallback(() => {
    console.log('子节点点击')
  }, [])

  return (
    <div className='App'>
      <p>欢迎学习 React 后台课程</p>
      <p>
        <span>Count值：{count}</span>
        <button onClick={handleClick}>按钮</button>
      </p>
      <p>{total1()}</p>
      <p>{total2}</p>
      <Child onClick={handleChildClick} />
    </div>
  )
}

const Child = memo(({ onClick }: any) => {
  console.log('child...')
  return (
    <p>
      我是子节点 <button onClick={onClick}>按钮</button>
    </p>
  )
})

export default App
