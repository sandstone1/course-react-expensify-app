
// we need React since we are using JSX
import React               from 'react';
import { connect }         from 'react-redux';
import numeral             from 'numeral';
import selectExpenses      from '../selectors/expenses';
import selectExpensesTotal from '../selectors/expenses-total';



// create a stateless functional component and no need to manage any state in this component
// for the argument, we used desstructuring but could have done this:
// " ( props.expensesCount, props.expensesTotal ) "
export const ExpenseSummary = ( { expenseCount, expenseTotal } ) => {

    // above retrun() the 2 props: expenseCount and expenseTotal do not need to be enclosed within
    // {} but within return() the 2 props and all variables need to be enclosed in curly braces
    // or {}
    const expenseWord = expenseCount === 1 ? 'expense' : 'expenses';

    const totalFormatted = numeral( expenseTotal / 100 ).format( '$0,0.00' );

    // return some jsx that will be rendered to the screen
    return (
        <div>
            <h1>Viewing { expenseCount } { expenseWord } totaling { totalFormatted }</h1>
        </div>
    );
};



// we are going to get access to the entire state via the first argument
const mapStateToProps = ( state ) => {

    const visibleExpenses = selectExpenses( state.expenses, state.filters );

    // we will return our props: expenseCount and expenseTotal
    return {
        expenseCount : visibleExpenses.length,
        expenseTotal : selectExpensesTotal( visibleExpenses )
    };
  
};


// this gets exported to the ExpenseDashboardPage.js component, which includes
// the <ExpenseListFilters /> component within the ExpenseDashboardPage.js component
export default connect( mapStateToProps )( ExpenseSummary )
