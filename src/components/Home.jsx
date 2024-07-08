import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Image2 from '../Assets/Newsletter.svg'
import Header from './Header'
import { makeApiCall } from '../Services/Api';
const Home = () => {

  const [modal, setModal] = useState('')

  const queryParams = new URLSearchParams(window.location.search);
  const token = queryParams.get('token');
  const sessionId = queryParams.get('sessionid');
  const virtualId = queryParams.get('virtualid');
  const bankName = queryParams.get('bankName');

  if (token) {
    sessionStorage.setItem('token', token)
  }

  useEffect(() => {
    if (token || sessionId) {
      const data = {
        applicationId: "pwa1",
        token: token ? token : '',
        virtualId: virtualId ? virtualId : '',
        SessionId: sessionId ? sessionId : '',
        bName: bankName ? bankName : '',
        deviceType: "WEB",
        GenerateSessionInfo: sessionId ? true : false,
      }
      makeApiCall('validateToken', data)
      .then((response) => {
        console.log("resp",response.data)
        if(sessionId){
        if(response.data?.data[0]?.token){
          sessionStorage.setItem('token', response.data.data[0].token)
          window.location.reload();
          
        }
        else if(!sessionStorage.getItem('token')){
          if(!modal){
            setModal('failed')
          }
        }
        }
        if(token){
          if(!response.data?.data[0]?.token){
            sessionStorage.setItem('token','')
            if(!modal){
              setModal('failed')
            }
            
          }
        }
      })
      .catch((e) => console.log("err", e))

    }
    else{
      if(!sessionStorage.getItem('token')){
        if(!modal){
          setModal('failed')
        }
      }
    }

  },[]);


  const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/file-your-income');
  };

  return (
    <div>
      <Header action='/exitpwa' imag='1'></Header>

      <main className="container mt-4 text-center">
        <div className='m-2 mt-4 text-center '>
            <div className='image-container'>
                <img src={Image2} alt='Thank you' className="img-fluid rounded  mb-4" style={{width:'25em', height:'auto'}}></img>
                <div className='text-center card rounded-4 card-1' style={{width:'15em', height:'auto'}}>
                    
                    <p>Assisted tax filing at affordabale cost</p>
                    <h1>
                        <span>
                        <span style={{fontSize:'14px', color:'#ffffff'}}>Starting </span> <strong><del> ₹ 999</del><span style={{fontSize:'30px', color:'#ffc32b'}}> @ ₹ 399</span></strong>
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
