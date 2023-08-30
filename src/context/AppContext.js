import React, { createContext, useReducer } from 'react';

// 5. The reducer - this is used to update the state, based on the action
export const AppReducer = (state, action) => {
    let new_expenses = [];
    switch (action.type) {
        case 'ADD_ALLOCATION':
            let updatedqty = false;
            state.expenses.map((expense)=>{
                if(expense.name === action.payload.name) {
                    expense.quantity = expense.allocatedbudget + action.payload.allocatedbudget;
                    updatedqty = true;
                }
                new_expenses.push(expense);
                return true;
            })
            state.expenses = new_expenses;
            action.type = "DONE";
            return {
                ...state,
            };

            case 'RED_ALLOCATION':
                state.expenses.map((expense)=>{
                    if(expense.name === action.payload.name) {
                        expense.quantity = expense.allocatedbudget - action.payload.allocatedbudget;
                    }
                    expense.allocatedbudget = expense.allocatedbudget < 0 ? 0: expense.allocatedbudget;
                    new_expenses.push(expense);
                    return true;
                })
                state.expenses = new_expenses;
                action.type = "DONE";
                return {
                    ...state,
                };
        case 'DELETE_ITEM':
            state.expenses.map((expense)=>{
                if(expense.name === action.payload.name) {
                    expense.allocatedbudget = 0;
                }
                new_expenses.push(expense);
                return true;
            })
            state.expenses = new_expenses;
            action.type = "DONE";
            return {
                ...state,
            };
    case 'CHG_CUR':
            action.type = "DONE";
            state.Currency = action.payload;
            return {
                ...state
            }

        default:
            return state;
    }
};

// 1. Sets the initial state when the app loads
const initialState = {
    expenses: [
        { id: "Marketing", department: 'Marketing', allocatedbudget: 50},
        { id: "Finance", department: 'Finance', allocatedbudget: 300},
        { id: "Sales", department: 'Sales', allocatedbudget: 70},
        { id: "Human Resource", department: 'Human Resource', allocatedbudget: 40},
        { id: "IT", department: 'IT', allocatedbudget: 500},
    ],
    Currency: '£'
};

// 2. Creates the context this is the thing our components import and use to get the state
export const AppContext = createContext();

// 3. Provider component - wraps the components we want to give access to the state
// Accepts the children, which are the nested(wrapped) components
export const AppProvider = (props) => {
    // 4. Sets up the app state. takes a reducer, and an initial state
    const [state, dispatch] = useReducer(AppReducer, initialState);

    const totalExpenses = state.expenses.reduce((total, item) => {
        return (total = total + (item.allocatedbudget));
    }, 0);
state.CartValue = totalExpenses;

    return (
        <AppContext.Provider
            value={{
                expenses: state.expenses,
                CartValue: state.CartValue,
                dispatch,
                Currency: state.Currency
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
};