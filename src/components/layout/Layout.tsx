import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Header'
import Footer from '../Footer'
import bg from '../../asset/images/bg.png'

function Layout() {
  return (
    <div className='flex flex-col justify-between min-h-screen'>
      <Header />
      <div className='flex-1' style={{ background: `url(${bg})` }}>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default Layout
