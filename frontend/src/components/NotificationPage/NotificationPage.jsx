import React from 'react';
import Layout from '../Layout/Layout';
import { Tabs, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoading, showLoading } from '../../redux/features/alertSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const NotificationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const headers = { Authorization: localStorage.getItem('token') };
  const host = 'http://localhost:4000';
  const handleMarkAllRead = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        `${host}/api/user/get-all-notification`,
        {
          userId: user._id,
        },
        {
          headers,
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error('something went wrong');
    }
  };
  const handleDeleteAllRead = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        `${host}/api/user/delete-all-notification`,
        {
          userId: user._id,
        },
        {
          headers,
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error('something went wrong');
    }
  };
  return (
    <Layout>
      <h1 className="p-3 text-center">Notification Page</h1>
      <Tabs>
        <Tabs.TabPane tab="unRead" key={0}>
          <div className="d-flex justify-content-end">
            <h4 className="p-2" onClick={handleMarkAllRead}>
              Mark All Read
            </h4>
          </div>
          {user?.notification.map((notificationMgs) => {
            console.log(notificationMgs, 'this is my test');
            return (
              // eslint-disable-next-line
              <div className="card">
                <div
                  className="card-text"
                  onClick={() => {
                    navigate(notificationMgs.onClickPath);
                    console.log(
                      notificationMgs.onClick,
                      'helloooooooooooooooooooooooooo'
                    );
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  {notificationMgs.message}
                </div>
              </div>
            );
          })}
        </Tabs.TabPane>
        <Tabs.TabPane tab="Read" key={1}>
          <div className="d-flex justify-content-end">
            <h4
              className="p-2 text-primary"
              style={{ cursor: 'pointer' }}
              onClick={handleDeleteAllRead}
            >
              Delete All Read
            </h4>
          </div>
          {user?.seennotification.map((notificationMgs) => {
            return (
              // eslint-disable-next-line
              <div className="card">
                <div
                  className="card-text"
                  onClick={() => {
                    navigate(notificationMgs.onClickPath);
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  {notificationMgs.message}
                </div>
              </div>
            );
          })}
        </Tabs.TabPane>
      </Tabs>
    </Layout>
  );
};

export default NotificationPage;
