
// later on we will be test all sorts of complex functions such as our
// reducers, selectors and components but for now we are going to kick things
// off with the basics
// BASIC FUNCTION
const add = ( a, b ) => a + b;

// now when we do have one of these test files that Jest runs we do get access
// to a set of global variables that Jest provides to us and these variables allow
// us to construct our test cases and the first and most important glabal variable
// provided by Jest is " test " and this let's us set up a new test case
// so how does the test function work? we just call the test function and we pass
// in 2 reuqired arguments: the first one is a name or description ( a string ) and
// second one is the code to run for the test case ( using an arrow function ) and
// inside the arrow function we are going to write test cases for our code

// so were going to pass in some input and then we will look at the output or return
// value and make sure the return value is correct and this will allow us to verify
// if something like add or something more complex like our selector function is
// working as expected so FIRST I'm going to create a results variable and this will
// equal our test case, which is adding the numbers 3 and 4 and the correct result if the
// add function is written correctly would be 7 

// TEST CASE #1
// using the built in Jest test method
test( 'should add 2 numbers - test case 1', () => {
    const result = add( 3, 4 );
});

// next, go to the terminal and rerun the test suite and when we run it, we see that
// Jest found our file and test case and considers the test a success and this is
// indicated by the word PASS in the terminal and the output from running the test in
// the terminal is:

// > expensify@1.0.0 test /Applications/MAMP/htdocs/stoneburyhomes/misc/udemy/
// the_complete_react_web_developer_course/expensify_app
// > jest

// PASS  tests/add.test.js
//  ✓ should add 2 numbers (1ms)

// Test Suites: 1 passed, 1 total
// Tests:       1 passed, 1 total
// Snapshots:   0 total
// Time:        7.715s
// Ran all test suites.

// so why did this test case pass? we'll the test case passed because we did not
// throw any errors from inside of this function so we just called result but we haven't
// actually looked at the value so let's go ahead and create the real test case by
// asserting something about this value and we do this by checking to see if it
// equals what we expect and if not, we will throw an error

// TEST CASE #2
// using the built in Jest test method
test( 'should add 2 numbers - test case 2', () => {
    const result = add( 3, 4 );

    if ( result !== 7 ) {
        // in this case, we want to throw and error using throw new Error()
        // and we will throw a string that describes what happened
        // and this is going to allow us to determine exactly why the given test case failed
        throw new Error( `You added 4 and 3. The result was ${ result }. We expected 7. ` )

    }
});

// obviously, test case #2 will pass but let change the function to reflect a bad
// implementation
const add2 = ( a, b ) => a + b + 1;

// TEST CASE #3
// using the built in Jest test method
/*
test( 'should add 2 numbers - test case 3', () => {
    const result = add2( 3, 4 );

    if ( result !== 7 ) {
        // in this case, we want to throw and error using throw new Error()
        // and we will throw a string that describes what happened
        // and this is going to allow us to determine exactly why the given test case failed
        throw new Error( `You added 4 and 3. The result was ${ result }. We expected 7. ` )

    }
});
*/

// in this case, we will have a failing test case or test case #3 will fail and when we look
// at the output in the terminal we see that the output is giving us some pretty good
// information about exactly what test case failed and why it failed and hopefully by using
// this information we can make the changes to bring our code back to a working state

// with the if statement above we essentailly created an assertion or we asserted something
// about a given value in our program and if it was what we expected then we did nothing and
// if it wasn't what we expected we throw an error and there are all types of assertions
// that we are going to make and keeping track of boilerplate code turns into a real burden
// so one of the other things Jest gives us is an assertion library; in other words, Jest
// gives us access to a function and we can use this function to make assertions about values
// in our program

// now, let's use one of the very basic asssertions checking if 2 values are the same so how
// are we going to get that done? we will get this done by using a global provided by Jest
// called " expect " and expect works like this, we pass the value in that we want to make
// an assertion about and that value, in this case, is " result " and then we access one of
// the many methods that Jest gives us and one of the methods we are going to be using quite
// a bit is toBe() and toBe() let's us check if the result is something and in our case, we
// are going to check if the number is 7 and if it is then great and if not, we have a problem
// comment out test case #3 above and rerun our test suite in the terminal

const add3 = ( a, b ) => a + b + 1;

// TEST CASE #4
// using the built in Jest test method
test( 'should add 2 numbers - test case 4', () => {
    const result = add3( 3, 4 );

    expect( result ).toBe( 8 );
});

// so that's it, at a very basic level that is what we are going to be doing throughout
// the section where our test cases will be getting more complex and our testing code
// ( react components as an example ) will be getting more complex as well

// now let's go to the Jest docs and we can see that the test function lives under
// " globals " and Jest only provides the globals to you when you're in the test files
// and this is another reason the " .test.js " extension is so important so not only will
// Jest run those files but Jest will provide us with all the tools we need to create the
// test cases

// remember, toBe() is an assertion and we use toBe() to make an assertions about values
// in our test cases

// the last 2 things we will cover in this lecture are (1) the instructor will show us
// how we can run Jest in watch mode and (2) we are going to wrap the video up by having me
// create my very own test case

// so as we saw in this video, we were rerunning the test suite over and over again and that
// gets super annoying so were going to set Jest in watch mode and Jest is going to watch
// our test files for changes and when those files change or when things those files import
// change, Jest will rerun the test suite and that's going to allow us to see the results in
// the terminal and we can just keep writing code until a test case fails for example so all
// we need to do is run Jest with the watch argument is make a change in package.json so we
// could change "test" : "jest", to "test" : "jest --watch", and this will result in Jest running
// in watch mode or we could use watch as part of a terminal command
// and there are times when we do not want to run Jest not in watch mode, like when we are about
// to commit or deploy so what we are going to do is leave " watch " out of package.json and
// instead we are going to use " watch " in the command line and the command is:

// " npm test --  --watch "

// and the space after the 2 hyphens says everything before the -- is associated with npm and
// everything after the -- is associated with the script in package.json or associated with 
// Jest and after we run this command we can see that Jest is running in the background so we if
// mess up our assertion for example, I'm going to see the Jest automatically reruns in the terminal
// and spits out an error

// challange
// so were going to create a quick function and I'm going to be responsible for creating a test
// case for the function

// the function for test case #5
const generateGreeting = ( name ) =>  `Hello ${ name }!`;

// so when we call generateGreeting with an argument like the string Mike, we would expect Hello Mike!
// to come back so I'm going to write a test to check that that is what happens and we are going to
// call generateGreeting much like we did with add() above and then we will make an assertiion using
// toBe() and we want to assert that what comes back from generateGreeting is what we would have
// expected

// TEST CASE #5
test( 'should generate greeting from name - test case 5', () => {
    const result = generateGreeting( 'Mike' );

    expect( result ).toBe( 'Hello Mike!' );
});

// another example
// the function for test case #6
const generateGreeting2 = ( name = 'Anonymous' ) =>  `Hello ${ name }!`;

// so when we call generateGreeting with an argument like the string Mike, we would expect Hello Mike!
// to come back so I'm going to write a test to check that that is what happens and we are going to
// call generateGreeting much like we did with add() above and then we will make an assertiion using
// toBe() and we want to assert that what comes back from generateGreeting is what we would have
// expected

// TEST CASE #6
test( 'should generate greeting for no name - test case 6', () => {
    const result = generateGreeting2();

    expect( result ).toBe( 'Hello Anonymous!' );
});

// recap: in this video, we installed Jest and Jest is a test framework and we also created our first
// test file and we used the .test.js extension to create that file and this gives us access to some
// special stuff and for now, we just explored the test function to set up a new test case and the
// expect function to make assertions 