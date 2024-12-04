import React, { lazy, Suspense, ComponentType } from 'react';
import { RouteObject } from 'react-router-dom';
import { Link, Outlet } from 'react-router-dom';

// 动态引入组件
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));

// 创建包裹组件的工具函数
const wrapSuspense = (Component: ComponentType) => {
  return (
    <Suspense fallback={<div>加载中...</div>}>
      <Component />
    </Suspense>
  );
};

// 创建根布局组件
const RootLayout = () => {
  return (
    <div>
      <nav>
        <ul>
          <li><Link to="/">首页</Link></li>
          <li><Link to="/about">关于</Link></li>
          <li><Link to="/contact">联系我们</Link></li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
};

// 定义路由配置
const routes: RouteObject[] = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '',
        element: wrapSuspense(Home),
      },
      {
        path: 'about',
        element: wrapSuspense(About),
      },
      {
        path: 'contact',
        element: wrapSuspense(Contact),
      },
    ],
  },
];

export default routes; 