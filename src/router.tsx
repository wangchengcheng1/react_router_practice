import React, { lazy, Suspense, ComponentType } from 'react';
import { RouteObject } from 'react-router-dom';
import Sidebar from './components/Sidebar';

// 动态引入组件
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact/Contact'));

// 创建包裹组件的工具函数
const wrapSuspense = (Component: ComponentType) => {
    return (
        <Suspense fallback={<div>加载中...</div>}>
            <Component />
        </Suspense>
    );
};

// 定义路由配置
const routes: RouteObject[] = [
    {
        path: '/',
        element: <Sidebar />,
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