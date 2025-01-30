import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route,RouterProvider } from 'react-router-dom'
import LogBoard from './Component/Production/LogBoard.jsx'
import NotFoundPage from './Component/NotFoundPage.jsx'
import About from './Component/Production/About.jsx'
import LogGraph from './Component/Production/LogGraph.jsx'
import Login from './Component/Production/Login.jsx'
import Signup from './Component/Production/Signup.jsx'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='' element={<Login/>}/>
      <Route path='dashboard' element={<LogGraph/>}/>
      <Route path='log-board' element={<LogBoard/>}/>
      <Route path='about' element={<About/>}/>
      <Route path='signup' element={<Signup/>}/>
      <Route path='*' element={<NotFoundPage/>}/>
    </Route>

  )
);


createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);
