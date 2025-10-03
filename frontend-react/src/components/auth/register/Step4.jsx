// src/components/register/Step4.jsx
import { Checkbox, Form } from 'antd';

const Step4 = ({ formData, setFormData }) => {
  const formatValue = (value) => {
    if (value instanceof File) return value.name;
    if (typeof value === 'boolean') return value ? 'Yes' : 'No';
    return value || 'Not provided';
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-4">Review Your Details</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          {Object.entries(formData).map(([key, value]) => (
            <div key={key} className="break-words">
              <span className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
              <span className="ml-2 text-gray-600">{formatValue(value)}</span>
            </div>
          ))}
        </div>
      </div>

      <Form.Item
        name="termsAccepted"
        valuePropName="checked"
        rules={[{ required: true, message: 'You must accept the terms' }]}
      >
        <Checkbox
          checked={formData.termsAccepted || false}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, termsAccepted: e.target.checked }))
          }
        >
          I agree to the{' '}
          <a href="/terms" className="text-blue-600 hover:underline">
            Terms of Service
          </a> 
          {' '} and {' '} 
          <a href="/privacy" className="text-blue-600 hover:underline">
            Privacy Policy
          </a>
        </Checkbox>
      </Form.Item>
    </div>
  );
};

export default Step4;
