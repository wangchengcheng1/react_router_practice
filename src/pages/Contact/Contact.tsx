import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Outlet } from 'react-router-dom';
import ContactSon from './ContactSon/ContactSon';
import ErrorBoundary from '../../components/ErrorBoundary';

const Contact: React.FC = () => {
  console.log('Contact 组件渲染');

  useEffect(() => {
    console.log('Contact 组件挂载');
    return () => {
      console.log('Contact 组件卸载');
    };
  }, []);

  return (
    <div>
      <h1>Contact Page</h1>
      <Outlet />
    </div>
  );
};

export default Contact;
    