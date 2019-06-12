
// IMPORTS
// we need React since we are using JSX
import React from 'react';
// import named exports from react-router-dom
import { NavLink } from 'react-router-dom';

// -- MARK 6 --
// let's go ahead and create a new component
const Header = () => (
    <header>
        <h1>Expensify</h1>
        <p><NavLink to="/"       activeClassName="is-active" exact={ true }>Dashboard</NavLink></p>
        <p><NavLink to="/create" activeClassName="is-active">Create Expense</NavLink></p>
        <p><NavLink to="/help"   activeClassName="is-active">Help</NavLink></p>
    </header>
);

export default Header;
