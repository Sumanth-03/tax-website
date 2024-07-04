import React from "react";

import logo from '../Assets/Logo.png'
import Image1 from '../Assets/Mask group.png'

function Header (){
    return(
        <>
        <header className="d-flex align-items-center p-3 bg-dark text-white">
            <img src={logo} alt="Logo" className="logo me-3" />
        </header>
        <img src={Image1} alt="image" className="img-fluid w-100" 
          style={{ maxHeight: '60vh', width: 'auto' }}
      />
        </>
    )
}

export default Header;