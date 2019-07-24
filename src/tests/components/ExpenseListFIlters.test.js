
// -- MARK 1 --
// lecture 126: Testing ExpenseListFilters
import React from 'react';
// import the named export shallow from enzyme
import { shallow } from 'enzyme';
// remember, to import the named export or unconnected version of the ExpenseListFilters component
import { ExpenseListFilters } from '../../components/ExpenseListFilters';
// import our named exports: filters and altFilters which contain our dummy data
import { filters, altFilters } from '../fixtures/filters';
// will need to use the moment library below
import moment from 'moment';


// oce we have all these imports in place, we can kick things off by starting the very basic
// snapshot tests and let's go ahead and get the ExpenseListFilters component rendered and then
// pass in the information it expects and we want to create new fixtures data so we can pass
// information down and let's create a new file inside the fixtures folder called filter.js


// ==============================
// GO TO FIXTURES/FILTERS.JS -- GO TO -- Mark 1 --
// ==============================


// ==============================
// BACK FROM FIXTURES/FILTERS.JS
// ==============================

// we will be using beforeEach( fn ) to run some code before each test case and remember that
// beforeEach takes a function as an argument or we pass in a callback function as an argument
// so we pass in an arrow function to beforeEach and Jest will be the one that calls the arrow
// function and the arrow function will run before each test case and inside the arrow function
// we can define real values for the 5 let variables below and we have already defined these 5
// variable below so we can just copy and paste them inside the arrow function and remember
// to remove the const variable in front of each of the 5 variables since we have already
// declared the variables below
let setTextFilterSpy, sortByDateSpy, sortByAmountSpy, setStartDateSpy, setEndDateSpy, wrapper;

beforeEach( () => {
    // set up of our spies or initialize our spies and this will allow every single test case
    // to not only have access to them but also a fresh version of them
    setTextFilterSpy = jest.fn();
    sortByDateSpy    = jest.fn();
    sortByAmountSpy  = jest.fn();
    setStartDateSpy  = jest.fn();
    setEndDateSpy    = jest.fn();
    // now we will set up the wrapper itself and we will shallow render, in jsx, the
    // ExpenseListFilters component and we will pass all of our spies down into this component and
    // we now have this baseline wrapper we can start from
    wrapper = shallow( 
        <ExpenseListFilters 
            // pass down all the props here and where do these props come from? ( see below )
            // the filters prop is the prop inside mapStateToProps
            filters       = {          filters }
            // the 4 props below are props inside mapDispatchToProps
            setTextFilter = { setTextFilterSpy }
            sortByDate    = {    sortByDateSpy }
            sortByAmount  = {  sortByAmountSpy }
            setStartDate  = {  setStartDateSpy }
            setEndDate    = {    setEndDateSpy }
        />
    );
} );

// now our goal is to create 2 snapshots for the moment and we will make one for a snapshot
// when filters is rendered and one for a snapshot when altFilters is rendered 




// TEST CASE #1
test( 'should render ExpenseListFilters correctly', () => {
    // so we are going to expect something about the wrapper and we will take a snapshot using
    // toMatchSanpshot()
    expect( wrapper ).toMatchSnapshot();    
} );

// if we go to the terminal we will see a passing test suite
// when we go to the ExpenseListFilters.test.js.snap file we see that input text value is an empty
// string which matches our filters data ( see below) and we see that the select value is "date"
// which matches our filters data and we see startDate and endDate are null which also matches
// our filters data from our fixtures/filters.js file so we can see that things are rendering
// correctly for our default filters but what about the altFilters?

/*
<input
    onChange={[Function]}
    type="text"
    value=""
/>
<select
    onChange={[Function]}
    value="date"
>
endDate={null}
startDate={null}
*/

// how do we change the props for one of the components we are testing or change this part:

/*
    <ExpenseListFilters 
        // pass down all the props here
        filters       = {          filters }
        setTextFilter = { setTextFilterSpy }
        sortByDate    = {    sortByDateSpy }
        sortByAmount  = {  sortByAmountSpy }
        setStartDate  = {  setStartDateSpy }
        setEndDate    = {    setEndDateSpy }
    />
*/

// so to demostrate how this is done let's start with a test case or TEST CASE #2
// TEST CASE #2
test( 'should render ExpenseListFilters will alt data correctly', () => {
    // the goal right here is to change the props and lucky for us enzyme gives us a way
    // to get this done and that is by using setProps() and setProps() allows us to manipulate
    // the props for a given component and then assert something about it and all we have
    // to do is pass an object into setProps() and then define the new props and what exactly
    // are we looking to do here? we are looking to update the filters prop and I think were focused
    // on the filters prop since in mapStateToProps we return a prop with a name of filters or
    // " filters : state.filters " and we use this.props.filters throughout our ExpenseListFilters
    // component
    wrapper.setProps( {
        filters : altFilters
    } );

    // so we are going to expect something about the wrapper and we will take a snapshot using
    // toMatchSanpshot()
    expect( wrapper ).toMatchSnapshot();
} );

// if we go to the terminal we will see a passing test suite
// when we go to the ExpenseListFilters.test.js.snap file and chack for the test case that says:
// " should render ExpenseListFilters will alt data correctly " we see that input text value
// is the string " bills " which matches our altFilters data ( see below) and we see that the
// select value is "amount" which matches our altFilters data and we see
// startDate is " startDate={"1970-01-01T00:00:00.000Z"} " which matches altFilters data and we
// see the endDate is " endDate={"1970-01-04T00:00:00.000Z"} " which matches our altFilters data
// from our fixtures/filters.js file so we can see that things are rendering correctly for our
// the altFilters data set

/*
<input
    onChange={[Function]}
    type="text"
    value="bills"
/>
<select
    onChange={[Function]}
    value="amount"
>
startDate={"1970-01-01T00:00:00.000Z"}
endDate={"1970-01-04T00:00:00.000Z"}
*/

// so with enzyme were able to set props and that's going to allow us to use the set up above
// for all of our test cases


// -- MARK 2 --
// lecture 127: Testing ExpenseListFilters: Part II
// let's go ahead and outline the 5 test cases that we are going to write:
// FIRST TEST CASE or TEST CASE #3
// " should handle text change " and when I change the text input does it call the correct prop and
// will assert sometime about the spies making sure the correct props were called
// SECOND TEST CASE or TEST CASE #4
// " should sort by date " and will assert sometime about the spies making sure the correct props
// were called and for simulating a change to the select we can use the exact same techniques we've
// already explored
// THIRD TEST CASE or TEST CASE #5
// " should sort by amount " and will assert sometime about the spies making sure the correct props
// were called and for simulating a change to the select we can use the exact same techniques we've
// already explored
// FOURTH TEST CASE or TEST CASE #6
// " should handle date changes " and will assert sometime about the spies making sure the correct
// props were called
// FIFTH TEST CASE or TEST CASE #7
// " should handle date focus changes " and for this one we will assert something about the state

// and then the instructor will set us free to knock these out on our own

// TEST CASE #3
test( 'should handle text change', () => {
    const value = 'rent';
    
    wrapper.find( 'input' ).simulate( 'change', {
        target : { value }
    } );

    expect( setTextFilterSpy ).toHaveBeenLastCalledWith( value );
} );

// when we go to the terminal, we see that this test case passes


// TEST CASE #4
test( 'should sort by date', () => {
    const value = 'date';

    // we need to start off with " amount " in order to make sure we switch to " date "
    // so we need to use the altFilters data since sortBy is set to " amount " in this data set
    wrapper.setProps( {
        filters : altFilters
    } );

    // remember, we pass down the event object
    wrapper.find( 'select' ).simulate( 'change', {
        target : { value }
    } );

    // remember, sortByDate in the ExpenseListFilters component is not called with any arguments
    expect( sortByDateSpy ).toHaveBeenLastCalledWith();
} );

// when we go to the terminal, we see that this test case passes


// TEST CASE #5
test( 'should sort by amount', () => {
    const value = 'amount';

    // remember, we pass down the event object
    wrapper.find( 'select' ).simulate( 'change', {
        target : { value }
    } );

    // remember, sortByDate in the ExpenseListFilters component is not called with any arguments
    // remember, we have to use a spy below or sortByAmountSpy in this case
    expect( sortByAmountSpy ).toHaveBeenLastCalledWith();
} );

// when we go to the terminal, we see that this test case passes


// TEST CASE #6
test( 'should handle date changes', () => {
    const startDate = moment( 0 ).add( 4, 'years' );
    const endDate   = moment( 0 ).add( 8, 'years' );

    // call onDatesChange, which will trigger the spies setStartDate and setEndDate
    // remember, we want the prop onDatesChange and we will call onDatesChange with the stuff
    // it would expect, which in this case is an object with 2 properties: startDate and endDate
    wrapper.find( 'DateRangePicker' ).prop( 'onDatesChange' )( { startDate, endDate } ); 

    // now, we will assert that setStateDate was called with " startDate " and setEndDate was
    // called with " endDate " and we can see this in action in the ExpenseListFilters component
    // remember, we have to use a spy below or setStartDateSpy in this case
    expect( setStartDateSpy ).toHaveBeenLastCalledWith( startDate );
    // remember, we have to use a spy below or setEndDateSpy in this case
    expect( setEndDateSpy ).toHaveBeenLastCalledWith( endDate );
} );

// when we go to the terminal, we see that this test case passes



// TEST CASE #7
test( 'should handle date focus changes', () => {
    // for DateRangePicker, focusedInput could equal null ( which means the DateRangePicker is
    // closed), startDate or endDate and if it equals endDate, it means that the endDate is focused
    const focusedInput = 'endDate';

    wrapper.find( 'DateRangePicker' ).prop( 'onFocusChange' )( focusedInput );

    // next, we are going to expect something about the state and the state should have changed and
    // should now be equal to the variable focusedInput and we want some individual state values so
    // we will pass 'calendarFocused' to wrapper.state() and we can use toBe() since we are
    // comparing two strings
    expect( wrapper.state( 'calendarFocused' ) ).toBe( focusedInput );
} );

// when we go to the terminal, we see that this test case passes

// so we now have a complete test suite that tests everything that makes up our application and we
// used enzyme to test our components and we used regular function calls previously to test things
// like our action generators, selectors and reducers and the goal of this section was to give you
// an introduction into how you can test your react apps so whether we go off and build our own
// applications or whether we are trying to get a job we can show up and test the code we write
// because in a lot of professional settings that is going to be required and an sutomated test
// suite is going to catch all of those issues that can bring down your service or create bad
// relationships with your customers or that bug that keeps you up Satruday night working so our
// instructor hopes that we never have to do any of these things because we have a test sute in
// place and we can catch the issues before we deploy them to production and break the application
// for our customers