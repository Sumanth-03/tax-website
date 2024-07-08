import React from 'react';
import { useNavigate } from 'react-router-dom';
import icon from '../Assets/tickWithDot.svg'
import iconLast from '../Assets/tik.svg'
import Header from './Header';
import { useState } from 'react';
import { makeApiCallWithAuth } from '../Services/Api';

const Process = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({ phoneNumber: '', email: '' });
  const [isloading, setIsloading] = useState(false);
  const [modal, setModal] = useState('')
  const [errmessage, setErrmessage] = useState('')
  

  const queryParams = new URLSearchParams(window.location.search);
  const hdnRefNumber = queryParams.get('hdnRefNumber');
  const transactionId = queryParams.get('transactionId');
  const amount = queryParams.get('amount');


  const pricing = JSON.parse(sessionStorage.pricing);
  const inco = JSON.parse(sessionStorage.inco)
  const orderId = sessionStorage.getItem('id');

  if(hdnRefNumber && !modal && !isloading){
    setIsloading(true);
    let data ={
      order_id: hdnRefNumber,
      razorpay_payment_id: transactionId,
      razorpay_amount: amount,
      filing_id: orderId,
    }
    makeApiCallWithAuth('checkPaymentStatus', data)
    .then((response) => {
      console.log("getpayres",response.data)
      if(response?.data?.status === 200){
        setIsloading(false);
        navigate('/thank-you');
      }
      else{
        if(!modal){
        setModal('failed')
        setErrmessage(response.data?.message)
        setIsloading(false);
        }
      }

    })
    .catch((e) => {console.log("err", e); setIsloading(false);})

    
    }




  const validatePhoneNumber = (number) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(number);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handlePhoneNumberChange = (e) => {
    const { value } = e.target;
    setPhoneNumber(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      phoneNumber: validatePhoneNumber(value) ? '' : 'Invalid phone number',
    }));
  };

  const handleEmailChange = (e) => {
    const { value } = e.target;
    setEmail(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      email: validateEmail(value) ? '' : 'Invalid email address',
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!errors.phoneNumber && !errors.email && phoneNumber && email) {
      handleContinue()
      console.log('Form submitted successfully');
    } else {
      console.log('Please fix the errors before submitting');
    }
  };

  const handleContinue = () => {
    setIsloading(true);
    makeApiCallWithAuth('validationCheck',{income: inco, phone: phoneNumber, mail: email})
    .then((response) => {
      setIsloading(false);
      console.log(response?.data)
     
      if(response?.data?.data?.url){

        sessionStorage.setItem('id', response.data.data.orderId);
        let paymenturl = response.data.data.url;
       // setIsloading(false);
        window.location.href = paymenturl;
        }
      
      else{
        // setIsloading(false);
        // if(!modal){
        //   setModal('failed')
        //   setErrmessage(response.data?.message)
        //   //setIsloading(false);
        //   }
      }
       
    })
    .catch((e) => {console.log("err", e); setIsloading(false);})
    
  };

  return (
    <>
    <Header action='/file-your-income'></Header>
    <div className="container">
    {isloading && <div className="spinner-overlay z-30">
          <div className="spinner-container">
            <div class="spinner-border" role="status">
            
          </div>
          </div>
      </div>}
      <div className="row justify-content-center">
        <div className="col-12 col-lg-6 p-0">
            <div className='mb-2 p-3'>
                <section className="m-1">
                    <h1>Process</h1>
                    <p className="mb-4">Please review and proceed to pay. Our expert will get back to you soon. </p>
                </section>
                {inco.includes(11) && 
                <div>
                    <img src={icon} alt="Icon" className="img-fluid me-3" style={{ maxWidth: '50px' }} />
                    <span className="align-top">Single Form 16</span>
                </div>}
                {inco.includes(12) &&
                <div>
                    <img src={icon} alt="Icon" className="img-fluid me-3" style={{ maxWidth: '50px' }} />
                    <span className="align-top">Multiple Form 16</span>
                </div>}
                {inco.includes(21) &&
                <div>
                    <img src={icon} alt="Icon" className="img-fluid me-3" style={{ maxWidth: '50px' }} />
                    <span className="align-top">One House / Property</span>
                </div>}
                {inco.includes(22) &&
                <div>
                    <img src={icon} alt="Icon" className="img-fluid me-3" style={{ maxWidth: '50px' }} />
                    <span className="align-top">Multiple Houses / Properties</span>
                </div>}
                {inco.includes(31) &&
                <div>
                    <img src={icon} alt="Icon" className="img-fluid me-3" style={{ maxWidth: '50px' }} />
                    <span className="align-top">Upto 100 Transactions</span>
                </div>}
                {inco.includes(32) &&
                <div>
                    <img src={icon} alt="Icon" className="img-fluid me-3 " style={{ maxWidth: '50px' }} />
                    <span className="align-top">More than 100 Transactions</span>
                </div>}
                {inco.includes(41) &&
                <div>
                    <img src={iconLast} alt="Icon" className="img-fluid me-3" style={{ maxWidth: '50px' }} />
                    <span className="align-top">Other Business Income / Talk to Our expert</span>
                </div>}

                <section className='m-1 p-4 border'>
                    <span><strong>Amount</strong></span>
                    <span className='float-end'>
                    <strong><del>₹ {pricing?.originalprice}</del><span style={{fontSize:'20px'}}>  ₹ {pricing?.offerprice}</span></strong>
                    </span>
                </section>
            </div>
            <footer className='bg-color-gray m-0 p-4 fixed-footer'>
                <form onSubmit={handleSubmit} className='mt-2'>
                    <div className="mb-3">
                    <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                    <input
                        type="text"
                        id="phoneNumber"
                        placeholder='99********'
                        className={`form-control rounded-pill ${errors.phoneNumber ? 'is-invalid' : ''}`}
                        value={phoneNumber}
                        onChange={handlePhoneNumberChange}
                    />
                    {errors.phoneNumber && <div className="invalid-feedback">{errors.phoneNumber}</div>}
                    </div>
                    <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        id="email"
                        placeholder='******@mail.com'
                        className={`form-control rounded-pill ${errors.email ? 'is-invalid' : ''}`}
                        value={email}
                        onChange={handleEmailChange}
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>
                    <div className='text-center'><button type="submit"  className="align-content-center btn button-1 rounded-pill m-2">Continue Pay</button></div>
                </form>
            </footer>
        </div>
      </div> 
    </div>
    </>
  );
};

export default Process;
