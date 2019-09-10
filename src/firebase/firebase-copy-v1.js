

// now at this point we should have a valid connection to the firebase database and in the next
// video we are going to learn how we can write data but let's add one statement real quick
// to test our connection and if it works correctly we know the connection was set up and if it
// doesn't work we something didn't go right

// below we access the database method and this gives us access to all the database related
// features and there are a lot of tools provided by firebase and database is just one of them
// and we will get a reference and it could a reference to users for example and for now we will
// just call .ref getting a reference to the root of our database and will talk about how we can
// use ref() with arguments a little later and next up we will call set and this will allow us to
// provide the data we want to set and we will pass in an object and for testing purposes we will
// set " name " equal to " Roger Hall " and we can save the firebase file and test this out but the
// firebase file never gets imported by the application so it's not going to run and the data will
// never get written because the file never runs and to fix this were going to import the firebase
// file into app.js so now the file will at least run when we start up the application and this
// will allow us to confirm that the connection was created successfully

// -- Mark 2 --
// lecture 143: Writing to the Database
// add on additional properties and set up some more complex data for the database and we will
// be able to view these changes in the firebase console database tab
const database = firebase.database();

// go to -- Mark 2 -- below
database.ref().set( {
    name     : 'Andrea Mead',
    age      : 26,
    isSingle : false,
    location : {
        city    : 'Philadelphia',
        country : 'United States'
    }
} );
// END OF -- Mark 2 --

// -- Mark 1 -- CONTINUE
// go to app.js and import in this file
// next up, we have to set up the development server by typing npm run dev-server in the terminal
// and open up the expensify webpage and make sure we do not have any errors in the console and
// then go to the database tab within the firebase website and we should see our data showing up
// and when I go to the database tab I see:
/*
expensify-9f720
    name: "Roger Hall"
*/

// and this means that our database and database connection were set up successfully and we are
// ready to move on to the next video where we will learn about saving data in detail

// recap: in this video, we created a project on the Firebase dashboard and we connected our
// project to the firebase database by importing the firebase module above and we also included
// a long firebaseConfig object which contains what is equivalent to our password and we then
// passed firebaseConfig into initializeApp and this gave us access to the firebase database
// where we were able to write some data or
/*
expensify-9f720
    name: "Roger Hall"
*/
// END OF -- Mark 1 --


// -- Mark 2 --
// lecture 143: Writing to the Database
// go to -- Mark 2 -- above
// -- Mark 2 -- CONTINUE
// so remember, with Firebase we can store the data in the same way we use the data inside of our
// client side JavaScript which is a super handy technique
// remember, firebase doesn't just have a database it also provides authentication, we can host
// files on firebase, there is a test lab and all of this stuff exsist in the web app and we have
// access to it from the firebase module that we imported in above and if we want the database
// related features we can get them by calling firebase.database() and if I want the authentication
// related features we would use " firebase.auth() " and then we would access methods on auth()
// and for our purposes we just want to be able to access the database functionality of the
// firebase module and we have use this " firebase.database() " to get it and we will never pass
// an argument into database and will always call it like " firebase.database() " and we could
// break this out into a variable or " const database = firebase.database() " and then use
// " database().ref().set( { " instead so let's make this change above (under -- Mark 2 -- )
// and what ref() and what is it doing? so ref() is short for reference and this gives us a
// reference to a specific part of our database so think about an sql database where we may have
// various tables for our app like a users table, a notes table and an expenses table and these
// differnet tables allow us to break up our data into little individual pieces and if we were
// using a MongoDB database I might collections like a users collection, notes collection and an
// expenses collection but for firebase we just have the ability to set up various references
// so we can reference a different part of our database and I can store information there so we
// could store users in one location and expenses in another location and for the moment we are
// not going to be passing in anything into ref() and if we don't pass anything in then we will
// get a reference to the root of the database and this is why all the key value pairs from our
// object are showing up on the root of our database

// and set() can be called on a reference and we call set to set the value for that reference
// and remember we do not have to pass an object to set and let's prove that by do the following:
/*
database.ref().set( 'This is my data.' );
*/
// and this time let's pass in a string to set() and now we can save the file and remember
// " database().ref().set( 'This is my data.' ); " will override the below object
/*
database().ref().set( {
    name     : 'Andrea Mead',
    age      : 26,
    isSingle : false,
    location : {
        city    : 'Philadelphia',
        country : 'United States'
    }
} );
*/

// and now go to the Firebase console database tab and we now see our database is set to a
// string or " This is my data. " and remember, set can take any of the different data types
// mentioned above

// now let's comment out this line: " database.ref().set( 'This is my data.' ); " and look
// at what happens
/*
database.ref().set( {
    age : 27
} );
*/
// so what will happen? so now we just have " age : 27 " showing up and the object above got
// removed because we completely override the database with the set call above so what if we did
// just want to update age, how can we get that done? and to get that done we will pass something
// to ref and remember if we pass nothing to ref we get a reference to the root of the database
// and so we could say let's get a reference not to the root but to the age by setting ref equal
// to ref( 'age' ) and so now whatever we pass to set will show up for age and then we pass in the
// new value for set or set( 27 ); and this will only overwrite " age : 26 " above not the whole
// object and age was changed to 27 because when we called set we called it on a specific location
// within our database so it only updated the age value
database.ref( 'age' ).set( 27 );

// remember, in the above example, we went one level deep or we went from the root of the database
// into the age location but what if we wanted to change something like city or country? and we can
// do that by setting up the following reference or ref( 'location/city' ) and now we do not have
// a reference to the root and we do not have a reference to the location, we have a refence to the
// city location in the location object and then we call set and we could call it with an object
// but we really just want a new string value so set will look as follows: set( 'New York' )
database.ref( 'location/city' ).set( 'New York' );

// and we can go to the Firebase console to check updates and everything looks good so using .ref()
// and passing a value in gives us access to a specific part of the database as opposed to accessing
// the entire database and our object in the database now looks like the following:
/*
{
    age      : 27,
    isSingle : false,
    location : {
        city    : 'New York',
        country : 'United States'
    }
    name : 'Andrea Mead',
}
*/


// challenge
// for this challenge we are going to have to set up a new child on the root of the database and
// this child's value will be an object and have 2 children inside and the new child is called
// " attributes " and the new children are " height : 72 " and " weight : 160 " and we could do it
// this way:
/*
database.ref( 'attributes/height' ).set( 72 );
database.ref( 'attributes/weight' ).set( 160 );
*/

// or this way:
database.ref( 'attributes' ).set({
    height : 73,
    weight : 150
})

// our object in the database now looks like the following:
/*
{
    age : 27,
    attributes : {
        height : 73,
        weight : 150        
    }
    isSingle : false,
    location : {
        city    : 'New York',
        country : 'United States'
    }
    name : 'Andrea Mead',
}
*/

// in this video, we used set to set a value for a specific reference and we used ref to pick which
// part of the database we are trying to change and it's important to note that what is happening
// here is asynchronous meaning that just because we have a call to set for the age doesn't mean
// this line completes before the next line of code runs so the first line of code may still
// be running when the next line of code starts running so we need a way to actually know when the
// data has changed or failed to change for some reason and to actually know when the data has
// officially changed were going to have to use promises and in the next video we are going to cover
// the promises API and how they work and then we are going to figure out how promises fit into the
// Firebase API and this is going to give us some more fine grained control over all sorts of things
// whethe it's handling success cases or error cases
// END OF -- Mark 2 --


// -- Mark 3 --
// lecture 145: Promises with Firebase
// Firebase will create the promise and call resolve or reject, all we have to do is attach
// then and catch calls onto our set return value and set returns a promise so we can continue
// chaining right after the set call, for example, see below:
database.ref().set( {
    name     : 'Andrea Mead',
    age      : 26,
    isSingle : false,
    location : {
        city    : 'Philadelphia',
        country : 'United States'
    }
} ).then( () => {
    console.log( 'Data is saved' );
} ).catch( ( error ) => {
    console.log( 'This failed', error );
} )

// we add .then() and pass in our first argument which is just an arrow function and this will run
// when the syncing is successful and for the then() call nothing comes back from Firebase, then()
// just gets called letting us know our changes were successfully synced to the database and next
// we attach the catch() call and we pass in our arrow function that will run when the data fails
// to sync and our catch calls will always be called with some sort of error and the error argument
// will represent that error and in the above example, we dump the error to the console and we will
// hopefully see the message " Data is saved " since the data should sync correctly and in the
// console, we see " Data is saved  " so the changed synced successfully and it is a good thing
// that JavaScript supports asynchronous programming otherwise we would be locking the browser up
// evey single time we make a then() call and catch() call and we wnat the user to be able to
// interact with the app during the time the promise is running

// now we want to trigger the error handler and to do this we have a few different options and for
// the moment let's go ahead and add some rules to the database and we will block anyone from
// reading and writing so we'll do:
/*
{
  "rules": {
    ".read": false,
    ".write": false
  }
}
*/

// and now our call should fail and when we go to the expensify app, we will see the error in the
// counsel or:
/*
This failed Error: PERMISSION_DENIED: Permission denied
    at Repo.js:527
    at exceptionGuard (util.js:575)
    at Repo.callOnCompleteCallback (Repo.js:520)
    at Repo.js:301
    at PersistentConnection.js:428
    at PersistentConnection.onDataMessage_ (PersistentConnection.js:461)
    at Connection.onDataMessage_ (Connection.js:256)
    at Connection.onPrimaryMessageReceived_ (Connection.js:250)
    at WebSocketConnection.onMessage (Connection.js:160)
    at WebSocketConnection.appendFrame_ (WebSocketConnection.js:208)
*/
// you'll notice we don't provide a ton of information to the user which is a good thing because
// we don't want to expose the contents of our database and we are just saying you do not have
// permission to do that so we now we have all this stuff in place, we have promises integrated
// into set calls and now let's look at the docs or firebase.google.com/docs and we went into the
// docs and explored firebase.database.reference and then looked at the method " set "

// challenge
// will use the below:
// step 1: setp then and catch
// step 2: make sure catch actually works and since we can't read or write to the database right
// now we should see the catch handler run and then we will switch the rules to be open and then
// we will make sure then runs
database.ref( 'attributes' ).set({
    height : 73,
    weight : 150
}).then( () => {
    console.log( 'Data is saved v2' );
} ).catch( ( error ) => {
    console.log( 'This failed v2', error );
} );

// remember set returns a promise and
// when .read and .write were set to false, see below, the catch handler ran and the error is
// getting caught and the console reads:
// " This failed v2 "  
/*
{
  "rules": {
    ".read": false,
    ".write": false
  }
}
*/

// when .read and .write were set to true, see below, the then() call ran and the console reads:
// " Data is saved v2 " so we can be pretty confident that what we expected to happen actually
// happened
/*
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
*/

// END OF -- Mark 3 --



// -- Mark 4 --
// lecture 146: Removing Data from Firebase
// we are going to remove isSingle from the database and were going to get that done by learning
// about a brand new method called remove and remove is also called on our reference

// challenge
// the instructor wants us to use the documentation to figure out how remove works and the goal
// is to remove isSingle from the database
database.ref( 'isSingle' )
    .remove()
    .then( () => {
        console.log( 'Remove succeeded.' );
    } )
    .catch( ( error ) => {
        console.log( 'Remove failed: ' + error.message );
    } );

// when we go to the expensify console, we see " Remove succeeded " so we know we were able to
// remove isSingle from the database
// now we could remove all items from the database by doing this: " database.ref().remove(); "
// but more common to focus on a specific item we want to remove from the database and let's talk
// about one more way we can delete data before we go and we will use set to delete data as well
// and to do this we do as follows:
// database.ref( 'isSingle' ).set( null );
// and this is equivalent to using .remove() to remove isSingle from the database and this works
// but once again remove is way more explicit so were going to be sticking with using .remove()
// to remove items from the database

// in the next video, we are going to be learning how we can more efficiently update our database

// END OF -- Mark 4 --


// -- Mark 5 --
// lecture 147: Updating Data
// to update some data use update() method and remember, unlike set which can be called with pretty
// much anything, update has to be called with an object and below we will update name and age on
// the root reference and this will not change isSingle, attributes or location at all
database.ref().update( {
    name : 'Mike',
    age  : 29
} );

// now we have the following:
/*
expensify-9f720
age: 29
attributes
    height: 73
    weight: 150
location
    city: "Philadelphia"
    country: "United States"
name: "Mike"
*/

// with update() we don't just have to update properties that already exsist and I could add
// something brand new on if I wanted to so we could do the following:
database.ref().update( {
    job : 'Software developer'
} );

// the above will set " job " for the very first time and along with creating new attributes we
// can also delete existing attributes by setting their value equal to null and see below for an
// example
database.ref().update( {
    attributes : null
} );

// for the next example, let's go ahead and tweak the data up above by doing the following:
database.ref().update( {
    job : 'Manager',
    location : {
        city : 'Boston'
    }
} );

// this results in the following:
/*
expensify-9f720
age: 29
job: "Manager"
location
    city: "Boston"
name: "Mike"
*/

// you'll notice we no longer have " Country : 'United States' " so it's important to note
// that our updates object only updates at the root level so it will update " job " and
// " location " leaving the other root properties in place but when we go into nested objects
// it will not just update the city, it will actually update location to be this new object or
// the object shown below:
/*
{
    city : 'Boston'
}
*/

// which means we will lose all other data stored on the object like " country : 'United States' "
// and there is a way to update job and city leaving everything else in place but the syntax does
// look a little weird and what we have to do is change our update call so instead of providing a
// value for location and setting the value equal to a new object, what we need to do is we have
// to provide the reference location as the key and the new value as the value and we will be using
// a forward slash inside an object property which is invalid so imagine we wanted to use 
// " location/city " and this is not valid JavaScript so in order to use this technique which
// were not going to be using very often we have to wrap " ' location/city ' " inside of quotes
// and now we can set the value for the location city to equal " Boston " and leave
// " country : 'United States' " unchanged so let's test this out, first we need to add back in
// " country : 'United States' " and change the city to " New York "
database.ref().update( {
    location : {
        city : 'New York',
        country : 'United States'
    }
} );
// this results in the following:
/*
expensify-9f720
age: 29
job: "Manager"
location
    city: "New York"
    country: "United States"
name: "Mike"
*/


// now if we apply the technque above or " ' location/city ' " we should see the city change but
// the country will remain unchanged
database.ref().update( {
    'location/city' : 'Boston'
} );

// this results in the following:
/*
expensify-9f720
age: 29
job: "Manager"
location
    city: "Boston"
    country: "United States"
name: "Mike"
*/

// so using this technique we can update those child locations with a single update call

// now it's challenge time
// challenge
// for this challenge were going to change the data so we have something a little more interesting
// to update
database.ref().update( {
    name : 'Andrea Mead',
    age : 26,
    stressLevel : 6,
    job : {
        title : 'Software developer',
        company : 'Google'
    },
    'location/city' : 'Philadelphia'
} );

// this results in the following:
/*
expensify-9f720
age: 26
job
    company: "Google"
    title: "Software developer"
location
    city: "Philadelphia"
 country: "United States"
name: "Andrea Mead"
stressLevel: 6
*/

// for the challenge:
// change stressLevel to a 9 and
// change job.company to Amazon and
// change location.city to Seattle
// we want to make all 3 changes with a single update call
database.ref().update( {
    stressLevel : 9,
    'job/company' : 'Amazon',
    'location/city' : 'Seattle'
} );

// this results in the following:
/*
expensify-9f720
age: 26
job
    company: "Amazon"
    title: "Software developer"
location
    city: "Seattle"
    country: "United States"
name: "Andrea Mead"
stressLevel: 9
*/

// so we have successfully updated the data and we did so with a single update call
// and remember that the update() method also supports promises and that is going to be it for
// update, we now know how to write data ( i.e set() ), we know how to update data
// ( i.e. update() ) and we know how to remove data ( i.e. remove() ) and the last thing to focus
// on is how we can read data from the database and we will go ahead and talk about that in the
// next couple videos since there are a few different ways to get this done


// END OF -- Mark 5 --



// -- Mark 6 --
// lecture 148: Fetching Data from Firebase
// the goal is to get all the data in Firebase into JavaScript so we can do something meaningful
// with it and for now we will just be logging the data but later we will render the data via
// react calls so we start by referencing the database by using " database " and what do we want?
// do we want just the job information for example or do we want all the data? and we want
// everything so we will call ref and reference the root of the database and we are going to try
// to read all of the values that it contains and for now we are going to fetch the data a single
// time and to do that we use the once method and once takes as the first and only argument the
// event type and we will learn about other more complex events when we set up list based data
// for now though if we are trying to fetch all of the data at a specific reference we can go
// ahead and pass value in and once return a promise and we use that promise to do something
// when the data comes back or when there is an error fetching the data and inside the then() call
// we do get an argument back and we did request some data and the data is available to us inside
// () and the argument is what is known as a snapshot and on the snapshot we have access to our
// data and we can extract the value of data using snapshot.val() and val is a function and we
// call it with no arguments and it returns the data we requested and in our case, we requested
// the root of the database which is an object containing all of our key value pairs and we can
// print all of our data by adding on " const val = snapshot.val(); " and printing the data to the
// console so at this point we should be able to fetch all the data in the database and print it
// to the console and go to the expensify site and we should see our data in the console and we
// do see all the data showing up in the console so the below code ran successfully
database.ref()
    .once( 'value' )
    .then( ( snapshot ) => {
        const val = snapshot.val();
        console.log( val );
    })
    .catch( ( error ) => {
        console.log( 'Error fetching data :' + error.message );
    });


// this results in the following:
/*
age: 26
job: {
    company: "Amazon",
    title: "Software developer"
}
location: {
    city: "Seattle",
    country: "United States"
}
name: "Andrea Mead"
stressLevel: 9
*/


// we could change the ref() call so that we can target a specific part of the database, for
// example, we could target the location object by doing ref( 'location' ) and just fetch the
// location object and save the file and go to the expensify site and we should see the location
// object showing up in the console and we do see this so the below code ran successfully
database.ref( 'location' )
    .once( 'value' )
    .then( ( snapshot ) => {
        const val = snapshot.val();
        console.log( val );
    })
    .catch( ( error ) => {
        console.log( 'Error fetching data :' + error.message );
    });


// this results in the following:
/*
{
    city: "Seattle",
    country: "United States"
}
*/


// we could even take things further and fetch just the city value and if we go to the expensify
// site and look in the console we should see the city value or "Seattle" showing up and that what
// we see in the console so the below code ran successfully
database.ref( 'location/city' )
    .once( 'value' )
    .then( ( snapshot ) => {
        const val = snapshot.val();
        console.log( val );
    })
    .catch( ( error ) => {
        console.log( 'Error fetching data :' + error.message );
    });


// this results in the following:
/*
Seattle
*/    


// now that we have fetched data out of the database we could do something like dispatch an action
// ( inside the then() arrow function ) to the redux store and then the redux store changes and
// then the react components update themselves and that is going to be pretty similiar to what we
// end up doing but before we do anything like this our instructor wants to talk about another way
// we can fetch data and remember using once we get the data a single time or we get the data and
// our functions never rerun and the request either succeeds or fails and that is it and if the
// data changes we are not going to get notified unless we make another query to the database

// what if we wanted to have the server notify us of changes and to get that done we are going to
// be switching up the method we use and we are going to go from once() to on() so on the reference
// or ref() we will call on() and this will allow us to listen for something over and over and in
// this case we will stick with the value event for the moment so we will be able to get the value
// back from the database and get the new value every single time it changes and to get new value
// we need to pass in a callback function and that callback function is the second argument to on()
// and this callback function get called with a snapshot argument and we can do something with that
// snapshot data inside the callback function and for now we will console.log the snapshot value by
// typing snapshot.val()
// #1
database.ref().on( 'value', ( snapshot ) => {
    console.log( snapshot.val() );
} );


// this results in the following:
/*
age: 26
job: {
    company: "Amazon",
    title: "Software developer"
}
location: {
    city: "Seattle",
    country: "United States"
}
name: "Andrea Mead"
stressLevel: 9
*/  


// and we are not using promises here because remember the goal is to have this function run over
// and over again and we want to run it once right away and then rerun it everytime the data
// changes and we know that promises can only be resolved or rejected a single time with a single
// value so promises would not work in this case and if go to the expensify site and look at the
// output in the console, the output will look the same as what we had before and we will see
// the entire database object dumped to the screen but the cool thing is and something we haven't
// see yet is we have subscribed to changes so the above function will automatically rerun if the
// data changes and now we are going to change some data and we can change the data via a call in
// our program or via the Firebase console

// so the goal is to have a call inside our program actually change the data and we will use
// setTimeout to simulate a delay and we will change the age property to 28
// #2
setTimeout( () => {
    database.ref().update( {
        age : 28
    } );
}, 3500 );


// this results in the following:
/*
age: 28
job: {
    company: "Amazon",
    title: "Software developer"
}
location: {
    city: "Seattle",
    country: "United States"
}
name: "Andrea Mead"
stressLevel: 9
*/


// could have typed the following instead: " database.ref( 'age' ).set( 28 ); "

// what do we expect to happen here? first, I would expect to get the inital value of 26 back
// and then 3.5 seconds later I would expect the setTimeout function to run and when the setTiemout
// function does run and the database does change I would expect the above code to rerun or the
// code below to rerun and print the new data to the console:
/*
database.ref().on( 'value', ( snapshot ) => {
    console.log( snapshot.val() );
} );
*/

// now let's go to the expensify site and look in console and there we see the initial age value
// of 26 and then 3.5 seconds later the age value changes to 28 so by setting up this
// subscriptions we can watch for changes to our database and do something menaingful every single
// time the data does change and if were setting up subscriptions there are times when we want to
// cancel them such as when a user navigates away from a page or were not doing anything with the
// data so we can actually choose to unsubscribe and we can do this using the off method and let's
// test this out by duplicating our setTimeout call twice and then we will unsubscribe the second
// setTimeout call by getting the root reference and then call off with no arguments and this will
// cancel all subscriptions on the root reference and the end result is we see #1 and #2 print
// but we do not see #4 print since we unsubscribed in #3, please see below for details:
// #3
setTimeout( () => {
    database.ref().off();
}, 7000 );


// #4
setTimeout( () => {
    database.ref().update( {
        age : 30
    } );
}, 10500 );

// and go to the expensify site and we see this is running correctly; however, age was updated in
// the database we just didn't see it update in the console since we unsubscribed in #3 so now the
// database looks like:
/*
expensify-9f720
age: 30
job
    company: "Amazon"
    title: "Software developer"
location
    city: "Seattle"
    country: "United States"
name: "Andrea Mead"
stressLevel: 9
*/

// so using subscriptions we can choose to subscribe to changes when we need them and unsubscribe
// to changes when we don't need them and in #3 we removed all subscriptions but assuming we had
// multiple subscriptions we want to remove just one subscription and we can do this in
// 2 ways, first, we could take the second argument and set it equal to the const onValueChange and
// then pass in the variable as the second argument to on() below

// way #1 to remove a single subscription
const onValueChange = ( snapshot ) => {
    console.log( snapshot.val() );
};


// this results in the following:
/*
age: 28
job: {
    company: "Amazon",
    title: "Software developer"
}
location: {
    city: "Seattle",
    country: "United States"
}
name: "Andrea Mead"
stressLevel: 9
*/

// the above was printed to the console before " database.ref().on( 'value', onValueChange ); " ran

// create single subscription #1
database.ref().on( 'value', onValueChange );

// and then we could unsubscribe from just that one subscription by passing in onValueChange as the
// second argument to off()

// remove single subscription #1
setTimeout( () => {
    database.ref().off( 'value', onValueChange );
}, 7000 );

// and this will remove subscription #1 without affecting any of our other subscriptions

// alternatively, we could unsubscribe by creating a const for our original subscription above
// or #1 above and then passing that variable in as the second argument to off() below

// way #2 to remove a single subscription but first create single subscription #2
const onValueChange2 = database.ref().on( 'value', ( snapshot ) => {
    console.log( snapshot.val() );
} );


// this results in the following:
/*
age: 28
job: {
    company: "Amazon",
    title: "Software developer"
}
location: {
    city: "Seattle",
    country: "United States"
}
name: "Andrea Mead"
stressLevel: 9
*/


// remove single subscription #2
setTimeout( () => {
    database.ref().off( 'value', onValueChange2 );
}, 7000 );

// and this is the set up ( i.e way #2 ) our instructor will use most often and we can also be
// notified of any errors that might occur if were trying to access data we don't have access to,
// for example, and to be notified of any errors we pass in another function to onValueChange3
// and the function is an arrow function and the argument is " e " or " error " and we can use
// console.log to do something with the error

// add in a function to be notified of any errors and create single subscription #3
const onValueChange3 = database.ref().on( 'value', ( snapshot ) => {
    console.log( snapshot.val() );
}, ( error ) => {
    console.log( 'Error fetching data: ', error );
} );


// this results in the following:
/*
age: 28
job: {
    company: "Amazon",
    title: "Software developer"
}
location: {
    city: "Seattle",
    country: "United States"
}
name: "Andrea Mead"
stressLevel: 9
*/


// so this is the complete set up for subscriptions: we subscribe, we unsubscribe, we get notified
// of data changes while we are subscribed and we don't get notified of data changes after we turn
// off our subscriptions


// challenge
// will be our job to set up a new subscription and the goal is to print a message to the screen
// using all of the data we currently have about our user and we will be using their name, title
// and company and the final message should look something like this: " Andrew is a software
// developer at Amazon " and we will be setting up a subscription and we should see the data print
// to the screen using console.log and then we will want to change the data ( maybe change Andrew
// to Mike ) and make sure it reprints to the console and we can change the data via some calls to
// our code

// set up a new subscription and be notified if we have any errors and set up the subscription
// using the const onValueChange4 so that if we want to turn off the subscription we can easily
// do so later by typing the following: " database.ref().off( 'value', onValueChange4 ); "
// remember, the second function to on() is our success handler and the third function to on()
// is our error handler
const onValueChange4 = database.ref().on( 'value', ( snapshot ) => {
    // we will access the values off of snapshot and store them in a val variable
    const val = snapshot.val();
    console.log( `onValueChange4: ${ val.name } is a ${ val.job.title } at ${ val.job.company }` );
}, ( error ) => {
    console.log( 'Error fetching data: ', error );
} );


// before the update below, this results in the following:
/*
" onValueChange4: Andrea Mead is a Software developer at Amazon "
*/


// after the update below or 14 seconds later, this results in the following:
/*
" onValueChange4: Mike is a Software developer at Amazon "
*/


// now, let's make an update and watch for this change to be reflected in our Firebase database
// and this change will reprint to the console as well and had to turn off #3 above to make the
// update below work otherwise #3 above turned off all subscriptions that came after it
/*
// #3
setTimeout( () => {
    database.ref().off();
}, 7000 );
*/
setTimeout( () => {
    database.ref().update( {
        name : "Mike"
    } );
}, 14000 );


// after the update run 14 seconds later, database looks like:
/*
expensify-9f720
age: 30
job
    company: "Amazon"
    title: "Software developer"
location
    city: "Seattle"
    country: "United States"
name: "Mike"
stressLevel: 9
*/

// so the challenge was successful and these subscriptions are super useful and were going to be
// using them to make sure that our application data always stays up to date

// recap: in this video, we learned about once(), on() and off() and on() and off() go together
// allowing us to set up and then cancel subscriptions and once() allows us to fetch the data
// on a specific reference a single time so now we have a lot of the basics in place, we know
// how to write, we know how to read, we know how to update and we know how to delete ( i.e. CRUD )
// but what we need to focus on now is how we can properly structure the data for a more real
// world application and right now we have an object at the root of our database but what do we do
// if we have a list of expenses, how do we work with array data in Firebase and in the next video
// we are going to start focusing on how to structure data in Firebase for the expensify app


// END OF -- Mark 6 --


