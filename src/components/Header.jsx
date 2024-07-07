import React from "react";

import back from '../Assets/Backwhite.svg'
import Image1 from '../Assets/headImage.svg'
import { useNavigate } from "react-router-dom";

function Header (params){
    console.log('par',params)
    const navigate =useNavigate();
    return(
        <>
            <header className="d-flex align-items-center p-3 bg-dark text-white">
                <img src={back} alt="Logo" className="logo me-3" onClick={()=>{navigate(params.action)}}/>
                <span>TAXFILE</span>
            </header>
            <section className="text-center">
                <img src={Image1} alt="header-image" className="img-fluid w-100" 
                  style={{ maxHeight: '60vh', maxWidth: '1000px' }}
                />
            </section>
            
        </>
    )
}

export default Header;