
// IMPORTS
// we need React since we are using JSX
import React from 'react';
// -- Mark 3 --
import ExpenseList from './ExpenseList';

// -- Mark 4 --
import ExpenseListFilters from './ExpenseListFilters';

// insert the ExpenseListFilters component <ExpenseListFilters /> down
// below and make sure it is working

import ExpenseSummary from './ExpenseSummary';


// ==============================
// GO TO EXPENSELISTFILTERS -- Mark 1 --
// ==============================

//-----------------------------------------------


// -- MARK 1 --
// example component
// this is stateless functional component
// way #1 - shorthand version
// took out {}; and the return statement so now implicitly returning jsx

// -- Mark 3 --
// render the ExpenseList component below
const ExpenseDashboardPage = () => (
    <div>
        <ExpenseSummary />
        <ExpenseListFilters />
        <ExpenseList />
    </div>
);


// way #2 - longhand version
/*
const ExpenseDashBoardPage = () => {
    return (
        <div>
            some text
        </div>
    );
};
*/

export default ExpenseDashboardPage;