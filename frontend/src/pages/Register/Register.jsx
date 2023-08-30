import { Form, Input, message } from 'antd';
import './Register.scss';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../redux/features/alertSlice';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // form handler
  const host = 'http://localhost:4000';
  const onfinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post(`${host}/api/user/register`, values);
      dispatch(hideLoading());
      if (res.data.success) {
        message.success('Registration Successfull');
        navigate('/login');
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error('Something went wrong');
    }
  };
  return (
    <>
      <div className="form-container">
        <Form
          layout="vertical"
          onFinish={onfinishHandler}
          className="register-form"
        >
          <h3 className="text-center">Register Form</h3>
          <Form.Item label="Name" name="name">
            <Input type="text" required />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input type="email" required />
          </Form.Item>
          <Form.Item label="password" name="password">
            <Input type="password" required />
          </Form.Item>
          <Link to="/login" className="m-1">
            Already user login here
          </Link>
          <button className="btn btn-primary" type="submit">
            Register
          </button>
        </Form>
      </div>
    </>
  );
};

export default Register;
