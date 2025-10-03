import React from 'react'

function SelectPriority({darkMode, error}) {
    return (
        <div className="flex flex-col flex-1/2">
            <label htmlFor="priority" className={`mb-1 font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                Priority
            </label>
            <select
                id="priority"
                name="priority"
                defaultValue="normal"
                className={`p-2 cursor-pointer border rounded focus:outline-none focus:ring-2 ${darkMode
                    ? 'bg-gray-700 border-gray-600 text-gray-100 focus:ring-blue-500'
                    : 'bg-white border-gray-300 text-gray-800 focus:ring-blue-500'
                    }`}
            >
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="normal">Normal</option>
                <option value="low">Low</option>
            </select>
            {error && (
                <div className="text-red-500 text-sm mt-1">{error}</div>
            )}
        </div>
    )
}

export default SelectPriority