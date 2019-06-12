


// lecture 100: The Higher Order Component

// in the next video, you are going to be installing react redux, which
// is a library that allows us to connect redux stores to react components
// and it makes heavy use of a pattern known as higher order components

// in this video, we will be exploring these higher order components
// and we are going to be creating a few of our own and see what it takes
// to make one and this will make it easier to use and understand what's
// happening when we use the react redux library in the next video

// create a new file in the playground folder called hoc.js for higher
// order component

// switch webpack.config.js over to running that file and restart the dev
// server

// the definition of a higher order component ( HOC ) is " a component that
// renders another component "
// the approach we will use is definately unique when compared to what we've
// been doing in the course so far
// " a component ( this is a HOC ) that renders another component ( regular
// component ) " and we may have several regular component rendered by the
// same HOC
// need to see this pattern in action in order to understand so we are going
// to get into a real example right now


// NORMAL PATTERN

import React from 'react';
import ReactDOM from 'react-dom';

// now we will make a very generic non HOC component
// make an arrow function and implicitly return some jsx
const Info = ( props ) => (
    <div>
        <h1>Info</h1>
        <p>The info is: { props.info }</p>
    </div>
);


// HIGHER ORDER COMPONENT PATTERN

// remember, Info is a non HOC component and we might have 7 or 8 of these
// components and we might want to use the same higher order component for all 7
// or 8 components and allowing us to reuse code

// create our very first higher order component
// for this example let's say we are creating a medical application and were
// showing a lot of privileged information to the user and we want to make
// them aware that they are seeing private privileged information so we want a
// way to take any component we might render and add an admin message just above
// it and say something like the informaiton below is privileged and please don't
// share 

// the goal of a higher order component is to (1) reuse code and we will be able
// to preform something called (2) render highjacking and were going to be able
// to add in a little bit of (3) prop manipulation and we are going to be able
// to (4) abstract state and these four points above are some of the big advantages
// to using the higher order component pattern

// STEP 1: WE WANT TO CREATE A FUNCTION

// withAdminWarning is going to be a regular function and it's going
// to get called with a component that we want to wrap

// -- Mark 1 -- we will pass Info into the arrow function but since
// we want to be able to reuse code so we are going to call our argument
// a generic name and it is commonly called WrappedComponent
// remember, the argument getting passed in is a component so we want to
// start with argument with an uppercase first letter
const withAdminWarning = ( WrappedComponent ) => {
    // inside this function is where we return a new component
    // and this component is the HOC
    // the below will be a stateless functional component and we will
    // implicitly return some jsx
    return ( props ) => (
        // below we will return what we want the HOC to render
        // first goal is to add the minumum warning and the second goal
        // is to make sure we still render the wrapped component because
        // the whole is render the message above the component we are
        // wrapping
        // p tag will contain our message and below that we will render
        // the regular component ( i.e. Info ) and to do that we will
        // create an instance of the regular component

        // however, now our prop.info is not showing up so we can use the
        // spread operator to fix that and we will " spread out " the props
        // object and this has the effect of taking every key value pair
        // in the props object and passing these pairs down to the child
        // as a props object that the child can then use, in our case, as
        // props.info
        // so by using { ...props } we are passing the key value pairs from
        // the props object to the child component
        // so what we are doing is taking all the key value pairs passed into
        // the HOC and passing them down to the child ( i.e. WrappedComponent 
        // or Info )

        // could take this one step further and add isAdmin={ false } to
        // ReactDOM.render below and use the logical & operator below
        // from MDN: "expr1 && expr2 / If expr1 can be converted to true,
        // returns expr2; else, returns expr1"
        <div>
            { props.isAdmn && <p>This is private info.  Please don't share!</p> }
            <WrappedComponent { ...props } />
        </div>
    );
};

// STEP 2: CALL OUR FUNCTION ABOVE WITH THE COMPONENT WE WANT TO WRAP AND
// THE RESULT IS OUR HOC

// so in our case we will call it and call it with the component we want to
// wrap ( i.e. Info )
// what we will get back from calling withAdminWarning will an alternative
// version of this component (i.e. Info) and this WILL BE THE HIGHER ORDER
// COMPONENT
// AdminInfo is going to be a higher order component
// go to -- Mark 1 --
const AdminInfo = withAdminWarning( Info );

// how do we use this HOC
// instead of rendering Info, we will render AdminInfo


// -- Mark 4 --
const requireAuthentication = ( WrappedComponent ) => {
    return ( props ) => (
        <div>
            { props.isAuthenticated ? <WrappedComponent { ...props } /> : <p>Please log in to view the info.</p> }
        </div>
    );
};



// -- Mark 2 --
// challange
// a regular function will be called requireAuthentication and we call
// this function to generate the higher order component and we want to
// wrap the Info component inside requireAuthentication
// goal is to show the component when the user is authenticated and show
// message when they are not authenticated
// change ReactDOM.render, go to -- Mark 3 --
const AuthInfo = requireAuthentication( Info );



// can render to the screen by calling ReactDOM.render
// provide the prop below
// ReactDOM.render( <AdminInfo isAdmn={ true } info='These are the details' />, document.getElementById( 'app' ) );

// we are going to be seeing the HOC pattern extensively with the react redux
// library and library will be giving us a function like withAdminWarning
// and we will be passing our components inside of them ( i.e. WrappedComponent
// or Info ) and the end result will be a HOC that we will be using and this
// HOC will have access to the redux store

// go to -- Mark 2 --

// -- Mark 3 --
// go to -- Mark 4 --
ReactDOM.render( <AuthInfo isAuthenticated={ true } info='These are the details' />, document.getElementById( 'app' ) );

// recap lecture: this HOC pattern is going to allow us to modify and change
// a series of existing components without having to rewrite the code a
// a bunch of times instead we've abstracted the code away and can reuse
// it as often as we need
// in the next video, we are going to connect our react components to redux
// and we will be using a HOC function provided by a library








// lecture 101: Connecting Store and Component with React-Redux

// time to use react redux to connect the 2 together
// first up, in webpack.config.js file switch the enter point
// back to " entry : './src/app.js', " and restart the dev server

// goal one is to list the expenses on the dashboard page and then
// be abe to sort and filter the expenses

// the question is how do we get access to the store information from
// our react components?
// we are going to install the react redux library and can find it on the
// web by googling react-redux and the library itself is very small and
// there are 2 things we need from it: a single component and a single
// function and the single component is called a provider component
// and the single function is called a connect function
// we will be using the provider component once at the root of our
// application and we will be using the connect function for every single
// component that needs to connect to the redux store

// install the react-redux library
// #17
// react-redux library: I USED NPM HERE INSTEAD OF YARN and in the terminal
// I typed "npm install react-redux@5.0.5" but could have used
// "yarn add react-redux@5.0.5"
// lecture 101: Connecting Store and Component with React-Redux

// ==============================
// GO TO APP.JS -- Mark 1 --
// ==============================

