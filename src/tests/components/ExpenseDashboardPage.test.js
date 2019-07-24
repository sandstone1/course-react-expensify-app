
// ==============================
// COMING FROM TESTS/COMPONENTS/EXPENSELISTITEM.TEST.JS
// ==============================

// -- Mark 1 --
// lecture 120: Snapshot Testing with Dynamic Components
// first, let's import the things we need
// and will need react since we are going to be using a little bit of jsx inside this file
import React from 'react';
// we will shallow render our component
import { shallow } from 'enzyme';
// import the ExpenseListItem component and remember this is a default export
import ExpenseDashboardPage from '../../components/ExpenseDashboardPage';

// TEST CASE #1
test( 'should render ExpenseDashboardPage correctly', () => {
    const wrapper = shallow( <ExpenseDashboardPage /> );
     expect( wrapper ).toMatchSnapshot();
} );

// now check the terminal to make sure that this test case passes and check the snapshot file to make
// sure that everything looks Ok


// ==============================
// GO TO TESTS/COMPONENTS/NOTFOUNDPAGE.TEST.JS -- MARK 1 --
// ==============================
