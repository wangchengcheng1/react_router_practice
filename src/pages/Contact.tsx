import React, { useEffect } from 'react';

const Contact: React.FC = () => {
  useEffect(() => {
    console.log('Contact Page');
  }, []);
  return (
    <div>
      <h1>Contact Page</h1>
    </div>
  );
};

export default Contact;
    