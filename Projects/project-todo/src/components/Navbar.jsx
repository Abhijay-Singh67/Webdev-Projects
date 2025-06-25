import React from 'react'
import "./Navbar.css"

const Navbar = () => {
    return (
        <nav className='navBar'>
            <div className="left flex space-x-2 items-center">
                <img src="../logo.png" className='w-12'/>
                <h1>iTask</h1>
            </div>
            <div className="middle">
                <h1 className='hidden md:text-xl md:block'>Day</h1>
                <h1 className='hidden md:text-xl md:block'>Week</h1>
                <h1 className='hidden md:text-xl md:block'>Month</h1>
                <h1 className='hidden md:text-xl md:block'>Year</h1>
            </div>
            <h1>Contact Us</h1>
        </nav>
    )
}

export default Navbar
