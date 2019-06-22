
// -- Mark 1 --

// challange
// (1) we want to export a stateless functional component
// and this component will render a few pieces of information
// about the individual expense and those pieces are: (a) description
// (b) amount and (c) createAt value

// import react since we are using some jsx
import React from 'react';
// -- Mark 2 --
// -- Mark 4 -- from EditExpensePage
// comment out the connect and removeExpense named exports below
// ------------
// import {       connect } from         'react-redux';
// import { removeExpense } from '../actions/expenses';
// -----------

// ==============================
// GO TO EDITEXPENSEPAGE.JS -- Mark 7 --
// ==============================

// -- Mark 3 --
// lecture 108: Wiring up Edit Expense
// import the named export Link
import {          Link } from 'react-router-dom';
// -----------

// -- Mark 5 --
import moment from 'moment';
import numeral from 'numeral';
// ------------



// we will implicitly return some jsx
// we are going to destructure the props object or props.expense and get the individual
// values off of it
// this works     => const ExpenseListItem = ( { description, amount, createdAt } = props )
// this works too => const ExpenseListItem = ( { description, amount, createdAt } = props.expense )
const ExpenseListItem = ( { dispatch, id, description, amount, createdAt } ) => (
    
    // -- Mark 2 -- 
    // from ExpenseListFilters.js
    // challange lecture 103
    // create a remove list item button below
    // the remove button will dispatch an action when it get clicked
    // so we will (1) need to import the correct action generator from the actions/expenses.js
    // file and (2) we are going to have to connect this component in order to access dispatch and
    // (3) we going to have to wire up onClick to get everything working correctly

    // in the argument above, we continue to use destructuring and grab dispatch and id
    // remember, all removeExpense needs is the id and id was passed in above as one of the
    // arguments
    // remember, we set up the removeExpense action generator to take an object with the id
    // value inside the object so we need to set this up below in order to make our action
    // generator work properly
    // we could do { id : id } or just use the ES6 shorthand way ( i.e. { id } )

    // lecture 103 recap
    // more of our components are communicating with the redux store, which us great
    // we are going to continue going through this process focusing on the filters in
    // the next video

    // -- Mark 3 --
    // lecture 108: Wiring up Edit Expense
    // need to template string inside the Link and interpolate the id variable by typing ${}

    // ==============================
    // GO TO EDITEXPENSEPAGE.JS -- Mark 4 --
    // ==============================

    // ------------

    // -- Mark 4 -- from EditExpensePage
    // challange
    // remove the button below and copy it into the EditExpensePage component and remove the
    // related imports above and the connect function below since we no longer need the connect
    // function
    // -----------

    // -- Mark 5 --
    // lecture 138: New Feature Workflow
    // move amount and createdAt onto their own lines
    // first, we're going to focus on formatting createdAt with moment and need to import moment
    // above and below we need to change { createdAt } to { moment(createdAt).format( 'MMMM Do, YYYY' ) }
    // and this will create a moment instance with our timestamp as the argument and then we add
    // in the format method with the follwoing string: 'MMMM Do, YYYY'

    // next up, we need to format amount and were going to be using a library that will make it really
    // easy to format currency and the library's name is numeral.js and we find information on this
    // library at numeraljs.com and the website says that Numeral.js is a " A javascript library for
    // formatting and manipulating numbers. " so below we will need to change { amount } to
    // { numeral( amount / 100 ).format( '$0,0.00' ) } and we had to devide amount by 100 to convert
    // cents to dollars
    // and we will call numeral and pass out amount in as the argument which will give us our numeral
    // instance and then we will call the format method with the pattern we want to use

    // now go to the expensify site and make sure the amount and time are showing correctly and
    // now that everything is working correctly, we can shut down the dev-server and make a commit
    // but first run 
    
    // " git status "
    
    // to get an overview of what we've changed and then we can make
    // the commit by typing:
    
    // " git commit -a -m "Set up formatting for amount and createdAt" "
    
    // and can go straight to making a commit since we only have files with modified changed and no
    // untracked files and then we can push our changes to github by typing:

    // " git push "

    // and once our changes are in our github remote repository then we can push our changes to Heroku
    // and deploy our code on the web and do this we type:

    // " git push heroku master "

    // and once the code is up on the Heroku servers Heroku will incorporate our latest changes and
    // redeploy the application
    <div>
        <Link to={ `/edit/${ id }` }>
            <h3>{ description }</h3>
        </Link>
        <p>
            { numeral( amount / 100 ).format( '$0,0.00' ) }
            -
            { moment(createdAt).format( 'MMMM Do, YYYY' ) }
        </p>
    </div>
    // -----------
);

// could have done it this way instead of the way above
// ** way #2 **
/*
const ExpenseListItem = ( props ) => (
    <div>
        <h3>{ props.expense.description }</h3>
        <p>{ props.expense.amount } - { props.expense.createdAt }</p>
    </div>
);
*/


// -- Mark 2 --

// export default ExpenseListItem;
// change " export default ExpenseListItem; " to
// " export default connect()( ExpenseListItem ) "
// we are going to export the connected component
// for this challange, we don't need anything from the store we just want connect
// the ExpenseListItem component so that we are able to access the dispatch prop

// -- Mark 4 -- from EditExpensePage
// remove the connect function
// ------------
export default ExpenseListItem

// -----------


// ==============================
// GO TO EXPENSELIST.JS -- Mark 5 --
// ==============================