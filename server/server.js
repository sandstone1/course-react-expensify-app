
// import the express module using the require method and require ()
// is the node way of importing modules
const express = require( 'express' );

// now, we need to create a new instance of Express
// and app represents an Express application
const app = express();

// -- Mark 2 --
// lecture 136: Developing with Heroku
// Heroku provides us with an environment variable and this environment variable is
// going to change every single time we deploy our app so we need to create a new
// const variable called port or " const port = process.env.PORT " and PORT is
// the environment varialbe that Heroku automatically sets for us and if PORT exists
// then it means we are on Heroku and we want to use the PORT value but if PORT does
// not exist then we can default to something like 3000 on our local machine and we
// can get this done by using the logically OR operator for the const port or
// " const port = process.env.PORT || 3000; " and from Mozilla:
// " Logical OR (||) / expr1 || expr2 / If expr1 can be converted to true, returns
// expr1; else, returns expr2 "
const port = process.env.PORT || 3000;
// ------------

// next, we have to tell Express where our files live and what port to
// use and were going to start serving up the public folder and everything
// inside that folder

// app.use() is one way to customize our Express servers and were going to
// be using this to register some middleware and when we say middleware
// we mean something that runs for each request so if someone makes a request
// to the server we might want to run some code that logs something to the
// screen or if someone makes a request we might want to run some code that
// serves up that asset from the public directory and to make that happen
// we will use a function that comes from Express called express.static()
// so were going to take the return value from express.static() and pass it into
// app.use()

// express.static() takes an argument and that argument is the path to the public
// folder and let's create that variable that represents that path and we will use
// the path module but first we need to load in the path module and remember, the path
// module is built in so there is no need to manually install this one
// from w3schools: " The Path module provides a way of working with directories and
// file paths. "
const path = require( 'path' );

// we will use path.join() to get the path to the public directory
// the first argument will be the current directory and the current directory is:
// /Applications/MAMP/htdocs/stoneburyhomes/misc/udemy/the_complete_react_web_developer_course/
// expensify/server
// the second argument will be the next part of the path and remember, we pass in all the
// various pieces to the path and path.join() puts them together
// the second argument will be " .. " since we want to go up a folder and then
// the third argument will be " public "
const publicPath = path.join( __dirname, '..' , 'public' );

// once we include the publicPath argument to the express.static method, we will have
// an express application that will serve up all the assets from the public directory
app.use( express.static( publicPath ) );


// -- Mark 1 --
// app.get() lets us set up some function to run when someone makes a get request to
// the server and in our case, we need to call it with 2 arguments and the first
// argument is the path and we will use an " * " which will match all unmatched routes
// and the second argument is an function and within the function we will be processing
// all the unmatched requests and what we need to do is send back the index.html file
// within the public directory and we will get that done by providing the 2 arguments
// required by Express, which are the request object and response object and the request
// object contains some information about the request and the response object lets you
// manipulate the reposnse your Express server makes to whoever made the http request
// and in our case, we just want to use a single method inside the function and the
// method is called sendFile() and this will allow us to send back the index.html file
// and all we have left to do is provide the path to index.html inside the sendFile method
app.get( '*', ( req, res ) => {
    res.sendFile( path.join( publicPath, 'index.html' ) );
} );

// now, let's test this by restarting the server so let's shut things down first
// ( control C ) and then let's start up the Express server by typing " node server/server.js "

// recap: in this video, we learned how to use the basics of Express and we set up a 15 line
// server ( or whatever the number is ) and the server does a few important things and
// first, we create an Express application with the following code: " const app = express(); "
// and then we tell the Express application to use our public directory to set up all of our
// static assets and we also say if what the person requested is not in the public directory
// then give us back index.html and we do this with app.get() above and then down below we
// told the Express server to start up on port 3000 and all of this gave us our production
// server and in the next 2 videos we are going to focus on getting our entire application
// up and on Heroku and there are a few things we need to do to get it ready for Heroku,
// we need to teach Heroku how to run our web server and webpack but once were done we are
// going to have a really nice easy to use build process
// -----------

// the last thing we have to do is start up the server and we do that by using app.listen()
// and when we listen we have to listen on a specific port and right now we are going to
// use port 3000, which is a port that is available on all operating systems and a port we
// should be able to use for development purposes without getting any warnings from your
// operating system so we will pass in 3000 as the first argument
// the second argument will be a call back function and this call back function will get
// called when the server is actually up and running

// -- Mark 2 -- continued
// change 3000 to port
// now we are good to go, our server is completely compatible with Heroku
// and now Heroku knows how to start the server and once the server is started the server
// knows how to listen on the port and this is the port Heroku is expecting
app.listen( port, () => {
    console.log( 'Server is up!' );
} );
// ------------

// with all this in place, we now have a working express server
// now, let's test this in the terminal by running a node script file and we just created
// one called server.js so in the terminal type: " node server/server.js " and when we run this
// we should see our message above saying " Server is up! " and if we see this message then
// that means our server did correctly start up and we can head over to localhost 3000 to see
// what we get but first we need to run the production build in the terminal by typing
// " yarn run build:prod " and then let's start up the Express server by running the following
// command in the terminal: " node server/server.js " and then go to localhost:3000 and there
// we will see our expensify app webpage and if we see the expensify app webpage then everything
// is working as expected

// however, we still need to make some tweeks because when we try switch pages in the expensify app
// and then press refresh after we switch pages we get an error printing to the screen that says:
// " cannot GET /create " and this error is coming from the server and this is because there is
// no create file or folder inside of the public folder so we need to fix this or in other words
// we need to serve up index.html for all files that don't have a match and that will make sure
// that our browser router still works and remember we already did this in the dev server config
// in the webpack.config.js file

// what did in webpack.config.js to solve this problems is reflected in the following 5 lines
// of code:

// " we need to tell the dev server to serve index.html file for all unknown 404 pages
// to do this, we need to add a new attribute onto the dev server object
// " historyApiFallback : true " and this tells the dev server that we are going to be
// handling routing via our client side code and that it should return index.hmtl for all routes
/*
historyApiFallback : true "
*/

// because of " historyApiFallback : true " we served up index.html in the public folder
// everytime we got a 404 and we need to do the same thing in this file and to do this we are going
// to add " app.get() " above app.listen()
// go to -- Mark 1 --

