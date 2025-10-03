import React, { useState } from 'react';
import DeviceItem from '../../components/repairRequest/selectDevice/DeviceItem';
import useTheme from '../../hooks/useTheme';
import ShowMoreBtn from '../../components/repairRequest/selectDevice/ShowMoreBtn';
import { AnimatePresence } from 'framer-motion';
import { useLoaderData, Await } from 'react-router-dom';
import { Spin } from 'antd';

function SelectDevice() {
    const { darkMode } = useTheme();
    const [showMoreIndividualDevices, setShowMoreIndividualDevices] = useState(false);
    const [showMoreBusinessDevices, setShowMoreBusinessDevices] = useState(false);

    const {devices} = useLoaderData();

    console.log(devices)
    // Helper function to render a section of device items with a "Show More" button
    const renderDeviceElements = (devices, showMore, setShowMore) => {
        const filteredDevices = showMore ? devices : devices.slice(0, 6);
        return (
            <>
                <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-5 gap-y-0 w-full">
                    <AnimatePresence>
                        {filteredDevices.map((device, index) => (
                            <DeviceItem
                                key={device.id || index}
                                darkMode={darkMode}
                                deviceId={device.id}
                                icon=
                                {
                                    <img
                                        className='w-12 rounded-xl'
                                        src={device.icon}
                                        alt={device.name + "'s Image"}
                                    />
                                }
                                device={device.name}
                            />

                        ))}
                    </AnimatePresence>
                </div>
                <ShowMoreBtn showMore={showMore} setShowMore={setShowMore} />
            </>
        );
    };

    return (
        <>
            <h1 className="font-bold py-11 text-2xl sm:text-3xl md:text-4xl">
                What Do You Need Help With?
            </h1>

            <h2 className={`font-semibold text-2xl pb-3 ${darkMode ? 'text-dark-primary' : 'text-light-primary'}`}>
                Individual Devices & Services
            </h2>
            <React.Suspense fallback={
                <div className={`flex items-center justify-center`}>
                    <Spin size="large" />
                </div>
            }>
                <Await resolve={devices}>
                    {({ individualDevices }) => renderDeviceElements(individualDevices, showMoreIndividualDevices, setShowMoreIndividualDevices)}
                </Await>
            </React.Suspense>

            <h2 className={`font-semibold text-2xl pt-10 pb-3 ${darkMode ? 'text-dark-primary' : 'text-light-primary'}`}>
                Business Devices & Services
            </h2>
            <React.Suspense fallback={
                <div className={`flex items-center justify-center`}>
                    <Spin size="large" />
                </div>
            }>
                <Await resolve={devices}>
                    {({ businessDevices }) => renderDeviceElements(businessDevices, showMoreBusinessDevices, setShowMoreBusinessDevices)}
                </Await>
            </React.Suspense>
        </>
    );
}

export default SelectDevice;
