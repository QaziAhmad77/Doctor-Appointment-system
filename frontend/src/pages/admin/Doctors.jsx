import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import axios from 'axios';
import { Table, message } from 'antd';

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);

  const host = 'http://localhost:4000';
  const headers = { Authorization: localStorage.getItem('token') };
  const getDoctors = async () => {
    const headers = { Authorization: localStorage.getItem('token') };
    try {
      const res = await axios.get(`${host}/api/admin/getAllDoctors`, {
        headers,
      });
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDoctors();
  }, []);

  const handleAccountStatus = async (record, status) => {
    try {
      const res = await axios.post(
        `${host}/api/admin/changeAccountStatus`,
        { doctorId: record._id, status: status },
        { headers }
      );
      if (res.data.success) {
        message.success(res.data.message);
        window.location.reload()
      }
    } catch (error) {
      message.error('Something went wrong');
    }
  };

  const columns = [
    {
      title: 'Name',
      render: (text, record) => (
        <span>
          {record.firstName}
          {record.lastName}
        </span>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
    },
    {
      title: 'Actions',
      render: (text, record) => (
        <div className="d-flex">
          {record.status === 'pending' ? (
            <button
              className="btn btn-success"
              onClick={() => handleAccountStatus(record, 'approved')}
            >
              Approve
            </button>
          ) : (
            <button className="btn btn-danger">Reject</button>
          )}
        </div>
      ),
    },
  ];
  return (
    <Layout>
      <h1>All Doctors</h1>
      <Table columns={columns} dataSource={doctors} />
    </Layout>
  );
};

export default Doctors;
