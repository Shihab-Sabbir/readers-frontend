import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Header'
import Footer from '../Footer'

function Layout() {
    return (
        <div className='flex flex-col justify-between min-h-screen'>
            <Header/>
        <div className='flex-1'>
        <Outlet />
        </div>
            <Footer/>
        </div>
    )
}

export default Layout