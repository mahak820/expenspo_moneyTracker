import { Footer, Navbar } from 'flowbite-react'
import React, { useEffect } from 'react'
import NavbarPage from '../components/Navbar'
import { BoxesCore } from '../components/Background-boxes'
import Hero from '../components/Hero'
import FooterPage from '../components/Footer'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Home = () => {

  const {user , isLoading , isError , message} = useSelector(state => state.auth)
  const navigate = useNavigate()

  useEffect(() => {

    if(user){
      navigate("/dashboard")
    }


  } , [user , isError , message])


  return (
    
    <>

        <NavbarPage/>

        <Hero/>

        <FooterPage/>

    </>
    
   
  )
}

export default Home
