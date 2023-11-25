import { useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const userRef = useRef<HTMLInputElement>(null)
  const [val, setVal] = useState('')
  const handleClick = () => {
    userRef.current?.focus()
    setVal(userRef.current?.value || '')
    console.log(userRef.current?.className)
  }
  return (
    <div className='App'>
      <input type='text' ref={userRef}></input>
      <button onClick={handleClick}>按钮</button>
      <p>{val}</p>
    </div>
  )
}

export default App
