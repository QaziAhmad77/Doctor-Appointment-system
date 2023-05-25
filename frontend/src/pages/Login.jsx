import { Form, Input, message } from 'antd';
import '../styles/Login.scss';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  // form handler
  const host = 'http://localhost:4000';
  const onfinishHandler = async (values) => {
    try {
      const res = await axios.post(`${host}/api/user/login`, values);
      if (res.data.success) {
        message.success('Login Success');
        navigate('/');
      }
      else{
        message.error(res.data.message);
      }
    } catch (error) {
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
          <h3 className="text-center">Login Form</h3>
          <Form.Item label="Email" name="email">
            <Input type="email" required />
          </Form.Item>
          <Form.Item label="password" name="password">
            <Input type="password" required />
          </Form.Item>
          <Link to="/register" className="m-1">
            Not a user register here
          </Link>
          <button className="btn btn-primary" type="submit">
            Login
          </button>
        </Form>
      </div>
    </>
  );
};

export default Login;
