
// -- Mark 1 --
// lecture 139: Build It: Adding Total Selector
// the instructor is going to introduce something that we not going to use throughout the
// entire course but something that is worth knowing about and it is called test driven development
// and test driven development is very similar to what we've been doing so far but the goal is write
// the test cases first and the reason we are not always going to use something like this is
// because for some of our tests like snapshot tests we can't write the tests first because we are
// just taking a snapshot of the data but in this case, we can write the entire test suite first
// knowing that it is going to fail and then we can create the function is fit that specification
// so when we write the test cases were kind of writing the documentation outlining what this
// new thing should do and then we write the new thing so were going to play around with this to
// keep things a little more interesting

// import the default export we set up in expenses-total.js
import selectExpensesTotal from '../../selectors/expenses-total';
// were also going to need the fixture data
import expenses from '../fixtures/expenses';



// TEST CASE #1
test( 'should return 0 if no expenses', () => {
    // see what happens when we pass in an empty array or an array of no expenses
    const response = selectExpensesTotal( [] );
    
    // then we will make our assertion and we will expect the response to be the number 0
    expect( response ).toBe( 0 );
});

// another principal of test driven development is we write test cases that fail before we do
// anything else and so the next step in the TDD lifecycle is to make a tweak to the code to get
// that test case to pass

// after tweaking selectExpensesTotal, the test is passing so we've completed the TDD lifecycle
// for TEST CASE #1 and we can move on to another test case


// TEST CASE #2
test( 'should correctly add up a single expenses', () => {
    // see what happens when we pass in a single expense and remember we are passing in an array
    // of a single expense
    const response = selectExpensesTotal( [ expenses[ 0 ] ] );
    
    expect( response ).toBe( 195 );
});


// TEST CASE #3
test( 'should correctly add up multiple expenses', () => {
   // see what happens when we pass in multiple expenses and remember expenses is an array so
   // no need to put [] around " expenses "
   const response = selectExpensesTotal( expenses );
   
   expect( response ).toBe( 114195 );
});

// if we go to the terminal we will see TEST CASE #2 and TEST CASE #3 both fail so take the next
// step in the TDD lifecycle and make a tweak to the code to get both test cases to pass and I
// tweaked the code in expenses-total.js and not both test cases pass

// all test cases are passing so were done with our TDD experiment in that we created the test
// cases first and watched them fail and then we tweaked the code so that all the test cases pass

// now earlier when we first explored testing I mentioned that one of the nice things about tests
// is that when you revist code later you can refactor it with a little bit of confidence knowing
// that you are not breaking anything so we have these test cases in place and if anythign ever
// breaks we will know and with the test cases in place we can experiment with other ways to get
// the same thing done with less code and be a little bit faster so we have the confidence to
// refactor knowing that we will always know if we have some sort of regression since the test cases
// will fail 

// in the next video, we will display some of this information to the user
