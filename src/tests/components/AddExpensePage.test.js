
// -- MARK 1 --
// lecture 124: Testing AddExpense Page
import React from 'react';
import { shallow } from 'enzyme';
// remember, to import the named export or unconnected version of the AddExpensePage component
import { AddExpensePage } from '../../components/AddExpensePage';
import expenses from '../fixtures/expenses';
// GO TO -- MARK 1 -- Continue below


// -- MARK 2 --

// -- Mark 8 --
// lecture 125: Testing EditExpensePage
// need to change the " onSubmit " property below to " addExpense "
let addExpenseSpy, historySpy, wrapper;
// now the goal is define the 3 let variables above and we want to define fresh copies before
// every single test case so that each test case starts with spies that haven't been called
// and a wrapper variable that is what it should be when it first gets rendered and to do this
// we will be using beforeEach( fn ) to run some code before each test case and remember that
// beforeEach takes a function as an argument or we pass in a callback function as an argument
// so we pass in an arrow function to beforeEach and Jest will be the one that calls the arrow
// function and the arrow function will run before each test case and inside the arrow function
// we can define real values for the 3 let variables above and we have already defined these 3
// variable below so we can just copy and paste them inside the arrow function and remember
// to remove the const variable in front of each of the 3 variables since we have already
// declared the variables above; however, I'm going to comment out the 3 variables below and
// stick with the original way of doing things instead of using beforeEach()
/*

beforeEach( () => {
    addExpenseSpy = jest.fn();
    historySpy  = { push : jest.fn() };
    wrapper = shallow( <AddExpensePage addExpense={ addExpenseSpy } history={ historySpy } /> );
} ) ;

// if we used beforeEach() then TEST CASE #1 and TEST CASE #2 would look like the following:

// TEST CASE #1
test( 'should render AddExpensePage correctly', () => {
    expect( wrapper ).toMatchSnapshot();    
} );

// TEST CASE #2
test( 'should handle onSubmit', () => {
    wrapper.find( 'ExpenseForm' ).prop( 'onSubmit' )( expenses[ 1 ] );
    expect( historySpy.push ).toHaveBeenLastCalledWith( '/' );
    expect( addExpenseSpy ).toHaveBeenLastCalledWith( expenses[ 1 ] );
    // END OF -- Mark 8 --
} );
*/
// GO TO -- MARK 2 -- Continue below
// END OF -- MARK 2 --


// -- MARK 1 -- Continue
// now we can add our first test case which will just be a snapshot test
// TEST CASE #1
test( 'should render AddExpensePage correctly', () => {
    // render the component using shallow() but remember we have 2 props we need to pass in
    // and those 2 props are addExpense and history and we can put anything we want inside the {}
    // and we will use some spies and insert the spies inside the {}
    // set up our 2 spies
    const addExpenseSpy = jest.fn();
    // our history spy will equal an object and the code in the AddExpensePage component is
    // " this.props.history.push( '/' ); " and on that object we are going to define " push "
    // so history.push will equal a Jest function 
    const historySpy  = { push : jest.fn() };

    // -- Mark 8 --
    // lecture 125: Testing EditExpensePage
    // need to change the " onSubmit " property below to " addExpense "
    const wrapper = shallow( <AddExpensePage addExpense={ addExpenseSpy } history={ historySpy } /> );
    // END OF -- Mark 8 --

    // now let's take a snapshot and call it a day
    expect( wrapper ).toMatchSnapshot();
} ); 

// if we go to the terminal, we see this test case passes and then to the snapshot file and to make
// sure everything looks Ok and it does look like we are getting everything we might expect


// the next thing we are going to test is that when the form gets submitted we are going to make
// sure that both of our spies get called and that they get called with the correct information
// TEST CASE #2
test( 'should handle onSubmit', () => {
    // render the component using shallow() but remember we have 2 props we need to pass in
    // and those 2 props are addExpense and history and we can put anything we want inside the {}
    // and we will use some spies and insert the spies inside the {}
    // set up our 2 spies
    const addExpenseSpy = jest.fn();
    // our history spy will equal an object and the code in the AddExpensePage component is
    // " this.props.history.push( '/' ); " and on that object we are going to define " push "
    // so history.push will equal a Jest function 
    const historySpy  = { push : jest.fn() };

    // -- Mark 8 --
    // lecture 125: Testing EditExpensePage
    // need to change the " onSubmit " property below to " addExpense "
    const wrapper = shallow( <AddExpensePage addExpense={ addExpenseSpy } history={ historySpy } /> );

    // now what we are going to do is call the obSubmit function which gets passed into the
    // ExpenseForm component ( see below )
    /*
    <ExpenseForm
        onSubmit={ this.onSubmit }
    />
    */
    // we will use wrapper.find to find the ExpenseForm component and will call prop() and inside
    // prop() we will define the event handler or onSubmit and then we will call onSubmit with the
    // data that it would be called with in the real world, which in our case is an expense object
    // so we need to import the expenses array from /fixtures/expenses.js ( see imports above )
    // and then use one of the three expenses in the expeses array as our expense object
    wrapper.find( 'ExpenseForm' ).prop( 'onSubmit' )( expenses[ 1 ] );

    // so at this point we have successfully run the following code:
    /*
    onSubmit= ( expense ) => {
        this.props.onSubmit( expense );
        this.props.history.push( '/' );
    }
    */
    // so now we can make some assertions, checking that both of our spies were called with the
    // correct information and we will start with historySpy.push, which is a spy
    expect( historySpy.push ).toHaveBeenLastCalledWith( '/' );
    // next we will move on to the other assertion, which will be for addExpense
    expect( addExpenseSpy ).toHaveBeenLastCalledWith( expenses[ 1 ] );
    // END OF -- Mark 8 --
} );

// now if we go to the terminal we see this test case passes and now there is one more thing the
// instructor wants to talk about before we end this video and that is the both TEST CASE #1 and
// TEST CASE #2 start off with the exact same 3 lines of code and in some of your test cases we
// are going to find ourselves spending a lot of time building up the test cases rather than
// writing assertions and if we find ourselves with a lot of duplicate code there is way in Jest
// that we can simplify our code and we can do this by using one of
// the 4 following methods: afterAll( fn ), afterEach( fn ), beforeAll( fn ) or beforeEach( fn ) and
// afterAll() runs a single time after all the test cases in a given file have run and
// afterEach() runs after each test case in a given file has run and
// beforeAll() runs one time before any of the test cases have run and
// beforeEach() runs one time before each test case
// and using some of these lifecycle methods were going to be able to set up the spies and the
// component and then each test case can skip the duplicate code just worry about makign assertions
// so let's go ahead and take a look at what that might look like, so we will start off with a
// few let variables and go to -- MARK 2 -- above

// -- MARK 2 -- Continue
// and the jist of using beforeEach() above is that if we find ourselves spending a lot of time
// setting up the test cases, it might be a good idea to try to break that out and just do it once
// using something like beforeEach()

// in the next video, we are going to go through the exact same process for the EditExpensePage
// component and we will be doing this ourselves so were going to be doing some refactoring of
// code and adding mapDispatchToProps and we will be creating the test file and then writing a
// few test cases
// END OF -- MARK 2 --