import { Select } from 'antd';

// Allowed transitions helper function
const allowedStatuses = (currentStatus) => {
  const status = currentStatus.toLowerCase();
  switch (status) {
    case 'pending':
      return ['pending', 'diagnostics', 'in progress', 'completed', 'cancelled'];
    case 'diagnostics':
      return ['diagnostics', 'in progress', 'completed', 'cancelled'];
    case 'in progress':
      return ['in progress', 'completed'];
    case 'completed':
      return ['completed'];
    case 'cancelled':
      return ['cancelled'];
    default:
      return [];
  }
};

// The StatusSelect component renders the Select dropdown for updating status.
// It stops event propagation so row clicks are not triggered.
const StatusSelect = ({ record, handleStatusChange }) => (
  <Select
    defaultValue={record.status.toLowerCase()}
    onClick={(event) => event.stopPropagation()}
    onChange={(newStatus) => {
      handleStatusChange(record.id, newStatus);
    }}
    style={{ width: 140 }}
  >
    {['pending', 'diagnostics', 'in progress', 'completed', 'cancelled'].map((option) => (
      <Select.Option
        key={option}
        value={option}
        disabled={!allowedStatuses(record.status).includes(option)}
      >
        {option.charAt(0).toUpperCase() + option.slice(1)}
      </Select.Option>
    ))}
  </Select>
);

export default StatusSelect;
