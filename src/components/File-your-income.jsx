import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import icon from '../Assets/Icon.svg';
import ToggleIconSelected from '../Assets/IconSelected.svg';
import ToggleIcon from '../Assets/IconUnSelected.svg';
import Inputs from './fileYourIncome-Inputs';
import { makeApiCallWithAuth } from '../Services/Api';
import "./style.css"

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
  const [dropdownOpen, setDropdownOpen] = useState([false, false, false]);
  const [incomes, setIncomes] = useState([0,0,0,0]);
  const [isloading, setIsloading] = useState(false);

  const toggleDropdown = (n) => {
    let newDrop = [...dropdownOpen];
    newDrop[n] = !dropdownOpen[n];
    setDropdownOpen(newDrop);
    if(newDrop[n] === false){
      let newInc = [...incomes];
      newInc[n] = 0;
      setIncomes(newInc);
    }
  }
  useEffect(() => {
    // if (
    //   selectedState.salaried_income['One form 16'] || 
    //   selectedState.salaried_income['More than one form 16'] || 
    //   selectedState['Capital gains'] ||
    //   selectedState['House rental income'] || 
    //   selectedState['Business income']
    // )
    if(incomes.filter(s => s > 0).length >= 1)
    {
      setClickedAny(true);
    } else {
      setClickedAny(false);
    }
  }, [selectedState]);
  
  const setValue = (name) => {
    // setSelectedState((pre) => {
    //     const previousValue = pre[name]; 
    //     return { ...pre, [name]: !previousValue };
    // });
    
      let newInc = [...incomes];
      if(newInc[3] === 0){
        newInc[3] = 41;
        newInc[0] = 0;
        newInc[1] = 0;
        newInc[2] = 0;
        
        let newDrop = [false, false, false];
        setDropdownOpen(newDrop);
      }
      else{
        newInc[3] = 0;
      }
      setIncomes(newInc);
    

  }
  const handleRadioClick = (pos, value)=>{
    // setSelectedState((pre)=>{
    //     const modified ={'One form 16': false,'More than one form 16':false}
    //     return { ...pre,
    //           salaried_income: {
    //           ...modified,  
    //           [name]: !pre.salaried_income[name]
    //         }}
    // })
    let newInc = [...incomes];
    newInc[pos] = value;
    setIncomes(newInc);

  }
  const handleContinue = () => {

    for (let i = incomes.length - 1; i >= 0; i--) {
      if (incomes[i] === 0) {
        incomes.splice(i, 1);
      }
    }
    
    if(incomes[0]){
      sessionStorage.setItem('inco',JSON.stringify(incomes))
      setIsloading(true)
    makeApiCallWithAuth('getPricing',{income: incomes})
    .then((response) => {
      setIsloading(false)
      console.log(response?.data)
      if(response?.data?.data){
        sessionStorage.setItem('pricing',JSON.stringify(response.data.data))
        navigate('/process');
      }
      
      // if(response?.data?.data?.url){
      //   let paymenturl = response.data.data.url;
      //   setIsloading(false);
      //   window.location.href = paymenturl;
      //   }
      // else if(response?.data?.status === 200){
      //   sessionStorage.setItem('coupon',JSON.stringify(response.data.data))
      //   setIsloading(false);
      //   navigate('/redeem')
      // }
      // else{
      //   setIsloading(false);
      //   if(!modal){
      //     setModal('failed')
      //     setErrmessage(response.data?.message)
      //     //setIsloading(false);
      //     }
      // }
       
    })
    .catch((e) => {console.log("err", e); setIsloading(false)})

  }
  else{
    let newInc = [0,0,0,0];
    setIncomes(newInc);
  }
   
    
  };

  return (
    <div className="">
    <Header action='/'/>
    <div className="">
    {isloading && <div className="spinner-overlay z-30">
          <div className="spinner-container">
            <div class="spinner-border" role="status">
            
          </div>
          </div>
      </div>}
      <div className="row justify-content-center bg-color-gray">
        <div className="col-12 col-lg-6 bg-color-gray" >
            <section className="m-4">
                <h1>File Your Income</h1>
                <p className="mb-4">Choose all the income types of you from below and we will deliver the best pricing.</p>
            </section>
            <div  className ={`custom-container overflow-auto mb-13 ${ clickedAny ? '':''}` }>
                <section className="dropdown mt-4 rounded-3 p-2 bg-color-white">
                    <button className="btn  w-100" type="button" onClick={()=>{toggleDropdown(0)}}>
                    <img src={icon} alt="Icon" className="me-2 float-start" />
                    <span>Salaried Income</span>
                    {dropdownOpen[0] ? 
                        <span className='float-end'><span className='green-text'>Select</span><img src={ToggleIconSelected} alt="Toggle Icon Open" className="ms-2" /></span> :
                        <span className='float-end'><span className='gray-text'>Select</span><img src={ToggleIcon} alt="Toggle Icon Closed" className="ms-2" /></span>
                    }    
                    </button>
                    {dropdownOpen[0] && (
                    <div className="dropdown-menu show position-static w-100">
                        <div className="dropdown-item border-bottom p-2 ">
                        <label className="form-check radio">
                            <input type="radio" name="options1" value="11" className="form-check-input float-end radio-input"  
                            onClick={()=>handleRadioClick(0, 11)}
                            />
                            Single Form 16
                        </label>
                        </div>
                        <div className="dropdown-item p-2 rm-blue-blink">
                        <label className="form-check radio">
                            <input type="radio" name="options1" value="12" className="form-check-input float-end radio-input"  
                            onClick={()=>handleRadioClick(0, 12)}
                            />
                            Multiple Form 16
                        </label>
                        </div>
                    </div>
                    )}
                </section>
                

                <section className="dropdown mt-4 rounded-3 p-2 bg-color-white">
                    <button className="btn  w-100" type="button" onClick={()=>{toggleDropdown(1)}}>
                    <img src={icon} alt="Icon" className="me-2 float-start" />
                    <span>Property Rental Income</span>
                    {dropdownOpen[1] ? 
                        <span className='float-end'><span className='green-text'>Select</span><img src={ToggleIconSelected} alt="Toggle Icon Open" className="ms-2" /></span> :
                        <span className='float-end'><span className='gray-text'>Select</span><img src={ToggleIcon} alt="Toggle Icon Closed" className="ms-2" /></span>
                    }    
                    </button>
                    {dropdownOpen[1] && (
                    <div className="dropdown-menu show position-static w-100">
                        <div className="dropdown-item border-bottom p-2 ">
                        <label className="form-check radio">
                            <input type="radio" name="options2" value="21" className="form-check-input float-end radio-input"  
                            onClick={()=>handleRadioClick(1, 21)}
                            />
                            One House / Property
                        </label>
                        </div>
                        <div className="dropdown-item p-2 rm-blue-blink">
                        <label className="form-check radio">
                            <input type="radio" name="options2" value="22" className="form-check-input float-end radio-input"  
                            onClick={()=>handleRadioClick(1, 22)}
                            />
                            Multiple Houses / Properties
                        </label>
                        </div>
                    </div>
                    )}
                </section>


                <section className="dropdown mt-4 rounded-3 p-2 bg-color-white">
                    <button className="btn  w-100" type="button" onClick={()=>{toggleDropdown(2)}}>
                    <img src={icon} alt="Icon" className="me-2 float-start" />
                    <span className=''>Capital Gain on Sale of Shares</span>
                    {dropdownOpen[2] ? 
                        <span className='float-end'><span className='green-text'>Select</span><img src={ToggleIconSelected} alt="Toggle Icon Open" className="ms-2" /></span> :
                        <span className='float-end'><span className='gray-text'>Select</span><img src={ToggleIcon} alt="Toggle Icon Closed" className="ms-2" /></span>
                    }    
                    </button>
                    {dropdownOpen[2] && (
                    <div className="dropdown-menu show position-static w-100">
                        <div className="dropdown-item border-bottom p-2 ">
                        <label className="form-check radio">
                            <input type="radio" name="options3" value="31" className="form-check-input float-end radio-input"  
                            onClick={()=>handleRadioClick(2, 31)}
                            />
                            Upto 100 Transactions
                        </label>
                        </div>
                        <div className="dropdown-item p-2 rm-blue-blink">
                        <label className="form-check radio">
                            <input type="radio" name="options3" value="32" className="form-check-input float-end radio-input"  
                            onClick={()=>handleRadioClick(2, 32)}
                            />
                            More than 100 Transactions
                        </label>
                        </div>
                    </div>
                    )}
                </section>


                 <Inputs inputName={'Other Business Income / Talk to Our expert'} setValue={setValue}></Inputs>
                {/*<Inputs inputName={'House rental income'} setValue={setValue}></Inputs>
                <Inputs inputName={'Business income'} setValue={setValue}></Inputs> */}
            </div>
            <div>
            <footer className={`text-center rounded-top fixed-footer ${clickedAny ? 'fixed-footer':''}`}>
                <p className="m-4">
                    <span style={{ color: 'lightgray' }}>*By clicking the Continue button you are agreeing to </span>
                    <strong>Terms and Conditions</strong>
                </p>
                
                <button className="btn button-1 rounded-pill m-2" onClick={handleContinue} >
                    Continue
                </button>
            </footer>
            </div>
            
        </div>
      </div>
    </div>
    </div>
  );
};

export default FileYourIncome;
