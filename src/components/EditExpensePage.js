
// IMPORTS
// we need React since we are using JSX
import React from 'react';

// -- Mark 4 --
// step 1 is to connect the EditExpensePage component to the
// redux store so import the named export connect
import { connect } from 'react-redux';
// -----------

// -- Mark 5 --
// now that the expense is accessible, we can take things one step further
// and render the ExpenseForm component within the EditExpensePage component
import ExpenseForm from './ExpenseForm';
import { editExpense } from '../actions/expenses';
// ------------

// -- Mark 7 -- from ExpenseListItem
import { removeExpense } from '../actions/expenses';
// ------------

// -- MARK 3 --
// example component 3
// this is stateless functional component
// way #1 - shorthand version
// took out {}; and the return statement so now implicitly returning jsx
// -----------


const EditExpensePage = ( props ) => {
    // console.log( props );
    // -- Mark 5 --
    // delete " Editing expense with the id of { props.match.params.id } " and include
    // the ExpenseForm component we need to pass in the onSubmit prop to the component
    // and we have access to the expense object just like we had access to it in the
    // AddExpensePage component
    // the next step is to populate the form fields with existing values
    // to get this done we are going to pass in " expense " or type " expense : props.expense "
    // comment out the console.log from above and were going to set up the expense form to do
    // something meaniful with the expense prop
    // -----------

    // ==============================
    // GO TO EXPENSEFORM.JS -- Mark 6 --
    // ==============================

    return (
        <div>
            <ExpenseForm 
                // -- Mark 6 --
                // so the last thing we need to do is to dispatch the action to edit the page
                // and redirect to the Dashboard page
                // remember, we have to import the editExpense action generator
                // the updates are sitting in the expense argument
                // ----------

                // -- Mark 7 -- from ExpenseListItem
                // challenge
                // add the remove expense button that was copied over from
                // EditExpenseList and and dispatch the removeExpense action generator and
                // redirect to the Dashbaord page
                // remember, we do not have an id variable or { id } but we can set it equal
                // to " props.expense.id " and we have access to that expression
                // remember, we do not have to pass in " props " as the argument to the onClick
                // arrow function because already passed in " props " above
                // ------------
                expense ={ props.expense }
                onSubmit={ ( expense ) => {
                    props.dispatch( editExpense( props.expense.id, expense ) );
                    props.history.push( '/' );
                    // console.log( 'updated', expense );
                } }

                // ==============================
                // GO TO EXPENSELISTITEM.JS -- Mark 4 --
                // ==============================
                
            />
            <button 
                onClick={ () => {
                    props.dispatch( removeExpense( { id : props.expense.id } ) );
                    props.history.push( '/' );
                } } 
            >Remove
            </button>
        </div>
    );
};

// way #2 - longhand version
/*
const ExpenseDashBoardPage = () => {
    return (
        <div>
            some text
        </div>
    );
};
*/

// -- Mark 4 --
// we are going to get access to the entire state via the first argument
const mapStateToProps = ( state, props ) => {
    // now, we return an object
    // what do we want off the store?
    // first, we want to be able to give the EditExpensePage component the
    // current expense object
    // now, we're going to be able to access state, which is great because that is
    // where the expenses array lives
    // next, we are going to search the expenses array for an expense whose id matches
    // the " props.match.params.id " above
    // but how do we have access to the props argument?
    // we actually have access to the props argument as the second argument above, which
    // would come after the state argument
    // with the filter method and if the returned value equals true then the item / expense
    // stays in the array and if returned value equals false then the item / expense is removed
    // from the array
    // so we can take some of the current props that were passed into the higher order component
    // and we can use them to calculate new props that we want to include in mapStatetoProps and
    // the EditExpensePage component
    // so react router renders our higher order compoent, which we get from typing
    // " export default connect( mapStateToProps )( EditExpensePage ); "
    // and the HOC passes the props through ( both here in mapStateToProps and in the
    // EditExpensePage component ) and it also allows us to add on some new props ( i.e. expense
    // below )
    // we return an object below
    // were adding one new prop called " expense "
    // so above when we run console.log( props ) within the EditExpensePage component we will see
    // that we have a new prop ( within the props object ) called " expense " and this prop contains
    // the current expense object with all of its key value pairs ( for example, description : "Rent" )
    // in the console we see that the props object contains its own set of props besides the " expense "
    // prop and these other props include dispatch, history, location and match
    return {
        // from MDN: " The find() method returns the value of the first element in the array ( in our case,
        // the first expense item ) that satisfies ( i.e. equals true ) the provided testing function.
        // Otherwise undefined is returned. "
        // the code below will find the current expense object ( i.e expense ) and we can use " expense " in
        // the EditExpensePage compnent above
        expense : state.expenses.find( ( expense ) => props.match.params.id === expense.id )
        // also, using filter below resulted in an array of one item being returned ( the right item by the
        // way ) whereas using find resulted in an object being returned
        // why is this?  from stackoverflow: " because array.filter always returns an array (array of all
        // the filtered items), use array.find to get the single object. "
        // expense : state.expenses.filter( ( expense ) => props.match.params.id === expense.id )
    };

};

// now that we connected the EditExpensePage component to the store we have
// access to props.dispatch
export default connect( mapStateToProps )( EditExpensePage );

// -----------


// ==============================
// GO TO -- Mark 5 --
// ==============================