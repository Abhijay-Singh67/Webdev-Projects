import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-[#a839e9] flex items-center justify-between p-5 text-[#1C3041]'>
        <div className="logo font-bold text-2xl sm:text-xl">&lt;Pass<span className='text-[#18F2B2]'>Grid</span>/&gt;</div>
        <ul>
            <li className='flex gap-8 text-lg'>
                <a href="#" className='hover:font-bold'>Home</a>
                <a href="#" className='hover:font-bold'>About</a>
                <a href="#" className='hover:font-bold'>Contact</a>
            </li>
        </ul>
    </nav>
  )
}

export default Navbar
