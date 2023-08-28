import  { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import axios from 'axios';
import moment from 'moment';
import { Table, message } from 'antd';

const DoctorAppointmets = () => {
  const [Appointments, setAppointments] = useState([]);
  const host = 'http://localhost:4000';
  const getAppointments = async () => {
    const headers = { Authorization: localStorage.getItem('token') };
    try {
      const res = await axios.get(`${host}/api/doctor/doctor-appointments`, {
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
  const handleStatus = async (record, status) => {
    const headers = { Authorization: localStorage.getItem('token') };
    try {
      const res = axios.post(
        `${host}/api/doctor/update-status`,
        { appointmentsId: record._id, status },
        { headers }
      );
      if (res.data.success) {
        message.success(res.data.message);
        getAppointments();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const columns = [
    {
      title: 'ID',
      dataIndex: '_id',
    },
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
    {
      title: 'Actions',
      dateIndex: 'actions',
      render: (text, record) =>
        record.status === 'pending' && (
          <div className="d-flex">
            <button
              className="btn btn-success"
              onClick={() => handleStatus(record, 'approved')}
            >
              Approved
            </button>
            <button
              className="btn btn-danger ms-2"
              onClick={() => handleStatus(record, 'reject')}
            >
              Reject
            </button>
          </div>
        ),
    },
  ];
  return (
    <Layout>
      <h1>Appointments List</h1>
      <Table columns={columns} dataSource={Appointments} />
    </Layout>
  );
};

export default DoctorAppointmets;
