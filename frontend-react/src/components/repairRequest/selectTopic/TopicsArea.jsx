import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SpecificProblemItem from './SpecificProblemItem';

function TopicsArea({ openTopics, darkMode, specificProblems }) {
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState('');
  const isUserInputInvalid = !userInput || userInput.length < 5 || /^\d+$/.test(userInput);

  const containerClasses = !openTopics ? "opacity-40 pointer-events-none cursor-not-allowed" : "";
  const choosedGeneralProblemId = Number(localStorage.getItem('generalProblemId'));
  const correctSpecificProblems = specificProblems[choosedGeneralProblemId] || [];

  const specificProblemsElements = correctSpecificProblems?.map(specificProblem => (
    <SpecificProblemItem
      key={specificProblem.id}
      specificProblemId={specificProblem.id}
      specificProblemName={specificProblem.specific_issue}
      darkMode={darkMode}
      setOpenTopics={openTopics}
    />
  ));

  // Handles the form submission, which will be triggered by clicking continue or pressing Enter.
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/repair-request/device-data?specificProblem=${encodeURIComponent(userInput)}`);
  };

  return (
    <div className={containerClasses}>
      {openTopics ? (
        <>
          <h1 className="text-2xl font-semibold pb-5">
            Choose a detailed issue about the Problem
          </h1>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-5 gap-y-0 w-full">
            {!specificProblemsElements.length
              ? <p className={darkMode ? 'text-dark-secondary' : 'text-light-secondary'}>
                  There is no suggested issues about this device.
                </p>
              : specificProblemsElements
            }
          </div>
          {/* Wrap the input and button inside a form */}
          <form onSubmit={handleSubmit}>
            <div
              className="mt-8 p-5 rounded-xl shadow-sm transition-all duration-150 flex flex-col gap-3"
              style={{
                backgroundColor: darkMode ? '#2D2D2D' : '#F7F7F7',
                border: darkMode ? '1px solid #4B5563' : '1px solid #E5E7EB'
              }}
            >
              <h2 className={`text-lg sm:text-xl font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>
                Or, tell us in your own words
              </h2>
              <input
                type="text"
                placeholder="Describe your issue..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className={`w-full p-3 rounded-md outline-none transition-all duration-150
                  ${darkMode
                    ? 'bg-gray-800 text-white border border-gray-600 placeholder-gray-500 focus:border-gray-500'
                    : 'bg-white text-gray-900 border border-gray-300 placeholder-gray-400 focus:border-blue-500'
                  }`}
              />
            </div>
            <button
              type="submit"
              className={`block w-fit text-lg mt-5 px-7 py-3 text-center text-white rounded-full transition-colors duration-150 
                ${darkMode ? 'bg-dark-primary-color hover:bg-opacity-90' : 'bg-light-primary-color hover:bg-opacity-90'}
                ${isUserInputInvalid ? 'opacity-25 pointer-events-none' : 'cursor-pointer'}`}
            >
              Continue
            </button>
          </form>
        </>
      ) : (
        <>
          <h1 className={`my-5 py-7 border-y text-2xl font-semibold 
            ${darkMode ? 'border-gray-600' : 'border-gray-400'}`}
          >
            Choose a detailed issue about the Problem
          </h1>
          <p className="text-base">
            See your support Options
          </p>
          <button
            onClick={handleSubmit}
            className={`block w-fit text-lg mt-5 px-7 py-3 text-center text-white rounded-full transition-colors duration-150 
              ${darkMode ? 'bg-dark-primary-color hover:bg-opacity-90' : 'bg-light-primary-color hover:bg-opacity-90'}`}
          >
            Continue
          </button>
        </>
      )}
    </div>
  )
}

export default TopicsArea
