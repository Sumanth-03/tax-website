import React from 'react';
import { useNavigate } from 'react-router-dom';
import Image2 from '../Assets/Newsletter.svg'
import Header from './Header'
const Home = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/file-your-income');
  };

  return (
    <div>
      <Header></Header>

      <main className="container mt-4 text-center">
        <div className='m-2 mt-4 text-center '>
            <div className='image-container'>
                <img src={Image2} alt='Thank you' className="img-fluid rounded  mb-4" style={{width:'25em', height:'auto'}}></img>
                <div className='text-center card rounded-4 card-1' style={{width:'15em', height:'auto'}}>
                    
                    <p>Asistent tax filing at aferdabale cost</p>
                    <h1>
                        <span>
                        <strong><del>₹ 999</del><span style={{fontSize:'30px', color:'#ffc32b'}}> @ ₹ 699</span></strong>
                        </span>
                    </h1>
                    
                </div>
            </div>
        </div>
        <div>
          <button className="btn m-2 rounded-pill button-1" onClick={handleContinue}>
            Continue
          </button>
        </div>
      </main>

    </div>
    
  );
};

export default Home;
