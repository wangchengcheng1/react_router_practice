import React, { useEffect, useMemo, useState } from 'react';
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
  const arr=[1,2,3,4,5,6,7,8,9,10]
  const memoArr=useMemo(()=>{
    return arr
  },[])
  return (
    <div>
      <h1>Contact Page</h1>
      <h1>{count}</h1>
      <button onClick={() => setCount(count + 1)}>增加</button>
      <h1>儿子</h1>
      {/* 每次传递过去都是新地址值，所以会重新渲染 */}
      <ContactSon arr={memoArr}/>
    </div>
  );
};

export default Contact;
    