import React, { memo, useEffect } from 'react';

const ContactSon = memo(() => {
    console.log('ContactSon 组件渲染');  // 添加渲染日志
  
    useEffect(() => {
      console.log('ContactSon 组件挂载');  // 添加挂载日志
      return () => {
        console.log('ContactSon 组件卸载');  // 添加卸载日志
      };
    }, []);
  
    return (
      <div>
        <h2>Contact Son Component</h2>
      </div>
    );
  })

export default ContactSon;
    