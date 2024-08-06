import React from 'react'

const Link = ({link, children}) => {
  return (
    <a href={link}>{children}</a>
  )
}

export default Link