import React from 'react';
import { Link } from 'react-router-dom';

const ExpenseListItem = ({ id,description,amount,createdAt}) => (
    <div>
        <Link to={`/edit/${id}`}>
            <h3>{description}</h3>
        </Link>
        <p>{amount} - {createdAt}</p>
    </div>
);


export default (ExpenseListItem); //first () indicates that we do not need anything from state so left blank