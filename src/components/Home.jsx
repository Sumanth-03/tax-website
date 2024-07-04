import React from 'react';
import { useNavigate } from 'react-router-dom';
import Image2 from '../Assets/banner.png'
import Header from './Header'
const Home = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/file-your-income');
  };

  return (
    <div>
      <Header></Header>

      <div className="container mt-4 text-center">
        <img src={Image2} alt="Spaced" className="img-fluid rounded  mb-4" />
        <div>
          <button className="btn  rounded-pill button-1" onClick={handleContinue}>
            Continue
          </button>
        </div>
      </div>

    </div>
    
  );
};

export default Home;