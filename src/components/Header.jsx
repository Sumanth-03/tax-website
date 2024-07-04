import React from "react";

import logo from '../Assets/Logo.svg'
import Image1 from '../Assets/headImage.svg'

function Header (){
    return(
        <>
            <header className="d-flex align-items-center p-3 bg-dark text-white">
                <img src={logo} alt="Logo" className="logo me-3" />
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