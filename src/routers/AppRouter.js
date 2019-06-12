
// IMPORTS
// we need React since we are using JSX
import React from 'react';
// import named exports from react-router-dom
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';
import ExpenseDashboardPage from '../components/ExpenseDashboardPage';
import AddExpensePage       from '../components/AddExpensePage';
import EditExpensePage      from '../components/EditExpensePage';
import HelpPage             from '../components/HelpPage';
import NotFoundPage         from '../components/NotFoundPage';
import Header               from '../components/Header';


// -- MARK 7 --
// lecture 80: Organizing Our Routes
// create a new stateless functional componenet
// set up the arrow function and implicitly return some jsx
// move the the router code from routes to this functional stateless component
const AppRouter = () => (
    <BrowserRouter>
        <div>
            <Header />
            <Switch>
                <Route path="/" exact={ true } component={ ExpenseDashboardPage } />
                <Route path="/create"          component={       AddExpensePage } />
                <Route path="/edit/:id"        component={      EditExpensePage } />
                <Route path="/help"            component={             HelpPage } />
                <Route                         component={         NotFoundPage } />
            </Switch>   
        </div>
    </BrowserRouter>
);

// set up a default export
export default AppRouter;


// -- MARK 7 --
// lecture 80: Organizing Our Routes
// as of lecture 80, the code below is now old code
/*
// the syntax for using rect-router can be pretty weird at first so we are going
// to start by setting up a const called routes and set it equal to some jsx
const routes = (
    // we define our router configuration for our app right inside jsx
    // we create a tree like structure using all the things from react-router-dom
    // and this lets us clerly define how our app should render based off the
    // current URL

    // first, we create one instance of <BrowserRouter> and we are passing in
    // children so we need <BrowserRouter> and </BrowserRouter>
    // at this point, we have a valid router set up
    // however, we are going to have to define individual routes using <Route>
    // but this is not required
    // each individual route represents one page

    // <Route /> takes 2 main things: a path and a component so when we match
    // the URL or path what should we show to the screen

    // - (1) for path we can set it eqaul to "/" and forward slash just set the path
    // equal to the root of the application ( remember the / does not show up )
    // and the root in our example is localhost:8080
    // for component, we set it equal to a JavaScript expression and reference
    // a component we want to show

    // - (2) as an example of component, we will create one called ExpenseDashBoardPage
    // and will be a stateless functional component ( see above -- MARK 1 -- )
    // pass the valid ExpenseDashBoardPage component into the component prop

    // so the <Route /> below, tells react-router that whenever the URL matches the path
    // below it should render the component below

    // remember that <BrowserRouter> works with with no children or one child ( a <div> 
    // for example or a <Route> for example ) so in order to create 2 routes we need
    // to put the routes between a <div> tag

    // create a new Route where the user can create expenses or path="/create" and
    // go to -- MARK 2 -- above for more details on the corresponding component

    // when we refresh the page for localhost:8080/create both routes are loaded or
    // " This is from my bashboard component " and " This is from my add expense component "
    // and this is because localhost:8080/create matches both "/" and "/create" so to fix
    // this problem, we add a prop to both <Route>s called exact and set it equal to true
    // or exact={ true } and then the component page will only be shown if the path
    // exactly matches the path in <Route> and remember, exact is set to false by default

    // -- MARK 5 --
    // we only want to show the NotFoundPage when the current URL does not match
    // any of routes defined within <BrowserRouter><div></div></BrowserRouter> and to do
    // this we will use the react router <Switch> component and we will need to import
    // <Switch> in order to be able to use it and <Switch> does not take any props
    // to use <Switch>, replace our div tags in BrowserRouter with <Switch></Switch>

    // what does Switch do? when React Router see Switch it will move through our Route
    // definitions in order and it is going to stop when it finds a match, which means we will
    // not see the 404 page when one of Routes above matches the URL but if none of Routes
    // above matches the URL then Switch will continue looking until it gets to the last Route
    // ( which is our 404 route ) and this Route will always match the URL since it has no defined
    // path; therefore, the 404 page will always show up for routes that are not defined elsewhere
    <BrowserRouter>
        <div>
            <Header />
            <Switch>
                <Route path="/" exact={ true } component={ ExpenseDashBoardPage } />
                <Route path="/create"          component={       AddExpensePage } />
                <Route path="/edit"            component={      EditExpensePage } />
                <Route path="/help"            component={             HelpPage } />
                <Route                         component={         NotFoundPage } />
            </Switch>   
        </div>
    </BrowserRouter>
);
*/