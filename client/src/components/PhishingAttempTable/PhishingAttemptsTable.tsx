import { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Spin } from 'antd';

const PhishingAttemptsTable = ({ reloadTrigger }: { reloadTrigger: number }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchAttempts = async () => {
        try {
            setLoading(true);

            const token = localStorage.getItem('token');

            const response = await axios.get('http://localhost:4444/phishing/attempts', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.data.success) {
                setData(response.data.data);
            } else {
                console.error('Failed to fetch attempts:', response.data.message);
            }
        } catch (error) {
            console.error('Error fetching attempts:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAttempts();
    }, [reloadTrigger]);

    const columns = [
        {
            title: 'Email',
            dataIndex: 'targetEmail',
            key: 'email',
        },
        {
            title: 'Content',
            dataIndex: 'content',
            key: 'content',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
    ];

    return loading ? (
        <Spin size="large" />
    ) : (
        <Table columns={columns} dataSource={data} rowKey="_id" />
    );
};

export default PhishingAttemptsTable;
