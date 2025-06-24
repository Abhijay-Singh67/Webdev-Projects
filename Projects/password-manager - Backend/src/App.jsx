import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Manager from './components/Manager'
import Footer from './components/Footer'

function App() {

  return (
    <>
      <Navbar/>
      <div className='min-h-[85.2vh] sm:min-h-[83.3vh]'>
        <Manager/>
      </div>  
      <Footer/>
    </>
  )
}

export default App
