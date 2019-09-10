
// -- Mark 1 --
// lecture 142: Getting Firebase
// the * below takes all the named exports from firebase and dumps them on a brand new
// variable called firebase so we could have " firebase.add " or " firebase.remove " for
// example and this format " * as " is recommended by Firebase
import * as firebase from 'firebase';

// now, at this point we can go ahead and make a connection to our database but we before we
// do we need to grab that configuration object from the firebase website and change " var "
// below to " const " 
const firebaseConfig = {

    // -- Mark 10 --
    // lecture 155: Creating a Separate Test Database
    // down below we need to go through the exact same process we went through in webpack.config
    // and that process is replacing the values below with new values; for example, for the apiKey
    // we would replace " apiKey: "AIzaSyAeWmvNMirGMX-g29cCJqdsQGWqHi2TUUs", " with
    // " apiKey: process.env.FIREBASE_API_KEY, " and do this for all the key value pairs down
    // below and I'll comment out the old version and keep it for a reference
    
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
    

    // development database config
    /*
    apiKey: "AIzaSyAeWmvNMirGMX-g29cCJqdsQGWqHi2TUUs",
    authDomain: "expensify-9f720.firebaseapp.com",
    databaseURL: "https://expensify-9f720.firebaseio.com",
    projectId: "expensify-9f720",
    storageBucket: "",
    messagingSenderId: "185379666584",
    appId: "1:185379666584:web:cc1077d0ab71eb6e"
    */

    // test database config
    /*
    apiKey:"AIzaSyAJUshxxog0ayyIqls1KtGEbDbHdh3pQ6k",
    authDomain:"expensify-test-bdfa9.firebaseapp.com",
    databaseURL:"https://expensify-test-bdfa9.firebaseio.com",
    projectId:"expensify-test-bdfa9",
    storageBucket:"",
    messagingSenderId:"894881425762",
    appId:"1:894881425762:web:75619a96af704189"
    */

    // so now we are correctly setting and using those environment variables and at the moment
    // this is going to work but it's only going to work for the development setup and there is
    // one more change we need to make for the test setup and this is a very easy change and over
    // inside our jest.config.json file we need to add one new thing inside the file so we will
    // go from this:


    // ==============================
    // INSIDE JEST.CONFIG.JSON
    // ==============================


    /*
    {
        "setupFiles" : [
        "raf/polyfill",
        "<rootDir>/src/tests/setupTests.js"
        ],
        "snapshotSerializers" : [
            "enzyme-to-json/serializer"
        ]
    }
    */

    // to this:
    /*
       "setupFiles" : [
        "raf/polyfill",
        "<rootDir>/src/tests/setupTests.js"
        ],
        "snapshotSerializers" : [
            "enzyme-to-json/serializer"
        ]
    */

    // we added setupFiles and setupFiles is an array of files to run to setup our test cases
    // and were going to be using this now to grab our environment variables and we can do
    // other stuff inside here but for the moment we just need to provide the path and now in
    // here we have access to a special little pattern or "<rootDir>" and Jest will replace this
    // with the root directory for the project later on and then add /src/test/setupTests.js
    // to "<rootDir>" or "<rootDir>/src/test/setupTests.js" and now all we have to do is create
    // the setupFile

    // for whatever reason I already had the correct setup in jest.config.json so for me, there
    // was no need to update anything within the jest.config.json file

    // at this point in the video, the instructor said from the future that if we have been
    // following along with the v16 updates then we already have the set up test file in place
    // and it was originally created when we set up enzyme


    // ==============================
    // GO TO TESTS/SETUPTESTS -- Mark 1
    // ==============================


    // END OF -- Mark 10 --

};

// and once we have the firebaseConfig object in place, we need to use the method
// " firebase.initializeApp(firebaseConfig); " and this is going to initialize Firebase to work
// with the specific application whose config we provided or expensify in our case 
firebase.initializeApp(firebaseConfig);


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


// -- Mark 9 --
// lecture 152: Asynchronous Redux Actions
// we are going to export Firebase and the database variable so anyone who wants to take
// advantage of Firebase can just import the named export below and grab Firebase if they need it
// or grab the database variable if they need it
export { firebase, database as default };

// so that is it for configureStore.js and firebase.js and now we want to focus on adding in
// something new in action/expenses.js