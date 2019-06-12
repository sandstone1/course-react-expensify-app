
// IMPORTS
// we need React since we are using JSX
import React from 'react';
// -- Mark 3 --
import ExpenseForm from './ExpenseForm';
// -- Mark 5 --
import { connect } from 'react-redux';
// -- Mark 5 --
import { addExpense } from '../actions/expenses';


// -- MARK 2 --
// example component 2
// this is stateless functional component
// way #1 - shorthand version
// took out {}; and the return statement so now implicitly returning jsx

// -- Mark 3 --
// add the ExpenseForm component below

// -- Mark 4 --
// here we pass the data up from the ExpenseForm component and this will
// allow us to determine what to do with the data when the user submits the
// form and do so on a dynamic basis so for this component we can dispatch
// the addExpense action and for the EditExpensePage component we can dispatch
// the editExpense action generator

// below we will provide a single prop or onSubmit and the onSubmit function
// gets called when we submit the form with valid data and in this case we
// will get the expense object back with all the properties we would expect
// ( i.e. description, note, amount and createdAt ) and we created these properties
// and their values in the ExpenseForm component and so we created the expense
// object below in the ExpenseForm component and did so with this.props.onSubmit({});


// ==============================
// GO TO EXPENSEFORM.JS -- Mark 5 --
// ==============================


// -- Mark 5 --
// the AddExpensePage component needs to be able to dispatch the given action
// to the redux store and this means we need to import the named export connect
// and remember we want to connect the AddExpensePage component to the store
// so we can dispatch
// we also have to import in the addExpense action generator in order to be able
// to use it below

// the last thing were going to do in this video is automate the redirect to the
// Dashboard page or the ExpenseDashboardPage component so when we submit the add
// expense form we get redirected to the Dashbaord page automatically
// how do we do the redirect? answer => the components we render inside react router
// get access to a bunch of special props; for example, if I use react dev tool tab
// I can see that the AddExpensePage component gets access to the props: dispatch,
// history, location and match
// and what we are going to do is use one of the history methods called push and
// push is how we can programatically change pages and push does take a single
// argument which is the path so if we wanted to go to the help page we would type
// ' /help ' so below we type " props.history.push( '/' ); " to be redirected
// to the dashboard page and our redirect will use browser routing and will not
// result in a full page refresh so now test that the component below works
// and with the push method a user can use the back button to go back a page
// so the push method is just like if a user clicked on a link

// recap: we validation, we have our date picker, we have automatic redirect
// and we have a reusable component in the ExpenseForm component
// also, we passed the data ( description, note, amount and createdAt ) out of
// the ExpenseForm component and into the AddExpensePage component and we did
// that by calling a prop that gets passed in from the parent ( i.e. onSubmit )
// and we called the prop inside the ExpenseForm component by typing
// " this.props.onSubmit({  }); " and we used " this.props.onSubmit " because
// the ExpenseForm component is a class based component and not a stateless
// functional component and we did it this way because we want to reuse the
// ExpenseForm component on both the AddExpensePage and the EditExpensePage and
// since these pages dispatch different actions we've extracted that away from
// the ExpenseForm component and put the dispatch call into the AddExpensePage
// and the EditExpensePage

// -------------

const AddExpensePage = ( props ) => (
    <div>
        <h1>Add Expense</h1>
        <ExpenseForm
            onSubmit={ ( expense ) => {
                props.dispatch( addExpense( expense ) );
                props.history.push( '/' );
            } }
        />
    </div>
);

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

// -- Mark 5 --
// we don't need anything from the state so we can leave the first () empty
// and now that we connected the AddExpensePage component to the store we have
// access to props.dispatch so above we need to add the props object as the
// argument to the AddExpensePage component above
export default connect()( AddExpensePage );