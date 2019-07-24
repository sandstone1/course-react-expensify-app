
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


// -- Mark 8 --
// lecture 125: Testing EditExpensePage
// first, refactor the ExitExpensePage component to be a class based component
// and this will allow us to change the inline functions to methods inside the class based
// component and therefore, we will not need to redefine every single time the component
// gets rendered
// second, we are going to set up mapDispatchToProps and in this case, we will be setting
// up 2 things: exitExpense and removeExpense and this will make it easier to use spies in
// our test cases
// third, we need to write the test cases and there will be 3 test cases and first up,
// " should render EditExpensePage " and that is an easy one and we will just use a
// snapshot to test that and the next one is " should handle editExpense " and this one
// will require us to use spies and we will be triggering things and making sure the
// spies actually got called and the last one is " should handle removeExpense " and
// and we will be using spies in this test case as well and the first test is similar to the
// first test case in AddExpensePage.test.js and the second and third test are similar to the
// TEST CASE #2 in AddExpensePage.test.js and we can also use beforeEach() if we want to and

// THIS IS OUR NEW CLASS BASED COMPONENT
export class EditExpensePage extends React.Component {

    onSubmit = ( expense ) => {
        // even when using ES6 class properties, we are still able to access component
        // properties if needed ( from Medium article: " Use class properties to clean
        // up your classes and React components " )
        // change this.props.dispatch( editExpense( this.props.expense.id, expense ) );
        // to this.props.editExpense( this.props.expense.id, expense );
        this.props.editExpense( this.props.expense.id, expense );
        // remember, the components we render inside react router get access to a bunch
        // of special props; such as dispatch, history, location and match
        this.props.history.push( '/' );
    };

    onRemove = () => {
        // change this.props.dispatch( removeExpense( id, this.props.expense.id ) );
        // to this.props.removeExpense( id, this.props.expense.id );
        this.props.removeExpense( { id : this.props.expense.id } );
        this.props.history.push( '/' );
    };

    render() {
        return (
            <div>
                <ExpenseForm 
                    expense ={ this.props.expense }
                    onSubmit={ this.onSubmit }
                />
                <button 
                    onClick={ this.onRemove } 
                >Remove
                </button>
            </div>
        );
    }

}
// -- GO TO -- Mark 8 -- BELOW



// THIS IS THE OLD STATELESS FUNCTIONAL COMPONENT
// in lecture 125, we switched to a classed based component and commented out this stateless
// functional component
/*
const EditExpensePage = ( props ) => {
    // console.log( props );
    // -- Mark 5 --
    // delete " Editing expense with the id of { props.match.params.id } " and include
    // the ExpenseForm component and we need to pass in the onSubmit prop to the component
    // and we have access to the expense object just like we had access to it in the
    // AddExpensePage component
    // the next step is to populate the form fields with existing values
    // to get this done we are going to pass in " expense " or type " expense : props.expense "
    // and remember " props.expense " equals the expense object with the correct id, which we
    // derived from the MapStateToProps() function below
    // comment out the console.log from above and were going to set up the expense form to do
    // something meaningful with the expense prop
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
                // remember, we do not have to pass in " props " as the argument to the onSubmit
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
*/

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
    // prop and these other props include dispatch, history, location and match and we are going to
    // be using the props argument passed in as the second argument above to search the expenses array
    return {
        // from MDN: " The find() method returns the value of the first element in the array ( in our case,
        // the first expense item ) that satisfies ( i.e. equals true ) the provided testing function.
        // Otherwise undefined is returned. "
        // the code below will find the expense object ( i.e expense ) that matches the testing function
        // below ( " props.match.params.id === expense.id " ) and we can use " expense " in the
        // EditExpensePage component above
        expense : state.expenses.find( ( expense ) => props.match.params.id === expense.id )
        // also, using filter below resulted in an array of one item being returned ( the right item by the
        // way ) whereas using find resulted in an object being returned
        // why is this?  from stackoverflow: " because array.filter always returns an array (array of all
        // the filtered items), use array.find to get the single object. "
        // expense : state.expenses.filter( ( expense ) => props.match.params.id === expense.id )
    };

};




// -- Mark 8 --
// lecture 125: Testing EditExpensePage
// add ownProps as the second argument below and refer to
// https://react-redux.js.org/using-react-redux/connect-mapdispatch for more information
const mapDispatchToProps = ( dispatch, ownProps ) => ( {
    // editExpense will dispatch whatever comes back from the editExpense action generator and does
    // data need to flow between the argument and the editExpense action generator? yes, we can see
    // from above that we need an id and an expense value
    editExpense   : ( id, expense ) => dispatch( editExpense( id, expense ) ),
    // for remove expense, we will take the ownProps that come in and then pass the ownProps down to
    // the removeExpense() call
    removeExpense : ( ownProps ) => dispatch( removeExpense( ownProps ) )
} );



// now that we connected the EditExpensePage component to the store we have
// access to props.dispatch
// need to add mapDispatchToProps as the second argument below
export default connect( mapStateToProps, mapDispatchToProps )( EditExpensePage );

// END OF -- Mark 8 --


// ==============================
// GO TO -- Mark 5 --
// ==============================