import React from 'react';
import img from '../Assets/background.png'
import logo from '../Assets/Logo.png'
import Image1 from '../Assets/Thank you.png'

import { useNavigate } from 'react-router-dom';

const ThankYou = () => {
    const navigate = useNavigate();

    const handleContinue = () => {
      navigate('/');
  };
  return (
    <>
        <header className="d-flex align-items-center p-3 bg-dark text-white">
            <img src={logo} alt="Logo" className="logo me-3" />
        </header>
        <section className="text-center">
            <img src={Image1} alt="header-image" className="img-fluid w-100" 
                style={{ maxHeight: '60vh', maxWidth: '1000px' }}
            />
        </section>
        <div className='m-2 mt-4 text-center '>
            <div className='image-container'>
                <img src={img} alt='Thank you' className=''></img>
                <div className='text-center'>
                    <button type="submit"  onClick={handleContinue}className="align-content-center btn button-1 rounded-pill m-2">
                        <strong>Back to home</strong>
                    </button>
                </div>
            </div>
        </div>
    </>
    
  );
};

export default ThankYou;
