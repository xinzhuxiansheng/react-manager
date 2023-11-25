import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useWindowSize } from './useWindowSize'

function App() {
  const [count, setCount] = useState(0)
  const [total, setTotal] = useState(0)
  useEffect(() => {
    document.title = 'React 后台课程'
  })

  useEffect(() => {
    setCount(count + 1)
  }, []) // 必须要添加依赖项，必须是依赖别人

  useEffect(() => {
    setTotal(count * 5)
  }, [count])

  useEffect(() => {
    const T = setInterval(() => {
      setCount(count => count + 1)
    }, 1000)
    return () => {
      clearInterval(T) // 一定记得销毁
    }
  }, [])

  const [size] = useWindowSize()

  return (
    <div className='App'>
      <p>欢迎学习 React 后台课程</p>
      <p>
        Count:{count}, Total:{total}
      </p>
      <p>
        windows width: {size.width}, window height: {size.height}
      </p>
    </div>
  )
}

export default App
