import React, { useEffect, useRef, useState } from 'react'
import HomeCard from "../component/HomeCard";
import { useDispatch, useSelector } from "react-redux";
import { setDataProduct } from '../redux/productSlide';
import CardFeature from '../component/CardFeature';
import { GrPrevious, GrNext } from "react-icons/gr";
import { MdFilterList } from "react-icons/md";
import FilterProduct from '../component/FilterProduct';
import { BsBuildingUp } from "react-icons/bs";
import AllProduct from '../component/AllProduct';



const Home = () => {

    const dispatch = useDispatch();

    // getting data from mongo 
    const getData = async () => {
        let res = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/product`);
        res = await res.json();

        dispatch(setDataProduct(res))
    }
    useEffect(() => {
        getData()
    }, [])
    //help to show image that r store in product (M)
    const productData = useSelector((state) => state.product.productList);
    console.log(productData)
    const homeProductCartList = productData.slice(11, 15);

    //fetching categories of vegetables 
    const homeProductCartListvegetables = productData.filter(el => el.category === "fruits", [])
    console.log(homeProductCartListvegetables)


    // loding 
    const loadingArray = new Array(4).fill(null)
    const loadingArrayfeature = new Array(10).fill(null)


    // next and previous button
    const slideProductRef = useRef()
    const nextProduct = () => {
        slideProductRef.current.scrollLeft += 200
    }

    const preveProduct = () => {
        slideProductRef.current.scrollLeft -= 200
    }

    // filter category

    const categoryList = [...new Set(productData.map(el => el.category))]
    console.log(categoryList)


    // filter data dislay
    const [filterby, setFilterBy] = useState("")
    const [dataFilter, setDataFilter] = useState(productData)
    
    useEffect(()=>{
        setDataFilter(productData)
    },[productData])

    const handleFilterProduct = (category)=>{
        const filter = productData.filter(el => (el.category.toLowerCase() === category.toLowerCase()))
        setDataFilter(() => {
            return [
                ...filter
            ]
    })
    }


    return (


        <div className='p-2 md:p-4'>
            <div className='md:flex gap-2 py-2'>

                <div className='md:w-1/2 '>
                    <div className='flex space-x-2  bg-slate-300 w-36 px-2 items-center rounded-full'>
                        <p className='text-sm font-medium text-slate-900'>Bike Delivery</p>
                        <img alt='l' src='https://cdn-icons-png.flaticon.com/512/2972/2972185.png' className='w-7 h-7'></img>
                    </div>
                    <h2 className='text-4xl md:text-7xl font-bold py-3'>𝕿𝖍𝖊 𝖋𝖆𝖘𝖙𝖊𝖉 𝕯𝖊𝖑𝖎𝖛𝖊𝖗𝖞 𝖎𝖓  <span className='text-green-700'>ⓨⓞⓤⓡ Ⓗⓞⓜⓔ</span> </h2>
                    <p className="py-3 text-base ">
                        Welcome to NH Kirana Store, your one-stop shop for all your grocery needs! Located in the heart of the neighborhood, we pride ourselves on offering a wide range of high-quality products at affordable prices. From fresh fruits and vegetables to pantry staples and household essentials, we've got you covered. Our friendly and knowledgeable staff are always ready to assist you in finding exactly what you need. With convenient hours and a welcoming atmosphere, NH Kirana Store is the perfect place to stock up on groceries while supporting local business. Experience the convenience and warmth of shopping with us today!</p>
                    <button className="font-bold bg-red-500 text-slate-200 px-4 py-2 rounded-md ">
                        Order Now
                    </button>
                </div>
                {/* this what we want to display */}
                <div className='md:w=1/2 flex flex-wrap gap-9 p-4 justify-center'>
                    {
                        homeProductCartList[0] ? homeProductCartList.map(el => {
                            return (
                                <HomeCard
                                    key={el._id}
                                    id={el._id}
                                    image={el.image}
                                    name={el.name}
                                    price={el.price}
                                    category={el.category}
                                />
                            )
                        })
                            : loadingArray.map((el, index) => {
                                return (
                                    <HomeCard
                                        key={index}
                                        loading={"Loading. . . "}
                                    />
                                )
                            })
                    }

                </div>
            </div>


            <div className=' items-center px-12 flex flex-wrap gap-2 w-full  max-h-full capitalize bg-green-300 rounded-full '>
                <p className='flex   text-green-900'>Scroll </p>
                <p className='w-300 h-300'><BsBuildingUp /></p>
                <p className=' capitalize text-white-500 border-lime-50'>to buy your needy product</p>
            </div>
            {/* showing fresh fruits section */}
            <div className=''>
                <div className='flex w-full items-center'>
                    <h2 className=' flex font-bold text-2xl text-slate-800 mb-4'>Fresh Vegetables </h2>
                    {/* srcrollbutton */}
                    <div className=' flex ml-auto gap-4'>
                        <button onClick={preveProduct} className='bg-slate-300 hower:bg-slate-400 text-lg p-1 rounded'><GrPrevious /></button>
                        <button onClick={nextProduct} className='bg-slate-300 hower:bg-slate-400 text-lg p-1 rounded'><GrNext /></button>

                    </div>
                </div>
                <div className='flex overflow-scroll scrollbar-none scroll-smooth transition-all' ref={slideProductRef}>
                    {
                        homeProductCartListvegetables[0] ? homeProductCartListvegetables.map(el => {
                            return (
                                <CardFeature
                                    key={el._id}
                                    id={el._id}
                                    image={el.image}
                                    name={el.name}
                                    category={el.category}
                                    price={el.price}

                                />
                            )
                        })
                            :
                            loadingArrayfeature.map(el => 
                            (<CardFeature loading="loading..." />))
                    }


                </div>
                <div className='my-5'>
                    <h2 className=' flex font-bold text-2xl text-slate-800 mb-4'>
                        All product
                    </h2>

                    <div className='flex gap-4 justify-center over scrollbar-none'>
                        {
                            categoryList[0] && categoryList.map(el => {
                                return (
                                    <FilterProduct category={el}  onClick={()=>handleFilterProduct(el)} />
                                )
                            })
                        }
                    </div>
                    {/* display all product */}
                    <div className='flex flex-wrap justify-center gap-4 my-4'>
                        {
                            dataFilter.map(el => {
                                return (
                                    <CardFeature
                                    key={el._id}
                                    id={el._id}
                                    image={el.image}
                                    category={el.category}
                                    name={el.name}
                                    price={el.price}



                                    />
                                )
                            })
                        }
                    </div>
                </div>
            </div>

           
        </div>
    )
}

export default Home