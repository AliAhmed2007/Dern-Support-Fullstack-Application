import React, { Suspense } from 'react'
import { Await, Link } from 'react-router-dom'
import { RightOutlined } from '@ant-design/icons'
import { Spin } from 'antd'

function DeviceArea({ loaderData, darkMode }) {
    const renderDeviceElement = (device) => (
        <div className={`flex items-center gap-5 pb-8 pt-7 my-4 border-b
            ${darkMode ? 'text-dark-primary border-gray-600' : 'text-light-primary border-gray-400'}
        `}>
            {/* Device Image */}
            <img src={device.icon} alt="Smart Phone" className="w-20 h-20" />
            {/* Device Info */}
            <div className="flex flex-col flex-grow">
                <h1 className="text-xl font-semibold">{device.name}</h1>
                <Link to=".." className="flex items-center mt-2 w-fit text-blue-500 hover:underline hover:translate-x-1 transition duration-150 ">
                    <span className='text-lg'>Change</span> <RightOutlined className='text-xs mt-1 ' />
                </Link>
            </div>
        </div>
    )

    return (
        <Suspense fallback={
            <div className={`flex items-center justify-center min-h-[141px] mb-5 border-b border-gray-500`}>
                <Spin size="large" />
            </div>
        }>
            <Await resolve={loaderData.device}>
                {(data) => renderDeviceElement(data.device)}
            </Await>
        </Suspense>
    )
}

export default DeviceArea
