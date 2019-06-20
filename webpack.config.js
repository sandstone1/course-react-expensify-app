
// lecture 50: Installing and Configuring Webpack

// STEP 3: CREATE WEBPACK CONFIG FILE
// need to create the webpack config file and it has to be located in the
// root folder and has to be called webpack.config.js

// we are going to create a node script
// in order to get webpack working, there are 2 critical pieces of
// informationw we have to provide the config file: an entry point
// and an output point

// STEP 4: WHERE IS THE ENTRY POINT
// that will be src/app.js

// STEP 5: WHERE TO OUTPUT THE FINAL BUNDLE FILE
// that will be public/scripts/app.js

// STEP 6: CREATE MODULE.EXPORTS
// this will be an object and in this object we will be defining all
// of the configuration details for our webpack build


// see notes below
const path = require( 'path' );

// console.log( path.join( __dirname, 'public' ));

// -- Mark 2 --
// lecture 134: Creating Separate CSS Files
// install the extract-text-webpack-plugin
// Step 1: use require to load in the new plugin
// from stackoverflow: " require() is not part of the standard JavaScript API. But in
// Node.js, it's a built-in function with a special purpose: to load modules. "
// inside require, insert the name of the plugin
// so we now have extract-text-webpack-plugin installed and imported
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
// -----------



// -- Mark 1 --
// lecture 133: Production Webpack
// create a function and that function when called returns the webpack config object
// the advantage for doing it this way is that the fuction can be called with arguments
// and one of the arguments we are going to get access to is the environment or env and 
// the webpack docs are using the env.production value to determine what sort of dev tools
// value to add and add the env argument below and then run the env variable in console.log()
// to see what we get and will need to type " yarn run build:prod " in the terminal and
// console.log will print in the terminal and the result is an env value of undefined so
// to fix this we need to go back into package,json and add " --env production " to our 
// " build:prod " 
module.exports = ( env ) => {
    // create a way to check and see if we are running a production webpack build process
    // and if isProduction equals true then were in production mode
    const isProduction = env === 'production';
    // so the next thing we need to tackle are the source maps and the source maps are taking up
    // a good chuck of the remaining size of 3.91 MB and we still want source maps in production
    // but we are going to opt for a slower version and go to devtool below to get this done
    // ------------------

    // -- Mark 2 --
    // lecture 134: Creating Separate CSS Files
    // Step 2: we need to make a new instance of the plugin and we are doing this for the styles
    // that we are going to be extracting
    // so we are setting CSSExtract equal to a new instance of the ExtractTextPlugin and we do
    // have to pass an argument to the constructor function ( i.e. ExtractTextPlugin ) and this
    // wil be the name of our new file 
    const CSSExtract = new ExtractTextPlugin( 'styles.css' );
    // so we are going to be using CSSExtract inside the rules for our stles or inside
    // " test : /\.s?css$/, " and " use : [ 'style-loader', 'css-loader', 'sass-loader' ] "
    // we are going to change " use : [ 'style-loader', 'css-loader', 'sass-loader' ] " to the
    // below
    // -------------


    // module.exports is node
    return {
        // the first property we need is entry and can provide a relative path for the entry point or
        // ./src/app.js
        entry  : './src/app.js',
        output : {
            // the path has to be an absolute path
            // to find the absolute path to the Indecision App type "console.log( __dirname )" above
            // and then go into the terminal and type "node webpack.config.js" and the result in the terminal
            // is the absolute path or
            // /Applications/MAMP/htdocs/stoneburyhomes/misc/udemy/the_complete_react_web_developer_course/indecision_app
            // next, we are going to join together (combine) the absolute path with the local path to the public folder
            // and to do this we will create a const called path and access the module code by using a method called require()
            // and then we will load in a module called path and now we have access to path.join and can use that method
            // to join our absolute path with the local path to the public folder and the combined path will be the path we want

            // -- Mark 3 --
            // we need to change path from " path : path.join( __dirname, 'public' ), " to
            // " path : path.join( __dirname, 'public', 'dist' ), " so we are adding on a third argument and webpack will 
            // create the dist folder as it adds assets to that folder 
            path : path.join( __dirname, 'public', 'dist' ),
            // ------------
            // filename can be called anything but usually the filename is called bundle.js
            filename : 'bundle.js'
        },
        // lecture 54: Setting up Babel with Webpack
        // set up the babel loader
        // loaders in webpack allow us to import or load all kinds of different files and more importantly, process
        // the files, like converting SASS to CSS code or convert ES6 to ES5
        module : {
            rules : [
            {
                // we want to set up the babel loader
                loader : 'babel-loader',
                // next, we want to run this loader on JavaScript files
                // so only run the babel loader when the files meet the criteria set forth below
                test : /\.js$/,
                // next we are going to exclude a given set of files
                // we want exclude all the files / libraries in the node-modules folder
                exclude : /node_modules/
            }, 
            {
                // lecture 64: Setting up Webpack with SCSS
                // need to specify a new rule in order to have webpack work with our style files
                // what we need to do is run some stuff whenever webpack encounters a styles file
                // so we will add a second object to the rules array
                // first, we will target all files that end in .css
                // midway through lecture 64, we changed our focus to scss files so we will now look for scss
                // files and not css files and so we change " test : /\.css$/, " to " test : /\.scss$/, "
                // midway through lecture 66, the instructor decided that we want the ability to test for
                // scss and css files and so to do that we changed test from " test : /\.scss$/, " to
                // " test : /\.s?css$/ "
                test : /\.s?css$/,
                // next, we will set up the css loader ( https://www.npmjs.com/package/css-loader ) and this
                // will allow webpack to load in our css assets
                // and we will set up the style loader ( https://www.npmjs.com/package/style-loader ) and
                // the style loader takes the css that is in JavaScript and it adds it to the DOM by injecting
                // a style tag and this will get our styles showing up in the browser
                
                // instead using the "loader" property like we did for babel, we going to use the "use"
                // property, which will allow us to provide an array of loaders and put "style-loader"
                // before the "css-loader"
                // add in the "sass-loader", which is the compiler loader for sass / scss

                // -- Mark 2 --
                // lecture 134: Creating Separate CSS Files
                // we removed 'style-loader' since style loader handled the inlining of the styles and
                // were not going to be doing this going forward
                // essentially, with the code below, we have told webpack when you see css or sass files
                // we need to process it and extract it and place it in a new file called " styles.css "
                use : CSSExtract.extract( {
                    use : [
                        {
                            loader : 'css-loader',
                            options : {
                                sourceMap : true
                            }
                        },
                        {
                            loader : 'sass-loader',
                            options : {
                                sourceMap: true
                            }
                        }
                    ]
                } )
                /*
                use : CSSExtract.extract( {
                    use : [
                        'css-loader',
                        'sass-loader'
                    ]
                } )
                */
                // -----------

            }
            ]
        }, // end of module

        // -- Mark 2 --
        // lecture 134: Creating Separate CSS Files
        // Step 3: pass CSSExtract into the plugins array and all we have to do is pass in the CSSExtract value
        // will need to create the plugin array
        plugins : [
            CSSExtract
        ],
        // now, we will be able to successfully extract the styles into their own file

        // ==============================
        // GO TO APP.JS -- Mark 1 -- lecture 134
        // ==============================

        // -----------

        // add the devtool property and a string for our source map

        // -- Mark 1 --
        // lecture 133: Production Webpack
        // add a production source map module, which is much slower than our development source map module
        // below called " cheap-module-eval-source-map "
        // the production source map module called " source-map " below produces a external file
        // now rerun the production build in the terminal by typing " yarn run build:prod " and the result
        // is we now have 2 files, once called bundle.js which now 639 KB large and bundle.js.map file and this
        // is a new file and is and 3.72 MB but were not worried about the size of this file since this file
        // will only get loaded when someone cracks open the developer tools and for your regular users the
        // browser will never make a request for bundle.js.map which is a good thing and before we go any further
        // were going to rerun live server to make sure the application still works and we do that by typing
        // " npm run serve " and everything is working fine in the expensify app
        // now we need to see if the source map is running correctly so add " console.log( 'test' ); " in app.js
        // and then inside the terminal rerun the production build by typing " yarn run build:prod " and then
        // restart live server by typing " npm run serve " and then go back into the console for the expensify
        // app and check if " test " is on the right line and if we click on app.js we are taken to the source
        // map and we see that everything looks the same as our app.js file and therefore we know our source
        // map is working correctly

        // the next thing we are going to optimize is our css
        // so were going to take all the css that we import in app.js or 
        // import 'normalize.css/normalize.css';
        // import './styles/styles.scss';
        // and dump these files into an external file and this will be topic of the next video
        devtool : isProduction ? 'source-map' : 'inline-source-map',
        // -----------

        // -- Mark 3 --
        // we also need to make a change to the devServer
        // remember, that the dev server never writes assets to the file system it serves the files up
        // virtually and allows the dev server to be snappy and quick and we need to customize the object
        // below because right now the dev server is looking for those assets in the root of the public
        // folder and they are no londer in the root of the public folder so we need to add on
        // " publicPath : '/dist/' " and this will make sure that the dev server looks for those assets
        // in the dist folder
        // -----------

        // set up the webpack dev server
        devServer : {
            // the instructor wanted to use the contentBase property
            // need to set contentBase equal to the absolute path to those public assets
            // and we did that above under the output.path value or
            // path.join( __dirname, 'public' ) and this gives us the absolute path to the public folder
            contentBase         : path.join( __dirname, 'public' ),
            // remember, the first time we visit our application the browser needs to grab the initial HTML
            // and load the JavaScript before it can do anything or before the react router code even runs
            // to solve this probem, we need to tweak our dev server configuration in webpack.config and
            // send back index.html for all routes

            // we need to tell the dev server to serve index.html file for all unknown 404 pages
            // to do this, we need to add a new attribute onto the dev server object
            // " historyApiFallback : true " and this tells the dev server that we are going to be
            // handling routing via our client side code and that it should return index.hmtl for all routes
            historyApiFallback : true,
            publicPath : '/dist/'
        }
    };
};


// STEP 7: RUN WEBPACK
// we now have everything we need to run webpack and we run webpack by going
// to the terminal and typing "yarn run build" and build is the alias for webpack
// the end result is we now have a bundle.js file in the public folder

// STEP 8: REMOVE THE SCRIPTS/APP.JS FILE, THE REACT SCRIPT TAGS IN INDEX.HTML AND CHANGE THE SCRIPT TAG PATH
// now we can delete scripts/app.js since we don't need it any longer
// we can also go to index.hrml and delete the react script tags since we will be loading
// those tags in via webpack in a few videos
// in index.html, change <script src="/scripts/app.js"></script> to <script src="/bundle.js"></script>


// STEP 9: SET UP WEBPACK WATCH IN PACKAGE.JSON
// we can watch for changes with webpack just like we watched for changes with babel
// so type " "build": "webpack --watch" " and in the terminal type "yarn run build"
// to restart the app


