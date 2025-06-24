import React, { useRef, useState, useEffect } from 'react'
import { v4 as uuidv4 } from "uuid"

const Manager = () => {
    const eye = useRef();
    const pass = useRef();
    const [form, setForm] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])
    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        if (passwords) {
            setPasswordArray(JSON.parse(passwords));
        }
    }, [])

    const showPassword = () => {
        if (eye.current.src.includes("icons/visible.png")) {
            eye.current.src = "icons/invisible.png"
            pass.current.type = "password"
        } else {
            eye.current.src = "icons/visible.png"
            pass.current.type = "text"
        }
    }
    const savePassword = () => {
        if (form.site.trim().length > 0 && form.username.trim().length > 0 && form.password.trim().length > 0) {
            setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
            localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
            setForm({ site: "", username: "", password: "" })
        }
    }
    const deletePassword = (id) => {
        setPasswordArray(passwordArray.filter(i => i.id !== id))
        localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(i => i.id !== id)))
    }
    const editPassword = (id) => {
        setForm(passwordArray.filter(i => i.id === id)[0])
        setPasswordArray(passwordArray.filter(i => i.id !== id))
    }
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }
    const copyText = (text) => {
        navigator.clipboard.writeText(text);
    }
    return (
        <div>
            <div class="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div class="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div></div>
            <div className="container mx-auto max-w-5xl text-[#1C3041] mt-10">
                <h1 className='text-4xl font-bold text-center'>&lt;Pass<span className='text-[#18F2B2]'>Grid</span>/&gt;</h1>
                <p className='text-center text-xl'>One place for all your passwords</p>
                <div className="text-black flex flex-col p-4 gap-5 mt-10">
                    <input onChange={handleChange} name="site" value={form.site} className="bg-transparent rounded-full border-2 border-[#218365] px-3 py-2" placeholder="Enter Website URL" type="text" />
                    <div className="flex justify-between gap-1">
                        <input onChange={handleChange} name="username" value={form.username} className="bg-transparent rounded-full border-2 border-[#218365] px-3 py-2 w-[75%]" placeholder="Username" type="text" />
                        <div className="relative bg-transparent rounded-full border-2 border-[#218365] w-[30%] focus-within:border-black">
                            <input onChange={handleChange} name="password" value={form.password} ref={pass} className="rounded-full px-3 py-2 focus:outline-none" placeholder="Password" type="password" />
                            <span className='absolute right-5 top-[25%]' onClick={showPassword}>
                                <img ref={eye} className="w-6 cursor-pointer" src="icons/invisible.png" />
                            </span>
                        </div>
                    </div>
                    <button onClick={savePassword} className='flex justify-center items-center bg-[#18F2B2] rounded-full w-max px-3 py-2 font-semi-bold self-center border border-black'><lord-icon
                        src="https://cdn.lordicon.com/efxgwrkc.json"
                        trigger="hover">
                    </lord-icon>Add Password</button>
                </div>
            </div>
            <div className="passwords text-[#1C3041] w-[70vw] mx-auto">
                <h2 className='text-2xl font-bold'>Your Passwords</h2><br />
                {passwordArray.length === 0 && <div className='font-seim-bold text-center text-xl'>It looks like you haven't saved any passwords yet...</div>}
                {passwordArray.length !== 0 &&
                    <table className="table-auto w-full overflow-hidden rounded-md">
                        <thead className='bg-[#18F2B2]'>
                            <tr>
                                <th className='py-2 text-center'>Site</th>
                                <th className='py-2 text-center'>Username</th>
                                <th className='py-2 text-center'>Password</th>
                                <th className='py-2 text-center'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-[#18F2B248]'>
                            {passwordArray.map((item, index) => {
                                return <tr key={index}>
                                    <td className='text-center py-2'><a href={item.site} target='_blank'>{item.site}</a></td>
                                    <td className='py-2'><div className='flex justify-center items-center gap-2'>{item.username}<div onClick={() => { copyText(item.username) }} className='cursor-pointer flex items-center'><lord-icon className="w-5" src="https://cdn.lordicon.com/iykgtsbt.json" trigger="hover"></lord-icon></div></div></td>
                                    <td className='py-2'><div className='flex justify-center items-center gap-2'>{"*".repeat(item.password.length)}<div onClick={() => { copyText(item.password) }} className='cursor-pointer flex items-center'><lord-icon className="w-5" src="https://cdn.lordicon.com/iykgtsbt.json" trigger="hover"></lord-icon></div></div></td>
                                    <td className='py-2 flex gap-3 justify-center'>
                                        <span>
                                            <div className='cursor-pointer' onClick={() => { editPassword(item.id) }}>
                                                <lord-icon className="w-6" src="https://cdn.lordicon.com/gwlusjdu.json" trigger="hover"></lord-icon>
                                            </div>
                                        </span>
                                        <span>
                                            <div className='cursor-pointer' onClick={() => { deletePassword(item.id) }}>
                                                <lord-icon className="w-6" src="https://cdn.lordicon.com/xyfswyxf.json" trigger="hover">
                                                </lord-icon>
                                            </div>
                                        </span>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>}
            </div>
        </div>
    )
}

export default Manager
