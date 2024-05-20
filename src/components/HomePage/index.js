import {useState, useEffect, useContext} from 'react'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import DishItems from '../DishItems'

import CartContext from '../../context/CartContext'

import './index.css'

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [response, setResponse] = useState([])
  const [activeCategoryId, setActiveCategoryId] = useState('')

  const {cartList, setRestaurantName} = useContext(CartContext)

  const getUpdatedData = tableMenuList =>
    tableMenuList.map(eachMenu => ({
      menuCategory: eachMenu.menu_category,
      menuCategoryId: eachMenu.menu_category_id,
      menuCategoryImage: eachMenu.menu_category_image,
      categoryDishes: eachMenu.category_dishes.map(eachDish => ({
        dishId: eachDish.dish_id,
        dishName: eachDish.dish_name,
        dishPrice: eachDish.dish_price,
        dishImage: eachDish.dish_image,
        dishCurrency: eachDish.dish_currency,
        dishCalories: eachDish.dish_calories,
        dishDescription: eachDish.dish_description,
        dishAvailability: eachDish.dish_Availability,
        dishType: eachDish.dish_Type,
        addonCat: eachDish.addonCat,
      })),
    }))

  const fetchRestaurantApi = async () => {
    const api = 'https://run.mocky.io/v3/77a7e71b-804a-4fbd-822c-3e365d3482cc'
    const apiResponse = await fetch(api)
    const data = await apiResponse.json()
    const updatedData = getUpdatedData(data[0].table_menu_list)
    setResponse(updatedData)
    setRestaurantName(data[0].restaurant_name)
    setActiveCategoryId(updatedData[0].menuCategoryId)
    setIsLoading(false)
  }

  useEffect(() => {
    fetchRestaurantApi()
    // eslint-disable-next-line
  }, [])

  const onUpdateActiveCategoryIdx = menuCategoryId =>
    setActiveCategoryId(menuCategoryId)

  const addItemToCart = () => {}

  const removeItemFromCart = () => {}

  const renderTabMenuList = () =>
    response.map(eachCategory => {
      const onClickHandler = () =>
        onUpdateActiveCategoryIdx(eachCategory.menuCategoryId)

      return (
        <li
          className={`each-tab-item ${
            eachCategory.menuCategoryId === activeCategoryId
              ? 'active-tab-item'
              : ''
          }`}
          key={eachCategory.menuCategoryId}
          onClick={onClickHandler}
        >
          <button type="button" className="tab-category-button">
            {eachCategory.menuCategory}
          </button>
        </li>
      )
    })

  const renderDishes = () => {
    const {categoryDishes} = response.find(
      eachCategory => eachCategory.menuCategoryId === activeCategoryId,
    )

    return (
      <ul className="dishes-list-container">
        {categoryDishes.map(eachDish => (
          <DishItems
            key={eachDish.dishId}
            dishDetails={eachDish}
            addItemToCart={addItemToCart}
            removeItemFromCart={removeItemFromCart}
          />
        ))}
      </ul>
    )
  }

  const renderSpinner = () => (
    <div className="loader-container" role="status">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  return isLoading ? (
    renderSpinner()
  ) : (
    <div className="home-background">
      <Header cartItems={cartList} />
      <ul className="tab-container">{renderTabMenuList()}</ul>
      {renderDishes()}
    </div>
  )
}

export default HomePage
