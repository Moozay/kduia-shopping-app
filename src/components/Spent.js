import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const Spent = () => {
    const { expenses, Currency } = useContext(AppContext);
    const totalExpenses = expenses.reduce((total, item) => {
        return (total += ( item.allocatedbudget));
    }, 0);

    return (
        <div className='alert alert-primary'>
            <span>Cart Value: {Currency}{totalExpenses}</span>
        </div>
    );
};

export default Spent;