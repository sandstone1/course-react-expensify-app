
// we are going to kick things off by creating a basic presentational
// component

// first, import react
import React from 'react';
// -- Mark 1 --
import { connect } from 'react-redux'; 
// -- Mark 3 --
import { setTextFilter, sortByDate, sortByAmount } from '../actions/filters';
// -- Mark 5 --
import { DateRangePicker } from 'react-dates';
import { setStartDate, setEndDate } from '../actions/filters';
// -----------


// build the stateless functional component
// implicitly return some jsx and no need to put {} in between the ()
class ExpenseListFilters extends React.Component {
    // -- Mark 3 --
    // no need to add double quotes or "" to the value property below when
    // using jsx
    // the input field will have " water bill " as the value and then after
    // 3 seconds, the input field will have " bill " as the value
    // so we are reading off of the store from the ExpenseListFilters
    // component and were using that data in a meaningful way
    // so this is one half of the puzzle in that we are reading off the store
    // but how do we dispatch from the component? or how do we do something anytime
    // the text input gets changed by the user
    // the solution is to provide an onChange handler and onChange takes a function
    // and every single time the input changes the function fires
    // within onChange we are going to have access to the event argument ( i.e. " e " )
    // which we need in order to get the new value and we are going to have to use
    // dispatch below in order to update the store so that our key strokes result
    // in a change to the input and input value will always be the text value in the
    // store or props.filters.text

    // when we connect a component to redux we get some additional information passed
    // into the component and we can see this by going to the react dev tools
    // and dig into the tree strucutre until we find the <ExpenseListFilters /> and we
    // see we have 2 props: dispatch and filters so we have access to dispatch from
    // inside our connected components which means we can call it directly to dispatch
    // actions with the arrow function on onChange and we need the setTextFilter
    // action generator so first, import that action generator above or
    // " import { setTextFilter } from '../actions/filters'; " and now that we have
    // access to that action generator, we can call it within props.dispatch() and do as
    // follows: " props.dispatch( setTextFilter( e.target.value ) ); " and now if we type
    // water in the input field " water bill " will show up below and if we type " p "
    // nothing will show up below since the letter p is not in " water bill " or
    // " gas bill "

    // so there we have it, we have our very first component that is not only READING
    // from the redux store but also WRITING to the redux store and this capability
    // will be essential to any application we create

    // -- Mark 4 --
    // lecture 104: Dropdown for Picking SortBy
    // add the select dropdown menu under the input tag and include the 2 options:
    // date and amount and when someone pick date or amount, we want to make sure the
    // lowercase date or amount is used behind the scenes when track the changes to
    // select
    // to make the dropdown menu work we need to add the exact same props for select
    // that we used for the input field so we have to (1) set the value and (2) we have
    // to handle changes
    // challange
    // the challange to set the value and handle changes and add some conditional logic
    // to the onChange handler so that we know whether the user chose date or amount
    // to use sortByDate and / or sortByAmount we need to import these named exports
    // adding the below code will make sure that as we change the select we also change
    // the store and as the store changes we will set the value
    // ( i.e. props.filters.sortBy ) so it changes what the user sees
    // when we use the onChange evnt handler within input or select we are creating
    // what is known as a controlled input and a controlled input is just a value
    // that is controled by JavaScript so " value={ props.filters.text } " and
    // " value={ props.filters.sortBy } " are controlled by js
    // so with both input and select we can set the value and do something when the
    // value changes

    // -- Mark 5 --
    // lecture 110: Filtering by Dates
    // next, we are going to wire up the date range picker
    // put the date range picker below <select></select> and this will allow the
    // user to pick a range of dates and be able to see all the expenses within that range

    // were going to need to track state within this component so we will need to
    // switch ExpenseListFilters into a class based component
    // after we create the class based component, we need to set up state and we
    // can set up state and set it equal to an object and keep track of calenderFocused
    // and calenderFocused will be null or will be a string and we just need to keep track
    // of calenderFocused and pass it down into the react dates component
    state = {
        calenderFocused : null
    };

    // this function will get called by the react-dates library
    // it is going to get called with an object and on that object, we are going to have
    // a start date and an end date and we can destructure that object and grab the
    // startDate and endDate
    onDatesChange = ( { startDate, endDate } ) => {
        // now we need to dispatch the correct actions in order to get the filters to change
        // remember, we have to import the named exports setStartDate and setEndDate
        this.props.dispatch( setStartDate( startDate ) );
        this.props.dispatch( setEndDate( endDate ) );
    };

    // in the api for onFocusChange, the first argument is the focusedInput property
    onFocusChange = ( focusedInput ) => {
        // all we have to do inside the arrow function is use this.setState() and set the state
        // for calenderFocused

        // we do not need the previous state argument for this function
        // call this.setState and pass in the updater function
        // witihn an arrow function we can return an object but we have to put the object
        // in parentheses ()
        this.setState( () => ( {
            // we are going to set calenderFocused equal to whatever value came back from
            // " focusedInput "
            calenderFocused : focusedInput
            // ---------------

            // ==============================
            // GO TO EXPENSES.JS -- Mark 1 -- (in the selectors folder)
            // ==============================            
        } ) );
    };

    render() {
        return (
            <div>
                <input
                    type="text"
                    value={ this.props.filters.text }
                    onChange={ ( e ) => {
                        this.props.dispatch( setTextFilter( e.target.value ) );
                    } } 
                />
                <select
                    value={ this.props.filters.sortBy }
                    onChange={ ( e ) => {
                        if ( e.target.value === 'date' ) {
                            this.props.dispatch( sortByDate() );
                        }
                        else if ( e.target.value === 'amount' ) {
                            this.props.dispatch( sortByAmount() );
                        }
                    } } 
                >
                    <option value="date">Date</option>
                    <option value="amount">Amount</option>
                </select>
                <DateRangePicker 
                    startDate     ={ this.props.filters.startDate }
                    endDate       ={ this.props.filters.endDate }
                    onDatesChange ={ this.onDatesChange }
                    focusedInput  ={ this.state.calenderFocused }
                    onFocusChange ={ this.onFocusChange }
                    showClearDates={ true }
                    numberOfMonths={ 1 }
                    isOutsideRange={ () => false }
                />
            </div>
        );
    }
}

// way #1 - short way
// function stateless component
/*
const ExpenseListFilters = () => (
    // implicitly return some jsx
    <div>
        <input type="text"/>
    </div>
);
*/

// way #2 - long way
// function stateless component
/*
const ExpenseListFilters = () => {
    // return some jsx
    return (
        <div>
            <input type="text"/>
        </div>
    );
};
*/

// way #3 - long way
// class based component
// with a class based component we can work with state inside the component
/*
class ExpenseListFilters extends React.Component {
    // return some jsx
    render() {
        return (
            <div>
                <input type="text"/>
            </div>       
        );
    }
}
*/


// now, export the component and get it rendering to the screen
// and once we export it we can import it and then render it

// -- Mark 2 --
// export default ExpenseListFilters;

// we are going to get access to the entire state via the first argument
const mapStateToProps = ( state ) => {
    // now, we return an object
    // what do we want off the store?
    // we just need all the filters and none of the expenses

    // in the component above, ExpensesListFilters, we now have access to
    // props.filters.text and use that as the value for input field above
    return {
        filters : state.filters 
    };
};

// this gets exported to the ExpenseDashboardPage.js component, which includes
// the <ExpenseListFilters /> component within the ExpenseDashboardPage.js component
export default connect( mapStateToProps )( ExpenseListFilters )


// go to -- Mark 3 --


//-----------------------------------------------


// ==============================
// GO TO EXPENSEDASHBAORDPAGE.JS -- Mark 4 --
// ==============================



// -- Mark 1 --
// the goal now is to get the old value off of the store and remember in app.js
// we set the text value or text filter to " water bill " and then we set the text
// value or text filter to " bill " and it's always important to make sure that
// the input always matches up with the current text value in the redux store

// so if the text value changes via a dispatch call we want to make sure were reading
// that value and using it inside the input field in the ExpenseListFilters component
// so how do we get that done?
// we get this done by connecting ExpenseListFilters to the store so we are going to
// need to import connect

// we are going to be creating a connect version of ExpenseListFilters
// so instead of doing this: " export default ExpenseListFilters; " we are going to
// do this: " export default connect( mapStateToProps )( ExpenseListFilters ) "

// we now need to figure out what we want off the store so create the mapStateToProps
// function

// go to -- Mark 2 --



// ==============================
// GO TO EXPENSELISTITEM.JS -- Mark 2 --
// ==============================


