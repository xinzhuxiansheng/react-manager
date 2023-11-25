import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { NavLink } from 'react-router-dom'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='App'>
      <div>
        <NavLink to='/vite'>
          <img src={viteLogo} className='logo' alt='Vite logo' />
        </NavLink>
        <NavLink to='/react'>
          <img src={reactLogo} className='logo react' alt='React logo' />
        </NavLink>
      </div>
      <h1>Vite + React</h1>
      <div className='card'>
        <button onClick={() => setCount(count => count + 1)}>count is {count}</button>
      </div>
    </div>
  )
}

export default App
