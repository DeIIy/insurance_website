import React from 'react'

const Feedbacker_image = ({img , text}) => {
  return (
    <img className='feedbacker-image' src={img} alt={text} />
  )
}

export default Feedbacker_image