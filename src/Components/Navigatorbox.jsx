import React from 'react'

const Navigatorbox = ({text}) => {
  return (
    /* Navigasyon butonları */
    <div className='navigator-box'>
      <p className='navigator-text'>
        {text}
      </p>
    </div>
  )
}

export default Navigatorbox