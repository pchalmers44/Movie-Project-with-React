import React from 'react'
import { useState, useEffect } from 'react'
import './Home.css'
import Navbar from '../components/Navbar'
import hero_banner from '../assets/hero_banner.jpg'
import Footer from '../components/Footer'
import { useNavigate } from "react-router-dom"
import Skeleton from '../components/Skeleton'



const Home = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!searchTerm.trim()) return
    navigate(`/movies?q=${encodeURIComponent(searchTerm)}`)
    setSearchTerm("")
  }

   useEffect(() => {
    const img = new Image();
    img.src = hero_banner;
    img.onload = () => setLoading(false);
  }, []);

  return (
    <>
     <Navbar />  
    <main className='hero'>
      {loading
      ? <Skeleton type="hero" />
      : (
        <>
      <img src={hero_banner} alt="" className='banner-img' />
      <div className="search-bar">
        <form onSubmit={handleSubmit}>
          <input type="text"
          placeholder='Search Movies or Keywords'
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)} 
          />    
          <button type="submit" className='search-btn'>Search</button>      
        </form>  
      </div>
      </>
      )
    }
      </main>
      <Footer />
    </>
  )
}

export default Home
