import { useState } from 'react';
import { Radio, Input, Form } from 'antd';

const Step1 = ({ formData, setFormData, errors }) => {
  // Focus states for individual inputs
  const [firstNameFocused, setFirstNameFocused] = useState(false);
  const [lastNameFocused, setLastNameFocused] = useState(false);

  // Focus states for business inputs
  const [businessNameFocused, setBusinessNameFocused] = useState(false);
  const [contactPersonFirstFocused, setContactPersonFirstFocused] = useState(false);
  const [contactPersonLastFocused, setContactPersonLastFocused] = useState(false);

  return (
    <div className="space-y-4">
      <Form.Item
        label={
          <span className="w-full block text-[16px] text-black/60 text-left">
            Account Type?
          </span>
        }
        validateStatus={errors?.userType ? 'error' : ''}
        help={errors?.userType}
      >
        <Radio.Group
          value={formData.userType}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, userType: e.target.value }))
          }
        >
          <Radio value="individual">Individual</Radio>
          <Radio value="business">Business</Radio>
        </Radio.Group>
      </Form.Item>

      {formData.userType === 'individual' ? (
        <>
          <Form.Item
            label={
              <span
                className={`w-full block font-normal text-[15px] transition duration-300 ease-in-out text-left mb-3 ${firstNameFocused ? 'text-black' : 'text-black/60'
                  }`}
              >
                First Name
              </span>
            }
            validateStatus={errors?.firstName ? 'error' : ''}
            help={errors?.firstName}
          >
            <Input
              name="firstName"
              value={formData.firstName}
              className="h-10 bg-white border border-[#D5D5D5] rounded-md text-sm text-[#242424]"
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, firstName: e.target.value }))
              }
              onFocus={() => setFirstNameFocused(true)}
              onBlur={() => setFirstNameFocused(false)}
            />
          </Form.Item>

          <Form.Item
            label={
              <span
                className={`w-full block font-normal text-[15px] transition duration-300 ease-in-out text-left mb-3 ${lastNameFocused ? 'text-black' : 'text-black/60'
                  }`}
              >
                Last Name
              </span>
            }
            validateStatus={errors?.lastName ? 'error' : ''}
            help={errors?.lastName}
          >
            <Input
              name="lastName"
              value={formData.lastName}
              className="h-10 bg-white border border-[#D5D5D5] rounded-md text-sm text-[#242424]"
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, lastName: e.target.value }))
              }
              onFocus={() => setLastNameFocused(true)}
              onBlur={() => setLastNameFocused(false)}
            />
          </Form.Item>
        </>
      ) : (
        <>
          <Form.Item
            label={
              <span
                className={`w-full block font-normal text-[15px] transition duration-300 ease-in-out text-left mb-3 ${businessNameFocused ? 'text-black' : 'text-black/60'
                  }`}
              >
                Company Name
              </span>
            }
            validateStatus={errors?.businessName ? 'error' : ''}
            help={errors?.businessName}
          >
            <Input
              name="businessName"
              value={formData.businessName}
              className="h-10 bg-white border border-[#D5D5D5] rounded-md text-sm text-[#242424]"
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, businessName: e.target.value }))
              }
              onFocus={() => setBusinessNameFocused(true)}
              onBlur={() => setBusinessNameFocused(false)}
            />
          </Form.Item>

          <Form.Item
            label={
              <span
                className={`w-full block font-normal text-[15px] transition duration-300 ease-in-out text-left mb-3 ${contactPersonFirstFocused ? 'text-black' : 'text-black/60'
                  }`}
              >
                Contact Person First Name
              </span>
            }
            validateStatus={errors?.firstName ? 'error' : ''}
            help={errors?.firstName}
          >
            <Input
              name="contactPersonFirst"
              value={formData.firstName}
              className="h-10 bg-white border border-[#D5D5D5] rounded-md text-sm text-[#242424]"
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  firstName: e.target.value,
                }))
              }
              onFocus={() => setContactPersonFirstFocused(true)}
              onBlur={() => setContactPersonFirstFocused(false)}
            />
          </Form.Item>

          <Form.Item
            label={
              <span
                className={`w-full block font-normal text-[15px] transition duration-300 ease-in-out text-left mb-3 ${contactPersonLastFocused ? 'text-black' : 'text-black/60'
                  }`}
              >
                Contact Person Last Name
              </span>
            }
            validateStatus={errors?.lastName ? 'error' : ''}
            help={errors?.lastName}
          >
            <Input
              name="contactPersonLast"
              value={formData.lastName}
              className="h-10 bg-white border border-[#D5D5D5] rounded-md text-sm text-[#242424]"
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  lastName: e.target.value,
                }))
              }
              onFocus={() => setContactPersonLastFocused(true)}
              onBlur={() => setContactPersonLastFocused(false)}
            />
          </Form.Item>
        </>
      )}
    </div>
  );
};

export default Step1;