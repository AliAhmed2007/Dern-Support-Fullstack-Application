import { ConfigProvider, Table, Tag } from 'antd';
import useTheme from '../../hooks/useTheme';
import getTableTheme from '../../utils/getTableTheme';

const getStatusColor = (status) => {
    const colors = {
        pending: 'orange',
        paid: 'green',
        cancelled: 'red',
        refunded: 'purple',
    };
    return colors[status];
};

const BillsTable = ({ columns, bills }) => {
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
                        if (col.key === 'amount') {
                            return `$${text.toFixed(2)}`
                        }
                        if (col.key === 'paymentMethod') {
                            return `${text.replace('_', ' ').toUpperCase()}`
                        }
                        return text;
                    }
                }))}
                dataSource={bills}
                rowKey="id"
                bordered
                pagination={{ pageSize: 6 }}
            />
        </ConfigProvider>
    );
};

export default BillsTable