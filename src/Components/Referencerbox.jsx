import React from 'react'

const Referencerbox = ({img , text}) => {
  return (
    <div className='referencer-container'>
        <img className='referencer-image' src={img} alt={text}/>

        <div className='referencer-shadow'></div>

        <p className='referencer-text'>{text}</p>
    </div>
  )
}

export default Referencerbox