import React, { useEffect, useState } from 'react';
import ContactSon from './ContactSon/ContactSon';

const Contact: React.FC = () => {
  console.log('Contact 组件渲染');

  useEffect(() => {
    console.log('Contact 组件挂载');
    return () => {
      console.log('Contact 组件卸载');
    };
  }, []);

  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>Contact Page</h1>
      <h1>{count}</h1>
      <button onClick={() => setCount(count + 1)}>增加</button>
      <h1>儿子</h1>
      <ContactSon />
    </div>
  );
};

export default Contact;
    