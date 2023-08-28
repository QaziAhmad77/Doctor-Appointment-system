import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { hideLoading, showLoading } from '../../redux/features/alertSlice';
import axios from 'axios';
import { setUser } from '../../redux/features/userSlice';

export default function ProtectedRoutes({ children }) {
  const dispatch = useDispatch();
  const host = 'http://localhost:4000';
  const { user } = useSelector((state) => state.user);
  // eslint-disable-next-line
  const getUser = async () => {
    const headers = { Authorization: localStorage.getItem('token') };
    try {
      dispatch(showLoading());
      const res = await axios.post(
        `${host}/api/user/getUserData`,
        {},
        { headers }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        dispatch(setUser(res.data.data));
      } else {
        <Navigate to="/login" />;
        localStorage.clear();
      }
    } catch (error) {
      dispatch(hideLoading());
      localStorage.clear();
      console.log(error);
    }
  };
  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [user, getUser]);

  if (localStorage.getItem('token')) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}
