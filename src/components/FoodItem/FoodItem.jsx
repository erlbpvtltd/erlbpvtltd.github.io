import React, { useContext, useEffect, useRef } from 'react'
import { assets } from '../../assets/assets'
import './FoodItem.css'
import { StoreContext } from '../../context/StoreContext'

const FoodItem = ({ id, name, price, description, image }) => {

  const { cartItem, addToCart, removeFromCart, url } = useContext(StoreContext)

  const countRef = useRef(null)
  const prevCount = useRef(cartItem[id] || 0)

  // Bump animation whenever cart count changes
  useEffect(() => {
    if (countRef.current && cartItem[id] !== prevCount.current) {
      countRef.current.classList.remove('count-bump')
      // Force reflow to restart animation
      void countRef.current.offsetWidth
      countRef.current.classList.add('count-bump')
      prevCount.current = cartItem[id]
    }
  }, [cartItem[id]])

  return (
    <div className='food-item'>
      <div className='food-item-img-container'>
        <img className='food-item-img' src={url + '/images/' + image} alt={name} />
        {!cartItem[id]
          ? <img
              className='add'
              onClick={() => addToCart(id)}
              src={assets.add_icon_white}
              alt="add"
            />
          : <div className='food-item-counter'>
              <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt="remove" />
              <p ref={countRef}>{cartItem[id]}</p>
              <img onClick={() => addToCart(id)} src={assets.add_icon_green} alt="add" />
            </div>
        }
      </div>
      <div className='food-item-info'>
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="rating" />
        </div>
        <p className="food-item-desc">{description}</p>
        <p className='food-item-price'>${price}</p>
      </div>
    </div>
  )
}

export default FoodItem
