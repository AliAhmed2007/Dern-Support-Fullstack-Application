import React from 'react'

function DeviceBrand({ darkMode, error }) {
    return (
        <div className="flex flex-col">
            <label
                htmlFor="device_brand"
                className={`mb-1 font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}
            >
                Device Brand
            </label>
            <input
                type="text"
                id="device_brand"
                name="device_brand"
                placeholder="Enter device brand"
                required
                className={`p-2 border rounded focus:outline-none focus:ring-2 ${darkMode
                    ? 'bg-gray-700 border-gray-600 text-gray-100 focus:ring-blue-500'
                    : 'bg-white border-gray-300 text-gray-800 focus:ring-blue-500'
                    }`}
            />
            {error && (
                <div className="text-red-500 text-sm mt-1">{error}</div>
            )}
        </div>)
}

export default DeviceBrand