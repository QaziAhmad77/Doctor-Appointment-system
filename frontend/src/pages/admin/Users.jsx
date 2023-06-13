import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import axios from 'axios';
import { Table } from 'antd';

const Users = () => {
  const [users, setUsers] = useState([]);

  const host = 'http://localhost:4000';

  const getUsers = async () => {
    const headers = { Authorization: localStorage.getItem('token') };
    try {
      const res = await axios.get(`${host}/api/admin/getAllUsers`, { headers });
      if (res.data.success) {
        setUsers(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUsers();
  }, []);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
    },
    {
      title: 'Doctor',
      dataIndex: 'isDoctor',
      render: (text, record) => <span>{record.isDoctor ? 'Yes' : 'No'}</span>,
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (text, record) => (
        <div className="d-flex">
          <button className="btn btn-danger">Block</button>
        </div>
      ),
    },
  ];
  return (
    <Layout>
      <h1 className="text-center m-2">Users List</h1>
      <Table columns={columns} dataSource={users} />
    </Layout>
  );
};

export default Users;
