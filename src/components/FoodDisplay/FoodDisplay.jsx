import React, { useContext, useEffect, useRef, useState } from 'react'
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'
import './FoodDisplay.css'

const FoodDisplay = ({ Category }) => {

  const { url, product_list } = useContext(StoreContext)

  const gridRef = useRef(null)
  const prevCategory = useRef(Category)

  // When Category changes, briefly add the 'switching' class to replay grid animation
  useEffect(() => {
    if (prevCategory.current !== Category && gridRef.current) {
      gridRef.current.classList.remove('switching')
      void gridRef.current.offsetWidth          // force reflow
      gridRef.current.classList.add('switching')
      prevCategory.current = Category
    }
  }, [Category])

  return (
    <div>
      <h1 className='food-display-heading'>Top Products item for you</h1>
      <div className='food-display-list' ref={gridRef}>
        {product_list.map((item, index) => {
          if (Category === "All" || Category === item.category) {
            return (
              <FoodItem
                key={item._id}
                id={item._id}
                name={item.name}
                price={item.price}
                description={item.description}
                image={item.image}
              />
            )
          }
        })}
      </div>
    </div>
  )
}

export default FoodDisplay
