import React from 'react';
import { useNavigate } from 'react-router-dom';

const Process = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/thank-you');
  };

  return (
    <div>
      <h1>Process</h1>
      <p>This is the process page.</p>
      <button onClick={handleContinue}>Continue</button>
    </div>
  );
};

export default Process;
