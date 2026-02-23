"use client"
import React, {useEffect, useRef, useState} from 'react'
import mongoose from "mongoose";
import Link from "next/link";
import Image from "next/image"
import {FaCarrot} from "react-icons/fa";
import {BiSearch} from "react-icons/bi";
import {FaCartShopping, FaUser} from "react-icons/fa6";
import ModalUser from "@/COMPONENTS/ModalUser";
import {AnimatePresence, motion} from "framer-motion";

interface UserInterface {
	_id?: mongoose.Types.ObjectId
	name: string,
	email: string,
	password?: string,
	image?: string,
	mobile?: string,
	role?: 'User' | 'Delivery Boy' | 'Admin',
	createdAt?: string,
	updatedAt?: string
}

function Navbar({user}: { user: UserInterface }) {
	const [open, setOpen] = useState(false);
const[searchbarOpen,setSearchbarOpen]=useState(false);
const dropDownSearchbar=useRef<HTMLDivElement | null>(null);
	const toggleButtonRef = useRef<HTMLDivElement | null>(null);

useEffect(()=>{
	const handleSearchbarOutside = (e: MouseEvent) => {
		const target = e.target as Node;

		if (
			dropDownSearchbar.current &&
			!dropDownSearchbar.current.contains(target) &&
			toggleButtonRef.current &&
			!toggleButtonRef.current.contains(target)
		) {
			setSearchbarOpen(false);
		}
	};
	document.addEventListener("mousedown",handleSearchbarOutside);
	return ()=> document.removeEventListener("mousedown",handleSearchbarOutside)
},[])

	function handleOpen() {
		setOpen((prev)=>!prev);
	}

	function handleSearchbar(e:React.MouseEvent<HTMLDivElement, MouseEvent>) {
		e.stopPropagation();
		setSearchbarOpen((p)=>!p)
	}

	return (
		<div className=" h-20 w-[89%]  fixed top-4 left-1/2 -translate-x-1/2 mt-4 rounded-2xl bg-linear-to-r from-green-400/70 to-green-800 shadow-md shadow-black/20 flex justify-between items-center px-4  z-40">
			<Link href={"/"} className=" text-[#f1f1f1] test-shadow-[#a2a2a7] text-shadow-lg text-3xl tracking-wider font-light pacifico shadow-md  w-36 bg-green-800/10 flex justify-around py-1 px-1 rounded-lg ml-1">
				Carryo
				<FaCarrot className="text-2xl"/>
			</Link>

			<form className="hidden md:flex items-center bg-white rounded-lg px-5 py-3 w-1/2 max-w-lg shadow-md mr-1">
				<BiSearch className="text-gray-400 w-5 h-5 mr-2"/>
				<input type="text" placeholder="Search groceries..." className="w-full outline-none text-gray-600 placeholder-gray-400"/>
			</form>

			{/*For smaller devices Searchbar*/}
			<div className="bg-white text-gray-600 rounded-full w-11 h-11 flex items-center justify-center shadow-md hover:scale-105 transition-transform md:hidden"
			     ref={toggleButtonRef}
			     onMouseDown={(e)=>handleSearchbar(e)}

			>
				<BiSearch className="text-gray-400 w-5 h-5 "/>
			</div>

			<div className="flex relative items-center gap-3 md:gap-4  ">
				<Link
					href="/"
					className="relative hover:scale-105 bg-white rounded-full w-11 h-11 flex items-center justify-center shadow-md transition-transform duration-200 cursor-pointer"
				>
					<FaCartShopping className="text-green-800 w-5 h-4 "/>
					<span className="absolute right-1 top-1 bg-red-600 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">0
          </span>
				</Link>

				<div className="relative">
					<div className=" bg-white rounded-full w-11 h-11 flex items-center justify-center overflow-hidden shadow-md hover:scale-105 transition-transform duration-20" onClick={handleOpen}>
						{user.image ?
							<Image src={user.image} alt={"user.photo"} width={100} height={100} className="object-cover rounded-full "/> :
							<FaUser className="text-green-800 h-4 w-4"/>}
					</div>

					{open && <div className=" absolute top-13 -right-2 w-68 h-42 bg-[#f1f1fa] rounded-xl p-4">
						<ModalUser user={user} setOpen={setOpen}/>
					</div>}

					<AnimatePresence>
						{searchbarOpen
							&&
						<motion.div
							          ref={dropDownSearchbar}
							          initial={{opacity:0, y:-10, scale:0.90}}
						            animate={{opacity:1,y:0,scale:1}}
						            transition={{duration:0.4}}
						            exit={{opacity:0,y:-10,scale:0.90}}
												className="fixed  top-24 left-1/2 -translate-x-1/2 w-[90%] bg-white rounded-full shadow-md z-40 flex items-center px-4 py-2"
												>
               <BiSearch className="text-gray-400 w-5 h-5 mx-2"/>
               <form className="flex items-center  rounded-lg px-5 py-1 w-1/2 max-w-lg  mr-1">

                  <input type="text" placeholder="Search groceries..." className="w-full outline-none text-gray-600 placeholder-gray-400"/>
               </form>

						</motion.div>}
					</AnimatePresence>
				</div>
			</div>
		</div>
	)
}

export default Navbar
