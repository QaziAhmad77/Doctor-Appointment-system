import  { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Form, Input, Row, TimePicker, message } from 'antd';
import axios from 'axios';
import { hideLoading, showLoading } from '../../redux/features/alertSlice';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';

const Profile = () => {
  //eslint-disable-next-line
  const { user } = useSelector((state) => state.user);
  const [doctor, setDoctor] = useState(null);
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const host = 'http://localhost:4000';
  const getDoctorInfo = async () => {
    const headers = { Authorization: localStorage.getItem('token') };
    try {
      const res = await axios.post(
        `${host}/api/doctor/getDoctorInfo`,
        { userId: params.id },
        { headers }
      );
      if (res.data.success) {
        setDoctor(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDoctorInfo();
    //eslint-disable-next-line
  }, []);
  const handleFinish = async (value) => {
    const headers = { Authorization: localStorage.getItem('token') };
    try {
      dispatch(showLoading());
      const res = await axios.post(
        `${host}/api/doctor/updateProfile`,
        {
          ...value,
          userId: user._id,
          timings: [
            moment(value.timings[0].format('HH:mm')),
            moment(value.timings[1].format('HH:mm')),
          ],
        },
        { headers }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
        navigate('/');
      } else {
        message.error(res.data.success);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error('Something went wrong');
    }
  };
  return (
    <Layout>
      <h1>Manage Profile</h1>
      {doctor && (
        <Form
          layout="vertical"
          onFinish={handleFinish}
          className="m-3"
          initialValues={{
            ...doctor,
            timings: [
              moment(doctor.timings[0], 'HH:mm'),
              moment(doctor.timings[1], 'HH:mm'),
            ],
          }}
        >
          <h4 className="">Personal Details: </h4>
          <Row gutter={20}>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="First Name"
                name="firstName"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="your first name" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Last Name"
                name="lastName"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="your last name" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Phone NO"
                name="phone"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="your contact name" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Email"
                name="email"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="your email address" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Website"
                name="website"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="your website" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Address"
                name="address"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="your clinic address" />
              </Form.Item>
            </Col>
          </Row>
          <h4>Professional Details :</h4>
          <Row gutter={20}>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="specialization"
                name="specialization"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="your specialization" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Experience"
                name="experience"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="your experience" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Fees Per Cunsaltation"
                name="feesPerCunsaltaion"
                required
                rules={[{ required: true }]}
              >
                <Input type="number" placeholder="your fee for cunsaltaion" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Timing"
                name="timings"
                required
                rules={[{ required: true }]}
              >
                <TimePicker.RangePicker format="HH:mm" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}></Col>
            <Col xs={24} md={24} lg={8}>
              <div className="d-flex justify-content-end">
                <button className="btn btn-primary form-btn" type="submit">
                  Update
                </button>
              </div>
            </Col>
          </Row>
        </Form>
      )}
    </Layout>
  );
};

export default Profile;
