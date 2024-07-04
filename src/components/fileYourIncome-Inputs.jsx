import React from "react";
import { useState } from "react";
import ToggleIconSelected from '../Assets/Read more.png';
import ToggleIcon from '../Assets/Read more 1.png';
import icon from '../Assets/Icon.png';

function Inputs ({inputName, setValue}){
    const [isSelected, setisSelected] = useState(false);
    const handleClick = () =>{
        setValue(inputName)
        setisSelected(!isSelected);
    }
    return(
      <section className="p-2 rounded-3 mt-4 bg-color-white">
        <button className="btn  w-100" type="button" onClick={handleClick} >
          <img src={icon} alt="Icon" className="me-2 float-start" />
          {inputName}
          {isSelected ? 
              <img src={ToggleIcon} alt="Toggle Icon Open" className="ms-2 float-end" /> :
              <img src={ToggleIconSelected} alt="Toggle Icon Closed" className="ms-2 float-end" />
          }    
        </button>
      </section>
    )
}
export default Inputs