import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export const AppHeader = () => {
    const { pathname } = useLocation();

    const linkClass = (path) => {
        return `py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${pathname === path ? "text-black border-b-red-500" : ""}`
    }
    return (
        <div className='bg-white border-solid shadow-md py-3 sticky top-0'>

            <header className='flex justify-between items-center  max-w-6xl mx-auto'>
                <div>
                    <Link to='/'>
                        <img src="images/rdc-logo-default.svg" alt="" className='h-5' />
                    </Link>
                </div>
                <div>
                    <ul className='flex space-x-10'>
                        <li className={linkClass('/')}>
                            <Link to='/'>
                                Home
                            </Link>
                        </li>
                        <li className={linkClass('/login')}><Link to='/login'>
                            Login
                        </Link></li>
                        <li className={linkClass('/register')}><Link to='/register'>
                            Register
                        </Link></li>
                        <li className={linkClass('/offers')}><Link to='/offers'>
                            Offers
                        </Link></li>
                        <li className={linkClass('/profile')}><Link to='/profile'>
                            Profile
                        </Link></li>
                        {/* <li>ForgotPassword</li> */}
                    </ul>
                </div>
            </header>
        </div>
    )
}
