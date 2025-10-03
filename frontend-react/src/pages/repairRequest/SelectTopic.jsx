import React, { Suspense, useEffect, useState } from 'react'
import { Await, useLoaderData, useNavigate } from 'react-router-dom'
import useTheme from "../../hooks/useTheme";
import DeviceArea from '../../components/repairRequest/selectTopic/DeviceArea';
import GeneralProblemsArea from '../../components/repairRequest/selectTopic/GeneralProblemsArea';
import TopicsArea from '../../components/repairRequest/selectTopic/TopicsArea';
import { Spin } from 'antd';

function SelectTopic() {
    const { darkMode } = useTheme()
    const loaderData = useLoaderData()
    const deviceIdLocalStorage = localStorage.getItem('deviceId')
    const [openTopics, setOpenTopics] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        if (!deviceIdLocalStorage) {
            return navigate('..?message=Choose the Device You Want to repair first&type=error', { replace: true, relative: 'path' })
        }
    }, [navigate, deviceIdLocalStorage])

    return (
        <div>
            <DeviceArea darkMode={darkMode} loaderData={loaderData} />
            <Suspense fallback={
                <div className={`flex items-center justify-center min-h-[350px]`}>
                    <Spin size="large" />
                </div>
            }>
                <Await resolve={loaderData.topics}>
                    {
                        ({ generalProblems, specificProblems }) =>
                            <>
                                <GeneralProblemsArea darkMode={darkMode} generalProblems={generalProblems} setOpenTopics={setOpenTopics} />
                                <TopicsArea darkMode={darkMode} openTopics={openTopics} specificProblems={specificProblems} />
                            </>
                    }
                </Await>
            </Suspense>
        </div>
    )
}

export default SelectTopic