import React, { useRef,useEffect } from 'react';
import Link from 'next/link';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import toast from 'react-hot-toast';
 import getStripe from '../lib/grtStripe'
import { urlFor } from '../lib/client';
import { useStateContext } from '../context/StateContext';
const Cart = () => {
    const ref = useRef();
    const { totalPrice, totalQuantities, toggleCartItemQuanitity, cartItems, setShowCart,showCart, onRemove } = useStateContext();
    
  const handleCheckout = async() => {
    const stripe = await getStripe();

    const res = await fetch('/api/stripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cartItems),
    });
    
    if (res.statusCode === 500) return;
    
    
    const data = await res.json();
    toast.loading('Redirecting...');
    
    stripe.redirectToCheckout({ sessionId: data.id });
  }
    
  return (
      <div className='cart-wrapper' ref={ref}>
          <div className='cart-container'>
              <button type='button'
                  className='cart-heading' onClick={() => setShowCart(false)}>
                  <AiOutlineLeft />
                  <span className='heading'>Your Cart</span>
                  <span className='cart-num-items'>{totalQuantities} items</span>
              </button>
              {cartItems.length < 1 && (
                <div className='empty-cart'>
                <AiOutlineShopping size={150} />
                      <h3>Your shopping is empty</h3>
                      <Link href={'/'}>
                        <button className='btn' type='button' onClick={()=>setShowCart(false)}>Continue Shopping</button>
                      </Link>
                </div>
              )}
              <div className="product-container">
          {cartItems.length >= 1 && cartItems.map((item) => (
            <div className="product" key={item._id}>
              <img src={urlFor(item?.image[0])} className="cart-product-image" />
              <div className="item-desc">
                <div className="flex top">
                  <h5>{item.name}</h5>
                  <h4>${item.price}</h4>
                </div>
                <div className="flex bottom">
                  <div>
                  <p className="quantity-desc">
                    <span className="minus" onClick={() => toggleCartItemQuanitity(item._id, 'dec') }>
                    <AiOutlineMinus />
                    </span>
                    <span className="num" onClick="">{item.quantity}</span>
                    <span className="plus" onClick={() => toggleCartItemQuanitity(item._id, 'inc') }><AiOutlinePlus /></span>
                  </p>
                  </div>
                  <button
                    type="button"
                    className="remove-item"
                    onClick={() => onRemove(item)}
                  >
                    <TiDeleteOutline />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {cartItems.length >= 1 && (
          <div className="cart-bottom">
            <div className="total">
              <h3>Subtotal:</h3>
              <h3>Rs-{totalPrice}</h3>
            </div>
            <div className="btn-container">
                          <button type="button" className="btn"
                              onClick={handleCheckout}
                          >
                Pay with Stripe
              </button>
            </div>
          </div>
        )}
      </div>
        </div>
  )
}

export default Cart