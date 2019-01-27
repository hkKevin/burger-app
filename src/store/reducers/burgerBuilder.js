import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  ingredients: null,
  totalPrice: 0,
  error: false,
  building: false
}

const INGREDIENT_PRICES = {
  cheese: 1.5,
  bacon: 1.5,
  salad: 1,
  meat: 2
}

const addIngredient = (state, action) => {
  const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 }
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient)
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
    building: true
  }
  return updateObject(state, updatedState);
}

const removeIngredient = (state, action) => {
  const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 }
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient)
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
    building: true
  }
  return updateObject(state, updatedState);
}

const setIngredients = (state, action) => {
  return updateObject( state, {
    ingredients: {
      cheese: action.ingredients.cheese,
      bacon: action.ingredients.bacon,
      salad: action.ingredients.salad,
      meat: action.ingredients.meat
    },
    error: false,
    building: false
  });
}

const setTotalPrice = (state, action) => {
  return updateObject(state, {totalPrice: action.totalPrice});
}

const fetchFailed = (state, action) => {
  return updateObject(state, {error: true});
}

const reducer = (state = initialState, action) => {
  switch ( action.type ) {
    case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);

    case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);

    case actionTypes.SET_INGREDIENTS: return setIngredients(state, action);    

    case actionTypes.SET_TOTALPRICE: return setTotalPrice(state, action);

    case actionTypes.FETCH_FAILED: return fetchFailed(state, action);

    default: return state;
  }
};

export default reducer;