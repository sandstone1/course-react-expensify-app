
import React from 'react';
import { shallow } from 'enzyme';
// remember, to import the named export or unconnected version of the EditExpensePage component
import { EditExpensePage } from '../../components/EditExpensePage';
import expenses from '../fixtures/expenses';


// TEST CASE #1
test( 'should render EditExpensePage correctly', () => {

    // set up all of our spies
    const editExpenseSpy        = jest.fn();
    const historySpy            = { push : jest.fn() };
    const startRemoveExpenseSpy = jest.fn();

    // remember, since were working with the EditExpensePage component, we need to pass
    // in an expense so we can do a real test and let's use one of our fixture expenses and
    // now we have our component rendered
    const wrapper = shallow(
        <EditExpensePage
            editExpense        = {        editExpenseSpy }
            history            = {            historySpy }
            startRemoveExpense = { startRemoveExpenseSpy }
            expense            = {         expenses[ 2 ] }
        /> 
    );

    // so we will expect something about the wrapper that we just initialized above and we
    // will expect the wrapper to match the snapshot
    expect( wrapper ).toMatchSnapshot();
} );

// if we go to the terminal, we see that this test case is passing


// TEST CASE #2
test( 'should handle editExpense', () => {

    // set up all of our spies
    const editExpenseSpy        = jest.fn();
    const historySpy            = { push : jest.fn() };
    const startRemoveExpenseSpy = jest.fn();

    // remember, since were working with the EditExpensePage component, we need to pass
    // in an expense so we can do a real test and let's use one of our fixture expenses and
    // now we have our component rendered
    const wrapper = shallow(
        <EditExpensePage
            editExpense        = {        editExpenseSpy }
            history            = {            historySpy }
            startRemoveExpense = { startRemoveExpenseSpy }
            expense            = {         expenses[ 2 ] }
        /> 
    );

    // let's find the ExpenseForm and then what are we going to do? we are going to access one of
    // the props on the ExpenseForm component using prop and the prop were going to access 
    // is onSubmit and then the argument to onSubmit will be expense item #3 in our example
    // since we will call onSubmit with the exact same argument as it's called in the real world
    // and the argument it is called with in the real world is an expense object or in our case
    // expense item #3
    wrapper.find( 'ExpenseForm' ).prop( 'onSubmit' )( expenses[ 2 ] );

    // so at this point we have successfully run the following code:
    /*
    onSubmit = ( expense ) => {
        this.props.editExpense( this.props.expense.id, expense );
        this.props.history.push( '/' );
    };
    */
    // we can use spies below to make sure the correct data was passed into history.push() and
    // editExpense()
    // so now we can make some assertions, checking that both of our spies were called with the
    // correct information and we will start with historySpy.push and historySpy is a spy
    expect( historySpy.push ).toHaveBeenLastCalledWith( '/' );
    // next we will move on to the other assertion, which will be for editExpense and here we
    // will make an assertion as to what the editExpenseSpy got called with
    expect( editExpenseSpy ).toHaveBeenLastCalledWith( expenses[ 2 ].id, expenses[ 2 ] );
} );

// if we go to the terminal, we see that this test case is passing


// TEST CASE #3
test( 'should handle startRemoveExpense', () => {

    // set up all of our spies
    const editExpenseSpy        = jest.fn();
    const historySpy            = { push : jest.fn() };
    const startRemoveExpenseSpy = jest.fn();

    // remember, since were working with the EditExpensePage component, we need to pass
    // in an expense so we can do a real test and let's use one of our fixture expenses and
    // now we have our component rendered
    const wrapper = shallow(
        <EditExpensePage
            editExpense        = {        editExpenseSpy }
            history            = {            historySpy }
            startRemoveExpense = { startRemoveExpenseSpy }
            expense            = {         expenses[ 2 ] }
        /> 
    );

    // let's find the button and then what are we going to do? we are going to simulate a click
    // event and we would have added an argument to the click event
    // ( i.e. simulate( 'click' )( argument ) ) if there was an argument but since there is no argument
    // we just simualte the click event
    // this works too: " wrapper.find( 'button' ).prop( 'onClick' )(); "
    wrapper.find( 'button' ).simulate( 'click' );

    // so at this point we have successfully run the following code:
    /*
    onRemove = () => {
        this.props.removeExpense( { id : this.props.expense.id } );
        this.props.history.push( '/' );
    };
    */
    // we can use spies below to make sure the correct data was passed into history.push() and
    // removeExpense()
    // so now we can make some assertions, checking that both of our spies were called with the
    // correct information and we will start with historySpy.push and historySpy is a spy
    expect( historySpy.push ).toHaveBeenLastCalledWith( '/' );
    // next we will move on to the other assertion, which will be for removeExpense and here we
    // will make an assertion as to what the removeExpenseSpy got called with
    expect( startRemoveExpenseSpy ).toHaveBeenLastCalledWith( { id : expenses[ 2 ].id } );
} );

// if we go to the terminal, we see that this test case is passing