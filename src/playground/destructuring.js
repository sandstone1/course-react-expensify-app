

// lecture 88: ES6 Object Destructuring

// in this video and in the next video, we are going to learn about ES6
// destructuring and this will allow us to easily work with arrays and
// objects

// create a new file in the playground folder called destructuring.js
// for testing purposes, create a console.log statement
// console.log( 'destructuring' );

// were going to run this file through webpack so
// STEP 1: WE NEED TO MAKE THIS FILE THE ENTRY POINT IN WEBPACK.CONFIG
// " entry  : './src/playground/destructuring.js', "

// STEP 2: WE NEED TO RESTART THE SERVER INSIDE THE TERMINAL
// so type " control C " and then type " yarn run dev-server "

// now we should see 'destructuring' in the console

// let's start off by building an object
const person = {
    name : 'Andrew',
    age  : 27,
    location : {
        city : 'Philadelphia',
        temp : 92
    }
};


// maybe the information above is coming back from database query or
// maybe were getting this information via an AJAX request to some sort
// of http API
// results in " Andrew is 26 "
/*
console.log( `${ person.name } is ${ person.age }.` );
*/

// with object destructuring, were able to take an object like person and
// pull it apart and this allow us to take various properties from the object
// and put them into their own variables and that means we can avoid using
// person.name, we can just create a name variable and we can avoid using person.age
// and we can just define an age variable so the goal looks like the following:
// console.log( `${ name } is ${ age }.` );

// what tools do we already know to get this done?
// could do name = person.name; and age = person.age; and the problem with this
// approach is that it does not scale very well
/*
const name = person.name;
const age = person.age;
// results in " Andrew is 26 "
console.log( `${ name } is ${ age }.` );
*/

// what we are going to look at is how we can do this in one line using ES6 destructuring
// below, we are using the assignment operator to get the values off the person object
// so on the right hand side we have the object we are trying to destructure
// and inside the {} we provide the things on the object we want to grab and in our case
// we have 3 options: name, age and location
// we are going to provide name and age or { name, age } so now
// const { name, age } = person; is equivalent to the following 2 lines:
// const name = person.name;
// const age = person.age;

// the line below creates 2 variables: a name variable and an age variable and it gets
// the values off the person object so for name it looks for person.name and for age
// it looks for person.age
/*
const { name, age } = person;
console.log( `${ name } is ${ age }.` );
*/

// now were going to look at something a little more complex
// let's apply some conditional logic
/*
if ( person.location.temp && person.location.city  ) {
    console.log( `It's ${ person.location.temp } in ${ person.location.city }.` );
}
*/

// the problem with the above code is that we end up repeating the same code
// in multiple places ( remember DRY ) 
// with destructuring, we can SIMPLIFY THIS CODE AND MAKE IT MUCH MORE READABLE
/*
const { city, temp } = person.location;
if ( city && temp ) {
    console.log( `It's ${ temp } in ${ city }.` );
}
*/

// remember, person.location is also an object or technically a nested object

// were going to talk about 2 more features with destructuring
// -- FIRST -- is the ability to rename the local variable we create so
// we have to introduce the renaming syntax or temp : temperture ad this syntax
// will give us the ability to rename the local variable, for example:

/*
const { city, temp : temperture } = person.location;
if ( city && temperture ) {
    console.log( `It's ${ temperture } in ${ city }.` );
}
*/

// -- SECOND -- the second feature we want to talk about is the ability to set
// default values so if there is no value for person.name then we can use the
// default value instead, for example, please see below for how to set up a default
// value ( i.e name = 'Anonymous' ):
const { name = 'Anonymous', age } = person;
console.log( `${ name } is ${ age }.` );

// now that we set a default value above, we will have a backup value in case
// there is no person.name in the person object
// in the example above, the default value will only be used if there is no
// person.name in the person object

// we could also rename the local variable and give it a default value as shown
// in the example below:
/*
const { name : firstName = 'Anonymous', age } = person;
console.log( `${ firstName } is ${ age }.` );
*/


// challange
const book = {
    title  : 'Ego is the Enemy',
    author : 'Ryan Holliday',
    publisher : {
        name : 'Penguin'
    }
};

// instructor wants console.log( publisherName ); and use destructuring to get there

// this works, however, we want to use destructuring
console.log( book.publisher.name );
// use destructuring below and we rename the local variable and set a default value
// on the variable ( i.e. name )
// the solution is below
const { name : publisherName = 'Self-Published' } = book.publisher;
console.log( publisherName );



// so in this video, we learned that we could destructure objects and pull things
// off of objects and create separate variables for those values
// so destructuring allows us to create local variables ( i.e. name ) and to rename the
// local variables and set default values for the local variables and all this comes from
// the object we define ( i.e. book.publisher )




// lecture 89: ES6 Array Destructuring

// in this video, were going to learn abput array destructuring and it is very similar to
// object destructuring but the syntax is slightly different
// let's create an array called address
const address = [ '1299 S Juniper Street', 'Philadelphia', 'Pennsylvania', '19147' ];

// the problem with this code is that it is not clear what is happening, what is address[ 1 ]
// for example
console.log( `You are in ${address[ 1 ]} ${ address[ 2 ] }.` );

// so we are going to destructure the array and array destructuring allows us to pull items
// off an array
// for object destructuring, we use {} or
// -- const {}
// for array destructuring, we use [] or
// -- const []
// what goes inside the [] is an ordered list of variable names, for example:
const [ street, city, state, zip ] = address;
// in the above statement, we are matching variable names to locations in the address array
console.log( `You are in ${ city } ${ state }.` );
// if we just want the state variable name, for example, we would type:
// const [ , , state, ] = address; or const [ , , state ] = address;

// with arrays there is no renaming syntax so if you want to change " state " to
// " yourState " you could do so and it is perfectly valid, for example:
// you could leave off the third comma below and fourth array item in the address array
// will just be ignored
// const [ , , yourState ] = address;

// like objects, you can set up a default value, for example:
// const [ , , state = 'New York', ] = address;
// so now if there is not third item in the array then the default value is used as
// the third item in the array so the below code would result in " You are in New York. "
/*
const address = [ ];
const [ , , state = 'New York', ] = address;
// in the above statement, we are matching variable names to locations in the address array
console.log( `You are in ${ state }.` );
*/


// challange to destructure the data below in the array item
// $2.00 is a small coffee, $2.50 is a medium coffee and $2.75 is a large coffee
const item = [ 'Coffee (hot)', '$2.00', '$2.50', '$2.75' ];

// we want the result to be as follows:
console.log( `A medium Coffee (hot) costs $2.50.` );

// use destructuring
// can give the array items any name we want
const [ coffee = 'Coffee (iced)', , medium_price, ] = item;

console.log( `A medium ${ coffee } costs ${ medium_price }.` );

// if we removed the first item from the item array above, the console.log above would
// print " A medium Coffee (iced) costs $2.50. "






