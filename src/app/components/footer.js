
"use client"
import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
const footer = () => {
  const navLinks = [
    { href: "/", text: "Home" },
    { href: "/Flowcharts", text: "Flowcharts" },
    { href: "/mentorships", text: "Mentorships" },
    { href: "/resources", text: "Resources" },
    { href: "/QuizAi", text: "QuizAI"}
  ];

  return (
    <footer className="bg-[#0F172A] text-white">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo and description */}
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="LOGO"
              width={40}
              height={40}
              priority
              className='m-1' />
            <div className="leading-relaxed flex flex-col">
              <h1 className='text-2xl'>Evolvia</h1>
              <h1 className='text-sm'>Navigate | Learn | Achieve</h1>
            </div>
          </div>

          {/* Navigation Links - Horizontal */}
          <nav className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.text}
                href={link.href}
                className="text-gray-300 hover:text-[#F39C12] transition-colors duration-200 font-medium"
              >
                {link.text}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-8 pt-8 border-t border-slate-700/50">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <p className="text-gray-300 text-sm md:text-base">
              Apply for Mentor Contact - jarnavv2006@gmail.com / rishabhraturi05@gmail.com 
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default footer
