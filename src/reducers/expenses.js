

// there are no dependencies below and we are not using any sort of library
// so there is no need to import anything and we are not using jsx below so
// there is no need to import react



// EXPENSES REDUCER
// pass in the 2 arguments: state and action and return the new state
// the default state value will be an empty array and we can create a
// variable for our default state value
const expensesReducerDefaultState = [];

// USE A DEFAULT EXPORT BELOW
// we will use a default export since there is one thing we want to export from
// this file
// for the default export, as the first line below, we could do:
// " const expensesReducer = ( state = expensesReducerDefaultState, action ) => { "
// and then " export default expensesReducer; "
// or we do
// " export default ( state = expensesReducerDefaultState, action ) => { "

export default ( state = expensesReducerDefaultState, action ) => {
    // we will switch what we do based off a particular value
    switch ( action.type ) {
        // inside the {} we can define the various cases we want to handle
        case 'ADD_EXPENSE':
            // here we want to run some code that adds the expense onto the array
            // don't want to use state.push( action.expense ) since push will change
            // the original array and we want to avoid this so we will use
            // state.concat( action.expense ) since this takes the state array and combines
            // it with action.expense to create a new array and we return this array
            /*
            return state.concat( action.expense );
            */
            
            // SPREAD OPERATOR
            // now the above works but we want to explore the ES6 spread operator and
            // this allows us to get the same thing done and more
            // as an example, const names = [ 'Andrew', 'Steve' ];
            // if I use the spread operator or [ ...names  ], the result is [ 'Andrew', 'Steve' ]
            // if I want to add an item onto the names array and return a new array, I do as
            // follows [ ...names, 'Mike' ] and the result is [ 'Andrew', 'Steve', 'Mike' ]
            // the great thing here is the spread operator did not change the names array
            // could do [ 'Adam', ...names, 'Mike' ] and the result is [ 'Adam', Andrew', 'Steve', 'Mike' ]
            // so instead of doing this " return state.concat( action.expense ); ", were going to do
            // return [ ...state, action.expense ]; ( so were taking the current state array and adding
            // on the action.expense object without changing the state array )
            return [ ...state, action.expense ];

        case 'REMOVE_EXPENSE':
            // use filter to remove an expense from the state array
            // filter creates a brand new array from another array and does this by looking at each item in the array
            // and will call a function once for each item in the array and the function will return true or false
            // if the function returns true then the current item will be passed into the new array
            // if the function returns false then the current item will not be passed into the new array

            // remember, action.expense.id is equal to expenseOne.expense.id
            // could use destructuring here so { id } = item (remember we have an object here) so we can pull
            // id off each item in the state array
            // BELOW WORKS
            // return state.filter( ( { id } ) => id !== action.expense.id )
            // BELOW WORKS
            return state.filter( ( item ) => item.id !== action.expense.id )

        case 'EDIT_EXPENSE':
            // will use the object spread operator below
            // what do we want to do here? we want to go through every singe expense in the array and
            // find the match and when we find the match then go ahead and correctly change the match
            // we going to use a some conditional logic to change the expense when our item.id matches
            // the action.id
            return state.map( ( item ) => {
                if ( item.id === action.id ) {
                    // if we have a match, we want to return a brand new object
                    return {
                        // will use the object spread operator below
                        // we will spread out the expense item so we want to grab description,
                        // note, amount and createdAt and we just want to override the previous values
                        // with the ones that the user passed in
                        // ...item will give us current item / expense key value pairs and ..action.updates
                        // will provide new key value pairs which will override the previous key value
                        // pairs and this will result in new key value pairs for this item / expense
                        // this results in a new key value pair or " amount : 500 "
                        ...item,
                        ...action.updates

                        // by using the object spread operator we have simple way to create a new object
                        // from an existing oject and we will be using the object spread operator
                        // extensively throughout the course
                    }
                }
                else {
                    // do nothing
                    return item;
                }
            } );

        // -- Mark 1 --
        // lecture 157: Fetching Expenses: Part 1
        case 'SET_EXPENSES':

            // all we need to do is return action.expenses and we are accounting for whatever
            // is in the state and we do not care about the previous expenses and this case
            // is designed to set the expenses array completely and now let's go to the
            // tests/reducers/expenses.test.js file and set the test case
            return action.expenses;

        // End of -- Mark 1 --


        // set up the default case
        default :
            // if the store is running for the first time, then the default state value
            // will be shown
            return state;
    }
};
