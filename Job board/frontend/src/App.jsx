import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomeLayout from './Layout/HomeLayout'
import Footer from './Components/Footer'
import HomePage from './Pages/HomePage'
import NotFound from './Pages/NotFound'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import Profile from './Pages/User/Profile'
import EditProfile from './Pages/User/EditProfile'
import PostJob from './Pages/Job/PostJob'
import CreateCompany from './Pages/Company/CreateCompany'

function App() {

 return(
  <>
    <Routes>
      <Route path='/' element={<HomePage />}></Route>
      <Route path='/signup' element={<Signup />}></Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/user/profile' element={<Profile/>}></Route>
      <Route path='/user/editprofile' element={<EditProfile />} ></Route>
      <Route path='/post-job' element={<PostJob />}></Route>
      <Route path='/create-company' element={<CreateCompany/>}></Route>

      

      <Route path='*' element={<NotFound />}></Route>
    </Routes>
  </>
 )
}

export default App
