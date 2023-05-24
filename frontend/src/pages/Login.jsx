import { Form, Input } from 'antd';
import '../styles/Login.scss';
import { Link } from 'react-router-dom';

const Login = () => {
  // form handler
  const onfinishHandler = (values) => {
    console.log(values);
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
