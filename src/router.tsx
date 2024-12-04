import React, { lazy, Suspense } from 'react';
import { RouteObject } from 'react-router-dom';
import { Link, Outlet } from 'react-router-dom';

// 动态引入组件
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));

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
        element: (
          <Suspense fallback={<div>加载中...</div>}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: 'about',
        element: (
          <Suspense fallback={<div>加载中...</div>}>
            <About />
          </Suspense>
        ),
      },
      {
        path: 'contact',
        element: (
          <Suspense fallback={<div>加载中...</div>}>
            <Contact />
          </Suspense>
        ),
      },
    ],
  },
];

export default routes; 