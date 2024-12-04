import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import ErrorBoundary from '../ErrorBoundary';
import { menuRoutes, RouteItem } from '../../router';
import './index.css';

// 递归渲染菜单项
const MenuItem = ({ route, parentPath = '' }: { route: RouteItem; parentPath?: string }) => {
    console.log('route',route);
    
  const fullPath = parentPath ? `${parentPath}/${route.path}` : `/${route.path}`;
  
  return (
    <li>
      <Link to={fullPath}>{route.label}</Link>
      {route.children && (
        <ul className="submenu">
          {route.children.map(child => (
            <MenuItem 
              key={`${fullPath}/${child.path}`} 
              route={child} 
              parentPath={fullPath}
            />
          ))}
        </ul>
      )}
    </li>
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
                <div>
                    <MenuItem key={route.path} route={route} />
                    <h1>{route.path}</h1>
                </div>

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