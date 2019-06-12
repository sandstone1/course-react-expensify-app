
// -- Mark 1 --
import moment from 'moment';
// -----------


// there are no dependencies below and we are not using any sort of library
// so there is no need to import anything and we are not using jsx below so
// there is no need to import react


// FILTER REDUCER

// FIRST, CREATE THE DEFAULT STATE OBJECT FOR FILTER
const filtersReducerDefaultState = {
    text      : '',
    sortBy    : 'date', // will sort by date by default
    // -- Mark 1 --
    // lecture 110: Filtering by Dates
    // we are going to change the default value for start date and end date
    // we want to default to showing the expenses just for the current month
    // so we want the start date to be at the begining of the current month
    // and the end date to be at the end of the current month
    // first, import the momend library
    // change startDate from " undefined " to " moment().startOf( 'month' ) " which means
    // that the start date will be the current moment in time when the line of code runs
    // and the start date will be at the start of the month that includes the current moment
    // in time and end date will be at the end of the month that includes the current moment
    // in time
    startDate : moment().startOf( 'month' ), // can be changed via the UI
    endDate   : moment().endOf(   'month' ) // can be changed via the UI
    // ----------


    // ==============================
    // GO TO EXPENSELISTFILTERS.JS -- Mark 5 --
    // ==============================
};

// SECOND, CREATE THE FILTERS REDUCER

// USE A DEFAULT EXPORT BELOW
// we will use a default export since there is one thing we want to export from
// this file
// for the default export, as the first line below, we could do:
// " const filtersReducer = ( state = filtersReducerDefaultState, action ) => { "
// and then " export default filtersReducer; "
// or we do
// " export default ( state = filtersReducerDefaultState, action ) => { "

export default ( state = filtersReducerDefaultState, action ) => {
     // we will switch what we do based off a particular value
     switch ( action.type ) {
        // inside the {} we can define the various cases we want to handle

        case 'SET_TEXT_FILTER':
            // when the filtersReducer see the case SET_TEXT_FILTER we want
            // to return a new object
            return {
                // ...state will give us current key value pairs for the current state object
                // and text : action.text will provide one new key value pair for the
                // property text and this new key value pair will override the previous
                // key value pair because we are using the object spread operator below

                // the result is we will have a new object with the text value changing
                // from an empty string to " text : "rent" "
                ...state,    
                text : action.text
            };

        case 'SORT_BY_AMOUNT':
            // when the filtersReducer see the case SORT_BY_AMOUNT we want
            // to return a new object
            return {
                // ...state will give us current key value pairs for the current state object
                // and sortBy : action.amount will provide one new key value pair for the
                // property sortBy and this new key value pair will override the previous
                // key value pair because we are using the object spread operator below

                // the result is we will have a new object with the sortBy value changing
                // from " date " to " amount "
                ...state,    
                sortBy : action.amount
            };

        case 'SORT_BY_DATE':
            // when the filtersReducer see the case SORT_BY_DATE we want
            // to return a new object
            return {
                // ...state will give us current key value pairs for the current state object
                // and sortBy : ' date ' will provide one new key value pair for the
                // property sortBy and this new key value pair will override the previous
                // key value pair because we are using the object spread operator below

                // the result is we will have a new object with the sortBy value changing
                // from " amount " to " date "
                ...state,    
                sortBy : 'date'
            };

        case 'SET_START_DATE':
            // when the filtersReducer see the case SET_START_DATE we want
            // to return a new object
            return {
                // ...state will give us current key value pairs for the current state object
                // and startDate : action.startDate will provide one new key value pair for the
                // property startDate and this new key value pair will override the previous
                // key value pair because we are using the object spread operator below

                // the result is we will have a new object with the startDate value changing
                // from " undefined " to " 125 "
                ...state,
                startDate : action.startDate
            };

        case 'SET_END_DATE':
            // when the filtersReducer see the case SET_END_DATE we want
            // to return a new object
            return {
                // ...state will give us current key value pairs for the current state object
                // and endDate : action.endDate will provide one new key value pair for the
                // property endDate and this new key value pair will override the previous
                // key value pair because we are using the object spread operator below

                // the result is we will have a new object with the endDate value changing
                // from " undefined " to " 1250 "
                ...state,
                endDate : action.endDate
            };

        // set up the default case
        default :
            // if the store is running for the first time, then the default state value
            // will be shown
            return state;
    }   
};
