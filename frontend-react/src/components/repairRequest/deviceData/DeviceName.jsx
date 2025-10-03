import React from 'react'

function DeviceName({ darkMode, error}) {
    return (
        <div className="flex flex-col">
            <label
                htmlFor="device_name"
                className={`mb-1 font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}
            >
                Device name
            </label>
            <input
                type="text"
                id="device_name"
                name="device_name"
                placeholder="Enter device name"
                required
                className={`p-2 border rounded focus:outline-none focus:ring-2 ${darkMode
                    ? 'bg-gray-700 border-gray-600 text-gray-100 focus:ring-blue-500'
                    : 'bg-white border-gray-300 text-gray-800 focus:ring-blue-500'
                    }`}
            />
            {error && (
                <div className="text-red-500 text-sm mt-1">{error}</div>
            )}
        </div>
    )
}

export default DeviceName