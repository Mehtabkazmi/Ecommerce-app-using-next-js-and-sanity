import React, { createContext, useContext, useState } from 'react';
import toast from 'react-hot-toast';

const context = createContext();

export const StateContext = ({ children }) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setQty] = useState(1);

    let foundProduct;
    let index;

    const onAdd = (product, quantity) => {
        const checkProductInCart = cartItems.find((item) => item._id === product._id);
        if (checkProductInCart) {
            const updateCartItem = cartItems.map((prod) => {
                if (prod._id === product._id) return {
                    ...cartItems,
                    quantity:prod.quantity + quantity
                }
            })
            setCartItems(updateCartItem);
        } else {
            product.quantity = quantity;
            setCartItems([...cartItems, { ...product }]);
        }
        toast.success(`${qty} ${product.name} added to cart`);
    }

    const onRemove = (product) => {
        foundProduct = cartItems.find((item) => item._id === product._id);
        const newcartItems = cartItems.filter((item) => item._id !== product._id);

        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price * foundProduct.quantity);
        setTotalQuantities((prevTotalQuantity) => prevTotalQuantity - foundProduct.quantity);
        setCartItems(newcartItems);
    }

    const toggleCartItemQuanitity = (id, value) => {
        foundProduct = cartItems.find((item) => item._id === id);
        index = cartItems.findIndex((item) => item._id === id);
        const newcartItems = cartItems.filter((item) => item._id !== id);

        if (value === 'inc') {
            setCartItems([...newcartItems, { ...foundProduct, quantity: foundProduct.quantity + 1 }]);
            setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
            setTotalQuantities((prevTotalQuantity) => prevTotalQuantity + 1);
        } else if (value === 'dec') {
            if (foundProduct.quantity > 1) {
                setCartItems([...newcartItems, { ...foundProduct, quantity: foundProduct.quantity - 1 }]);
                setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
                setTotalQuantities((prevTotalQuantity) => prevTotalQuantity - 1);
            }
        }
        
    }

    const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  }

  const decQty = () => {
    setQty((prevQty) => {
      if(prevQty - 1 < 1) return 1;
     
      return prevQty - 1;
    });
  }
    return (
      <context.Provider
            value={{
                showCart, setShowCart, cartItems, setCartItems, qty, totalPrice, totalQuantities,
                incQty,decQty,onAdd,onRemove,toggleCartItemQuanitity,setTotalPrice,setTotalQuantities
            }}>
            {children}
      </context.Provider>
  )
}

export const useStateContext = () => useContext(context);
