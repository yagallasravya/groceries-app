import React from 'react'

const Header = ({heading}) => {
  return (
    <header>
       <h2>{heading}</h2>
    </header>
  )
}
Header.defaultProps={
    heading:"Default header"
}
export default Header