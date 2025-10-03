import { useState } from 'react'
import GeneralProblemItem from './GeneralProblemItem'
import GeneralProblemChange from './GeneralProblemChange'

function GeneralProblemsArea({ generalProblems, darkMode, setOpenTopics }) {
    const [openGeneralProblems, setOpenGeneralProblems] = useState(true)
    const selectedGeneralProblemName = localStorage.getItem('generalProblemName') || null
    const renderGeneralProblems = (generalProblems) => {
        return openGeneralProblems
            ? generalProblems.map((generalProblem, index) => (
                <GeneralProblemItem
                    key={generalProblem.id || index}
                    darkMode={darkMode}
                    generalProblemId={generalProblem.id}
                    problemName={generalProblem.problem_name}
                    setOpenTopics={setOpenTopics}
                    setOpenGeneralProblems={setOpenGeneralProblems}
                    openGeneralProblems={openGeneralProblems}
                    icon={generalProblem.icon}
                />
            ))
            : <GeneralProblemChange
                generalProblemName={selectedGeneralProblemName}
                setOpenGeneralProblems={setOpenGeneralProblems}
                darkMode={darkMode}
                setOpenTopics={setOpenTopics}
            />
    }

    return (
        <>
            {openGeneralProblems ? <h1 className='pb-4 font-semibold text-xl sm:text-2xl md:text-3xl pt-5'>What’s going on?</h1> : null}
            <div className={openGeneralProblems ? 'grid sm:grid-cols-1 md:grid-cols-2 gap-5 gap-y-0 w-full' : ''}>
                {renderGeneralProblems(generalProblems)}
            </div>
        </>
    )
}

export default GeneralProblemsArea