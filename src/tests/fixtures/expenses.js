
// -- MARK 1 --
import moment from 'moment';

// now we can define the fixture, which will be the expenses array baseline test data and
// cut the expensese array out of the tests/selectors/expenses.test.js and paste below

// create an expenses array and this will serve as the test data for the 
// tests/selectors/expenses.test.js and tests/reducers/expenses.test.js files and now we
// need to change a few things, first up, since we are using moment below, we need to import
// it and go to -- Mark 1 -- above and we will use a default export for the array below and
// therefore we will change " const expenses = [{ " to " export default [{ " and now the
// fixture file is set up correctly and we will import the default export into the 2 files
// above

// and so it will be an array of expenses and we can use them throughout our various test cases
export default [
    { 
        // so to kick things off let's go ahead and define an id for the first key value pairs
        // remember, createdAt within getVisibleExpenses is just a number
        id          : '1',
        description : 'Gum',
        note        : '',
        amount      : 195,
        createdAt   : 0
    },
    // having just one list of expenses will not help us with filtering and sorting so were going
    // to add some more
    { 
        // set createdAt to 4 days in the past and use valueOf() since I think createdAt needs
        // to be a timestamp
        id          : '2',
        description : 'Rent',
        note        : '',
        amount      : 109500,
        createdAt   : moment(0).subtract( 4, 'days' ).valueOf()
    },
    { 
        // set createdAt to 4 days in the future and use valueOf() since I think createdAt needs
        // to be a timestamp
        id          : '3',
        description : 'Credit Card',
        note        : '',
        amount      : 4500,
        createdAt   : moment(0).add( 4, 'days' ).valueOf()
    }
];