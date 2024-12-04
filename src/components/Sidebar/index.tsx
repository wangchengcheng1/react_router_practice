import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import ErrorBoundary from '../ErrorBoundary';
import { menuRoutes, RouteItem } from '../../router';
import './index.css';

// 递归渲染菜单项
const MenuItem = ({ route, parentPath = '' }: { route: RouteItem; parentPath?: string }) => {
  const fullPath = parentPath ? `${parentPath}/${route.path}` : `/${route.path}`;
  
  return (
    <>
      <Link to={fullPath}>{route.label}</Link>
      {route.children && (
        <ul className="submenu">
          {route.children.map(child => (
            <li key={`${fullPath}/${child.path}`}>
              <MenuItem 
                route={child} 
                parentPath={fullPath}
              />
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

const Sidebar = () => {
  return (
    <ErrorBoundary>
      <div className="layout">
        <div className="sidebar">
          <nav>
            <ul>
              {menuRoutes.map(route => (
                <li key={route.path}>
                  <MenuItem route={route} />
                </li>
              ))}
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