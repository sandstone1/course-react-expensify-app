
// -- Mark 1 --
// lecture 120: Snapshot Testing with Dynamic Components
// first, let's import the things we need
// and will need react since we are going to be using a little bit of jsx inside this file
import React from 'react';
// we will shallow render our component
import { shallow } from 'enzyme';
// import the unconnected ExpenseList component and this will be a named export
import { ExpenseList } from '../../components/ExpenseList';
// we are going to be using the expenses array from fixtures/expenses.js so need to import
// the dummy expenses data
import expenses from '../fixtures/expenses';

// these are the imports we need to snapshot the ExpenseList component
// let's create a new test
// so were going to see what happens when we render the ExpenseList component with the given
// expenses
// TEST CASE #1
test( 'should render ExpenseList with expenses', () => {
    // now were going to render the component with that data
    // so create a const called wrapper and we are going to get the wrapper value from whatever
    // comes back from calling shallow() and we are going to call shallow with the jsx that we
    // would like to render and in this case, we are going to render an instance of the
    // ExpenseList component and this component requires an array so we will pass one in and
    // this component expects the expenses prop and we will set this prop equal to the expenses
    // test data from fixtures/expenses.js
    const wrapper = shallow( <ExpenseList expenses={ expenses } /> );

    // now that we have the actual rendered component, what we need to do is set up a snapshot
    // so I am going to expect something about the wrapper and I will expect the wrapper to
    // match the snapshot and remember the first time we run this test case there is no existing
    // snapshot so the test can never actually fail and will go through the process of creating
    // a new snapshot file for this test file
    expect( wrapper ).toMatchSnapshot();
} );

// let's go ahead and check the terminal and the test suite and we will see one new snapshot has
// been added and is passing and we can see that we have a new snapshot file in
// components/__snapshot__/ExpenseList.test.js.snap and if open this file we will see our
// test name or " should render ExpenseList with expenses " and we have our output or the 3
// expenses from fixtures/expenses.js and so this file contains the snapshot for the ExpenseList
// component and if this component ever changes we will get notified; for example, say we got
// deleted " <h1>Expense List</h1> " from the ExpenseList component then we will get an error
// in the terminal saying that one of our snapshot tests failed and we can look through the
// changes and see if those are changes that we actually wanted to make and if we are Ok with
// the changes then we can press the " u " key and we are back to a passing test suite

// we could also create a test case to see what happens when we have no expenses


// ==============================
// GO TO TESTS/COMPONENTS/EXPENSELIST.JS -- Mark 7 --
// ==============================


// ==============================
// BACK FROM TESTS/COMPONENTS/EXPENSELIST.JS
// ==============================
// -- Mark 2 --
// TEST CASE #2
test( 'should render ExpenseList with empty message', () => {
    // copied the 2 lines of code from test case #1 above
    // the only thing we are going to change is the following: " expenses={ expenses } "
    // to expenses={ [] } so our expenses property will equal an empty array and we will
    // see what happens when we pass in an empty array and when we go to the terminal
    // we will see that the snapshot failed and if I press " u " then the test suite will recaluate
    // and then show that all test cases are passing
    const wrapper = shallow( <ExpenseList expenses={ [] } /> );

    expect( wrapper ).toMatchSnapshot();    
} );

// and within our snapshot file we now have the following output:
/*
exports[`should render ExpenseList with empty message 1`] = `
<div>
  <p>
    No expenses
  </p>
</div>
`;
*/
// or a message saying " no expenses ", which is what we expected to happen so now we have 2 test
// cases, one test case that verifies that when there are expenses they show up and another test
// case that verfies when there are no expenses we get an error message

// so now I will be testing ExpenseListItem as part of this lecture's challenge and the
// ExpenseListItem component is very similar to ExpenseList and ExpenseListItem takes some data in
// and then renders something and all we want to do is add a snapshot for what it renders and that
// will allow us to track changes to the component over time so how are we going to get this done?
// step 1: create a test file and
// step 2: grab the necessary imports and
// step 3: we will create a test case that renders the actual component and we will render
// ExpenseListItem with one of the fixture expenses and then
// step 4: create the snapshot
// and we only need to do one snapshot test, there is no need to do multiple snapshot tests and
// can refer to the Header component and the ExpenseListItem component and be sure the check the
// snapshot output to make sure it is correct



// ==============================
// GO TO TESTS/COMPONENTS/EXPENSELISTITEM.TEST.JS -- MARK 1 --
// ==============================





