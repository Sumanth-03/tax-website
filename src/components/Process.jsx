import React from 'react';
import { useNavigate } from 'react-router-dom';
import icon from '../Assets/1.png'
import Header from './Header';
import { useState } from 'react';

const Process = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({ phoneNumber: '', email: '' });

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
    navigate('/thank-you');
  };

  return (
    <>
    <Header></Header>
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-6">
            <div>
                <section className="m-4">
                    <h1>Process</h1>
                    <p className="mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique aliquid laborum earum?</p>
                </section>
                <div>
                    <img src={icon} alt="Icon" className="img-fluid me-3" style={{ maxWidth: '50px' }} />
                    <span>One form 16</span>
                </div>
                <div>
                    <img src={icon} alt="Icon" className="img-fluid me-3" style={{ maxWidth: '50px' }} />
                    <span>Capital gain</span>
                </div>
                <div>
                    <img src={icon} alt="Icon" className="img-fluid me-3" style={{ maxWidth: '50px' }} />
                    <span>More than one form 16</span>
                </div>
                <div>
                    <img src={icon} alt="Icon" className="img-fluid me-3" style={{ maxWidth: '50px' }} />
                    <span>Business income</span>
                </div>
                <section className='m-1 p-4 border'>
                    <span><strong>Amount</strong></span>
                    <span className='float-end'>
                    <strong><del>₹ 999</del><span style={{fontSize:'20px'}}>  ₹ 699</span></strong>
                    </span>
                </section>
            </div>
            <footer>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                    <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                    <input
                        type="text"
                        id="phoneNumber"
                        placeholder='+91**********'
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
                        placeholder='Consult@mail.com'
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
