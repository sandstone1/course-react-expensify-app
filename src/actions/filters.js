

// there are no dependencies below and we are not using any sort of library
// so there is no need to import anything and we are not using jsx below so
// there is no need to import react

// however, we do need to set up named exports
// format is " export const action generator name "



// ==============================
// ACTION GENERATOR #4
// ==============================

// STEP 1: CREATE THE ACTION GENERATOR
// remember, to set the text default value so that if no text value is provided
// by the user then the text value will equal an empty string
export const setTextFilter = ( text = '' ) => ( {
    type : 'SET_TEXT_FILTER',
    text // remember this is equal to text : text
} );


// STEP 2: DISPATCH THE ACTION GENERATOR
// STEP 3: HANDLE THE ACTION GENERATOR IN THE FILTERS REDUCER




// ==============================
// ACTION GENERATOR #5
// ==============================


export const sortByAmount = ( ) => ( {
    type   : 'SORT_BY_AMOUNT',
    amount : 'amount'
} );

// STEP 2: DISPATCH THE ACTION GENERATOR
// STEP 3: HANDLE THE ACTION GENERATOR IN THE FILTERS REDUCER



// ==============================
// ACTION GENERATOR #6
// ==============================


// STEP 1: CREATE THE ACTION GENERATOR
export const sortByDate = ( ) => ( {
    type : 'SORT_BY_DATE'
} );


// STEP 2: DISPATCH THE ACTION GENERATOR
// STEP 3: HANDLE THE ACTION GENERATOR IN THE FILTERS REDUCER



// ==============================
// ACTION GENERATOR #7
// ==============================


// STEP 1: CREATE THE ACTION GENERATOR
// remember, no need to set the default value equal to undefined since the
// default value above is already set to undefined; also, if no
// argument is passed in then the default value will equal undefined anyway
// and this is the typical behavior of arguments
export const setStartDate = ( startDate ) => ( {
    type : 'SET_START_DATE',
    startDate : startDate // could have just put " startDate "
} );


// STEP 2: DISPATCH THE ACTION GENERATOR
// STEP 3: HANDLE THE ACTION GENERATOR IN THE FILTERS REDUCER



// ==============================
// ACTION GENERATOR #8
// ==============================



// STEP 1: CREATE THE ACTION GENERATOR
// remember, no need to set the default value equal to undefined since the
// default value above is already set to undefined; also, if no
// argument is passed in then the default value will equal undefined anyway
// and this is the typical behavior of arguments
export const setEndDate = ( endDate ) => ( {
    type : 'SET_END_DATE',
    endDate : endDate // could have just put " endDate "
} );


// STEP 2: DISPATCH THE ACTION GENERATOR
// STEP 3: HANDLE THE ACTION GENERATOR IN THE FILTERS REDUCER





