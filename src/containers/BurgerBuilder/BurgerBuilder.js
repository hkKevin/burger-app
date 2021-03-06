import React, { Component } from 'react';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';


export class BurgerBuilder extends Component {

  state = {
    purchasing: false
  }

  componentDidMount () {
    this.props.onInitIngredients();
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey]
      })
      .reduce((sum, el) =>{
        return sum + el;
      }, 0);
    return sum > 0;
  }


  purchaseHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({purchasing: true});
    } else {
      this.props.onSetAuthRedirectPath('/checkout')
      this.props.history.push('/auth');
    }    
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  }

  purchaseContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push('/checkout');
  }

  // purchaseContinueHandler = () => {
  //   const queryParams = [];
  //   for (let i in this.state.ingredients) {
  //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
  //   }
  //   queryParams.push('price='+this.state.totalPrice);
  //   const queryString = queryParams.join('&');
  //   this.props.history.push({
  //     pathname: '/checkout',
  //     search: '?' + queryString
  //   });
  // }

  render (){
    const disabledInfo = {
      ...this.props.burgerIngredients
    };
    for(let key in disabledInfo){
      disabledInfo[key] = disabledInfo[key] <= 0
      // if disabledInfo[key] <= 0, disabledInfo[key] equals to true.
    } 
    //  disabledInfo: {salad: true, meat: false, ...}

    let orderSummary = null;    
    
    let burger = this.props.err ? <p>ingredients can't be loaded</p> : <Spinner />

    if (this.props.burgerIngredients) {
      burger = (
        <>
          <Burger ingredients={this.props.burgerIngredients}/>
          <BuildControls 
            addIngredient={this.props.onAddIngredient}
            removeIngredient={this.props.onRemoveIngredient}
            disabled={disabledInfo}
            totalPrice={this.props.burgerTotalPrice}
            purchasable={this.updatePurchaseState(this.props.burgerIngredients)}
            ordered={this.purchaseHandler}
            isAuth={this.props.isAuthenticated} />
        </>
      );

      orderSummary = (
        <>
          <OrderSummary 
            ingredients={this.props.burgerIngredients}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
            totalPrice={this.props.burgerTotalPrice} />
        </>
      );
    }

    // if (this.state.loading) {
    //   orderSummary = <Spinner />
    // }
    
    return (
      <>
        <Modal show={this.state.purchasing}
               modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    burgerIngredients: state.burgerBuilder.ingredients,
    burgerTotalPrice: state.burgerBuilder.totalPrice,
    err: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddIngredient: (ingName) => dispatch(actions.addIngredient(ingName)),
    onRemoveIngredient: (ingName) => dispatch(actions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));