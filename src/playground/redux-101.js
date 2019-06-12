
// import a named export called createStore from the library we just
// installed called redux
import { createStore } from 'redux';

// -- 1 -- we will call createStore once to create the store
// createStore() can not be called without arguments

// -- 2 -- it does expect a function to be the first argument

// -- 3 -- we will set up a single function (we will use an arrow function)
// as the first and only argument to the createStore function

// -- 4 -- the first argument to the function that we pass to createStore is the
// current state

// -- 5 -- we will set up the default state value within the () and in our case
// it will look like ( state = { count : 0 } )

// we will be able increment, decrement and reset the count in our basic example
// -- Mark 1 --
// the action object get passed in as the second argument to the createStore function
// and is called action and is equal to
/*
store.dispatch({
    type : 'INCREMENT'
});
*/
const store = createStore( ( state = { count : 0 }, action ) => {
    // -- Mark 2 --
    // we will switch what we do based off a particular value
    switch ( action.type ) {
        // inside the {} we can define the various cases we want to handle
        case 'INCREMENT' :
            // after the : above we provide what we want to do, which in our case is
            // return the new state
            // notice that were not changing the state instead we want to use
            // the values to compute the new state and that is what gets returned

            // -- Mark 6 --
            // use some conditional logic
            // condition ? exprT : exprF
            // if condition can be converted to true (it is truthy), the operator
            // returns the value of exprT; otherwise (when condition is falsy) it
            // returns the value of exprF
            // -- Mark 8 --
            // delete the following, see -- Mark 8 -- below
            // const incrementBy = typeof action.incrementBy === 'number' ? action.incrementBy : 1;
            return {
                // -- Mark 9 --
                // change incrementBy to action.incrementBy
                // we can access incrementBy off the action object
                count : state.count + action.incrementBy
            };
        // -- Mark 3 --
        case 'DECREMENT' :
            // after the : above we provide what we want to do, which in our case is
            // return the new state
            // notice that were not changing the state instead we want to use
            // the values to compute the new state and that is what gets returned

            // -- Mark 7 --
            // -- Mark 10 --
            // since we are using the action generator below for decrementBy, we can delete the
            // const below
            // const decrementBy = typeof action.decrementBy === 'number' ? action.decrementBy : 1;
            return {
                // -- Mark 11 --
                // change decrementBy to action.decrementBy
                // we can access decrementBy off the action object
                count : state.count - action.decrementBy
            };
        // -- Mark 7 --
        case 'SET':
            return {
                count : action.count
            }
        // -- Mark 4 --
        case 'RESET':
            return {
                count : 0
            };
        // set up the default case
        default :
            // if the store is running for the first time, then the default state value
            // will be shown
            return state;
    }
});

/*
// explore a method we have on state and getState returns the current state object
// this will result in { count : 0 }
console.log( store.getState() );

// so we just created our first state container ( i.e. the const store ), we set up
// a default state value and we were able to get that value back by using
// store.getState()

// review: the store is the container that tracks our changing data over time
// review: we know we have to provide a function to createStore and that function gets
// called right away
// review: the first time redux calls this function there is no state so the default state
// value is used
// review: we return the default state object and that becomes the new state object
// review: we also learned we can fetch the current state by using the getState method on
// the store and store.getState() returns the actual object

// in the next video, we are going to talk about how we can change the data inside our
// redux store and were going to do this using a tool called ACTIONS and we are going
// to learn what they are and how they work and that will allow us to create a changing
// data store
 



// lecture 86: Dispatching Actions

// in this video, you're going to learn all about actions
// actions allow us to change the redux store values
// we will be able to do things like: " I'd like to increment the count "
// and " I'd like to set the count equal to zero "

// an action is an object that gets sent to the store and this object describes the type
// of action we would like to take
// an action for a person could be walk, stop_walking, sit, work, stop_working and as
// these actions go off the state changes

// in this video, we will have actions like: (1) increment, (2) decrement and (3) reset
// and this will allow us to change the store over time by discpatching various
// actions

// CRETATE AN OBJECT
// for " I'd like to increment the count "
// on this object we have to define a single property and that property is the
// action type
/*
{
    type : 'INCREMENT'
}
*/
// capitalizing the value is a convention and put an underscore between any separate
// words
// what we want to do is send this off to the store and we do this by calling the
// method named dispatch
// dispatch allows us to send off an action object and then the store can do something
// with this information; for example, it can take the count and increase it by one
/*
store.dispatch({
    type : 'INCREMENT'
});


// so we are dispatching our very first action to the store
// the action object get passed in as the second argument to the createStore function
// and is called action and is equal to
store.dispatch({
    type : 'INCREMENT'
});

// now we have access to the information contained inside the action argument and
// we can combine the action with the state to figure out what the state should be
// go to -- Mark 1 --

// however, the state will not change until we dispatch the action as we did above
// in store.dispatch();
// now, this will result in { count : 1 }
console.log( store.getState() );

// now, if we dispatch the increment action twice, we will get a count of 2
// pass in the action object to store.dispatch();
store.dispatch({
    type : 'INCREMENT'
});

// now, this will result in { count : 2 }
console.log( store.getState() );

// it is a much more common pattern to use the switch statement inside the store
// go to -- Mark 2 --

// now, let's set the decrement action
// pass in the action object to store.dispatch();
// go to -- Mark 3 --
store.dispatch({
    type : 'DECREMENT'
});
// now, this will result in { count : 1 }
console.log( store.getState() );

// challange - reset count to zero
// STEP 1: PASS IN THE ACTION OBJECT TO STORE.DISPATCH();
// STEP 2: DISPATCH THE RESET ACTION
// STEP 3: GO TO -- MARK 4 --
store.dispatch({
    type : 'RESET'
});

// test the reset action dispatch, did it work? 
// this will result in { count : 0 }
console.log( store.getState() );

// now that we have actions in place we are going to look at some
// more advanced techniques we can use to track data

// RECAP
// in this video, we learned that actions are our way of communicating with
// the store
// an action is an object
// every action object requires at least the property named " type "
// we get the action object to the store by using store.dispatch();
// we learned that the default state gets called the first time run createStore();
// and thereafter state gets called one time for every store.dispatch call
// based off the action type within the store we can make meaniful changes
// to the state
// all of this allows us to create a redux store that we can read from and
// change
*/




// lecture 87: Subscribing and Dynamic Actions

// in this video, we are going to accomplish two things: 
// first or -- 1 --, we are going to learn how to watch for changes to the store and
// second or -- 2 --, we are going to learn how we can dispatch an action and acutally pass some
// data along as well

// -- 1 --
// to watch for changes to the redux store state, we use store.subscribe and we pass
// a single function to it and this function gets called everytime the store changes
/*
store.subscribe( () => {
    console.log( store.getState() );
});
*/

// -- Mark 5 --
const unsubscribe = store.subscribe( () => {
    console.log( store.getState() );    
});

/*
// state change #1
// console.log is count : 1

/ comment out per lecture 90
store.dispatch({
    type : 'INCREMENT'
});

// -- Mark 5 --
// call unsubscribe to stop watching for state changes in our redux store
// unsubscribe();

// state change #2
// console.log is count : 2

/ comment out per lecture 90
store.dispatch({
    type : 'INCREMENT'
});


// state change #3
// console.log is count : 1


// comment out per lecture 90
store.dispatch({
    type : 'DECREMENT'
});


// state change #4
// console.log is count : 0
// comment out per lecture 90
store.dispatch({
    type : 'RESET'
});
*/

// so store.subscribe is a fantastic way to do something when the state changes
// if we want to we can also stop subscribing and we can do that by using the
// return value from store.subscribe, which is a function that we can use to
// unsubscribe, for example, got to -- Mark 5 --:

// now if we remove unsubscribe from above or at -- Mark 5 -- then we will see
// all the state changes (4 changes above) and be able to do something
// meaniful when it changes

// -- 2 --
// now we are going to talk about how we can dispatch dynamic actions
// currently all of our actions just have the type property so we could add
// the key value pair as shown below and thereby pass dynamic information along
// inside our action object
// state change #5
// console.log is count : 5
/*

/ comment out per lecture 90
store.dispatch({
    type        : 'INCREMENT',
    incrementBy : 5
});

// so how do we set this up?
// first we need to use incrementBy which is now available to us on the
// action object ( the second argument in createStore() ) so not only do we
// have action.type, we also have action.incrementBy
// we will use a little conditional logic to figure out what we should incease
// the count by, so for example, go to -- Mark 6 --

// challange
// state change #6
// console.log is count : -5
// go to -- Mark 7 --

/ comment out per lecture 90
store.dispatch({
    type        : 'DECREMENT',
    decrementBy : 10
});
*/
// so we now have a way to dispatch dynamic actions like increment and decrement

// now we are going to create actions that have required types and use them
// directly in the store as opposed to checking if they exist like we did for
// incrementBy and decrementBy, for example see below and go to -- Mark 7 --
// here we are setting the count to 101
// or we are going to force those that use SET to provide the value 101
// state change #7
// console.log is count : 101

// comment out per lecture 90
/*
store.dispatch({
    type  : 'SET',
    count : 101
});
*/


// so now we know all about how to dispatch dynamic actions






// lecture 90: Refactoring and Organizing

// in this video, we are going to be using destructuring to improve the code
// weve written so far

// first, we need to change back our entry point in webpack.cinfig.js to
// " entry : './src/playground/redux-101.js', "

// second, restart the dev-server in the terminal

// were going to kick things off by talking about a series of functions that we
// are going to be creating and these are called ACTION GENERATORS

// action generators are functions that return action objects
// so the objects or actions that we have created above are now going to get
// created in one place and we will have a function we can call to generate
// the action objects

// were going to create a single action generator that is going to take
// care of generating the action objects for all of our increment cases

// STEP 1: CREATE A NEW FUNCTION OR ACTION GENERATOR
// the goal of an action generator is to be a very simple function that takes
// input in and returns the new action object

/*
const incrementCount = () => {
    return {
        type : 'INCREMENT'
    };
};
*/

// we can see that our function just returns an object and we can do that
// implicitly

/*
const incrementCount = ( payload = {} ) => ({
    type : 'INCREMENT',
    incrementBy : typeof payload.incrementBy === 'number' ? payload.incrementBy : 1
});
*/

// we are going to explore how this can get used
// one of the disadvantages of manually generating your action objects are that
// typos are not easy to catch so we are going to be preferring action generators
// over inine action objects, such as:
// store.dispatch({
//    type : 'INCREMENT'
// });

// instead we want to use store.dispatch as follows:
// store.dispatch( incrementCount() );

// to provide custom data, (1) we provide an object inside the incrementCount call
// below and (2) we provide an argument inside our arrow function above and we are going
// to call the argument " payload " and give the arguemnt a default value equal to an
// empty object and (3) payload is an object with properties that include incrementBy so
// type:
// " incrementBy : typeof payload.incrementBy === 'number' ? payload.incrementBy : 1 "
// and (4) delete the same code in the createStore call or at -- Mark 6 -- and we will
// call this point in the code -- Mark 8 -- and (5) change incrementBy to action.incrementBy
// in the createStore call, go to -- Mark 9 --
// state change #8
// console.log is count : 106
// have to put this store.dispatch call for incrementCount below the action generator for
// incrementCount in order for this call to work

/*
store.dispatch( incrementCount( { incrementBy : 5 } ) ) 
*/

// we can also destructure arguments that get passed into functions
// an example:

/*
const add = ( data ) => {
    return data.a + data.b;
};

// results in 13
console.log( add( { a: 1, b: 12 } ) );
*/

// if we want to destructure the object above, we can
// what we do is remove data as the argument and insert {} instead so we are desstructuring
// the first argument that gets passed into the add arrow function, for example:
const add = ( { a, b }, c ) => {
    return a + b + c;
};

// results in 13
console.log( add( { a: 1, b: 12 }, 100 ) );

// now we are going to replace payload with an object and we want to destructure
// incrementBy and this will give us access to the incrementBy value above
// so we no longer need to use payload.incrementBy within our arrow function and
// can access the value directly, just like we did with add above

// we can take it one step further and we know when we destructure we can set
// up default values so we can give incrementBy,,which is a variable, a default value
// and say hey if incrementBy exist then great otherwise use 1 and this greatly
// simplifies our code below
// ACTIONN GENERATOR #1
const incrementCount = ( { incrementBy = 1 } = {} ) => ({
    type : 'INCREMENT',
    // or we know when we have an object project equal to a variable with the same name
    // we can just use the object property name or just " incrementBy "
    incrementBy : incrementBy
});


// state change #1
// console.log is count : 5
store.dispatch( incrementCount( { incrementBy : 5 } ) );

// so we will use 1 by default and will use the incrementBy value if it is actually
// passed in

// so how does the default value get set to 1?
// answer: if there is an object provided and it does not include incrementBy and if
// there is no object provided then the default will be an empty object ( i.e. {} )
// and when we try to destructure that empty object we are definitely not going to
// have incrementBy; therefore, the end result is, once again, 1

// set up the action generator for decrement
// ACTIONN GENERATOR #2
const decrementCount = ( { decrementBy = 1 } = {} ) => ({
    type : 'DECREMENT',
    // or we know when we have an object project equal to a variable with the same name
    // we can just use the object property name or just " decrementBy "
    decrementBy : decrementBy
});

// state change #2
// console.log is count : -5
store.dispatch( decrementCount( { decrementBy : 10 } ) );

// state change #3
// console.log is count : -6
store.dispatch( decrementCount() );

// challange
// create action generators for SET and RESET

// set up the action generator for set
// ACTIONN GENERATOR #3
// this works
/*
const setCount = ( { count = 101 } = {} ) => ({
    type : 'SET',
    count : count
});
*/

// this works too
// the count argument will equal 101 and were using destructuring below
// but to destructure an object we have to put count inside {}
// there is no need for a default value below since we required a value for
// store.dispatch( setCount()); below ( were going to force the user
// to provide this value )
const setCount = ( { count } ) => ({
    type  : 'SET',
    count : count
});

// state change #4
// console.log is count : 101
store.dispatch( setCount( { count : 101 } ) );


// set up the action generator for reset
// ACTIONN GENERATOR #4
const resetCount = () => ({
    type : 'RESET'
});

// state change #5
// console.log is count : 0
store.dispatch( resetCount() );

// so now that we have action generators, we can vastly simplify the thing
// we do a lot ( which is calling store.dispatch() over and over ) and make slightly
// more complex something we only need to do one time ( i.e. action generators )
// and this allows us to make simple function calls throughout our program
// ( i.e. store.dispatch( resetCount() ); )

// later on in the course, these action generator functions will get broken out
// into their own file





// lecture 91: Reducers

// in this video, we are going to focus on the redux store that we will use for
// the expensify application

// were going to focus on getting an array of expenses as well as various filters
// to filter or sort the data

// we going to focus on the function in between the *** and ***
// this function is called a reducer
// reducers are one of the core concepts of redux

// so what is a reducer? from redux.js.org: " Reducers specify how the application's
// state changes in response to actions sent to the store. Remember that actions
// only describe what happened, but don't describe how the application's state
// changes. "

// the reducer determines what to do based off an action ( i.e, the reducer
// determines what to do in the switch statement below based on the action.type )

// to help better visualize this, let do as follows:

// REDUCERS

// STEP 1: create our reducer
const countReducer = ( state = { count : 0 }, action ) => {
    // we will switch what we do based off a particular value
    switch ( action.type ) {
        // inside the {} we can define the various cases we want to handle
        case 'INCREMENT' :
            return {
                count : state.count + action.incrementBy
            };
        case 'DECREMENT' :
            return {
                count : state.count - action.decrementBy
            };
        case 'SET':
            return {
                count : action.count
            }
        case 'RESET':
            return {
                count : 0
            };
        // set up the default case
        default :
            // if the store is running for the first time, then the default state value
            // will be shown
            return state;
    }
};

// STEP 2: pass the reducer to the createStore
// just reference the countReducer function above
const store = createStore( countReducer );

// our expensify app will have multiple reducers

// some of the KEY ATTRIBUTES of a reducer:

// -- 1 -- reducers are pure functions
// this is, the output is only determined by the input
// reducers also don't interact with things outside its scope and in the case below the
// function is changing the variable result so the function is not a pure function
let result;
const add = ( a, b ) => {
    result = a + b;
}

// -- 2 -- never change state or action
// state and action will get passed into all of our reducers but we don't want
// to directly change state or action so we don't want to reassign a state or
// action value and if they are objects I don't want to mutate the objects instead
// we should just be reading state and action and returning an object that
// represents the new state

// next, we are going to build out a redux store for the expensify application
// and those action generators and reducers will actually be connecting to redux

// create a new file in the playground folder called redux-expensify.js


/*
const store = createStore( *** ( state = { count : 0 }, action ) => {
    // -- Mark 2 --
    // we will switch what we do based off a particular value
    switch ( action.type ) {
        // inside the {} we can define the various cases we want to handle
        case 'INCREMENT' :
            // after the : above we provide what we want to do, which in our case is
            // return the new state
            // notice that were not changing the state instead we want to use
            // the values to compute the new state and that is what gets returned

            // -- Mark 6 --
            // use some conditional logic
            // condition ? exprT : exprF
            // if condition can be converted to true (it is truthy), the operator
            // returns the value of exprT; otherwise (when condition is falsy) it
            // returns the value of exprF
            // -- Mark 8 --
            // delete the following, see -- Mark 8 -- below
            // const incrementBy = typeof action.incrementBy === 'number' ? action.incrementBy : 1;
            return {
                // -- Mark 9 --
                // change incrementBy to action.incrementBy
                // we can access incrementBy off the action object
                count : state.count + action.incrementBy
            };
        // -- Mark 3 --
        case 'DECREMENT' :
            // after the : above we provide what we want to do, which in our case is
            // return the new state
            // notice that were not changing the state instead we want to use
            // the values to compute the new state and that is what gets returned

            // -- Mark 7 --
            // -- Mark 10 --
            // since we are using the action generator below for decrementBy, we can delete the
            // const below
            // const decrementBy = typeof action.decrementBy === 'number' ? action.decrementBy : 1;
            return {
                // -- Mark 11 --
                // change decrementBy to action.decrementBy
                // we can access decrementBy off the action object
                count : state.count - action.decrementBy
            };
        // -- Mark 7 --
        case 'SET':
            return {
                count : action.count
            }
        // -- Mark 4 --
        case 'RESET':
            return {
                count : 0
            };
        // set up the default case
        default :
            // if the store is running for the first time, then the default state value
            // will be shown
            return state;
    }
} *** );
*/



