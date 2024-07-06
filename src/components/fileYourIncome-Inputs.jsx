import React from "react";
import { useState } from "react";
import ToggleIconSelected from '../Assets/IconSelected.svg';
import ToggleIcon from '../Assets/IconUnSelected.svg';
import icon from '../Assets/Icon.svg';

function Inputs ({inputName, setValue}){
    const [isSelected, setisSelected] = useState(false);

    const handleClick = () =>{
        setValue(inputName)
        setisSelected((pre)=>{
            return !pre;
        });
    }
    return(
      <section className="p-2 rounded-3 mt-4 bg-color-white">
        <button className="btn  w-100" type="button" onClick={handleClick} >
          <img src={icon} alt="Icon" className="me-2 float-start" />
          {inputName}
          {isSelected ? 
              <span className='float-end'><span className='green-text'>Select</span><img src={ToggleIconSelected} alt="Toggle Icon Open" className="ms-2" /></span> :
              <span className='float-end'><span className='gray-text'>Select</span><img src={ToggleIcon} alt="Toggle Icon Closed" className="ms-2" /></span>
          }    
        </button>
      </section>
    )
}
export default Inputs