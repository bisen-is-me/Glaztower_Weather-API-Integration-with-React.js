import React, { useState } from 'react';
import { UilSearch,UilLocationPoint } from '@iconscout/react-unicons';
import { toast } from 'react-toastify';

function Inputting({setQuery,units,setUnits}) {
    const [city,setCity]= useState("");

    const handleUnitsChange=(e)=>{
        const selectedUnit=e.currentTarget.name;
        if(units !== selectedUnit) setUnits(selectedUnit);
    };

    const handleSearchClick=()=>{
        if(city !== '') setQuery({city:city});
    };

    const handleLocationClick=()=>{
        if(navigator.geolocation){
            toast.info('Fetching users Location');
            navigator.geolocation.getCurrentPosition((position)=>{
                toast.success("Location fetched!");
                let lat=position.coords.latitude;
                let lon=position.coords.longitude;
                
                setQuery({
                    lat,
                    lon
                });
            });
        }
    };


  return(

    <div className='flex flex-row justify-center my-6'>
    
    {/* div to contain input,btnSearch,btnLocation */}
    <div className='flex flex-row w-3/4 items-center justify-center space-x-4'>
        <input 
            value={city}
            onChange={(e)=>setCity(e.currentTarget.value)}
            type="text"
            placeholder='Search for City....' 
            className='text-xl font-light p-2 w-full shadow-xl focus:outline-none capitalize' 
            />
            <UilSearch 
                size={25} 
                className="text-white cursor-pointer transition ease-out hover:scale-125"
                onClick={handleSearchClick}
           />
            <UilLocationPoint 
                size={25} 
                className="text-white cursor-pointer transition ease-out hover:scale-125"
                onClick={handleLocationClick}
           />
    </div>

    {/* div for C,F */}

    <div className='flex flex-row w-1/4 items-center justify-center'>
        
        <button 
            name='imperial' 
            className='text-xl text-white font-light transition ease-out hover:scale-125'    
            onClick={handleUnitsChange}
        >℃</button>

        <p className='text-xl text-white mx-2'>|</p>
        
        <button 
            name='imperial' 
            className='text-xl text-white font-light transition ease-out hover:scale-125'
            onClick={handleUnitsChange}

        >℉</button>

    </div>

  </div>
  );
}

export default Inputting