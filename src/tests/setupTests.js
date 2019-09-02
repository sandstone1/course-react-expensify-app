
// import the default export for the enzyme library
import Enzyme from 'enzyme';
// import the default export for adapter and then we'll specify the module name
import Adapter from 'enzyme-adapter-react-16';


// -- Mark 1 --
// lecture 155: Creating a Separate Test Database
import DotEnv from 'dotenv';
// CONTINUE WITH -- Mark 1 -- BELOW


// now we will use a single method call to configure everything and Enzyme.configure()
// can take in all sorts of attributes and we will pass in as the first and only argument
// an object and on this object we can specify various configuration properties and were
// going to set the adapter property equal to a new instance of the adapter we would like
// to use and this is all we need for this file and now whenever we use enzyme in our test
// cases which we will be doing in just a little bit we will have support for react version
// 16
Enzyme.configure({
    adapter : new Adapter()
});

// -- Mark 1 --
// lecture 155: Creating a Separate Test Database
// all we need to do inside of here is run the same line of code as in the webpack.config.js file
// or " require( 'dotenv' ).config( { path : '.env.test' } ); " and we are done
/*
require( 'dotenv' ).config( { path : '.env.test' } );
*/

// so now that we have the separate environments set up we can test things out

// and at this point in the video, our instructor jumped in from the future and said he
// wanted to make a quick correction and that correction would be that we can replace this
// line of code or " require( 'dotenv' ).config( { path : '.env.test' } ); "
// with these two lines of code:
// " import DotEnv from 'dotenv'; " and
// " DotEnv.config( { path: '.env.test' } ); "
DotEnv.config( { path: '.env.test' } );

// now remember to make sure we comment out
// " require( 'dotenv' ).config( { path : '.env.test' } ); " since we included the 2 new
// lines of code above

// END OF -- Mark 1 --