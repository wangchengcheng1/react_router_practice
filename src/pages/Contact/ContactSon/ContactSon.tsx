import React, { memo, useEffect, useState } from 'react';

interface ContactSonProps {
  arr: number[];
  fn: () => void;
}

const ContactSon = memo(({ arr, fn }: ContactSonProps) => {
  console.log('ContactSon 组件渲染');
  useEffect(()=>{
    console.log('contactSon组件挂载');
    
  },[])
  // 添加一个状态来控制是否抛出错误
  const [shouldError, setShouldError] = useState(false);

  if (shouldError) {
    throw new Error('组件渲染时抛出的错误！');
  }

  return (
    <div>
      <h2>Contact Son Component</h2>
      <div>
        {arr.map((item) => (
          <span key={item}>{item} </span>
        ))}
      </div>
      <button onClick={() => setShouldError(true)}>触发渲染错误</button>
    </div>
  );
});

export default ContactSon;
    