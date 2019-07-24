
// ==============================
// COMING FROM TESTS/COMPONENTS/EXPENSELIST.TEST.JS
// ==============================

// -- Mark 1 --
// lecture 120: Snapshot Testing with Dynamic Components
// first, let's import the things we need
// and will need react since we are going to be using a little bit of jsx inside this file
import React from 'react';
// we will shallow render our component
import { shallow } from 'enzyme';
// import the ExpenseListItem component and remember this is a default export
import ExpenseListItem from '../../components/ExpenseListItem';
// we are going to be using the expenses array from fixtures/expenses.js so need to import
// the dummy expenses data
import expenses from '../fixtures/expenses';

// these are the imports we need to snapshot the ExpenseListItem component
// let's create a new test
// so were going to see what happens when we render the ExpenseListItem component with the given
// expenses
// TEST CASE #1
test( 'should render ExpenseListItem with expense item #2', () => {
    // now were going to render the component with that data and make an assertion about it
    // using the snapshot functionality
    // so create a const called wrapper and we are going to get the wrapper value from whatever
    // comes back from calling shallow() and we are going to call shallow with the jsx that we
    // would like to render and in this case, we are going to render an instance of the
    // ExpenseListItem component and this component requires the id, description, amount and
    // createdAt values from one expense item, which in our case will be the second expense item
    // from the fixtures/expenses.js file

    // by destructuring expense item #2, we are able to get the 4 required values off of the
    // object
    const wrapper = shallow( <ExpenseListItem { ...expenses[ 1 ] } /> );

    // now that we have the actual rendered component, what we need to do is set up a snapshot
    // so I am going to expect something about the wrapper and I will expect the wrapper to
    // match the snapshot and remember the first time we run this test case there is no existing
    // snapshot so the test can never actually fail and will go through the process of creating
    // a new snapshot file for this test file
    expect( wrapper ).toMatchSnapshot();
} );

// now if we ever make any changes to the component we will be alerted because we now have a
// snapshot tracking this component

// there are 2 more components we want to write snapshot tests for and those 2 components are:
// the ExpenseDashBoardPage component and the NotFoundPage component and we will be adding
// snapahots for both of these before the end of the video and these snapshots will be very similar
// to our Header component snapshot and it is a very simple setup, we just render the component with
// no props and we make a snapshot assertion about it so the instructor wants me to create test
// cases for both of these components and again the 4 steps are:
// step 1: create a test file and
// step 2: grab the necessary imports and
// step 3: we will create a test case that renders the actual component and we will render
// both components with no props
// step 4: create the snapshot
// and then go into the snapshots folder and make sure both snapshots look good 


// ==============================
// GO TO TESTS/COMPONENTS/EXPENSEDASHBOARDPAGE.TEST.JS -- MARK 1 --
// ==============================
