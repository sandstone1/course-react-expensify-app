

import React from 'react';
// import the named export shallow from enzyme
import { shallow } from 'enzyme';
// remember, to import the named export or unconnected version of the ExpenseListFilters component
import { ExpenseSummary } from '../../components/ExpenseSummary';
// were also going to need the fixture data
import expenses from '../fixtures/expenses';



// TEST CASE #1
test( 'should corrently render ExpenseSummary with 1 expense', () => {
    // remember, since were working with the ExpenseSummary component, we need to pass
    // in expenseCount and expenseTotal
    const wrapper = shallow( <ExpenseSummary expenseCount = { 1 } expenseTotal = { 235 } /> );

    // now that we have our component rendered we will expect something about the wrapper that
    // we just initialized above and we will expect the wrapper to match the snapshot
    expect( wrapper ).toMatchSnapshot();
} );

// if we go to the terminal, we see that this test case is passing


// TEST CASE #2
test( 'should corrently render ExpenseSummary with mulitple expense', () => {
    // remember, since were working with the ExpenseSummary component, we need to pass
    // in expenseCount and expenseTotal
    const wrapper = shallow( <ExpenseSummary expenseCount = { 2 } expenseTotal = { 235 } /> );

    // now that we have our component rendered we will expect something about the wrapper that
    // we just initialized above and we will expect the wrapper to match the snapshot
    expect( wrapper ).toMatchSnapshot();
} );

// if we go to the terminal, we see that this test case is passing


// our snapshot file looks good as well
/*

// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`should corrently render ExpenseSummary with 1 expense 1`] = `
<div>
  <h1>
    Viewing 
    1
     
    expense
     totaling 
    $2.35
  </h1>
</div>
`;

exports[`should corrently render ExpenseSummary with mulitple expense 1`] = `
<div>
  <h1>
    Viewing 
    2
     
    expenses
     totaling 
    $2.35
  </h1>
</div>
`;

*/