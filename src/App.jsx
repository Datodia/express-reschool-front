import { useEffect, useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Signup from './pages/Sign-up'
import SignIn from './pages/Sign-In'
import Profile from './pages/Profile'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />}  />
      <Route path='/profile' element={<Profile />}  />
      <Route path='/sign-up' element={<Signup />}  />
      <Route path='/sign-in' element={<SignIn />}  />
      <Route path='/dashboard' element={<Dashboard />}  />
    </Routes>
  )
}

export default App
