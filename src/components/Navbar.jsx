import React from 'react'
import './Navbar.css'
import logo from '../assets/Omdb-logo.png'
import { FiSearch } from 'react-icons/fi'
import { Link } from 'react-router-dom'


const Navbar = () => {
  return (
    <div className="navbar">
        <div className="navbar-left">
            <img src={logo} alt="OMDB logo"/>
            <ul className='nav-links'>
                <li>
                    <Link to='/'>Home</Link>
                </li>
                <li>
                    <Link to='/movies'>Movies</Link>
                </li>
                <li>
                    <Link to='#'>New Movies</Link>
                </li>
                <li>
                    <Link to='#'>My List</Link>
                </li>
                
            </ul>
        </div>
        <div className="navbar-right">
            <Link to='/movies'>
            <button className='icon'><FiSearch className='icon'/></button>
            </Link>
        </div>          
    </div>  
  )
}

export default Navbar


