import { Form as RouterForm, useActionData, Link, useNavigation, useNavigate, useSearchParams } from 'react-router-dom';
import { Button, Typography, Form as AntForm, Input } from 'antd';
import AuthSideImage from './AuthSideImage';
import { useEffect, useState } from 'react';
import { UserOutlined, LockOutlined, GooglePlusOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';

import logo from '../../assets/icons/logo.png';
import healthStream from '../../assets/icons/healthstream.svg';
import orascom from '../../assets/icons/orascom.svg';
import surfAir from '../../assets/icons/surf-air.svg';
import useTheme from '../../hooks/useTheme';
import useAuth from '../../hooks/useAuth';
import AuthNotification from './AuthNotification';

const { Title } = Typography;

const LoginForm = () => {
  const actionData = useActionData();
  const { errors = {} } = actionData || {};
  const navigation = useNavigation();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const navigate = useNavigate()
  const { setDarkMode } = useTheme()

  const { authDispatch } = useAuth()

  const [searchParams, setSearchParams] = useSearchParams()

  const message = searchParams.get('message')
  const redirectTo = searchParams.get('redirectTo') || ''
  const messageType = searchParams.get('type') || 'error'

  useEffect(() => {
    setDarkMode(false)
  }, [setDarkMode]);

  useEffect(() => {
    if (actionData && !actionData.errors) {
      authDispatch({ type: 'LOGIN', payload: actionData });
      navigate(`/${redirectTo}`)
    }
  }, [actionData, authDispatch, navigate, redirectTo]);

  return (
    <div className="lg:flex lg:gap-8">
      <AuthSideImage>
        <div className="flex flex-col h-full justify-between items-center px-8 py-4">
          <div className="flex flex-col items-center pt-8">
            <Link to='/'>
              <img src={logo} alt="Dern Support" className="h-40 w-auto" />
            </Link>
            <h1 className="mt-4 text-white text-3xl font-bold">Dern Support</h1>
            <p className="mt-4 text-white text-center max-w-md">
              All-in-One Platform for Seamless IT Support – In-Person & Remote Solutions
            </p>
          </div>
          <div className="w-full bottom-4 absolute">
            <p className="text-white text-center text-lg mb-[-15px]">
              Trusted by over 5,000 Organizations worldwide
            </p>
            <div className="flex justify-center space-x-6">
              <img src={surfAir} alt="surfAir" className="h-22 w-auto" />
              <img src={healthStream} alt="healthStream" className="h-22 w-auto" />
              <img src={orascom} alt="orascom" className="h-22 w-auto" />
            </div>
          </div>
        </div>
      </AuthSideImage>
      <div className="flex flex-1 items-center justify-center flex-col">
        <div className="w-full max-w-2xl p-8 mb-6 text-center">
          <Title level={2} className="!mb-2">Sign in to Your Account</Title>
          <p className="text-gray-600">
            Don’t Have an Account?{' '}
            <Link to="/register" className="text-blue-600 hover:underline">
              Sign Up here
            </Link>
          </p>
        </div>
        <RouterForm action="/login" method="post">
          <AntForm layout="vertical" component="div" className="w-full sm:w-[450px]">
            {/* Server Error */}
            {errors?.message && (
              <p className="text-red-500 text-center ">{errors.message}</p>
            )}
            {/* Email Field */}
            <AntForm.Item
              label={
                <span
                  className={`w-full block font-normal text-[15px] transition duration-300 ease-in-out text-left mb-3 ${emailFocused ? 'text-black' : 'text-black/60'
                    }`}
                >
                  Email
                </span>
              }
              validateStatus={errors?.email ? 'error' : ''}
              help={errors?.email}
            >
              <Input
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                prefix={
                  <span
                    className={`text-lg transition duration-300 ease-in-out ${emailFocused ? 'text-blue-700' : 'text-gray-500'
                      }`}
                  >
                    <UserOutlined />
                  </span>
                }
                className="h-10 bg-white border border-[#D5D5D5] block w-2xl rounded-md text-sm text-[#242424]"
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
              />
            </AntForm.Item>
            {/* Password Field */}
            <AntForm.Item
              label={
                <span
                  className={`w-full block font-normal text-[15px] transition duration-300 ease-in-out text-left mb-3 ${passwordFocused ? 'text-black' : 'text-black/60'
                    }`}
                >
                  Password
                </span>
              }
              validateStatus={errors?.password ? 'error' : ''}
              help={errors?.password}
            >
              <Input.Password
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                prefix={
                  <span
                    className={`text-lg transition duration-300 ease-in-out ${passwordFocused ? 'text-blue-700' : 'text-gray-500'
                      }`}
                  >
                    <LockOutlined />
                  </span>
                }
                className="h-10 bg-white border border-[#D5D5D5] block w-2xl rounded-md text-sm text-[#242424]"
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, password: e.target.value }))
                }
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
              />
            </AntForm.Item>
            {/* Credential Sign In Button */}
            <AntForm.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full"
                loading={navigation.state === 'submitting'}
              >
                Sign In
              </Button>
            </AntForm.Item>
            {/* Divider */}
            <div className="flex items-center my-4">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="px-2 text-gray-500">OR</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>
            {/* Sign in with Google Button */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                icon={<GooglePlusOutlined className="text-lg" />}
                type="default"
                className="w-full border border-gray-300 rounded-md flex items-center justify-center"
              >
                Sign in with Google
              </Button>
            </motion.div>
          </AntForm>
        </RouterForm>
      </div>
      {
        message
          ? <AuthNotification message={message} type={messageType} setSearchParams={setSearchParams} />
          : null
      }
    </div>
  );
};

export default LoginForm;

