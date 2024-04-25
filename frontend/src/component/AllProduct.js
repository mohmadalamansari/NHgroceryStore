import React, { useEffect, useState } from 'react'
import FilterProduct from '../component/FilterProduct';
import CardFeature from '../component/CardFeature';
import { useSelector } from 'react-redux';

const AllProduct = ({ heading }) => {
    const productData = useSelector((state) => state.product.productList);
    const categoryList = [...new Set(productData.map(el => el.category))]

    const [filterby, setFilterBy] = useState("")
    const [dataFilter, setDataFilter] = useState(productData)

    useEffect(() => {
        setDataFilter(productData)
    }, [productData])

    const handleFilterProduct = (category) => {
        const filter = productData.filter(el => (el.category.toLowerCase() === category.toLowerCase()))
        setDataFilter(() => {
            return [
                ...filter
            ]
        })
    }

    const loadingArrayfeature = new Array(10).fill(null)

    return (
        <div className='my-5'>
            <h2 className=' flex font-bold text-2xl text-slate-800 mb-4'>
                All product{heading}
            </h2>

            <div className='flex gap-4 justify-center over scrollbar-none'>
                {
                    categoryList[0] && categoryList.map(el => {
                        return (
                            <FilterProduct category={el} onClick={() => handleFilterProduct(el)} />
                        )
                    })
                }
            </div>
            {/* display all product */}
            <div className='flex flex-wrap justify-center gap-4 my-4'>
                {
                    dataFilter[0] ? dataFilter.map(el => {
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
                        : loadingArrayfeature.map((el,index) =>
                            (<CardFeature loading="loading..." />))
                }
            </div>
        </div>
    )
}

export default AllProduct