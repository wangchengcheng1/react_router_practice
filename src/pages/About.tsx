import React, { useEffect } from 'react';

const About: React.FC = () => {
  useEffect(() => {
    console.log('About Page');
  }, []);
  return (
    <div>
      <h1>About Page</h1>
    </div>
  );
};

export default About;
    