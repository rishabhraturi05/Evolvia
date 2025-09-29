"use client"
import Link from 'next/link';
import { React } from 'react'
import { useState } from 'react';
import Image from 'next/image';
// import { useSession, signIn, signOut } from "next-auth/react"

// The main Navbar component
export const Navbar = () => {
    // State to manage the visibility of the mobile menu
//     const { data: session } = useSession()
    const [isMenuOpen, setIsMenuOpen] = useState(false);
//     if(session) {
//     return <>
//       Signed in as {session.user.email} <br/>
//       <button onClick={() => signOut()}>Sign out</button>
//     </>
//   }

    

    const navLinks = [
        { href: "/", text: "Home" },
        { href: "/Flowcharts", text: "Flowcharts" },
        { href: "/mentorships", text: "Mentorships" },
        { href: "/resources", text: "Resources" },
        { href: "/QuizAi", text: "QuizAI"}
    ];

    return (
        <nav className="bg-[#2C3E50] shadow-lg font-sans sticky top-0 z-100">
            <div className="mx-auto pb-1 sm:px-6 lg:px-8">
                <div className="px-8 flex items-center justify-between h-15">

                    {/* Left section: Logo and Brand Name */}
                    <div className="flex gap-3">
                        <Link href="/" className="flex items-center space-x-3">
                            <Image
                                src="/LOGO.png"
                                alt="LOGO"
                                width={40}
                                height={40}
                                priority />
                        </Link>
                        <Link href="/">
                            <div className="font-bold text-2xl">
                                <h1>Evolvia</h1>
                            </div>
                            <div className="text-xs font-medium">
                                <p>Navigate, Learn, Achieve</p>
                            </div>
                        </Link>
                    </div>

                    {/* Center section: Navigation Links for Desktop */}
                    <div className="ml-10 flex items-baseline space-x-6 flex-row">
                        <div className="hidden md:block">
                            {navLinks.map((link, index) => (
                                <Link
                                    key={link.text}
                                    href={link.href}
                                    className="px-3 py-2 rounded-md font-medium"
                                >
                                    {link.text} 
                                </Link>
                            ))}
                        </div>


                        {/* Right section: Login Button for Desktop */}
                        {/* <div className="hidden md:block"> */}
                        <Link href="/login">
                        <button className="bg-[#F39C12] text-white font-bold py-2 px-6 rounded-lg hover:bg-yellow-600 hover:cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-105">
                            Login
                        </button>
                        </Link>
                    </div>
                </div>

                {/* Mobile Menu Button (Hamburger) */}
                <div className="-mr-2 flex md:hidden">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        type="button"
                        className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                        aria-controls="mobile-menu"
                        aria-expanded="false"
                    >
                        <span className="sr-only">Open main menu</span>
                        {/* Icon for hamburger menu */}
                        <svg className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                        {/* Icon for close menu */}
                        <svg className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`} id="mobile-menu">
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    {navLinks.map((link, index) => (
                        <Link
                            key={link.text}
                            href={link.href}
                            className={`
                ${index === 0 ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}
                block px-3 py-2 rounded-md text-base font-medium
              `}
                        >
                            {link.text}
                        </Link>
                    ))}
                    <div className="pt-4 pb-3 border-t border-gray-700">
                        <Link href="/login">
                            <button className="w-full text-left bg-[#F39C12] text-[#2C3E50] font-bold py-2 px-3 rounded-md hover:bg-yellow-400 transition-colors duration-300">
                                Login
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </nav >
    );
};


