
// -- Mark 1 --
// lecture 110: Filtering by Dates
import moment from 'moment';
// -----------

// there are no dependencies below and we are not using any sort of library
// so there is no need to import anything and we are not using jsx below so
// there is no need to import react


// get visible expenses
// will take 2 arguments: the expenses array and the filters object and using
// these 2 pieces of data, we can calculate what the visible expenses should
// look like

// startDate and endDate are timestamps and are in milliseconds
// timestamps start at January 1, 1970 ( known as the unix epoch )
// we will be using timestamps in this course as a way to store
// timezone independent time data

// USE A DEFAULT EXPORT BELOW
// we will use a default export since there is one thing we want to export from
// this file
// for the default export, as the first line below, we could do:
// " const getVisibleExpenses = ( expenses, { text, sortBy, startDate, endDate } ) => { "
// and then " export default getVisibleExpenses; "
// or we could do
// " export default ( expenses, { text, sortBy, startDate, endDate } ) => { "

// change filters to text, sortBy, startDate, endDate
export default ( expenses, { text, sortBy, startDate, endDate } ) => {
    // use filter to
    // filter creates a brand new array from another array and does this by looking at
    // each item in the array and will call a function once for each item in the array
    // and the function will return true or false
    // if the function returns true then the current item will be passed into the new array
    // if the function returns false then the current item will not be passed into the new array
    return expenses.filter( ( expense ) => {
        // we will make 3 const to store whether or not we have a match
        // for text, if I enter in some search text I want to show the expenses that actually
        // use that text value somewhere
        // for our purposes, we are just going to check the description and not the notes

        // challange for textMatch
        // 1 -- figure out if expense.description is inside the text variable string
        // 2 -- use the includes method and convert both strings to lower case
        const textMatch      = expense.description.toLowerCase().includes( text.toLowerCase() );
    
        // -- Mark 1 --
        // lecture 110: Filtering by Dates
        // first, we need to figure how to make the comparisons below using moment
        // and to do this we are going to be using the Query methods from moment
        // comment out the following startDateMatch and endDateMatch
        // const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
        // const endDateMatch   = typeof endDate   !== 'number' || expense.createdAt <= endDate;
        // startDateMatch will always be true if there is no startDate because we will never filter
        // out an expense when there is no startDate or the same goes for endDate
        // create a new moment to use as the argument to isSameOrBefore()
        // we passed in " day " as the second argument and therefore we will use day as the unit
        // of measurement so is startDate the same day or a day or days before the createdAtMoment
        const createdAtMoment = moment( expense.createdAt );
        const startDateMatch = startDate ? startDate.isSameOrBefore( createdAtMoment, 'day' ) : true ;
        const endDateMatch   = endDate ? endDate.isSameOrAfter( createdAtMoment, 'day' ) : true;
        // if all three const matches from above are true then we have a complete match and we want
        // to return true from filter and in this case the expense will be keeped ( or be passed into
        // the new array of expenses )
        // if we do not have a complete match then the expense will go away

        // so by setting up the DateRangePicker were going to be able to filter our expenses via this
        // calender widget and that's going to make searching and navigating our expenses much easier
        // we have 2 ways to filter: by date or description and we have 1 way to sort: by date or amount
        // recap: we changed startDate and endDate default state values to moments in time in the filter
        // reducer and we added the RangeDatePicker in the ExpenseListFilters component and the last thing
        // we changed we how we compared the values in startDateMatch and endDateMatch from above
        // ------------
        return textMatch && startDateMatch && endDateMatch;

    // now it's time to add sorting so we can get visible expenses
    // we want to be able to sort by date or sort by amount

    // we are going to look at 2 expenses and determine which one should come
    // before the other

    // sort gets called on an array and returns an array
    // when need to write a compare function or arguments ( a, b ) and then
    // compare them to determine which one comes first
    } ).sort( ( a, b ) => {
        // first thing we need to figure out are we sorting by date or amount
        if ( sortBy === 'date'  ) {
            // if we return -1 a would come first or if we return 1 b would come first
            // if a.createdAt < b.createdAt then we will show b first or have the
            // most recent expenses at the top of the list
            // use the ternary operator and if a.createdAt < b.createdAt then the
            // truthy value will be 1 ( b comes first ) otherwise a comes first
            return a.createdAt < b.createdAt ? 1 : -1;
        }
        // challange
        // sort by amount and put the one with a greater amount first
        else if ( sortBy === 'amount' ) {
            return a.amount < b.amount ? 1 : -1;
        }
    });
};
