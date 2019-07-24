
import expenses from '../tests/fixtures/expenses';


// -- Mark 1 --
// lecture 139: Build It: Adding Total Selector
export default ( expenses ) => {
    if ( expenses.length === 0 ) {
        // if the length is equal to 0, then return the number 0
        return 0;
    }
    else
    {
        // use map() to get an array of expense amounts
        const getExpensesTotal = expenses.map( ( expense ) => expense.amount );

        // use reduce to get a total of the expense amounts in the getExpensesTotal array
        const total = getExpensesTotal.reduce( ( passedIn, item ) => {
            return passedIn + item;
        }, 0 );

        return total;

        // could have written the above like this - way #1:
        /*
        return expenses
            .map( ( expense ) => expense.amount )
            .reduce( ( passedIn, item ) => {
                return passedIn + item;
            }, 0 );
        */

        // could have written the above like this - way #2:
        /*
        return expenses
            .map( ( expense ) => expense.amount )
            .reduce( ( passedIn, item ) => passedIn + item, 0 );
        */

    }
};


// ==============================
// GO TO SELECTORS/EXPENSES-TOTAL.TEST.JS -- GO TO -- Mark 1 --
// ==============================


// ==============================
// BACK FROM SELECTORS/EXPENSES-TOTAL.TEST.JS
// ==============================

// if we return 0 above then TEST CASE #1 will pass

