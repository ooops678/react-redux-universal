import React, {PropTypes} from 'react';
import {Link, IndexLink} from 'react-router';

const Header = ({loading }) =>  {
    return (
        <nav>
            <ul>
                <li><IndexLink to="/" activeClassName="active">Home</IndexLink></li>
                <li><Link to="todos" activeClassName="active">Todo</Link></li>
                <li><Link to="about" activeClassName="active">About</Link></li>
            </ul>
        </nav>
    );
};

Header.propTypes = {
    loading: PropTypes.bool.isRequired
};
export default Header;