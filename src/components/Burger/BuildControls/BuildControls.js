import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  {label: 'Cheese', type: 'cheese'},
  {label: 'Bacon', type: 'bacon'},
  {label: 'Salad', type: 'salad'},
  {label: 'Meat', type: 'meat'}
];

const buildControls = (props) => (
  <div className={classes.BuildControls}>
    <p>Current Price: $<strong>{props.totalPrice.toFixed(2)}</strong></p>
    {controls.map(ctrl => (
      <BuildControl 
        key={ctrl.label} 
        label={ctrl.label} 
        buttonMore={() => props.addIngredient(ctrl.type)}
        buttonLess={() => props.removeIngredient(ctrl.type)}
        disabled={props.disabled[ctrl.type]}/>
    ))}
    <button 
      className={classes.OrderButton}
      disabled={!props.purchasable}
      onClick={props.ordered}>{props.isAuth ? 'ORDER NOW' : 'SIGN UP TO ORDER'}</button>
  </div>
);

export default buildControls;