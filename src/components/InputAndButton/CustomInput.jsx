import React from 'react'

const CustomInput = ({type,placeholder,onChange,onBlur}) => {
  return (
    <>
    <input
    type={type}
    placeholder={placeholder}
    onChange={onChange}
    onBlur={onBlur}
    className="block w-full p-2 mb-6 border border-gray-300 rounded-lg"
  />  
    </>
  )
}

export default CustomInput