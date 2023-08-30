import  { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import axios from 'axios';
import { Row } from 'antd';
import DoctorList from '../../components/DoctorList/DoctorList';

const Home = () => {
  const [doctors, setDoctors] = useState([]);
  const host = 'http://localhost:4000';
  const getUserData = async () => {
    const headers = { Authorization: localStorage.getItem('token') };
    try {
      const res = await axios.get(`${host}/api/user/getAllDoctors`, {
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
    getUserData();
  }, []);
  return (
    <Layout>
      <h1 className="text-center">Home Page</h1>
      <Row>
        {doctors &&
          doctors.map((doctor) => {
            return <DoctorList doctor={doctor} />;
          })}
      </Row>
    </Layout>
  );
};

export default Home;
