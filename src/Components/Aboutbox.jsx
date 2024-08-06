import React from 'react'

const Aboutbox = ({title, text}) => {
  return (
    <div className='about-us-box-container'>
        <p className='about-us-box-title'>
            {title}
        </p>
        <p className='about-us-box-text'>
            {text}
        </p>
    </div>
  )
}

export default Aboutbox