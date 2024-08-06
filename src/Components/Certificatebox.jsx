import React from 'react'

const Certificatebox = ({img , text}) => {
  return (
    <div className='certificatebox-container'>
        <img className='certificatebox-image' src={img} alt={text} />
        <p className='certificatebox-text'>{ text}</p>
    </div>
  )
}

export default Certificatebox