import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import icon from '../Assets/Icon.svg';
import ToggleIconSelected from '../Assets/IconSelected.svg';
import ToggleIcon from '../Assets/IconUnSelected.svg';
import Inputs from './fileYourIncome-Inputs';

const FileYourIncome = () => {
  const navigate = useNavigate();
  const [selectedState, setSelectedState] = useState({
    salaried_income : {
        'One form 16': false,
        'More than one form 16':false
    },
    'Capital gains' : false,
    'House rental income' : false,
    'Business income' : false
  })
  console.log(selectedState)
  const [clickedAny, setClickedAny] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  useEffect(() => {
    if (
      selectedState.salaried_income['One form 16'] || 
      selectedState.salaried_income['More than one form 16'] || 
      selectedState['Capital gains'] ||
      selectedState['House rental income'] || 
      selectedState['Business income']
    ) {
      setClickedAny(true);
    } else {
      setClickedAny(false);
    }
  }, [selectedState]);
  
  const setValue = (name) => {
    setSelectedState((pre) => {
        const previousValue = pre[name]; 
        return { ...pre, [name]: !previousValue };
    });

  }
  const handleRadioClick = (name)=>{
    setSelectedState((pre)=>{
        const modified ={'One form 16': false,'More than one form 16':false}
        return { ...pre,
              salaried_income: {
              ...modified,  
              [name]: !pre.salaried_income[name]
            }}
    })
  }
  const handleContinue = () => {
    navigate('/process');
  };

  return (
    <>
    <Header />
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-6 bg-color-gray" >
            <section className="m-4">
                <h1>File Your Income</h1>
                <p className="mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique aliquid laborum earum?</p>
            </section>
            <div  className ={`custom-container overflow-auto ${ clickedAny ? 'extra-height':''}` }>
                <section className="dropdown mt-4 rounded-3 p-2 bg-color-white">
                    <button className="btn  w-100" type="button" onClick={toggleDropdown}>
                    <img src={icon} alt="Icon" className="me-2 float-start" />
                    <span>Salaried income</span>
                    {dropdownOpen ? 
                        <span className='float-end'><span className='green-text'>Select</span><img src={ToggleIconSelected} alt="Toggle Icon Open" className="ms-2" /></span> :
                        <span className='float-end'><span className='gray-text'>Select</span><img src={ToggleIcon} alt="Toggle Icon Closed" className="ms-2" /></span>
                    }    
                    </button>
                    {dropdownOpen && (
                    <div className="dropdown-menu show position-static w-100">
                        <div className="dropdown-item border-bottom p-2 ">
                        <label className="form-check radio">
                            <input type="radio" name="options" value="option1" className="form-check-input float-end radio-input"  
                            onClick={()=>handleRadioClick('One form 16')}
                            />
                            One form 16
                        </label>
                        </div>
                        <div className="dropdown-item p-2 rm-blue-blink">
                        <label className="form-check radio">
                            <input type="radio" name="options" value="option2" className="form-check-input float-end radio-input"  
                            onClick={()=>handleRadioClick('More than one form 16')}
                            />
                            More than one form 16
                        </label>
                        </div>
                    </div>
                    )}
                </section>
                <Inputs inputName={'Capital gains'} setValue={setValue}></Inputs>
                <Inputs inputName={'House rental income'} setValue={setValue}></Inputs>
                <Inputs inputName={'Business income'} setValue={setValue}></Inputs>
            </div>

            <footer className={`text-center rounded-top ${clickedAny ? 'fixed-footer':''}`}>
                <p className="m-4">
                    <span style={{ color: 'lightgray' }}>*By clicking the Continue button you are agreeing to </span>
                    <strong>Terms and Conditions</strong>
                </p>
                
                <button className="btn button-1 rounded-pill m-2" onClick={handleContinue}>
                    Continue
                </button>
            </footer>
        </div>
      </div>
    </div>
    </>
  );
};

export default FileYourIncome;
