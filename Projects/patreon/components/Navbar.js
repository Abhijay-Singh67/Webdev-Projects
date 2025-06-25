import React from 'react'
import Link from 'next/link'

const Navbar = () => {
    const handleClick = () =>{
        
    }
    return (
        <nav className='flex justify-between items-center bg-white px-6 py-2 rounded-full w-[80vw] mx-auto mt-[10px] sticky top-[10px] z-10 text-black'>
            <Link href={"/"}>
                <div className='flex gap-1 items-center'>
                <img src="coffee.png" className='w-8 cursor-pointer wiggle' />
                <span className='text-2xl'>TipJar</span>
            </div>
            </Link>
            <div className='flex gap-20'>
                <Link href={"/"}>
                <h1 className='cursor-pointer hover:bg-[#e7e6e6] hover:font-semibold rounded-full p-2'>Home</h1>
                </Link>                
                <h1 className='cursor-pointer hover:bg-[#e7e6e6] hover:font-semibold rounded-full p-2'>Projects</h1>
                <h1 className='cursor-pointer hover:bg-[#e7e6e6] hover:font-semibold rounded-full p-2'>About</h1>              
            </div>
            <div className='flex gap-5'>
                <Link href={"/auth?login=false"}>
                    <h1 className='cursor-pointer hover:bg-[#e7e6e6] hover:font-semibold rounded-full p-2'>Sign Up</h1>
                </Link>
                <Link href={"/auth?login=true"}>
                <h1 className='cursor-pointer hover:bg-[#e7e6e6] hover:font-semibold rounded-full p-2'>Login</h1>
                </Link>
            </div>
        </nav>
    )
}

export default Navbar
