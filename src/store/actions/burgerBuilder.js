import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

// ActionCreators:
export const addIngredient = (name) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: name
  };
}

export const removeIngredient = (name) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: name
  };
}

export const setIngredients = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients
  };
};

export const setTotalPrice = (totalPrice) => {
  return {
    type: actionTypes.SET_TOTALPRICE,
    totalPrice: totalPrice
  };
}

export const fetchFailed = () => {
  return {
    type: actionTypes.FETCH_FAILED
  }
}

export const initIngredients = () => {
  return dispatch => {
    axios.get('/ingredients.json')
      .then(response => {
        dispatch(setIngredients(response.data));
      })
      .catch(error => {
        dispatch(fetchFailed());
      });
    axios.get('/totalPrice.json')
      .then(response => {
        dispatch(setTotalPrice(response.data));
      })
      .catch(fetchFailed());
  };
}