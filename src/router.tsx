import React, { lazy, Suspense, ComponentType } from 'react';
import { RouteObject } from 'react-router-dom';
import Sidebar from './components/Sidebar';

// 动态引入组件
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact/Contact'));
const ContactChild = lazy(() => import('./pages/Contact/Child'));

// 创建包裹组件的工具函数
const wrapSuspense = (Component: ComponentType) => {
    return (
        <Suspense fallback={<div>加载中...</div>}>
            <Component />
        </Suspense>
    );
};

// 定义路由菜单配置
export interface RouteItem {
    path: string;
    label: string;
    element?: React.ReactNode;
    children?: RouteItem[];
}

export const menuRoutes: RouteItem[] = [
    {
        path: '',
        label: '首页',
        element: wrapSuspense(Home),
    },
    {
        path: 'about',
        label: '关于',
        element: wrapSuspense(About),
    },
    {
        path: 'contact',
        label: '联系我们',
        element: wrapSuspense(Contact),
        children: [
            {
                path: 'child1',
                label: '子页面1',
                element: wrapSuspense(ContactChild),
            },
        ],
    },
];

// 将菜单路由转换为 react-router 路由配置
const convertMenuToRoutes = (menuItems: RouteItem[]): RouteObject[] => {
    return menuItems.map(item => ({
        path: item.path,
        element: item.element,
        children: item.children ? convertMenuToRoutes(item.children) : undefined,
    }));
};

// 定义路由配置
const routes: RouteObject[] = [
    {
        path: '/',
        element: <Sidebar />,
        children: convertMenuToRoutes(menuRoutes),
    },
];

export default routes; 