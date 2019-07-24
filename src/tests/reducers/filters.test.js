
// first, import the moment library
import moment from 'moment';
// import the default export filtersReducer
import filtersReducer from '../../reducers/filters';

// the first test case we will go through makes sure the default values get set up
// correctly when the redux store first kicks off and redux dispatches a special action
// for that and we can see this in the redux developer tools so close the test suite and
// then restart the dev-server by typing " npm run dev-server " and then go into the redux
// dev tools and we will see " @@init " and we will be using @@int to test the defaults for
// the filtersReducer and @@init is used internally by redux and were never going to respond
// to this inside our reducers or dispatch it on our own but we can use it in our test
// cases to make sure the reducer sets itself up correctly so let's back to the terminal and
// shut down the dev-server and rerun the test suite by typing " npm test -- --watch " which
// will take us back to the test suite and from there we can add our first test case

// TEST CASE #1
test( 'should set up default filter values', () => {
    // we will create a const called state for the value that comes back and we will call the
    // filtersReducer passing in the necessary arguments and for state we will pass in undefined
    // and for the second argument we will pass in our action object and we use
    // " type = '@@INIT' " and this will help us determine whether or not our default values are
    // set correctly and remember that " type: @@init " is the first action object that redux
    // dispatches 
    const state = filtersReducer( undefined, { type : '@@INIT' } );

    // at the end of the day, we will expect something about the state and we will expect the state
    // to equal the object inside the toEqual call
    // the start date will be the current moment in time when the line of code runs and the start
    // date will be at the start of the month that includes the current moment in time and
    // the end date will be at the end of the month that includes the current moment in time
    expect( state ).toEqual( {
        text      : '',
        sortBy    : 'date',
        startDate : moment().startOf( 'month' ),
        endDate   : moment().endOf(   'month' )
    } );
} );

// now, if we to the terminal, we should see that our first test case passed

// next up, we can go ahead and start testing some of the individual cases the reducer is suppose
// to handle and we will start by testing sortByAmount and sortByDate together

// first up, let's do a test case for sortBy and we want to make sure when we dispatch this
// action sort by actually changes over to amount from default state of date
// TEST CASE #2
test( 'should set sortBy to amount', () => {
    // let's kick things off by creating a const for the state and once again we will simply
    // call the reducer and we will pass in the correct information and we can keep the state at
    // undefined and then we can define our action object and in this case we just need an object
    // with a type value set equal to SORT_BY_AMOUNT
    const state = filtersReducer( undefined, { type : 'SORT_BY_AMOUNT' } );

    // now that we have the above in place, we can make an assertion as to what should come back
    // so we are going to expect the state.sortBy value to be " amount "
    expect( state.sortBy ).toBe( 'amount' );
} );


// now, we going to run the test case for sort by date
// TEST CASE #3
test( 'should set sortBy to date', () => {
    // since the default value is already " date " and to make sure things change, we are going
    // to pass in a state to the filtersReducer()
    // first, let's define the default state or what is the current state value and we will set
    // this equal to an object and were going to define the state before we call the reducer
    // so what is the current state? all we have to do is pick something that makes sense for
    // this test case and we really don't care what the current state values are for text,
    // startDate and endDate and we only care about sortBy and we want to start sortBy off at
    // " amount " so we can watch it change and we would expect amount to change over to date
    // and we can make an assertion to that effect
    const currentState = {
        text      : '',
        sortBy    : 'amount',
        startDate : undefined,
        endDate   : undefined
    };
    // were also going to define the action or what type of action are we dispatching and in this
    // case the type is " type : 'SORT_BY_DATE' "
    const action = { type : 'SORT_BY_DATE' };
    // and we will pass these variables into the filtersReducer()
    const state = filtersReducer( currentState, action );

    // now that we have the above in place, we can make an assertion as to what should come back
    // so we are going to expect the state.sortBy value to be " date "
    // remember, since were not comparing arrays or objects there is no need for toEqual()
    expect( state.sortBy ).toBe( 'date' );
} );

// so we have 3 passing tests at this point in the lecture and if the reducer wasn't working as
// expected we would be notified and having the test suite gives us the freedom to refactor the
// reducer to improve it or increase its speed without worrying about breaking the functionality

// challenge
// set up the following test cases:
// (1) should set text filter and this will make sure that when we do dispatch an action with the
// correct data that the text filter gets set with that data
// (2) should set startDate filter
// (3) should set endDate filter
// we can use undefined for the state value for all 3 test cases and then we need to dispatch the
// correct action with the necessary data and make sure that data equals the state value that comes
// back


// TEST CASE #4
test( 'should set text filter', () => {
    // what do we want to do? we want to make sure the text filter gets set so let's start off
    // by defining the text value
    const text = 'This is my filter';
    // what do we need to pass into the action object? we just need to pass in the text value
    const action = {
        type : 'SET_TEXT_FILTER',
        text : text
    }
    // now call the reducer and pass in undefined for the current state and pass in the action
    // object above for the new action were dispatching
    const state = filtersReducer( undefined, action );

    // now that we have the above in place, we can make an assertion as to what should come back
    // so all we have to do from here is check the values that come back
    // so we are going to expect the state.text value to be " This is my filter "
    expect( state.text ).toBe( 'This is my filter' );
} );



// TEST CASE #5
test( 'should set startDate filter', () => {
    // what do we want to do? we want to make sure the start date filter gets set so let's start
    // off by defining the start date and the instructor just used a value of " moment() "
    const startDate = moment();
    // what do we need to pass into the action object? we just need to pass in the startDate
    // value
    const action = {
        type     : 'SET_START_DATE',
        startDate : startDate
    }
    // now call the reducer and pass in undefined for the current state and pass in the action
    // object above for the new action were dispatching
    const state = filtersReducer( undefined, action );

    // now that we have the above in place, we can make an assertion as to what should come back
    // so all we have to do from here is check the values that come back
    // so we are going to expect the state.startDate value to equal to the startDate variable
    // above and this time we are going to use toEqual() since we are comparing moment instances
    // which are objects
    expect( state.startDate ).toEqual( startDate );
} );



// TEST CASE #6
test( 'should set endDate filter', () => {
    // what do we want to do? we want to make sure the end date filter gets set so let's start
    // off by defining the end date and the instructor just used a value of " moment() "
    const endDate = moment();
    // what do we need to pass into the action object? we just need to pass in the startDate
    // value
    const action = {
        type    : 'SET_END_DATE',
        endDate : endDate
    }
    // now call the reducer and pass in undefined for the current state and pass in the action
    // object above for the new action were dispatching
    const state = filtersReducer( undefined, action );

    // now that we have the above in place, we can make an assertion as to what should come back
    // so all we have to do from here is check the values that come back
    // so we are going to expect the state.endDate value to equal to the endDate variable above
    // and this time we are going to use toEqual() since we are comparing moment instances
    // which are objects
    expect( state.endDate ).toEqual( endDate );
} );

// so at this point we've made assertions about almost everything except our components and
// our expenses reducer and in the next video we will run test cases for the expenses reducer
// and then spend the rest of the section learning about how we can test react 