import React, { useCallback, useEffect, useMemo, useState } from 'react';
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

  const [count, setCount] = useState(0);
  const arr=[1,2,3,4,5,6,7,8,9,10]
  const memoArr=useMemo(()=>{
    return arr
  },[])
  const fn=()=>{
    console.log('fn')
  }
  const memoFn=useCallback(fn,[])
  return (
    <div>
      <h1>Contact Page</h1>
      {/* <h1>{count}</h1>
      <button onClick={() => setCount(count + 1)}>增加</button>
      <h1>儿子</h1> */}
      {/* <ErrorBoundary fallback={<div>子组件出错了！</div>}>
        <ContactSon arr={memoArr} fn={memoFn}/>
      </ErrorBoundary> */}
    </div>
  );
};

export default Contact;
    