import React, { useState, useEffect } from 'react';

const Form = () => {
  const [address, setAddress] = useState('');
  
  //const geocoder = 
  const geocode = (ev) => {
    ev.preventDefault();
    const apiKey = process.env.REACT_APP_OPENCAGE_API_KEY;
    // try{
      
    // }
    // catch{
    //   console.log(ex);
    // }
  };
  
  return(
    <form onSubmit={ geocode } >
      <input value={ address } onChange={ ev => setAddress(ev.target.value) } placeholder='address' />
      <button>Search</button>
    </form>
    );
};

export default Form;