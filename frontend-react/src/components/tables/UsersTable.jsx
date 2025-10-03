import React from 'react';
import { ConfigProvider, Table, Tag } from 'antd';
import useTheme from '../../hooks/useTheme';
import getTableTheme from '../../utils/getTableTheme';
import { format, parseISO } from 'date-fns';
import { useNavigate } from 'react-router-dom';

const getUsersColor = (status) => {
    const colors = {
        admin: 'green-inverse',
        technician: 'red-inverse',
        business: 'green',
        individual: 'red',
    };
    return colors[status] || 'default';
};

const UsersTable = ({ columns, users }) => {
    const { darkMode } = useTheme();
    const navigate = useNavigate()

    function handleRowClick(record) {
        navigate(`./${record.id}`);
    }

    const modifiedColumns = columns.map((col) => {
        if (col.key === 'userType') {
            return {
                ...col,
                render: (text, record) => {
                    const displayText = record.user_type;
                    return (
                        <Tag
                            color={getUsersColor(record.user_type)}
                            className={darkMode ? 'dark-mode-tag' : ''}
                        >
                            {displayText ? displayText.toUpperCase() : ''}
                        </Tag>
                    );
                },
            };
        }
        if (col.key === 'created_at') {
            return {
                ...col,
                render: (text, record) => {
                    if (!record.created_at) return '';
                    try {
                        // Format the ISO date string into a human-readable format (example: Apr 9, 2025)
                        const formattedDate = format(parseISO(record.created_at), 'PPP');
                        return formattedDate;
                    } catch (error) {
                        // In case of an error, fallback to the original date string
                        return record.created_at;
                    }
                },
            };
        }
        return col;
    });

    return (
        <ConfigProvider theme={getTableTheme(darkMode)}>
            <Table
                columns={modifiedColumns}
                dataSource={users}
                rowKey="id"
                bordered
                pagination={{ pageSize: 10 }}
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

export default UsersTable;
