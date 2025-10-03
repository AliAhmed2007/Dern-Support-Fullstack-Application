// src/routes/register.jsx
import { Form as RouterForm, useActionData, useNavigation, Link, useSubmit, useNavigate } from 'react-router-dom';
import { Steps, Button, Typography, Form as AntForm } from 'antd';
import { motion, AnimatePresence } from 'framer-motion';
import AuthSideImage from '../AuthSideImage';
import { useState, useEffect } from 'react';
import { UserOutlined, LockOutlined, InfoCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';

import logo from '../../../assets/icons/logo.png';
import healthStream from "../../../assets/icons/healthstream.svg";
import orascom from "../../../assets/icons/orascom.svg";
import surfAir from "../../../assets/icons/surf-air.svg";
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import useTheme from '../../../hooks/useTheme';
import useAuth from '../../../hooks/useAuth';
import useUserProfile from '../../../hooks/useUserProfile';

const { Title } = Typography;

const variants = {
  initial: { opacity: 0, x: 30, scale: 0.98 },
  animate: { opacity: 1, x: 0, scale: 1 },
  exit: { opacity: 0, x: -30, scale: 0.98 },
};

const RegisterPage = () => {
  const actionData = useActionData();
  const navigation = useNavigation();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState(() => {
    const savedData = sessionStorage.getItem('registerFormData');
    return savedData ? { ...JSON.parse(savedData), termsAccepted: false } : { userType: 'individual' };
  });

  const { authDispatch } = useAuth()
  const { userProfileDispatch } = useUserProfile()

  const submit = useSubmit()
  const navigate = useNavigate()

  const { setDarkMode } = useTheme()

  useEffect(() => {
    setDarkMode(false)
    sessionStorage.setItem('registerFormData', JSON.stringify(formData));
  }, [formData, setDarkMode]);

  useEffect(() => {
    if (actionData && !actionData.errors) {
      authDispatch({ type: 'LOGIN', payload: actionData })
      userProfileDispatch({ type: 'SET_USER_PROFILE', payload: actionData.user })
      navigate('/?message=User has been Created Successfully&type=success')
    }
  }, [authDispatch, actionData, userProfileDispatch, navigate])

  const stepsItems = [
    { title: 'Account Type', icon: <UserOutlined /> },
    { title: 'Credentials', icon: <LockOutlined /> },
    { title: 'Details', icon: <InfoCircleOutlined /> },
    { title: 'Review', icon: <CheckCircleOutlined /> },
  ];

  const handleNext = () => setCurrentStep(prev => Math.min(prev + 1, 3));
  const handlePrev = () => setCurrentStep(prev => Math.max(prev - 1, 0));

  // Submit Logic and Redirection
  const submitLogic = () => {
    if (!formData.termsAccepted) return; // Prevent submission if terms not accepted
    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'avatar' && value instanceof File) {
        data.append(key, value);
      } else {
        data.append(key, String(value));
      }
    });

    sessionStorage.removeItem('registerFormData')
    submit(data, { method: 'post', action: '/register', encType:'multipart/form-data' });
  }

  return (
    <div className="lg:flex lg:gap-8">
      <AuthSideImage>
        <div className="p-2 flex items-center justify-start ">
          <Link to='/'>
            <img src={logo} alt="Dern Support" className="h-40 w-50" />
          </Link>
          <span className="text-white text-3xl font-bold mb-[-50px] ms-[-20px]">Dern Support</span>
        </div>
        <div className="mt-15 p-12">
          <h2 className="text-white text-2xl font-bold mb-6">Join Our Community</h2>
          <p className="text-[1.125rem] leading-relaxed text-white">
            At Dern Support, we provide top-notch IT technical support to both individuals and businesses.
            Whether it’s hardware repairs or software troubleshooting, our dedicated team uses an efficient ticketing
            system to quickly resolve your issues. Let us handle your tech challenges so you can focus on what matters most.
          </p>
        </div>

        <div className="p-6">
          <p className="text-white text-center text-lg mb-[-15px]">Trusted by over 5,000 Organizations worldwide</p>
          <div className="flex justify-center space-x-4">
            <img src={surfAir} alt="surfAir" className=" h-22" />
            <img src={healthStream} alt="healthStream" className="h-22" />
            <img src={orascom} alt="orascom" className="h-22" />
          </div>
        </div>
      </AuthSideImage>
      <div className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-2xl p-8">
          <div className="mb-6 text-center">
            <Title level={2} className="!mb-2">Create Account</Title>
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-600 hover:underline">
                Sign in here
              </Link>
            </p>
            <div className="flex justify-center my-6">
              <Steps current={currentStep} className="w-full max-w-lg ">
                {stepsItems.map(item => (
                  <Steps.Step key={item.title} title={item.title} icon={item.icon} />
                ))}
              </Steps>
            </div>
          </div>

          <AntForm layout="vertical" component="div" className="relative min-h-[400px]">
            <div className="pb-2 overflow-hidden relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  variants={variants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.4 }}
                  className="w-full"
                >
                  {currentStep === 0 && (
                    <Step1
                      formData={formData}
                      setFormData={setFormData}
                      errors={actionData?.errors}
                    />
                  )}
                  {currentStep === 1 && (
                    <Step2
                      formData={formData}
                      setFormData={setFormData}
                      errors={actionData?.errors}
                    />
                  )}
                  {currentStep === 2 && (
                    <Step3
                      formData={formData}
                      setFormData={setFormData}
                      errors={actionData?.errors}
                    />
                  )}
                  {currentStep === 3 && (
                    <Step4
                      formData={formData}
                      setFormData={setFormData}
                      errors={actionData?.errors}
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="right-0 p-4 bg-white">
              <div className="flex justify-end gap-4">
                {currentStep > 0 && (
                  <Button onClick={handlePrev} size="large" className="min-w-[120px]">
                    Back
                  </Button>
                )}
                {currentStep < 3 ? (
                  <Button
                    type="primary"
                    onClick={handleNext}
                    size="large"
                    disabled={navigation.state === 'submitting'}
                    className="min-w-[120px]"
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    type="primary"
                    size="large"
                    onClick={() => submitLogic()}
                    loading={navigation.state === 'submitting'}
                    className="min-w-[120px]"
                    disabled={!formData.termsAccepted || false}
                    title={!formData.termsAccepted ? 'You Must Accept Our Terms First to Join Us.' : undefined}
                  >
                    Register
                  </Button>
                )}
              </div>
            </div>
          </AntForm>
          {actionData?.errors && (
            <div className="mt-2 p-4 bg-red-50 rounded-lg ">
              {Object.entries(actionData.errors).map(([field, message]) => (
                <p key={field} className="text-red-600">
                  {message}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

