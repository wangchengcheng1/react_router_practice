import React, { useEffect } from 'react';

const Home: React.FC = () => {
  useEffect(() => {
    console.log('Home Page');
  }, []);
  return (
    <div>
      <h1>Home Page</h1>
    </div>
  );
};

export default Home;
