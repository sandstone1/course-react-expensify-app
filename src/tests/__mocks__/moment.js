
// -- MARK 1 --
// lecture 121: Mocking Libraries with Jest
// coming from ExpenseForm.test.js
// all were going to do is add export default and by default we are going to export an arrow
// function and this function will be the function we call inside the mocked moment library
// so when we call moment() in the real application we will be using the moment library and when
// we call it in the test file we will be using the mocked version of the moment library and
// we add in a timestamp argument and if it exist great we will use it and if not we will set the
// default value equal to 0 ans this will make sure that if we are asking for the current point
// in time it's a fixed point in time and that we have the timestamp argument in place now all
// we have to return is an instance of moment at that fixed point in time or the timestamp argument
// so this will make sure functionality like " moment( props.expense.createdAt ) " where we ask
// for a moment at a timestamp still works and it is also going to make sure that " moment() "
// refers to a specific point in time and this will allow our test cases to work

// there is one discrepancy here, how do we get moment? we can't just import the moment library
// since essentially we have a function below that calls itself and this will result in a stack
// trace error, instead what we want to do is grab the original version of moment and Jest gives
// us a way to do that and the function we use is " require.requireActual() " and this will
// require the original module and not the mocked one so create a const called moment and set it
// equal to require.requireActual() and pass in moment and this is what we need to do inside our
// Jest mock files in order to actually mock out a given library
const moment = require.requireActual( 'moment' );

export default ( timestamp = 0 ) => {
    return moment( timestamp );
};

// and now that we have the above in place we can save the moment mock file and see what happens
// and the first time the ExpenseForm.test.js test case run we would except things to fail because
// the old snapshot was using the current time and now were using the mocked version of the moment
// library and if we head to the terminal we see that the ExpenseForm.test.js test case is failing
// and this is Ok since it is totally expected but what is important is if we hit " u " after the
// test suite reruns the test case now passes so now our snapshot is always going to match because
// we've forced the moment to start at a specific point in time and now we can add more snapshot
// tests to our application

// so let's wrap this video up with an easy one, the instructor wants me to add a test rendering
// expense form with the data and our test title we be " should render ExpenseForm with expense
// data " so what we need to do is render ExpenseForm but were going to pass in data from one
// of the expense objects in the fixtures/expenses.js file and I can pick any of the 3 expenses
// and then I will need to take a snapshot and when I do take the snapshot take a quick look at
// the ExpenseForm snapshot file and make sure it looks reasonable correct


// ==============================
// GO TO TESTS/COMPONENTS/EXPENSEFORM.TEST.JS -- MARK 2 --
// ==============================

// -- END OF MARK 1 --
