import React from 'react'
import { NavLink } from 'react-router-dom'

export const Nav = () => {
  return (
    <nav>
      <NavLink to='/'> HOME</NavLink>
      <NavLink to='/movies'>MOVIES</NavLink>
    </nav>
  )
}
