
// IMPORTS
// we need React since we are using JSX
import React from 'react';
// import named exports from react-router-dom
import { Link } from 'react-router-dom';

// -- MARK 5 --
// what happens if someone visits a page that we do not have a route for?
// to fix this we are going to render a component ( a 404 component ) just on pages that
// we haven't specified elsewhere ( by specified elsewhere I mean in the path property
// within the <Route /> component )

// create a NotFoundPage component
const NotFoundPage = () => (
    <div>
        404! <Link to="/">Go home</Link>
    </div>
);

export default NotFoundPage;