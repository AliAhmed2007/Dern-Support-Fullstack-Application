import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar'
import LeftSideCanvas from './LeftSideCanvas'


function UserLayout() {
    return (
        <>
            <Navbar />
            <div className="flex" style={{ height: 'calc(100vh - 50px)' }}>
                <LeftSideCanvas outlet={<Outlet />} />
            </div>
        </>
    )
}

export default UserLayout