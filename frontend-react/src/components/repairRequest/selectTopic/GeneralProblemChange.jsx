import React from 'react'

function GeneralProblemChange({ generalProblemName, setOpenGeneralProblems, darkMode, setOpenTopics }) {
    function handleClick() {
        setOpenTopics(false)
        setOpenGeneralProblems(true)
    }

    return (
        <div className={`my-5 pb-7 border-b flex items-center justify-between gap-3 ${darkMode ? 'border-gray-600' : 'border-gray-400'}`}>
            <h1 className='text-2xl font-semibold'>
                {generalProblemName}
            </h1>
            <button onClick={handleClick}  className="text-center text-lg cursor-pointer w-fit text-blue-500 hover:underline ">
               Change
            </button>
        </div>
    )
}

export default GeneralProblemChange