import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter, HashRouter, Routes, Route, Link, Navigate, RouterProvider } from 'react-router-dom'
import BaseRouter from './router1.tsx'
import Router2 from './router2.tsx'

// ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
//   <HashRouter>
//     <BaseRouter />
//   </HashRouter>
// )

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<RouterProvider router={Router2} />)
