import { ConfigProvider, Table, Tag } from 'antd';
import useTheme from '../../hooks/useTheme';
import getTableTheme from '../../utils/getTableTheme';

const getStatusColor = (status) => {
    const colors = {
        'in progress': 'blue',
        cancelled: 'red',
        resolved: 'green',
    };
    return colors[status];
};

const getTypeColor = (type) => {
    const colors = {
        'repair request': 'purple',
        'general inquiry': 'cyan',
        'problem reporting': 'orange',
    };
    return colors[type];
};

const TicketsTable = ({ columns, tickets }) => {
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
                                    color={getTypeColor(record.type)}
                                    className={darkMode ? 'dark-mode-tag' : ''}
                                >
                                    {text.toUpperCase()}
                                </Tag>
                            );
                        }
                        return text;
                    }
                }))}
                dataSource={tickets}
                rowKey="id"
                bordered
                pagination={{ pageSize: 6 }}
            />
        </ConfigProvider>
    );
};


export default TicketsTable