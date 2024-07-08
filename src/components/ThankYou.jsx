import React from 'react';
import img from '../Assets/background.svg'
import logo from '../Assets/Logo.svg'
import Image1 from '../Assets/thank you.svg'

import { useNavigate } from 'react-router-dom';
import Header from './Header';

const ThankYou = () => {
    const navigate = useNavigate();

    const handleContinue = () => {
      navigate('/');
  };
  return (
    <> 
     <Header action='/' imag='1'></Header>
       
        <div className='m-2 mt-4 text-center '>
            <div className='image-container'>
                <img src={img} alt='Thank you'></img>
                <div className='text-center card rounded-4'>
                    <h1>Thank You</h1>
                    <p className='gray-text'>Our team will contact you in 24 hours for other assistance</p>
                    <h3 className='gray-text'>Happy Filing</h3>
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
