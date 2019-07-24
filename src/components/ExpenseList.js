
// -- Mark 2 --
// lecture 101: Connecting Store and Component with React-Redux

import React from 'react';
import { connect } from 'react-redux';


// BEGINNING OF -- Mark 5 --
import ExpenseListItem from './ExpenseListItem';
import getVisibleExpenses from '../selectors/expenses';

// change { props.expenses.length } below to { props.expenses.map }


// we going to be using the connect function in all of
// our inidividual components and connect will help those
// components that (1) need to dispatch actions to the store
// or (2) read from the store
// for now, were just going to focus on reading from the store
// go to -- Mark 4 --


// then we can create the stateless functional component
// and implicitly return some jsx

// below we are using the spread operator to spread out all
// the properties we are using or all the properties in the individual expense,
// which includes description, amount, createdAt, note and id
// and using the spread operator below or { ...expense } allows us to use destructuring
// in the component argument in the ExpenseListItem.js file

// -- Mark 6 --
// lecture 120: Snapshot Testing with Dynamic Components
// we need to test the unconnected version of the ExpenseList component so were going to
// need to export the below component or change " const ExpenseList = ( props ) => ( "
// to " export const ExpenseList = ( props ) => ( " and now we have 2 components being exported
// from this file ( the unconnected one below and the connected one located at the bottom of this
// file ) and the unconnected one will be used in our test cases and the connected one is used in
// the app itself and now what we are going to do is import the unconnected component and do some
// sanpshot testing and passing data in to make sure it works as expected

// END OF -- Mark 6 --
// --------------------------------------------------------------
// -- GO TO EXPENSELIST.TEST.JS -- MARK 1


// -- Mark 7 --
// lecture 120: Snapshot Testing with Dynamic Components
// we deleted " <h1>Expense List</h1> " the h1 tag below
export const ExpenseList = ( props ) => (
    // set up some conditional rendering below the <div> tag using the ternary operator
    <div>
        {
            props.expenses.length === 0 ? (
                <p>No expenses</p>
            ) :
            (
                props.expenses.map( ( expense ) => {
                    return  <ExpenseListItem key={ expense.id } { ...expense } />
                })             
            )
        }
    </div>
);

// now if we rerun the test suite we see the above test case is still passing and why is it still
// passing? because the rendered output is still the same and now let's add a snapshot for when
// there are no items or when the expenses array is empty and make sure that works as expected
// END OF -- Mark 7 --
// --------------------------------------------------------------
// -- GO TO EXPENSELIST.TEST.JS -- MARK 2


// could have done it this way instead of the way above
// ** way #2 **
// way #2 below works with way #2 in the ExpenseListItem.js file but does not work properly
// with way #1 in ExpenseListItem.js
/*
const ExpenseList = ( props ) => (
    <div>
        <h1>Expense List</h1>
        { props.expenses.map( ( expense ) => {
            return  <ExpenseListItem key={ expense.id } expense={ expense } />
        }) }
    </div>
);
*/

// to wrap this video up, we want to implement our selector

// change mapStateToProps
// we will call getVisibleExpenses() and the return value is what we will
// show to the screen
const mapStateToProps = ( state ) => {
    // this results in " water bill2 "
    // remember, getVisibleExpenses() returns an expenses array and inside the array we have 
    // expense objects and these expense objects are the ones that passed the filtering tests
    // that were ran in the getVisibleExpenses function
    return {
        expenses : getVisibleExpenses( state.expenses, state.filters )
    };
};

export default connect( mapStateToProps )( ExpenseList );

// in the next lecture, we will explore how we change data
// or how do I change the filters, for example, from the user interface 

// END OF -- Mark 5 --
// --------------------------------------------------------------


// -- Mark 4 --

// ==============================
// WAY #1
// ==============================

// create a new const for the higher order component
// for connected components we put the word Connected in front
// of the component name
// were going to call the connect function, similar to how
// we called withAdminWarning( Info ); and
// requireAuthentication( Info ); in the previous video
// to create our own higher order components
// however, what we get back from connect() is not a higher order
// component so to get back a HOC, we have to do:
// connect()( ExpenseList ) and inside the connect() we provide
// the information about what we want to connect
/*
const ConnectedExpenseList = connect( ( state ) => {
    // within connect, we define a function and this function lets
    // us determine what information from the store we want our component
    // to be able to access and (1) state get passed in as the first argument
    // above and (2) we return an object and the on the object we can put
    // any key value pairs we like and usually they will be key value pairs
    // from the state but we could just do name : 'Andrew' and now the
    // ConnectedExpenseList component will have access to the name prop and
    // the ExpensesList component above will have access the name prop

    // change " export default ExpenseList; " below to
    // " export default ConnectedExpenseList; "

    // change " name : 'Andrew' " to " expenses: state.expenses " and
    // now our ExpenseList component has access to information from
    // the store

    // now, we just connected our first react component ( i.e. ExpenseList )
    // to the redux store
    // { prop.expenses.length } above results in 2 printed to the screen
    return {
        expenses : state.expenses
    };
})( ExpenseList );


export default ConnectedExpenseList;


// ==============================
// WAY #2
// ==============================

// however, the pattern we will see most often looks like:
export default connect( ( state ) => {
    // within connect, we define a function and this function lets
    // us determine what information from the store we want our component
    // to be able to access and (1) state get passed in as the first argument
    // above and (2) we return an object and the on the object we can put
    // any key value pairs we like and usually they will be key value pairs
    // from the state but we could just do name : 'Andrew' and now the
    // ConnectedExpenseList component will have access to the name prop and
    // the ExpensesList component above will have access the name prop

    // change " export default ExpenseList; " below to
    // " export default ConnectedExpenseList; "

    // change " name : 'Andrew' " to " expenses: state.expenses " and
    // now our ExpenseList component has access to information from
    // the store

    // now, we just connected our first react component ( i.e. ExpenseList )
    // to the redux store
    // { prop.expenses.length } above results in 2 printed to the screen
    return {
        expenses : state.expenses
    };
})( ExpenseList );
*/


// ==============================
// WAY #3
// ==============================


// also, a common pratice to take the above function and break it out
// into it's own variable called mapStateToProps, for example:
// commnet out mapStateToProps since we change it above under -- Mark 5 --
/*
const mapStateToProps = ( state ) => {
    // this results in " water bill2 "
    return {
        expenses : state.expenses,
        filters  : state.filters
    };
};

export default connect( mapStateToProps )( ExpenseList );
*/

// if you look at real code bases that use react and redux, WAY #3 is
// what you are going to see
// so were (1) going to see OUR REGULAAR UNCONNECTED COMPONENT
// ( i.e. ExpenseList ) and (2) were going to see SOME FUNCTIONS
// like mapStateToProps and then (3) were going to see A CALL TO CONNECT
// at the bottom that actually pulls all this together

// and the end result is our component can access whatever data it needs
// from the store

// so it's important to note that once you connect a component to the
// redux store it's reactive, which means that as the store changes
// your component is going to get rerendered with those new values
// and this is fantastic since it allows us to create very simple
// components or in other words, the ExpenseList component doesn't need
// to worry about using store.subscribe or store.getState instead state
// is managed automatically by react redux and all we have to do is define
// how we want to render things

// our ExpenseList component above is a very simple presentational
// component and the goal is to get as many of our components into
// the presentational component pattern as possible

// lecture recap: in this video, we did 2 important things: (1) we set
// up Provider inside the root of our application and let us define
// the store that we want to provide to all of our components
// the code below will not change throughout the rest of the course
/*
const jsx = (
    <Provider store={ store }>
        <AppRouter />
    </Provider>
);


ReactDOM.render( jsx, document.getElementById( 'app' ) );
*/

// (2) we created new higher order components using the connect function
// provided from react redux
// we call connect and then define the things we want to get off the store
// ( i.e. mapStateToProps ) and then we define the component we want to
// connect ( i.e. ExpenseList ) and the end result is a brand new
// component which is just our component ( i.e ExpenseList ) with the props
// from the store
// this will allow us to create simple components and scale our application
// without worrying about putting all the glue into our code



// ==============================
// GO TO EXPENSEDASHBOARDPAGE.JS -- Mark 3 --
// ==============================



// ==============================
// GO TO APP.JS -- Mark 4 --
// ==============================



// -- Mark 5 --

// remove { prop.filters.text } from the ExpenseList component
// since that was for demostration purposes

// we want to use map to iterate over the expense array and we want to render
// a new instance of an expense list item component for each expense

// we will create a new component called ExpenseListItem.js

// ==============================
// GO TO EXPENSELISTITEM.JS -- Mark 1 --
// ==============================

