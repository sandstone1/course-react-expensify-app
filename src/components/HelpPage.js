
// IMPORTS
// we need React since we are using JSX
import React from 'react';

// -- MARK 4 --
// example component 4
// this is stateless functional component
// way #1 - shorthand version
// took out {}; and the return statement so now implicitly returning jsx
const HelpPage = () => (
    <div>
        This is from my help component
    </div>
);

// way #2 - longhand version
/*
const ExpenseDashBoardPage = () => {
    return (
        <div>
            some text
        </div>
    );
};
*/

export default HelpPage;