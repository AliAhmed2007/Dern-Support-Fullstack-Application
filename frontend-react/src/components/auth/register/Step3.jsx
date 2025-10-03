// src/components/register/Step3.jsx
import { useState, useEffect } from 'react';
import { Input, Form, Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const Step3 = ({ formData, setFormData, errors }) => {
  // Focus states for individual inputs
  const [addressFocused, setAddressFocused] = useState(false);
  const [cityFocused, setCityFocused] = useState(false);
  const [stateFocused, setStateFocused] = useState(false);

  // Focus states for business inputs
  const [businessAddressFocused, setBusinessAddressFocused] = useState(false);
  const [businessCityFocused, setBusinessCityFocused] = useState(false);
  const [businessStateFocused, setBusinessStateFocused] = useState(false);

  // Preview state for uploaded image (avatar)
  const [avatarPreview, setAvatarPreview] = useState(null);

  // Updated file change handler: updates the avatar immediately without status checking.
  const handleFileChange = (info) => {
    const file = info.file.originFileObj || info.file;
    if (file) {
      setFormData((prev) => ({ ...prev, avatar: file }));
    }
  };

  // Update avatar preview with a defensive check.
  useEffect(() => {
    // Ensure formData.avatar exists and is a valid Blob (File is a Blob)
    if (formData.avatar && (formData.avatar instanceof Blob)) {
      const objectUrl = URL.createObjectURL(formData.avatar);
      setAvatarPreview(objectUrl);

      // Cleanup: revoke the object URL when formData.avatar changes or component unmounts.
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setAvatarPreview(null);
    }
  }, [formData.avatar]);

  return (
    <div className="space-y-4">
      {formData.userType === 'individual' ? (
        <>
          {/* Address Field */}
          <Form.Item
            label={
              <span className={`w-full block font-normal text-[15px] transition duration-300 ease-in-out text-left mb-3 ${addressFocused ? 'text-black' : 'text-black/60'}`}>
                Address
              </span>
            }
            validateStatus={errors?.addressLine ? 'error' : ''}
            help={errors?.addressLine}
          >
            <Input.TextArea
              name="addressLine"
              rows={3}
              value={formData.addressLine || ''}
              placeholder="123 Main Street"
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, addressLine: e.target.value }))
              }
              onFocus={() => setAddressFocused(true)}
              onBlur={() => setAddressFocused(false)}
            />
          </Form.Item>

          {/* City Field */}
          <Form.Item
            label={
              <span className={`w-full block font-normal text-[15px] transition duration-300 ease-in-out text-left mb-3 ${cityFocused ? 'text-black' : 'text-black/60'}`}>
                City
              </span>
            }
            validateStatus={errors?.city ? 'error' : ''}
            help={errors?.city}
          >
            <Input
              name="city"
              value={formData.city || ''}
              placeholder="New York"
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, city: e.target.value }))
              }
              onFocus={() => setCityFocused(true)}
              onBlur={() => setCityFocused(false)}
              className="h-10 bg-white border border-[#D5D5D5] rounded-md text-sm text-[#242424]"
            />
          </Form.Item>

          {/* State Field */}
          <Form.Item
            label={
              <span className={`w-full block font-normal text-[15px] transition duration-300 ease-in-out text-left mb-3 ${stateFocused ? 'text-black' : 'text-black/60'}`}>
                State
              </span>
            }
            validateStatus={errors?.state ? 'error' : ''}
            help={errors?.state}
          >
            <Input
              name="state"
              value={formData.state || ''}
              placeholder="NY"
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, state: e.target.value }))
              }
              onFocus={() => setStateFocused(true)}
              onBlur={() => setStateFocused(false)}
              className="h-10 bg-white border border-[#D5D5D5] rounded-md text-sm text-[#242424]"
            />
          </Form.Item>

          {/* Profile Picture Upload */}
          <Form.Item label="Profile Picture (Optional)">
            <Upload
              accept="image/*"
              beforeUpload={() => false}  // Prevents auto-upload; we manage the file manually.
              onChange={handleFileChange}
              showUploadList={false}
              name="avatar"
            >
              <Button icon={<UploadOutlined />}>
                {formData.avatar?.name || 'Click to upload'}
              </Button>
            </Upload>
            {avatarPreview && (
              <img
                src={avatarPreview}
                alt="Profile Preview"
                className="mt-2 h-20 w-20 object-cover rounded-full"
              />
            )}
          </Form.Item>
        </>
      ) : (
        <>
          {/* Business Address Field */}
          <Form.Item
            label={
              <span className={`w-full block font-normal text-[15px] transition duration-300 ease-in-out text-left mb-3 ${businessAddressFocused ? 'text-black' : 'text-black/60'}`}>
                Address
              </span>
            }
            validateStatus={errors?.addressLine ? 'error' : ''}
            help={errors?.addressLine}
          >
            <Input.TextArea
              name="addressLine"
              rows={3}
              value={formData.addressLine || ''}
              placeholder="123 Main Street"
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, addressLine: e.target.value }))
              }
              onFocus={() => setBusinessAddressFocused(true)}
              onBlur={() => setBusinessAddressFocused(false)}
            />
          </Form.Item>

          {/* City Field */}
          <Form.Item
            label={
              <span className={`w-full block font-normal text-[15px] transition duration-300 ease-in-out text-left mb-3 ${businessCityFocused ? 'text-black' : 'text-black/60'}`}>
                City
              </span>
            }
            validateStatus={errors?.city ? 'error' : ''}
            help={errors?.city}
          >
            <Input
              name="city"
              value={formData.city || ''}
              placeholder="New York"
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, city: e.target.value }))
              }
              onFocus={() => setBusinessCityFocused(true)}
              onBlur={() => setBusinessCityFocused(false)}
              className="h-10 bg-white border border-[#D5D5D5] rounded-md text-sm text-[#242424]"
            />
          </Form.Item>

          {/* State Field */}
          <Form.Item
            label={
              <span className={`w-full block font-normal text-[15px] transition duration-300 ease-in-out text-left mb-3 ${businessStateFocused ? 'text-black' : 'text-black/60'}`}>
                State
              </span>
            }
            validateStatus={errors?.state ? 'error' : ''}
            help={errors?.state}
          >
            <Input
              name="state"
              value={formData.state || ''}
              placeholder="NY"
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, state: e.target.value }))
              }
              onFocus={() => setBusinessStateFocused(true)}
              onBlur={() => setBusinessStateFocused(false)}
              className="h-10 bg-white border border-[#D5D5D5] rounded-md text-sm text-[#242424]"
            />
          </Form.Item>

          {/* Company Logo Upload */}
          <Form.Item label="Profile Picture (Optional)">
            <Upload
              accept="image/*"
              beforeUpload={() => false}
              onChange={handleFileChange}
              showUploadList={false}
              name="avatar"
            >
              <Button icon={<UploadOutlined />}>
                {formData.avatar?.name || 'Click to upload'}
              </Button>
            </Upload>
            {avatarPreview && (
              <img
                src={avatarPreview}
                alt="Profile Preview"
                className="mt-2 h-20 w-20 object-cover rounded-full"
              />
            )}
          </Form.Item>
        </>
      )}
    </div>
  );
};

export default Step3;
