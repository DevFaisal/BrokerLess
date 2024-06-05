import React from 'react'
import NavBar from '../components/NavBar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'

function AuthLayout() {
  return (
      <div>
          <NavBar />
          <Outlet />
          <Footer />
      </div>
  )
}

export default AuthLayout