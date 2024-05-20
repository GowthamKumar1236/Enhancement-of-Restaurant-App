import {useContext} from 'react'

import Header from '../Header'
import CartItems from '../CartItems'

import CartContext from '../../context/CartContext'

import './index.css'

const Cart = () => {
  const {cartList, removeAllCartItems} = useContext(CartContext)

  const renderEmptyView = () => (
    <div className="empty-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
        alt="empty view"
        className="empty-view-image"
      />
      <p className="empty-description">Your cart is Empty.</p>
    </div>
  )

  const renderCartItems = () => (
    <>
      <div className="cart-items-header">
        <h1>Cart Items</h1>
        <button
          type="button"
          className="remove-all-btn"
          onClick={removeAllCartItems}
        >
          Remove All
        </button>
      </div>
      <ul className="cart-products">
        {cartList.map(dish => (
          <CartItems key={dish.dishId} cartItemDetails={dish} />
        ))}
      </ul>
    </>
  )

  return (
    <div className="cart-page-container">
      <Header />
      <div className="cart-body-container">
        {cartList.length === 0 ? renderEmptyView() : renderCartItems()}
      </div>
    </div>
  )
}

export default Cart
