
// -- MARK 1 --
// lecture 126: Testing ExpenseListFilters
// what we create inside of here will be very similar to fixtures/expenses.js

// import moment since we will need to moment below
import moment from 'moment';

// we will export 2 different sets of filters and we will have one where we use the default
// values and then I'll use one where we have some actual things set up so let's go ahead and
// knock that out
// filters will use default values adn undefined as values
const filters = {
    text      : '',
    sortBy    : 'date', 
    startDate : undefined,
    endDate   : undefined
};

// altFilters will populate the data below
const altFilters = {
    // we made the value " bills "
    text      : 'bills',
    // choose amount in this
    sortBy    : 'amount',
    // let's have a defined startDate and endData and for startDate we will create a moment
    // instance at a specific point in time
    startDate : moment( 0 ),
    // for endData, we will create a moment instance and add three days to that instance
    endDate   : moment( 0 ).add( 3, 'days' )
};

// now we have some pretty good dummy data to work with and we will use named exports to export
// the 2 filter sets above
export { filters, altFilters };

