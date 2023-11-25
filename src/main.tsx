import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter, HashRouter, Routes, Route, Link } from 'react-router-dom'

function ReactDemo() {
  return (
    <h2>
      欢迎学习 React 课程 <Link to='..'>Back</Link>
    </h2>
  )
}
function ViteDemo() {
  return <h2>欢迎学习 Vite 4.0 课程</h2>
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <HashRouter>
    <Routes>
      <Route path='/' element={<App />}></Route>
      <Route path='/react' element={<ReactDemo />}></Route>
      <Route path='/vite' element={<ViteDemo />}></Route>
    </Routes>
  </HashRouter>
)
