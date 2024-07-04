import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import icon from '../Assets/Icon.png';
import ToggleIconSelected from '../Assets/Read more.png';
import ToggleIcon from '../Assets/Read more 1.png';
import Inputs from './fileYourIncome-Inputs';

const FileYourIncome = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleContinue = () => {
    navigate('/process');
  };

  return (
    <>
    <Header />
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-6">
            <div className="m-4">
                <h1>File Your Income</h1>
                <p className="mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique aliquid laborum earum?</p>
            </div>
            
            <div className="dropdown mt-4 ">
                <button className="btn  w-100" type="button" onClick={toggleDropdown}>
                <img src={icon} alt="Icon" className="me-2 float-start" />
                Salaried income
                {dropdownOpen ? 
                    <img src={ToggleIcon} alt="Toggle Icon Open" className="ms-2 float-end" /> :
                    <img src={ToggleIconSelected} alt="Toggle Icon Closed" className="ms-2 float-end" />
                }    
                </button>
                {dropdownOpen && (
                <div className="dropdown-menu show position-static w-100">
                    <div className="dropdown-item">
                    <label className="form-check">
                        <input type="radio" name="options" value="option1" className="form-check-input float-end" style={{ color: 'green' }} />
                        One form 16
                    </label>
                    </div>
                    <div className="dropdown-item">
                    <label className="form-check">
                        <input type="radio" name="options" value="option2" className="form-check-input float-end" style={{ color: 'green' }} />
                        More than one form 16
                    </label>
                    </div>
                </div>
                )}
            </div>
            <Inputs inputName={'Capital gains'}></Inputs>
            <Inputs inputName={'House rental income'}></Inputs>
            <Inputs inputName={'Business income'}></Inputs>
            <div className='text-center'>
            <p className="m-4">
                <span style={{ color: 'lightgray' }}>*By clicking the Continue button you are agreeing to </span>
                <strong>Terms and Conditions</strong>
            </p>
            
            <button className="btn button-1 rounded-pill m-2" onClick={handleContinue}>
                Continue
            </button>
            </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default FileYourIncome;
