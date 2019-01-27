import React from 'react';
import classes from './Order.css';

const order = (props) => {
  const ingredients = [];
  for (let ingredientName in props.ingredients) {
    ingredients.push(
      {
        name: ingredientName, 
        amount: props.ingredients[ingredientName]
      }
    );
  }

  const ingredientOutput = ingredients.map(ig => {
    return (<span 
      style={{
        textTransform: 'capitalize',
        display: 'inline-block',
        margin: '8px 8px',
        border: '1px solid #eee',
        borderRadius: '4px',
        padding: '5px'
      }} 
      key={ig.name}>{ig.name}: {ig.amount} </span>);
  });

    return (
      <div className={classes.Order}>
        <p>Ingredients: {ingredientOutput}</p>
        <p>Total Price: <strong>USD {props.totalPrice}</strong></p>
      </div>
    );
  
  
};

export default order;