import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const Currency = () => {
  const {dispatch } = useContext(AppContext);

    const changeCurrency = (val)=>{
            dispatch({
                type: 'CHG_CURRENCY',
                payload: val,
            })
    }
    

  return (
        <div className='alert alert-secondary'> {
      <select name="Currency" id="Currency" onChange={event=>changeCurrency(event.target.value)}>
        <option value="£">Curerncy($ Dollar)</option>
        <option value="£">Curerncy(£ Pounds)</option>
        <option value="₹">Curerncy(₹ India rubees)</option>
        <option value="€">Curerncy(€ Euros)</option>
        <option value="CAD">Curerncy( CAD)</option>
      </select>	
      }	
    </div>
    );
};

export default Currency;