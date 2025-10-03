// src/components/register/Step2.jsx
import { useState } from 'react';
import { Input, Form, Button } from 'antd';
import { MailOutlined, PhoneOutlined, LockOutlined, GooglePlusOutlined } from '@ant-design/icons';
import { motion } from "framer-motion";

const Step2 = ({ formData, setFormData, errors }) => {
  const [emailFocused, setEmailFocused] = useState(false);
  const [phoneFocused, setPhoneFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);

  return (
    <div className="space-y-4">
      {/* Email Field */}
      <Form.Item
        label={
          <span
            className={`w-full block font-normal text-[15px] transition duration-300 ease-in-out text-left mb-3 ${emailFocused ? 'text-black' : 'text-black/60'
              }`}
          >
            {formData.userType === 'business' ? 'Business' : ''} Email
          </span>
        }
        validateStatus={errors?.email ? 'error' : ''}
        help={errors?.email}
      >
        <Input
          name="email"
          autoComplete="email"
          prefix={
            <span className={`text-lg ${emailFocused ? 'text-blue-700' : 'text-gray-500'}`}>
              <MailOutlined />
            </span>
          }
          type="email"
          className="h-10 bg-white border border-[#D5D5D5] rounded-md text-sm text-[#242424]"
          value={formData.email || ''}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, email: e.target.value }))
          }
          onFocus={() => setEmailFocused(true)}
          onBlur={() => setEmailFocused(false)}
        />
      </Form.Item>

      {/* Phone Number Field (optional – remove if not needed) */}
      <Form.Item
        label={
          <span
            className={`w-full block font-normal text-[15px] transition duration-300 ease-in-out text-left mb-3 ${phoneFocused ? 'text-black' : 'text-black/60'
              }`}
          >
            {formData.userType === 'business' ? 'Business' : ''} Phone Number
          </span>
        }
        validateStatus={errors?.phoneNumber ? 'error' : ''}
        help={errors?.phoneNumber}
      >
        <Input
          name="phoneNumber"
          autoComplete="tel"
          prefix={
            <span className={`text-lg ${phoneFocused ? 'text-blue-700' : 'text-gray-500'}`}>
              <PhoneOutlined />
            </span>
          }
          value={formData.phoneNumber || ''}
          className="h-10 bg-white border border-[#D5D5D5] rounded-md text-sm text-[#242424]"
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, phoneNumber: e.target.value }))
          }
          onFocus={() => setPhoneFocused(true)}
          onBlur={() => setPhoneFocused(false)}
        />
      </Form.Item>

      {/* Password Field */}
      <Form.Item
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
          autoComplete="new-password"
          prefix={
            <span className={`text-lg ${passwordFocused ? 'text-blue-700' : 'text-gray-500'}`}>
              <LockOutlined />
            </span>
          }
          className="h-10 bg-white border border-[#D5D5D5] rounded-md text-sm text-[#242424]"
          value={formData.password || ''}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, password: e.target.value }))
          }
          onFocus={() => setPasswordFocused(true)}
          onBlur={() => setPasswordFocused(false)}
        />
      </Form.Item>

      {/* Confirm Password Field */}
      <Form.Item
        label={
          <span
            className={`w-full block font-normal text-[15px] transition duration-300 ease-in-out text-left mb-3 ${confirmPasswordFocused ? 'text-black' : 'text-black/60'
              }`}
          >
            Confirm Password
          </span>
        }
        validateStatus={errors?.password_confirmation ? 'error' : ''}
        help={errors?.password_confirmation}
      >
        <Input.Password
          name="password_confirmation"
          autoComplete="new-password"
          prefix={
            <span className={`text-lg ${confirmPasswordFocused ? 'text-blue-700' : 'text-gray-500'}`}>
              <LockOutlined />
            </span>
          }
          className="h-10 bg-white border border-[#D5D5D5] rounded-md text-sm text-[#242424]"
          value={formData.password_confirmation || ''}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, password_confirmation: e.target.value }))
          }
          onFocus={() => setConfirmPasswordFocused(true)}
          onBlur={() => setConfirmPasswordFocused(false)}
        />
      </Form.Item>

      {/* Divider */}
      <div className="flex items-center my-4">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="px-2 text-gray-500">OR</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>

      {/* Sign in with Google Button */}
      <motion.div whileHover={{ scale: 0.95 }} whileTap={{ scale: 1.05 }}>
        <Button
          icon={<GooglePlusOutlined className="text-lg" />}
          type="default"
          className="w-full border border-gray-300 rounded-md flex items-center justify-center"
        >
          Sign in with Google
        </Button>
      </motion.div>
    </div>
  );
};

export default Step2;
