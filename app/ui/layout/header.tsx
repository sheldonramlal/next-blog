"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useSession, signOut } from "@/src/lib/auth-client";
import LogoutButton from "@/app/components/LogoutButton";


export default function Header() {
    const [open, setOpen] = useState(false);
    const { data: session } = useSession();

    return(
        <header className=" w-full border-b-2 border-gray-200">
           <div className="mx-auto flex max-w-7xl justify-between px-4 py-6">

                {/* left side of header */}
                <div className="flex items-center">

                    <div className="text-2xl font-semibold">
                       <Link href="/">
                           BLOG
                       </Link> 
                    </div>

                    {/* desktop nav */}
                    <nav className="hidden md:block">
                         <ul className="flex ml-20 space-x-6 *:font-medium">
                            <li>
                                <Link 
                                    href="/"
                                    className="">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    href="/blogs"
                                    className="">
                                    Blogs
                                </Link>
                            </li>
                           
                            {session && (
                            <li>
                                <Link 
                                    href="/blogs/write-a-blog"
                                    className="">
                                    Write A Blog
                                </Link>
                            </li>
                            )}
                         </ul>
                    </nav>
                    
                </div>

                <div
                    className={`fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 z-99 ${
                    open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    }`}
                    onClick={() => setOpen(false)}
                />

                <div
                    className={`fixed top-0 left-0  w-full bg-white shadow-xl px-4  transform transition-transform duration-300 z-99
                    ${open ? "translate-y-0" : "-translate-y-full"}`}
                >
                    <div className="py-6 flex justify-between item-center border-b-2 border-gray-200">
                        <p className="text-2xl font-semibold">BLOG</p>
                        <div className=" flex justify-end ">
                            <button className="" onClick={() => setOpen(false)}>
                                <X size={28} />
                            </button>
                        </div>
                    </div>

                    {/* Close Button */}




                    <nav className="flex flex-col gap-8 text-lg font-bold py-8 ">
                        <Link href="/" onClick={() => setOpen(false)}>Home</Link>
                        <Link href="/blogs" onClick={() => setOpen(false)}>Blogs</Link>
                        {session && <Link href="/blogs/write-a-blog" onClick={() => setOpen(false)}>Write A Blog</Link>}
                    </nav>
                    
                    {!session ? (
                     <div className="flex flex-col items-center space-y-4 border-t-2 border-gray-200 py-8 *:w-full *:text-center">
                        <Link 
                            href="/sign-in" 
                            onClick={() => setOpen(false)}
                            className="bg-[#E9F4F9]  px-5 py-2  text-[#2E60FA] font-medium cursor-pointer">Sign in
                        </Link>
                        <Link 
                            href="/sign-up" 
                            onClick={() => setOpen(false)}
                            className="bg-[#2E60FA] px-5 py-2  text-[#ffffff] font-medium cursor-pointer">Sign up
                        </Link>
                        </div>
                    ) : (
                        
                        <div className="flex flex-col items-center space-y-4 border-t-2 border-gray-200 py-8 *:w-full *:text-center">

                            <Link 
                                href="/dashboard" 
                                onClick={() => setOpen(false)}
                                className="bg-[#E9F4F9] px-5 py-2  text-[#2E60FA] font-medium cursor-pointer">Dashboard
                            </Link>
                            <LogoutButton />
                        </div>
                    )}

                </div>

                {/* rights side of header */}
                <button className="md:hidden" onClick={() => setOpen(true)}>
                    <Menu size={24} />
                </button>

                {/* buttons on desktop */}
                {!session ? (
                <div className="hidden md:flex items-center space-x-4">
                    <Link 
                        href="/sign-in" 
                        className="bg-[#E9F4F9] px-5 py-2 rounded-[10px] text-[#2E60FA] font-medium">Sign in
                    </Link>
                    <Link 
                        href="/sign-up" 
                        className="bg-[#2E60FA] px-5 py-2 rounded-[10px] text-[#ffffff] font-medium">Sign up
                    </Link>
                </div>
                ) : (
                <div className="hidden md:flex items-center space-x-4">
                    <Link 
                        href="/dashboard" 
                        className="bg-[#E9F4F9] px-5 py-2 rounded-[10px] text-[#2E60FA] font-medium">Dashboard
                    </Link>
                    <LogoutButton />
                </div>
                )}
           </div>
        </header>
    )
}