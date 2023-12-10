import React from 'react';
import './Card.css';

const Card = ({ id, title, tag }) => (
  <div className="card">
    <p> {id}</p>
    <p> {title}</p>
    <p> {tag}</p>
  </div>
);


export default Card;