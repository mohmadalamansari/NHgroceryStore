import React from 'react'
import { MdCategory, MdFilterList } from "react-icons/md";

const FilterProduct = ({category,onClick}) => {
    return (

    <div onClick={onClick}>
    <div className='text-3xl p-5 bg-yellow-200 rounded-full cursor-pointer'>
                        <MdFilterList />
                        </div>

                        <p className='text-center font-medium my-1 capitalize'>{category}</p>
    </div>
    )
}

export default FilterProduct