import { ConfigProvider, Table, Tag } from 'antd';
import useTheme from '../../hooks/useTheme';
import getTableTheme from '../../utils/getTableTheme';
const getStatusColor = (status, darkMode) => {
    const colors = {
        active: darkMode ? 'var(--dark-status-success)' : 'var(--light-status-success)',
        expired: darkMode ? 'var(--dark-status-error)' : 'var(--light-status-error)',
        cancelled: darkMode ? 'var(--dark-status-warning)' : 'var(--light-status-warning)',
    };
    return colors[status];
};

const PlanSubscriptionsTable = ({ columns, plans }) => {
    const { darkMode } = useTheme();
    return (
        <ConfigProvider theme={getTableTheme(darkMode)}>
            <Table
                columns={columns.map(col => ({
                    ...col,
                    render: (text, record) => {
                        if (col.key === 'status') {
                            return (
                                <Tag
                                    color={getStatusColor(record.status)}
                                    className={darkMode ? 'dark-mode-tag' : ''}
                                >
                                    {text.toUpperCase()}
                                </Tag>
                            );
                        }
                        if (col.key === 'type') {
                            return (
                                <Tag
                                    color={record.type === 'annually' ? 'blue' : 'blue-inverse'}
                                    className={darkMode ? 'dark-mode-tag' : ''}
                                >
                                    {text.toUpperCase()}
                                </Tag>
                            );
                        }
                        return text;
                    }
                }))}
                dataSource={plans}
                rowKey="id"
                bordered
                pagination={{ pageSize: 6 }}
            />
        </ConfigProvider>
    );
};

export default PlanSubscriptionsTable