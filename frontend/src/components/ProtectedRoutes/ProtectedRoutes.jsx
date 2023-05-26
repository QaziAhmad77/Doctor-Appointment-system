import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { hideLoading, showLoading } from '../../redux/features/alertSlice';
import axios from 'axios';
import { setUser } from '../../redux/features/userSlice';

export default function ProtectedRoutes({ children }) {
  const dispatch = useDispatch();
  const navitate = useNavigate();
  const host = 'http://localhost:4000';
  const { user } = useSelector((state) => state.user);
  const getUser = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        `${host}/api/user/getUserData`,
        { token: localStorage.getItem('token') },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        dispatch(setUser(res.data.data));
      } else {
        <Navigate to="/login" />;
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };
  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, []);
  if (localStorage.getItem('token')) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}
