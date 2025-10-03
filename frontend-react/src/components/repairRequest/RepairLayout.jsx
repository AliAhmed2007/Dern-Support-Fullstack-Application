import React from 'react'
import RepairHeader from './RepairHeader'
import { Outlet } from 'react-router-dom'

function RepairLayout() {
    return (
        <div className="px-10 sm:px-25 md:px-30 lg:px-50 pb-15">
            <RepairHeader />
            <Outlet />
        </div>
    )
}

export default RepairLayout

