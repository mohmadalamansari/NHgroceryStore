import React from "react";
import {Link} from "react-router-dom"
import{addCartItem,deleteCartItem,increaseQty,decreaseQty} from "../redux/productSlide"
import{useDispatch,} from "react-redux"

const CardFeature = ({ id, name, image, category, price, loading}) => {
  const dispatch = useDispatch()

  const handleAddCartProduct=(e)=>{
    dispatch(addCartItem({
      _id:id,
      name:name,
      price:price,
      category:category,
      image:image
    }
    ))
  }
  


  return (
    <div className=" min-w-[250px] max-w-[200] flex flex-col items-center justify-center bg-white rounded-xl hower:shadow-lg p-6 cursor-pointer  ">
      {
        image ? (
        <>
        <Link to={`/menu/${id}`} onClick={()=>window.scrollTo({top:0, behavior:"smooth"})}>
          <div className="h-28  flex flex-col justify-center items-center">
            <img src={image} className="h-full hover:scale-110 ease-out duration-700 rounded-3xl" />
          </div>
          <h3 className="font-semibold text-slate-600  capitalize text-lg mt-4 whitespace-nowrap overflow-hidden">
            {name}
          </h3>
          <p className=" text-slate-500  font-medium ">{category}</p>
          <p className=" font-bold ">
            <span className="text-red-500 ">₹</span>
            <span>{price}</span>
          </p>
          <button className="bg-yellow-500 w-full p-2 mt-2 rounded-2xl hover:bg-yellow-700 " onClick={handleAddCartProduct}>Add Cart</button>
          </Link>
        </>
          ):(
          <div className="min-h-[150px] flex justify-center items-center">
            <p>{loading}</p>
            </div>
           
      )}


    </div>
    
  );
};

export default CardFeature;