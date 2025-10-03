import { ConfigProvider, Table, Tag } from 'antd';
import useTheme from '../../hooks/useTheme';
import getTableTheme from '../../utils/getTableTheme';
import { useNavigate } from 'react-router-dom';

const getStatusColor = (status) => {
    const colors = {
        available: 'green',
        booked: 'orange',
        unavailable: 'red',
    };
    return colors[status];
};

const TechniciansTable = ({ columns, technicians }) => {
    const { darkMode } = useTheme();
    const navigate = useNavigate();
    
    function handleRowClick(record) {
        navigate(`./${record.id}`);
    }

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
                        if (col.key === 'specialization') {
                            return (
                                <Tag
                                    color={record.specialization === 'hardware' ? 'cyan' : 'geekblue'}
                                    className={darkMode ? 'dark-mode-tag' : ''}
                                >
                                    {text.toUpperCase()}
                                </Tag>
                            );
                        }
                        return text;
                    }
                }))}
                dataSource={technicians}
                rowKey="id"
                bordered
                pagination={{ pageSize: 9 }}
                onRow={(record) => ({
                    onClick: () => handleRowClick(record),
                    style: {
                        cursor: 'pointer',
                        transition: 'background-color 0.2s',
                    },
                })}
            />
        </ConfigProvider>
    );
};

export default TechniciansTable