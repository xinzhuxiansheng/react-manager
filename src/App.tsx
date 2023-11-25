import { useState, useTransition } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [query, setQuery] = useState('')
  const [list, setList] = useState<any>([])
  const [isPendding, startTransition] = useTransition()

  const handleChange = (e: any) => {
    setQuery(e.target.value)
    startTransition(() => {
      const arr = Array.from({ length: 100 }).fill(1)
      setList([...list, ...arr])
    })
  }

  return (
    <div className='App'>
      <input type='text' onChange={handleChange} value={query}></input>
      <div>
        {isPendding ? (
          <div>Loading...</div>
        ) : (
          list.map((item: number, index: any) => {
            return <p key={index}>{query}</p>
          })
        )}
      </div>
    </div>
  )
}

export default App
