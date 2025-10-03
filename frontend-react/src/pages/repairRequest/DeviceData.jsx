import { Suspense, useEffect, useState } from 'react';
import { useLoaderData, Await, useSearchParams, useSubmit, useActionData, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import useTheme from '../../hooks/useTheme';
import DeviceInfo from '../../components/repairRequest/deviceData/DeviceInfo';
import DeviceName from '../../components/repairRequest/deviceData/DeviceName';
import DeviceBrand from '../../components/repairRequest/deviceData/DeviceBrand';
import SelectPriority from '../../components/repairRequest/deviceData/SelectPriority';
import SubmitRequestBtn from '../../components/repairRequest/deviceData/SubmitRequestBtn';
import { Upload, Button, Spin } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import SelectCourier from '../../components/repairRequest/deviceData/SelectCourier';
import SelectUserId from '../../components/repairRequest/deviceData/SelectUserId';

const DeviceData = () => {
  const { darkMode } = useTheme();
  const [searchParams] = useSearchParams();
  const [userId, setUserId] = useState()
  const { device, generalProblem, users } = useLoaderData();
  const navigate = useNavigate();
  const specificProblem = searchParams.get('specificProblem');
  const specificProblemId = localStorage.getItem('specificProblemId')
  const submit = useSubmit();
  const [fileList, setFileList] = useState([]);
  console.log(userId)
  const actionData = useActionData();
  const errors = actionData?.errors || {};

  const userType = localStorage.getItem('userType')

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  // Update fileList state on changes.
  const handleUploadChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  // Use useEffect to navigate after receiving a successful response.
  useEffect(() => {
    if (actionData && !actionData.errors) {
      // Clear local storage only after successful submission
      localStorage.removeItem('deviceId');
      localStorage.removeItem('generalProblemId');
      localStorage.removeItem('generalProblemName');
      localStorage.removeItem('specificProblemId');
      navigate('/success', { replace: true });
    }
  }, [actionData, navigate]);

  const onSubmit = (e, device, generalProblem) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    // Append additional form data if necessary.
    if (userId) {
      formData.append('user_id', userId)
    }
    formData.append('device_id', device.device.id);
    formData.append('general_problem_id', generalProblem.generalProblem.id);
    if (specificProblemId) {
      formData.append('specific_problem_id', specificProblemId);
    }

    formData.append('problem', generalProblem.generalProblem.problem_name);
    if (specificProblem) {
      formData.append('problem_description', specificProblem);
    }

    // Append each file individually.
    fileList.forEach((file) => {
      formData.append('attachments[]', file.originFileObj);
    });

    // Trigger the submission.
    submit(formData, {
      method: 'post',
      encType: 'multipart/form-data',
    });
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6">
      <Suspense fallback={
        <div className={`flex items-center justify-center min-h-[141px]`}>
          <Spin size="large" />
        </div>
      }>
        <Await resolve={device}>
          {(resolvedDevice) => (
            <Await resolve={generalProblem}>
              {(resolvedGeneral) => (
                <motion.div variants={containerVariants} initial="hidden" animate="show">
                  <DeviceInfo
                    darkMode={darkMode}
                    deviceName={resolvedDevice.device.name}
                    deviceCategory={resolvedDevice.device.category}
                    generalProblem={resolvedGeneral.generalProblem.problem_name}
                    specificProblem={specificProblem}
                  />
                  <motion.div variants={itemVariants} className="mt-6">
                    <form onSubmit={(e) => onSubmit(e, resolvedDevice, resolvedGeneral)} className="space-y-6">
                      {userType === 'admin' && (
                        <SelectUserId setUserId={setUserId} darkMode={darkMode} userDataPromise={users} error={errors.user_id?.[0]} />
                      )}
                      <DeviceName darkMode={darkMode} error={errors.device_name?.[0]} />
                      <DeviceBrand darkMode={darkMode} error={errors.device_brand?.[0]} />
                      <div className="flex justify-between items-center flex-col sm:flex-row gap-5">
                        <SelectPriority darkMode={darkMode} error={errors.priority?.[0]} />
                        {(userType === 'admin' || userType === 'individual') && (
                          <SelectCourier darkMode={darkMode} error={errors.courier?.[0]} />
                        )}
                      </div>

                      {/* Attachments Upload using Ant Design */}
                      <div className="flex flex-col">
                        <label
                          htmlFor="attachments"
                          className={`mb-1 font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}
                        >
                          Attachments
                        </label>
                        <Upload
                          multiple
                          fileList={fileList}
                          onChange={handleUploadChange}
                          beforeUpload={() => false} // Prevent auto upload
                          listType="picture"
                        >
                          <Button icon={<UploadOutlined />}>Select Files</Button>
                        </Upload>
                        {/* Display attachments errors */}
                        {errors.attachments && (
                          <div className="text-red-500 text-sm mt-1">
                            {errors.attachments.map((error, index) => (
                              <div key={index}>{error}</div>
                            ))}
                          </div>
                        )}
                      </div>
                      <SubmitRequestBtn darkMode={darkMode} />
                    </form>
                  </motion.div>
                </motion.div>
              )}
            </Await>
          )}
        </Await>
      </Suspense>
    </motion.div>
  );
};

export default DeviceData;
