
import React from 'react';

// -- Mark 3.1 --
// lecture 119: Enzyme
import { shallow } from 'enzyme';
// and now we can remove or comment out the ReactShallowRenderer
/*
// we use shallow rendering for the Header component
import ReactShallowRenderer from 'react-test-renderer/shallow';
*/
// and comment out all the code that lives inside the test case
// -- END OF MARK 3.1 --
// -- GO TO MARK 3.2 -- below

// -- GO TO MARK 4.2
// lecture 119: Enzyme
// import toJSON
// -- MARK 4.3 --
// now comment out this import
// import toJSON from 'enzyme-to-json';
// -- END OF MARK 4.2 --
// -- GO TO MARK 4.3 -- below


// have to import the Header component
import Header from '../../components/Header';

// there are 2 main ways we can test react components, we can use shallow rendering
// or we could use full DOM rendering amd we will be using a little bit of each throughout
// the course but for a component like Header we want to stick with shallow rendering and were
// not going to worry about user interaction or lifecycle events with the Header component
// and we are really just concered about what's getting rendered and shallow rendering does
// just that or it only renders the given component whereas full DOM rendering renders child
// components and for our purposes full DOM rendering would cause our test case for the Header
// component to fail since NavLink expects to used somewhere inside of a router and we will explore
// full DOM rendering a little later on

// now we need to actually render Header, which means we need to import React since we will be
// using jsx

// so now we can use ReactShallowRenderer to render the Header component and start off by creating
// a test case

test( 'should render Header correctly', () => {

    // -- Mark 4.1 --
    // lecture 119: Enzyme
    // we are going to shallow render the Header component once again
    // and the process to get this done is much easier and create a variable that is commonly
    // called wrapper and then we call shallow as a function and what do we pass into shallow?
    // we pass in jsx that we are trying to shallow render or the Header component
    const wrapper = shallow( <Header /> );
    // now that we have the shallow rendered Header we have access to the full api and one of the
    // more popular method is " find(selector) " and this will allow us to select the various
    // elements inside our component and make assertions about them and let's mess around with this
    // method; for example: I can expect something about wrapper ( find can be find( #id ) or
    // find( .className ) or find( 'h1' ) ) and then find the h1 tag and get its length and assert
    // that the length is or toBe 1
    expect( wrapper.find( 'h1' ).length ).toBe( 1 );
    // now go to the terminal and see if this test case is passing and this test case is passing
    // and note that if we had more than one h1 tag the test case would fail and we could also
    // do something interesting and grab that text value off of that h1 tag using the text()
    // method
    expect( wrapper.find( 'h1' ).text() ).toBe( 'Expensify' );
    // so just using the very basics of enzyme were able to get a lot of really cool things done
    // and were able to really dive into our components and make assertions about the things
    // inside and the 2 test cases above show why we switched from react-test-renderer to enzyme
    // and with enzyme we get a much more full featured user friendly api and now the goal is to
    // create a snapshot based off the enzyme wrapper
    // -- END OF MARK 4.1 -- continue below

    // -- MARK 4.3 --
    // we will to use toJSON below and toJSON is going to take the wrapper and extract the
    // meaningful stuff or the rendered output and if we go to the terminal and look at our snapshot
    // in the test suite we see that it fails because the snapshot is different from the previous
    // snapshot but if we press " u " in the terminal and then go look at the Header.test.js.snap
    // file we will see that the file contains only the rendered output which is what we want and
    // what we had before with react-test-renderer so by using the enzyme-to-json library we were
    // able to get the correct snapshots showing up in the snapshot file or Header.test.js.snap
    // and now that we have this in place enzyme is all set up

    // -- Mark 4.4 --
    // remove toJSON from the wrapper
    // expect( toJSON( wrapper ) ).toMatchSnapshot();
    expect( wrapper ).toMatchSnapshot();
    // END OF MARK 4.4 --
    // -- GO TO CONTINUE WITH MARK 4.3 -- below

    // there is one more little piece of configuration we can do and that is we can set up
    // enzyme-to-json to work automatically so we don't have to add into our code and that is what
    // we will do for the remainder of this video

    // what were going to do for the remainder of this video is set up another property called
    // snapshot Serializers and we will add that to our existing jest.config.json file and now go
    // to the jest.config.json file and in that file there is a single property that we will need to
    // define to have the jest.config.json file automatically use the enzyme to json serializer and
    // to add that single property we type the following:
    /*
    {
        "snapshotSerializers" : [
            "enzyme-to-json/serializer"
        ]
    }
    */

    // now we can restart the test suite and all test cases are working and now that we added the
    // above property to jest.config.json we can remove to the following import or comment it out
    // and we can remove toJSON from the wrapper above
    // -- GO TO MARK 4.4 -- above
    // -- CONTINUE WITH MARK 4.3 --
    // and now we rerun the test suite and it is still working and our snapshots are just grabbing
    // the rendered output which is what we want and this is the configuration we are going to be
    // working with throughout the rest of this section and now that everything is set up we can
    // make some meaningful progress testing the components
    // -- END OF MARK 4.3 --


    // -- CONTINUE WITH MARK 4.1 --
    // and when we go to the terminal we see we are getting an updated snapshot and for the moment
    // we are going to accept this snapshot for what it is and now let's look at what we just saved
    // in the Header.test.js.snap file and when we look at this file we see a bunch of stuff related
    // to the internals of the enzyme library so if any of these internals were to change our
    // snapshot would change and our tests would start failing and this is not what we want, we
    // don't want all this internal enzyme stuff in our Header.test.js.snap file and what we really
    // want to just the rendered output from our Header component and to make enzyme work with
    // snapshot testing functionality there is one little utility library we have to install and if
    // we google enzyme-to-json and go to the web page we see that enzyme-to-json exports a single
    // function and we will use that single function

    // STEP 1: install the enzyme-to-json library
    // #28
    // enzyme-to-json: I USED NPM HERE INSTEAD OF YARN and in the terminal and I typed
    // "npm install enzyme-to-json@3.0.1" but could have typed "yarn add enzyme-to-json@3.0.1"
    // lecture 119: Enzyme

    // version 3.0.1 does support enzyme version 3, which is what we are using and once we have
    // enzyme-to-json installed we will restart the test suite
    // -- END OF MARK 4.1 --
    // -- GO TO MARK 4.2 -- above


    // -- Mark 3.2 --
    // lecture 119: Enzyme
    // comment out all the code that lives inside the test case
    /*

    // inside the arrow function, we will be using ReactShallowRenderer
    // first up, we have to create a const called renderer and this will equal a new instance
    // using the new keyword of ReactShallowRenderer
    const renderer = new ReactShallowRenderer();

    // now we will go ahead and actually render something and will use renderer.render() to get
    // that done and inside the () we will define the jsx we are trying to render and in our case
    // it is going to be some jsx that creates a single instance of the header component and this
    // is the output we are trying to test or " <Header /> "
    renderer.render( <Header /> );

    // -- SKIP TO MARK 1 --

    // -- Mark 2 --
    // so we will make an assertion about the renderer and we want to make an assertion about the
    // rendered output and we will not use something like toEqual in this case since it will take
    // too mcuh work and is not realistic and what we will do instead is use toMatchSpapshot and
    // will call it with no arguments
    // so what's going to happen? we'll the first time we run this test case it will always pass
    // because there is no existing snapshot and then Jest will go ahead and create a new snapshot
    // of what the rendered Header output looked like and the second time we run this test case
    // Jest will compare it with the existing one and if it is the same then great the test will
    // pass and if it is not then the test will fail

    // so we are going to save the header test file with our call in place and when we go to the
    // terminal and we can see we are getting some new output called snapshot summary and we get
    // the following information: " Snapshots: 1 passed, 1 total " and also if we go to VS code
    // we will see a new file under components called __snapshots__ and this folder is generated
    // by Jest and we should not be changing any of the files inside but we can look at them and
    // if we open the Header.test.js.snap file we see
    // exports[`should render Header correctly 1`] = ` which is our name above followed by a " 1 "
    // because this is the first snapshot and then we have the actual rendered output and so if
    // we were to rerun the test case, it would be comparing what gets rendered from Header with
    // what got rendered in the past

    // so let's go ahead and change something and say we type "aaa" after the h1 tag and then go
    // to the terminal we will see that our test case failed and now we have a decision make, we
    // can (1) ACCEPT THESE CHANGES which is probably not what we want or (2) we can choose to
    // REJECT THESE CHANGES and then make the neccesary changes to the code to get the test case
    // to pass so if I go back to the Header.js file and remove "aaa" and then go back to terminal
    // we will see if now have a passing test case; but what if I wanted to make a real change and
    // keep that change and again we have 2 choices, we can make changes to our Header component
    // to get back to a passing test suite or we can accept these changes by pressing " u " to update
    // them and if we press the " u " key then Jest will take a new snapshot and replace the old
    // snapshot and once again our test case passes and this new snapshot of the Header component
    // will be the one we are tracking with our test suite in the future
    expect( renderer.getRenderOutput() ).toMatchSnapshot();
    // -- END OF MARK 2 --
    // -- GO TO MARK 3.1 -- above

    // -- MARK 1 --
    // and we get access to the rendered output on renderer and will take a look at the output using
    // console.log() and typing " renderer.getRenderOutput() " and this will return the rendered
    // output of the jsx we put in above under " renderer.render( <Header /> ); "
    console.log( renderer.getRenderOutput() );

    // and if we look in the terminal we see that we what we get back is similar to what we got back
    // from react.createElement so we have the type: 'header' and we have our props and insider props
    // we see we have 4 objects which matches the 4 elements inside our Header.js file
    // (please see below for the output from the terminal ):
    // "{ '$$typeof': Symbol(react.element),
    // type: 'header',
    // key: null,
    // ref: null,
    // props: { children: [ [Object], [Object], [Object], [Object] ] },
    // _owner: null,
    // _store: {} }"

    // as we mentioned, we not going to be making any assertions about this object ( i.e. the output
    // above ) and what we will do in this case is use snapshots instead and snapshots allow us to
    // track changes to data over time and so we will be able to create a snapahot of header at its
    // current point in time and we will be able to get notified if this ever chanegs so if the
    // header output changes in a way we don't want we can catch that and if it changes in a way we
    // do want that is fine too and to play around with this there is a single method we need to
    // explore and the method comes from Jest and the method is called toMatchSnapshot and go to
    // -- GO TO Mark 2 -- above

    */
    // -- END OF MARK 3.2 --
    // -- GO TO MARK 4.1 -- above

} );

// recap: so using snapshot testing is going to make it really easy to assert things about our
// components and we will be able to keep track of the changes so that if a component's rendered
// output does change we'll be notified and if it is a good change then great we'll keep it
// but if it is a bad change we'll make sure to adjust the component accordingly and what we
// will explore in the next video is an alternative way to get this done and then we'll make
// some real progress on testing components

