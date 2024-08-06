import React from 'react'
import Feedbacker_image from './Feedbacker_image'



const Feedbacker = ({img , text}) => {
  return (
    <div className='feedbacker-container'>
        <Feedbacker_image img={img} text={text}/>

        <p className='feedbacker-text'>{text}</p>
    </div>
  )
}

export default Feedbacker