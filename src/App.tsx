import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import routes from './router';

// 创建路由实例
const router = createBrowserRouter(routes);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
