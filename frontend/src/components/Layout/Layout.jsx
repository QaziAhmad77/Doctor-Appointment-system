import React from 'react';
import './Layout.scss';
import { SidebarMenu } from '../../Data/data';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Layout({ children }) {
  const location = useLocation();
  const {user}=useSelector((state)=>{
    state.user
  })
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
              {SidebarMenu.map((menu) => {
                const isActive = location.pathname === menu.path;
                return (
                  <>
                    <div className={`menu-item ${isActive && 'active'}`}>
                      <i className={menu.icon}></i>
                      <Link to={menu.path}>{menu.name}</Link>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
          <div className="content">
            <div className="header">
              .fa-solid.fa-bell
            </div>
            <div className="body">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}
