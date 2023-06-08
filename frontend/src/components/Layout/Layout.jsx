import React from 'react';
import './Layout.scss';
import { adminMenu, userMenu } from '../../Data/data';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Avatar, Badge, message } from 'antd';
import { Cursor } from 'mongoose';

export default function Layout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  // ================= doctor menu ==================
  const doctorMenu = [
    {
      name: 'Home',
      path: '/',
      icon: 'fa-solid fa-house',
    },
    {
      name: 'Appointments',
      path: '/doctor-appointments',
      icon: 'fa-solid fa-list',
    },
    {
      name: 'Profile',
      path: `/doctor/profile/${user?._id}`,
      icon: 'fa-solid fa-user',
    },
  ];
  // ================= doctor menu ==================
  // rendering menu list
  const SidebarMenu = user?.isAdmin
    ? adminMenu
    : user?.isDoctor
    ? doctorMenu
    : userMenu;
  const handleLogout = () => {
    localStorage.clear();
    message.success('Logout Successfully');
    navigate('/login');
  };
  return (
    <>
      <div className="main">
        <div className="layout">
          <div className="sidebar">
            <div className="logo">
              <h6>DOC APP</h6>
              <hr style={{ backgroundColor: 'white' }} />
            </div>
            <div className="menu">
              {SidebarMenu.map((menu, index) => {
                const isActive = location.pathname === menu.path;
                return (
                  <div
                    className={`menu-item ${isActive && 'active'}`}
                    key={index}
                  >
                    <i className={menu.icon}></i>
                    <Link to={menu.path}>{menu.name}</Link>
                  </div>
                );
              })}
              <div className={`menu-item`} onClick={handleLogout}>
                <i className="fa-solid fa-right-from-bracket"></i>
                <Link to="/login">Logout</Link>
              </div>
            </div>
          </div>
          <div className="content">
            <div className="header">
              <div className="header-content" style={{ cursor: 'pointer' }}>
                <Badge
                  count={user && user.notification.length}
                  onClick={() => {
                    navigate('/notification');
                  }}
                >
                  <i className="fa-solid fa-bell"></i>
                </Badge>
                <Link to="/profile">{user?.name}</Link>
              </div>
            </div>
            <div className="body">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}
