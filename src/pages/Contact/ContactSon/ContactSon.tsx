import React, { memo, useEffect } from 'react';

interface ContactSonProps {
  arr: number[];
}

const ContactSon = memo(({ arr }: ContactSonProps) => {
  console.log('ContactSon 组件渲染');

  useEffect(() => {
    console.log('ContactSon 组件挂载');
    return () => {
      console.log('ContactSon 组件卸载');
    };
  }, []);

  return (
    <div>
      <h2>Contact Son Component</h2>
      <div>
        {arr.map((item) => (
          <span key={item}>{item} </span>
        ))}
      </div>
    </div>
  );
});

export default ContactSon;
    