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
import Profile from './Component/Production/Profile.jsx'
import Logout from './Component/Production/Logout.jsx'
import Role from './Component/Production/Role.jsx'
import AddRole from './Component/Production/AddRole.jsx'
import UpdateRole from './Component/Production/UpdateRole.jsx'
import Users from './Component/Production/Users.jsx'
import EditUser from './Component/Production/EditUser.jsx'
import LogOnBoard from './Component/Production/LogOnBoard.jsx'
import FloorMap from './Component/Production/FloorMap.jsx'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='dashboard' element={<LogGraph/>}/>
      <Route path='log-board' element={<LogBoard/>}/>
      <Route path='about' element={<About/>}/>
      <Route path='' element={<Login/>}/>
      <Route path='users' element={<Users/>}/>
      <Route path='signup' element={<Signup/>}/>
      <Route path='edit-user/:id' element={<EditUser/>}/>
      <Route path='profile' element={<Profile/>}/>
      <Route path='logout' element={<Logout/>}/>
      <Route path='get-roles' element={<Role/>}/>
      <Route path='add-role' element={<AddRole/>}/>
      <Route path='update-role/:id' element={<UpdateRole/>}/>
      <Route path='log-on-board' element={<LogOnBoard/>}/>
      <Route path='floor-map' element={<FloorMap/>}/>
      
      <Route path='*' element={<NotFoundPage/>}/>
    </Route>
  )
);


createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);
