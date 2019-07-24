
// -- Mark 1 --
// lecture 121: Mocking Libraries with Jest
// first, let's import the things we need
// and will need react since we are going to be using a little bit of jsx inside this file
import React from 'react';
// we will shallow render our component
import { shallow } from 'enzyme';
// import the ExpenseFormm component and this is a default export
import ExpenseForm from '../../components/ExpenseForm';

// -- MARK 2 --
import expenses from '../fixtures/expenses';
// -- Continue to Mark 2 below --

// -- MARK 4 --
import moment from 'moment';
// -- Continue to Mark 4 below --



// now that we have all these imports in place we can create a very simple test case
// TEST CASE #1
test( 'should render ExpenseForm correctly', () => {
    // now were going to render the component with that data and make an assertion about it
    // using the snapshot functionality
    // so create a const called wrapper and we are going to get the wrapper value from whatever
    // comes back from calling shallow() and we are going to call shallow with the jsx that we
    // would like to render and in this case, we are just going to render a single instance of the
    // ExpenseForm component

    // remember that the ExpenseForm component does take an optional expense prop or props.expense
    // if we want to edit existing expense values but for now, we will leave props out and use the
    // default values
    const wrapper = shallow( <ExpenseForm /> );

    // now that the rendering is in place so we can create the snapshot
    // so I am going to expect something about the wrapper and I will expect the wrapper to
    // match the snapshot and remember the first time we run this test case there is no existing
    // snapshot so the test case will always pass initially and Jest will go through the process
    // of creating a new snapshot file for this test file

    expect( wrapper ).toMatchSnapshot();
} );

    // however, after we run the first snapshot it will pass but we have a problem and the problem
    // is if we rerun the test suite it is going to fail and when we go to the terminal and check
    // the test suite we see our test above is now failing and we can see what it is failing on
    // and it is failing on the prop we passed to SingleDatePicker or in other words the old date
    // and the new date are different and this is causing an issue in the snapshot so what is going
    // on? what is happening is that inside the ExpenseForm component and in the createdAt value we
    // are grabbing moment at the current moment in time or moment() and obviously every time we run
    // the test case the point in time has changed which is a pretty big problem for us and we need
    // a way to get the same data back for moment() without having to change moment() and so how
    // are we going to get this done?

    // to fix this we are going to be mocking out moment or in other words we are going to create
    // a fake version of the moment library that is going to allow us to define what happens when
    // the code calls moment() and what we will do is return a moment at a specific point in time
    // and this whole technique of micking out thrid party librarys can seem very strage at first
    // but I promise that once we are done with this video it will make a lot more sense so STEP 1
    // is to pull up the Jest docs and go to the " manual mocks " page and this is where we the
    // test writers have the option to create mocks for various libraries so were goint to create
    // a mock of the moment library and STEP 1 is to create the mock file and Jest likes you to
    // put that in your test folder and we will create a new folder inside tests called __mocks__
    // and we have to stick to the exact same naming convention we use for snapshots and inside
    // __mocks__ we are going to be able to create the mocked version of the moment library and
    // we will create a file called moment.js and now the goal is define exactly what we want
    // our mocked moment to look like and then we will be able to start the mocking in the test
    // file or ExpenseForm.test.js and our snapshot will work as expected

    // so when we import moment, we expect something to come back on the default and in our case
    // we expect it to be a function we can call and sometimes we call it with nothing
    // ( i.e. moment() ) and sometimes we pass in a value and in ExpenseForm.js there are only a
    // couple lines where we use the moment library



// ==============================
// GO TO TESTS/__MOCKS__/MOMENT.JS -- MARK 1 --
// ==============================


// -- END OF MARK 1 --


// ==============================
// BACK FROM TESTS/__MOCKS__/MOMENT.JS -- MARK 1 --
// ==============================

// -- MARK 2 --
// TEST CASE #2
test( 'should render ExpenseForm correctly with expense data', () => {
    // now were going to render the ExpenseForm component with the second item from
    // tests/fixtures/expenses.js and then make an assertion about it using the snapshot
    // functionality
    // so create a const called wrapper and we are going to get the wrapper value from whatever
    // comes back from calling shallow() and we are going to call shallow with the jsx that we
    // would like to render and in this case, we are going to render a single instance of the
    // ExpenseForm component and an expense passed in

    // remember that the ExpenseForm component does take an optional expense prop or props.expense
    // if we want to edit existing expense values
    const wrapper = shallow( <ExpenseForm expense = { expenses[ 1 ] } /> );

    // now that the rendering is in place so we can create the snapshot so I am going to expect
    // something about the wrapper and I will expect the wrapper to match the snapshot
    expect( wrapper ).toMatchSnapshot();
} );

// if we go to the terminal we see the TEST CASE #2 is passing the test

// so now that we have a snapshot in place for this component we are going to move on to more
// complex real world scenarios dealing with events like changing inputs, submitting forms and
// clicking buttons

// -- END OF MARK 2 --



// -- MARK 3 --
// lecture 122: Testing User Interaction
// TEST CASE #3
test( 'should render error for invalid form submission', () => {
    // STEP 1 is to shallow render the component
    // we will make a const called wrapper and we will use shallow to render it
    // and we will render the ExpenseForm component and once we have rendered the ExpenseForm
    // component we are going to focus on actually submitting to the form so what we need to do
    // is first find the form and then we have to simulate submit 
    const wrapper = shallow( <ExpenseForm /> );

    // snapshot before changes
    // see below for details on this snapshot
    expect( wrapper ).toMatchSnapshot();

    // remember, we can find things by id, class and tag name and in this case we are looking
    // for the form and we have one form tag inside the ExpenseForm component so now we have
    // access to the form element in the ExpenseForm component and what we need to do is simulate
    // an event and simulate is a little tricky to use and we will call simulate and within
    // the simulate call the first argument will be a string such
    // as " click ", " submit " or " change " and we will be sticking with submit for this test
    // case since the form has an onSubmit handler

    // now from here what we have to do is verify that things changed as expected and what we
    // have below is not quite enough so if we go to the terminal we will see that we are getting
    // an error and the error says: " TypeError: Cannot read property 'preventDefault' of
    // undefined " and what is happening is when we simulate onSubmit we are not passing in
    // anything that represents " e " or our event and so " e " is getting set to undefined in
    // our test cases and that is going to be a problem and we can define the " e " argument by
    // passing in a second argument to simulate() and we want the second argument to be an object
    // since we are expecting an object and what are we expecting on that object? just a single
    // property or the one we end up using or preventDefault() which is a function adn below we
    // can create the property preventDefault and set it equal to an arrow function that does
    // absolutely nothing and this will be enogh to remove that error that we are seeing over in
    // Jest and now if we go to the terminal we see that all of our test cases are passing and
    // now where do we want to go from here? at this point we want to make sure what should have
    // happened actually did happen and what should have happened? to find out let's go to the
    // if statement within the ExpenseForm component and the if statement is:
    // if ( !this.state.description || !this.state.amount ) {
         // this.setState( ( ) => ( {
           // error : ' Please provide description and / or amount. ' 
         // } ) );
    // }

    // and this if statement should not have passed, which means we should have got an error
    // that says " Please provide description and / or amount. " and we can test for this by
    // fetching the state off of wrapper
    wrapper.find( 'form' ).simulate( 'submit', { 
        preventDefault : () => { }
    } );

    // so we are going to write an expect statement that fetches the state and makes sure that
    // it is not an empty string so we are going to expect something and we will access
    // wrapper.state and the argument will be the error state or the error property in the
    // ExpenseForm component and then we will use one of our expect assertions and we will use
    // toBeGreaterThan and if we are checking toBeGreaterThan then the assertion expects a number
    // and we will say toBeGreaterThan " 0 " and we will need to get the length of the
    // " wrapper.state( 'error' ) " string in order to check or assert that the length is
    // toBeGreaterThan " 0 " and if length is zero we will have a problem and test case will
    // fail and if we go to the terminal we will see this test case passes
    expect( wrapper.state( 'error' ).length ).toBeGreaterThan( 0 );

    // remember, it is important that we take all 3 steps that are listed above and now we can
    // wrap up this test case with a quick snapshot and that will make sure the error always
    // renders correctly so we can except wrapper toMatchSnapshot and this is going to make
    // sure that after the error state changes the snapshot gets rendered
    // snapshot after changes
    expect( wrapper ).toMatchSnapshot();

    // and remember we could take one snapshot before we make the changes and one after we
    // make the changes and this will make sure those 2 snapshots match up the next time
    // this test case runs and if we go to the terminal we will see that our test cases are
    // passing
} );

// if we take a quick peak at the snapshot file for this test file and if we scroll down
// and for snapshot two we see the error message or
// <p>
//   Please provide description and / or amount. 
// </p>

// and now that we know the snapshot contains the correct stuff we will be able to track that
// and if we scroll up to snapshot one we see there is no error message for that snapshot
// which is correct so now we have a test case that makes sure that the error code runs and
// the actual impact of the error code running works as expected

// before the instructor sets us free, we will look at how we can simulate the change event
// and to do that we are going to make sure that when the description input changes that
// actually does indeed set the state for the description with the correct value and check
// this we are going to add a new test case

// TEST CASE #4
test( 'should set description on input change', () => {
    // see below for details
    const value = 'New Description';
    
    // and the goal inside of here is to (1) render the ExpenseForm component and (2) change
    // the input and (3) make an assertion checking that the description state was set
    // so #1 is easy
    const wrapper = shallow( <ExpenseForm /> );
    
    // now the goal is to submit the change event so the first thing we have to do is access
    // the element and we are going to be using wrapper.find to get that done and were going to
    // be finding input and when we find input we are going to be matching multiple inputs inside
    // our component so what we want to do is match the first input which is the input for the
    // description and we have access to do that via the at method and at let's you pass in the
    // index you want back so in our case we want the first input field or index 0 and now the
    // goal is simulate the change event and we will pass " change " in as the first argument and
    // an object in as the second argument and what object do we need to pass in? if we take a
    // look at the ExpenseForm component we want to pass in " e.target.value " so we have to make
    // sure that e.target.value actually exists and we will set " e " equal to an object with
    // target as the property and value as the value and we can get the value from a variable
    // named value defined up above
    wrapper.find( 'input' ).at( 0 ).simulate( 'change', {
        target : { value }
    } );

    // and now that we have simulated the event we just have to make sure the state changed
    // correctly and we can expect the wrapper and then access the state to get some state
    // values back and we are looking for one piece of state and that is the description or the
    // description state and we are going to make sure
    // it equals using toBe what it should equal which is the value string defined above
    // and if we go to the terminal we see this test case passes and if things didn't work as
    // expected we would get errors
    expect( wrapper.state( 'description' ) ).toBe( value );
} );


// now it will be my job to do the exact same thing for onNoteChange and remember onNoteChange
// is working with a text area and so we will have to fetch by textarea and not input and we
// can set the note to " should set note on textarea change "
// challenge
// TEST CASE #5
test( 'should set note on textarea change', () => {
    const value = 'New note value';
    
    const wrapper = shallow( <ExpenseForm /> );
    
    wrapper.find( 'textarea' ).simulate( 'change', {
        target : { value }
    } );

    expect( wrapper.state( 'note' ) ).toBe( value );
} );


// now we will write 2 more test cases for changes in amount and in one of them we are going
// to set the amount equal to something valid and something that will make the following
// if statement pass " if ( !amount || amount.match( /^\d{1,}(\.\d{0,2})?$/ ) ) { "
// and have the state set and in the other one we are actually going to set the amount equal to
// something invalid and make sure the state does not get set and the instructor will give us
// some test data:
// for the valid test case our note should read: " should set amount if valid input " and we should
// use 23.50 for the amount and the other one should read: " should not set amount if invalid
// input " and we will use an invalid value like 12.122

// challenge
// TEST CASE #6
test( 'should set amount if valid input', () => {
    const value = '23.50';
    
    const wrapper = shallow( <ExpenseForm /> );
    
    wrapper.find( 'input' ).at( 1 ).simulate( 'change', {
        target : { value }
    } );

    expect( wrapper.state( 'amount' ) ).toBe( value );

    expect( wrapper ).toMatchSnapshot();
} );



// challenge
// TEST CASE #7
test( 'should not set amount if invalid input', () => {
    const value = '12.122';
    
    const wrapper = shallow( <ExpenseForm /> );
    
    wrapper.find( 'input' ).at( 1 ).simulate( 'change', {
        target : { value }
    } );

    // since 12.122 is an invalid amount, the amount should be equal
    // to an empty string, which is the default state value for amount
    expect( wrapper.state( 'amount' ) ).toBe( '' );

    expect( wrapper ).toMatchSnapshot();
} );

// test case #6 and test case #7 passes as well

// recap: in this video, we learned we can simulate events like the onChange event
// and the first argument in the simulate() call is the event name or " change " in this case
// and the second argument is the event object or " target : { value } " and we also learned
// we can access individual input items by using the at() call and all of this is allowing us
// to create some meaningful test cases and we learned we can access the state of the component
// we are working with using the .state() and this allows us to read the entire state or in some
// of the cases above we pass in a string ( e.g. amount ) in order to read an individual state
// value and we are going to continue to learn about new testing techniques and the goal of the
// next video is to figure out how we can test the success case or
/*
this.setState( ( ) => ( {
    error : '' 
} ) );

// -- Mark 5 --
// we just passed down onSubmit from the AddExpensePage component
// and we are going to call it with some data in the form of an object
this.props.onSubmit({
    description : this.state.description,
    note        : this.state.note,
    // for amount, we need to convert in into cents or the format we expect
    amount      : parseFloat( this.state.amount ) * 100,
    // createdAt is not the timestamp we expect but is a moment object but we
    // can use moment method to get the timestamp back and that method is
    // valueOf() and remember js works in milliseconds
    createdAt   : this.state.createdAt.valueOf()
});
*/
// and were going to have to learn a few new tricks to get that done

// -- END OF MARK 3 --



// -- MARK 4 --
// lecture 123: Test Spies
// STEP 1 is to explore this new tool ( i.e. spies ) so let's start with a test case example
// TEST CASE #7
test( 'should call onSubmit prop for valid form submission', () => {
    // now the whole goal of these spies is to create functions that are fake functions and
    // they are created by Jest for us and we can make assertions about them and we can check
    // and see if the fake function was called and we can check and see if it was called 5
    // times, for example, and we can check and see if it was called with specific arguments
    // so to kick things off let's explore some basic examples and then look at the docs for
    // spies

    // first create a const called onSubmitSpy and in order to create a new spy we use jest.fn()
    // and we call this function with no arguments and it returns a new spy and this is stored on
    // the variable onSubmitSpy below and now that we have a spy in place we have access to a brand
    // new set of assertions
    const onSubmitSpy = jest.fn();

    // note details below
    onSubmitSpy();

    // here we will check that our spy was called and we don't care how many times it was called
    // and we don't care what it was called with we just care that it was called and this will
    // result in a passing test case if our spy was called and if we go to the terminal. we see
    // we are getting an error since our spy was never called or we have not inserted the following
    // code: onSubmitSpy();

    // now, if we were to add a call to onSubmitSpy above or onSubmitSpy(); and then go to the
    // terminal we will see that our test case now passes
    expect( onSubmitSpy ).toHaveBeenCalled();
} );

// so at the very basic level we will be able to create some fake functions and we will be able
// to pass them into our components and we will make sure they are called as we expected them to
// be called and now let's pull up the docs and explore all this in more detail and go to the Jest
// documentation and pull up the Expect section and we can see the assertions we can use with spies
// such as .toHaveBeenCalled(), .toHaveBeenCalledTimes(), .toHaveBeenCalledWith() and
// .toHaveBeenLastCalledWith() and with .toHaveBeenCalledTimes() we can check if a spy was called
// a specific number of times and .toHaveBeenCalledWith() where we can check if a spy was called
// with certain arguments and .toHaveBeenLastCalledWith() which is very similar to
// .toHaveBeenCalledWith() but checks the last time the spy was called and .toHaveBeenCalledWith()
// and .toHaveBeenLastCalledWith() are more along the lines of what we need to do since we need
// to make sure the spy that was passed in the ExpenseForm component was called and called with
// the correct key value pairs so we will need to use these 2 assertions to get this done

// let's create a new test case and use .toHaveBeenCalledWith()
// TEST CASE #8
test( 'should call onSubmit prop for valid form submission v2', () => {

    const onSubmitSpy = jest.fn();

    // we will call our spy with a couple arguments
    onSubmitSpy( 'Andrew', 'Philadelphia' );

    // now we can make an assertion that checks that onSubmitSpy was called with these
    // two arguments
    expect( onSubmitSpy ).toHaveBeenCalledWith( 'Andrew', 'Philadelphia' );
} );

// if we go to the terminal we will see test case #8 passes and so using these spies is
// going to allow us to do some pretty powerful things such as we are going to be able
// to pass the spy into the component we render and we will be able to simulate things
// like the form submission and insure that the submission works as expected

// let's create a new test case
// TEST CASE #9
test( 'should call onSubmit prop for valid form submission v3', () => {

    const onSubmitSpy = jest.fn();

    // in this test case, we will shallow render the ExpenseForm component and we will be rendering
    // this component with some props, first up I want to pass in an expense so when I submit the
    // form we are using real valid data and we will pass in expense item number 1 and we will pass
    // in onSubmit and remember the component itself will call onSubmit so it better be defined and
    // we will set obSubmit equal to our spy
    const wrapper = shallow( <ExpenseForm expense={ expenses[ 0 ] } onSubmit={ onSubmitSpy } /> );

    // now that we have the compoennt rendered with the spy we can go through the next steps and
    // the next step is to simulate the form submission and we can use the code above
    wrapper.find( 'form' ).simulate( 'submit', { 
        preventDefault : () => { }
    } );

    // now that the form was submitted we can make some assertions about what should have happened
    // and what should have happened? first, the state should equal ( or this.state.error ) an
    // empty string ( see the ExpenseForm component for details ) and the spy should have been
    // called with specific arguments and we can check both of these
    // first we expect this.state.error to be an empty string
    expect( wrapper.state( 'error' ) ).toBe( '' );

    // second, this time around we expect something about the onSubmitSpy and we want to make sure
    // it was called with the correct information or the object from the ExpenseForm component
    // and in this case, we want to make sure onSubmitSpy was called with the all key value
    // pairs from the first expense item but remember expenses[ 0 ] has the id and in the
    // ExpenseForm component we do not have the id as one of the properties so if we do
    // " expect( onSubmitSpy ).toHaveBeenLastCalledWith( expenses[ 0 ] ); " this test case will
    // fail and we are going to fix this by defining the exact object ( see below ) and now we
    // are making an assertion correctly so if we go to the terminal we will see that this test
    // case passes
    expect( onSubmitSpy ).toHaveBeenLastCalledWith( {
        description : expenses[ 0 ].description,
        note        : expenses[ 0 ].note,
        amount      : expenses[ 0 ].amount,
        createdAt   : expenses[ 0 ].createdAt
    } );

    // so now we have a complete test case that makes sure when we have valid data the error gets
    // cleared and the prop onSubmit get called with the correct key value pairs and this is
    // something we would have not have been able to do if we had not used spies
} );

// now were going to wrap this video up with 2 more test cases and were going to be writing test
// cases for onDateChange and onFocusChange and these come with their own set of problems, which
// is figuring out how we can trigger these when they are not set up with onSubmit or onChange
// handlers and they are actually set up by passing them down to SingleDatePicker so we need to
// figure out how to change those props ( onDateChange or onFocusChange ) and thereby making
// these props run and then being able to make assertions that make sure the state changed
// correctly and we will work on onDateChange together and onFocusChange will be my challenge

// now when it comes to testing, we are going to have to hit our own stride as to what exactly
// we test and if your in the prototype phase you may find yourself wriing less tests and if
// you are doing a production application with a ton of users and a lot of code we might find
// ourselves writing more tests and our instructor's goal in this section is to give us all the
// tools we need to write as many test as our hearts desire

// let's test onDateChange
// we are going to pass a moment instance into createdAt and we are going to expect that it
// gets set on the state and if we can do that we are all done
// TEST CASE #10
test( 'should set new date for on date change', () => {
    // see details below
    const now = moment();

    // the first thing were going to focus on is rendering the component and for this test
    // case we do not need to pass any data into the component
    const wrapper = shallow( <ExpenseForm /> );

    // now that we have the ExpenseForm component rendered the next thing we want to focus on
    // is how we can trigger the prop onDateChange from SingleDatePicker and to do this we first
    // have to find SingleDatePicker and we can find by component or just type SingleDatePicker
    // into find() and this will find the instance and we can work with that and in this case,
    // the goal is get one of its props and call it and in this case, we want to get the prop
    // onDateChange and to do this we need to learn about a brand new method that enzyme provides
    // and this method is called props or we could use prop as well and these methods let us read
    // the prop values and we can use prop() to read all of them or we could use props([key]) to
    // just get one prop from SingleDatePicker and this will work for our purposes since we just
    // need to get one prop or onDateChange so we will access the prop call or prop() and pass
    // in a string or " onDateChange " and this will give us the handler we registered or
    // " { this.onDateChange } " or onDateChange() and we will call this handler with whatever
    // data the handler expects to be called with and that will be a moment instance so
    // first let's import moment up above and now we can create a moment instance and pass it
    // into the handler or onDateChange() or onDateChange = ( createdAt ) {} as shown in the
    // ExpenseForm component and we will pass in a new moment instance and ( createdAt )
    // will equal a new moment instance so " .prop( 'onDateChange' )( moment() ) " equals
    // onDateChange = ( createdAt ) or onDateChange( createdAt )
    // below is the old assertion before we created the variable " now "
    // " wrapper.find( 'SingleDatePicker' ).prop( 'onDateChange' )( moment() ); "

    // or we can created a variable for moment to make our assertions a little easier to follow
    wrapper.find( 'SingleDatePicker' ).prop( 'onDateChange' )( now );

    // now we can make the assertion, checking that the state was correctly set and the
    // individual state value we are looking for is " createdAt " and we expect it to equal
    // the now variable defined up above
    expect( wrapper.state( 'createdAt' ) ).toEqual( now );
} );

// if we go to the terminal we can see that this test case passes, which means that when
// SingleDatePicker fires onDateChange our component is acting correctly


// our challenge is to make sure onFocusChange actually sets calendarFocused and the instructor
// recommended we set the calendarFocused value to true and use the following description for the
// test case " should set calendar focus on change "
// challenge
// TEST CASE #11
test( 'should set calendar focus on change', () => {
    const focused = true;

    // the first thing were going to focus on is rendering the component and for this test
    // case we do not need to pass any data into the component
    const wrapper = shallow( <ExpenseForm /> );

    // next up, we want to find something on SingleDatePicker and will do a call to
    // wrapper.find() to get that done and remember the prop name is " onFocusChange " and
    // remember that the handler expects an argument that is an object with the focused property
    wrapper.find( 'SingleDatePicker' ).prop( 'onFocusChange' )( { focused } );

    // so now we need to make an assertion that the calendarFocused state changed to " true "
    expect( wrapper.state( 'calendarFocused' ) ).toBe( focused );
} );

// now if we go to the terminal, we will see that the test case passes and we now have a complete
// test case for the ExpenseForm component and in the next videos we are going to move on to
// testing the rest of our components

// recap: in this video, we learned about spies or mocked functions and spies allows us to create
// a little function that we can then pass into our components and we can make sure that when an
// event happens like a form submission it was called or called a certain number of times or called
// with specific data and we also learned how we can access props off of children
// ( i.e. SingleDatePicker ) that our components render and this allows us to make sure that things
// are wired up correctly with SingleDatePicker and allows us to show that the handler(s)
// ( i.e. onFocusChange ) do the correct stuff and now that we have all of this in place we now
// have all of the tools we need to test the rest of our components

// -- END OF MARK 4 --
