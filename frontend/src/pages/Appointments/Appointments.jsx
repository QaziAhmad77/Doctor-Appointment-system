import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import axios from 'axios';
import moment from 'moment';
import { Table } from 'antd';

const Appointments = () => {
  const [Appointments, setAppointments] = useState([]);
  const host = 'http://localhost:4000';
  const getAppointments = async () => {
    const headers = { Authorization: localStorage.getItem('token') };
    try {
      const res = await axios.get(`${host}/api/user/user-appointments`, {
        headers,
      });
      if (res.data.success) {
        setAppointments(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAppointments();
  }, []);
  const columns = [
    {
      title: 'ID',
      dataIndex: '_id',
    },
    // {
    //   title: 'Name',
    //   dataIndex: 'name',
    //   render: (text, record) => (
    //     <span>
    //       {record.doctorId.firstName} {record.doctorId.lastName}
    //     </span>
    //   ),
    // },
    // {
    //   title: 'Phone',
    //   dataIndex: 'phone',
    //   render: (text, record) => <span>{record.doctorId.phone}</span>,
    // },
    {
      title: 'Date & Time',
      dataIndex: 'date',
      render: (text, record) => (
        <span>
          {moment(record.date).format('DD-MM-YYYY')}
          {moment(record.time).format('HH:mm')}
        </span>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
  ];
  return (
    <Layout>
      <h1>Appointments List</h1>
      <Table columns={columns} dataSource={Appointments} />
    </Layout>
  );
};

export default Appointments;
