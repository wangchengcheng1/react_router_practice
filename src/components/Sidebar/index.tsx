import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import ErrorBoundary from '../ErrorBoundary';
import './index.css';

const Sidebar = () => {
  return (
    <ErrorBoundary>
      <div className="layout">
        <div className="sidebar">
          <nav>
            <ul>
              <li><Link to="/">首页</Link></li>
              <li><Link to="/about">关于</Link></li>
              <li><Link to="/contact">联系我们</Link></li>
            </ul>
          </nav>
        </div>
        <div className="content">
          <Outlet />
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default Sidebar; 