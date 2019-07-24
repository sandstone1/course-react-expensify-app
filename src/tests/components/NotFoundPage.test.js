
// ==============================
// COMING FROM TESTS/COMPONENTS/EXPENSEDASHBOARDPAGE.TEST.JS
// ==============================

// -- Mark 1 --
// lecture 120: Snapshot Testing with Dynamic Components
// first, let's import the things we need
// and will need react since we are going to be using a little bit of jsx inside this file
import React from 'react';
// we will shallow render our component
import { shallow } from 'enzyme';
// import the NotFoundPage component and remember this is a default export
import NotFoundPage from '../../components/NotFoundPage';

// TEST CASE #1
test( 'should render NotFoundPage correctly', () => {
    const wrapper = shallow( <NotFoundPage /> );
     expect( wrapper ).toMatchSnapshot();
} );

// now check the terminal to make sure that this test case passes and then check the snapshot file
// to make sure that everything looks Ok


