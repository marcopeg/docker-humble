import React from 'react';
import { Link } from 'react-router';

const Avenger = ({ name }) => (
    <li>
        <Link to={name}>{name}</Link>
    </li>
);

export default Avenger;
