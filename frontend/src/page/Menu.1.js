import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import AllProduct from '../component/AllProduct'
import { addCartItem } from '../redux/productSlide'

const Menu = () => {
  const dispatch =useDispatch()
  const { filterby } = useParams() // Assuming your parameter is named "id"
  const productData = useSelector(state => state.product.productList)
  console.log(productData)

  // Filtering productData based on the id parameter
  const productDisplay = productData.filter(item => item._id === filterby)[0]
  console.log(productDisplay)

  const handleAddCartProduct=(e)=>{
    dispatch(addCartItem(productDisplay))
  }

  return (
    <div className='p-2 md:p-4'>
      <div className='w-full max-w-4xl m-auto md:flex '>
        <div className='max-w-lg  overflow-hidden'>
          <img src={productDisplay.image} className='hover:scale-110 transition-all h-full' />
        </div>
        <div className='flex flex-col gap-1 px-9'>
          <h3 className="font-semibold text-slate-600   capitalize text-2xl md:text-4xl ">
            {productDisplay.name}
          </h3>
          <p className=" text-slate-500  font-medium text-2xl">{productDisplay.category}</p>
          <p className=" font-bold ">
            <span className="text-red-500 md:text-2xl">₹</span>
            <span>{productDisplay.price}</span>
          </p>
          <div className=' flex gap-3'>
          <button className="bg-yellow-500  py-1 mt-2 rounded  hover:bg-yellow-600 min-w-[100px]">Buy</button>
          <button onClick={handleAddCartProduct} className="bg-yellow-500  py-1 mt-2 rounded  hover:bg-yellow-600 min-w-[100px]">Add Cart</button>
          </div>
          <div className=''>
            <p className='text-slate-600 font-semibold'>Description</p>
            <p>{productDisplay.description}</p>
          </div>
        </div>
      </div>
      <AllProduct heading={" Related to your product"}/>
    </div>

  )
}

export default Menu
