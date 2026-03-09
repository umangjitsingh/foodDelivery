"use client"
import React, {useEffect, useRef, useState} from 'react'
import mongoose from "mongoose";
import Link from "next/link";
import Image from "next/image"
import {
	FaCarrot, FaHamburger
} from "react-icons/fa";
import {BiSearch} from "react-icons/bi";
import {
	FaBorderTopLeft,
	FaCartShopping,
	FaUser
} from "react-icons/fa6";
import ModalUser from "@/COMPONENTS/ModalUser";
import {AnimatePresence, motion} from "framer-motion";
import {GoPackageDependents} from "react-icons/go";
import {LiaPlusSquare} from "react-icons/lia";
import {createPortal} from "react-dom";
import PhotoAndRole from "@/COMPONENTS/PhotoAndRole";
import {GrClose} from "react-icons/gr";
import {signOut} from "next-auth/react";
import {MdLogout} from "react-icons/md";
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import {useRouter} from "next/navigation";

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
	const [searchbarOpen, setSearchbarOpen] = useState(false);
	const dropDownSearchbar = useRef<HTMLDivElement | null>(null);
	const toggleButtonRef = useRef<HTMLDivElement | null>(null);
	const [hamburgerOpen,setHamburgerOpen]=useState(false);
	const [mounted, setMounted] = useState(false);
	const router=useRouter();
		const cartQuantity = useSelector((state: RootState) =>
			Object.values(state.cart.items).reduce((sum, item) => sum + item.quantity, 0)
		);

	useEffect(() => {
		setMounted(true);
	}, []);

	useEffect(() => {
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
		document.addEventListener("mousedown", handleSearchbarOutside);
		return () => document.removeEventListener("mousedown", handleSearchbarOutside)
	}, [])

	function handleOpen() {
		setOpen((prev) => !prev);
	}

	function handleSearchbar(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
		e.stopPropagation();
		setSearchbarOpen((p) => !p)
	}

	if(!mounted) return null
	const sideBar = createPortal(
		<AnimatePresence>
			{hamburgerOpen && (
				<motion.div
					initial={{ x: -100, opacity: 0 }}
					animate={{ x: 0, opacity: 1 }}
					exit={{ x: -100, opacity: 0 }}
					transition={{ type: "spring", stiffness: 77, damping: 11 }}
					className="fixed top-0 left-0 h-full w-[66%] sm:w-[60%] z-100
                   bg-linear-to-b from-green-800/60 via-green-700/70 to-green-700/60
                   backdrop-blur-xl border-r border-green-400/20
                   shadow-[0_0_60px_-10px_rgba(0,249,100,0.4)]
                   flex flex-col p-6 text-white"
				>
					<div className="flex items-center justify-between py-2">
						<h1 className="tracking-wide font-semibold text-white/90 text-lg">
							Admin Panel
						</h1>

						<button
							className="text-white/80 hover:text-red-400 cursor-pointer text-lg font-bold transition"
							onClick={() => setHamburgerOpen(false)}
						>
							<GrClose />
						</button>
					</div>

					<div className="bg-black/20 rounded-xl px-2 mt-1 shadow-inner">
						<PhotoAndRole
							user={user}
							className="text-white/60 text-sm tracking-tight leading-3"
							userNameStyle="text-white/90 tracking-wide"
						/>
					</div>

					<div className="flex flex-col justify-center gap-4 mt-8">
						<Link
							href=""
							className="flex justify-center items-center gap-4 bg-black/20 rounded-lg px-2 py-4 mt-1 shadow-inner tracking-tight  cursor-pointer transition-all duration-300 ease-out hover:bg-green-950/70 hover:text-green-50 hover:shadow-lg hover:scale-[1.03]"
						>
							<LiaPlusSquare />
							Add Grocery
						</Link>

						<Link
							href=""
							className="flex justify-center items-center gap-4 bg-black/20 rounded-lg px-2 py-4 mt-1 shadow-inner tracking-tight  cursor-pointer transition-all duration-300 ease-out hover:bg-green-950/70 hover:text-green-50 hover:shadow-lg hover:scale-[1.03]"
						>
							<GoPackageDependents />
							View Grocery
						</Link>

						<Link
							href=""
							className="flex justify-center items-center gap-4 bg-black/20 rounded-lg px-2 py-4 mt-1 shadow-inner tracking-tight  cursor-pointer transition-all duration-300 ease-out hover:bg-green-950/70 hover:text-green-50 hover:shadow-lg hover:scale-[1.03]"
						>
							<FaBorderTopLeft />
							Manage Orders
						</Link>
					</div>

					<div className="my-6 border-t border-white/20"></div>

					<div
						onClick={async () => await signOut({ callbackUrl: "/login" })}
						className="
							    flex items-center justify-center gap-2
							    w-1/3 py-3 mt-24
							    rounded-lg cursor-pointer
							    bg-white/10 backdrop-blur-md
							    text-red-50 tracking-tight
							    shadow-[inset_0_0_10px_rgba(255,255,255,0.1)]
							    ring-1 ring-white/10
							    transition-all duration-300
							    hover:bg-black/40 hover:text-red-200
							     hover:shadow-lg hover:scale-[1.03]
							  "
												>
						<MdLogout className="w-5 h-5" />
						Logout
					</div>

				</motion.div>
			)}
		</AnimatePresence>,
		document.body
	);

	return (
		<div className=" h-20 w-[89%]  fixed top-4 left-1/2 -translate-x-1/2 mt-4 rounded-2xl bg-linear-to-r from-green-400/70 to-green-800 shadow-md shadow-black/20 flex justify-between items-center px-4  z-40">
			<Link href={"/"} className=" text-[#f1f1f1] test-shadow-[#a2a2a7] text-shadow-lg text-3xl tracking-wider font-light pacifico shadow-md  w-36 bg-green-800/10 flex justify-around py-1 px-1 rounded-lg ml-1">
				Carryo
				<FaCarrot className="text-2xl"/>
			</Link>


			{user.role === "User" &&
         <form className="hidden md:flex items-center bg-white rounded-lg px-5 py-3 w-1/2 max-w-lg shadow-md mr-1">
            <BiSearch className="text-gray-400 w-5 h-5 mr-2"/>
            <input type="text" placeholder="Search groceries..." className="w-full outline-none text-gray-600 placeholder-gray-400"/>
         </form>}


			{/*For smaller devices Searchbar*/}
			{user.role === "User" &&
         <div className="bg-white text-gray-600 rounded-full w-11 h-11 flex items-center justify-center shadow-md hover:scale-105 transition-transform md:hidden"
              ref={toggleButtonRef}
              onMouseDown={(e) => handleSearchbar(e)}>
            <BiSearch className="text-gray-400 w-5 h-5 "/>
         </div>}


			<div className="flex relative items-center gap-3 md:gap-4  ">
					{user.role == "User" && (
						<Link
							href="/user/cart"
							className="relative hover:scale-105 bg-white rounded-full w-11 h-11 flex items-center justify-center shadow-md transition-transform duration-200 cursor-pointer"
						>
								<FaCartShopping className="text-green-800 w-5 h-4"  />
								<span className="absolute right-1 top-1 bg-red-600 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
      {cartQuantity}
    </span>
						</Link>
					)}

				{user.role === "Admin" && (
					<div className="hidden sm:flex gap-2 justify-center items-center text-sm">
						<Link
							href="/admin/add-grocery"
							className="flex justify-center items-center gap-2 text-green-700 bg-white tracking-tight px-4 py-1 rounded-md cursor-pointer transition-all duration-300 ease-out hover:bg-black/70 hover:text-green-50 hover:shadow-lg hover:scale-[1.03]"
						>
							<LiaPlusSquare />
							Add Grocery
						</Link>

						<Link
							href=""
							className=" flex justify-center items-center gap-1 text-green-700 bg-white tracking-tight px-4 py-1 rounded-md cursor-pointer
                 transition-all duration-300 ease-out
                 hover:bg-black/70 hover:text-green-50 hover:shadow-lg hover:scale-[1.03]"
						>
							<GoPackageDependents />
							View Grocery
						</Link>

						<Link
							href=""
							className="flex justify-center items-center gap-1 text-green-700 bg-white tracking-tight px-4 py-1 rounded-md cursor-pointer
                 transition-all duration-300 ease-out
                 hover:bg-black/70 hover:text-green-50 hover:shadow-lg hover:scale-[1.03]"
						>
							<FaBorderTopLeft />
							Manage Orders
						</Link>
					</div>
				)}

				{/*hamburger for smaller devices*/}

				<div className="md:hidden text-green-800 bg-white rounded-full w-11 h-11 flex items-center justify-center overflow-hidden shadow-md hover:scale-105 transition-transform duration-20" onClick={()=>setHamburgerOpen(prev=>!prev)}>
					<FaHamburger />
				</div>


				<div className="relative">
					<div className=" bg-white rounded-full w-11 h-11 flex items-center justify-center overflow-hidden shadow-md hover:scale-105 transition-transform duration-20" onClick={handleOpen}>
						{user.image ?
							<Image src={user.image} alt={"user.photo"} width={100} height={100} className="object-cover rounded-full "/> :
							<FaUser className="text-green-800 h-4 w-4"/>}
					</div>

					{open &&
             <div className={user.role == "User"?" absolute" +
	             " top-13 -right-2" +
	             " w-68 h-42 bg-[#f1f1fa] rounded-xl px-4":"absolute top-13 -right-2 w-68 h-32 bg-[#f1f1fa] rounded-xl  px-4"}>
                <ModalUser user={user} setOpen={setOpen}/>
             </div>}

					<AnimatePresence>
						{searchbarOpen
							&&
               <motion.div
                  ref={dropDownSearchbar}
                  initial={{opacity: 0, y: -10, scale: 0.90}}
                  animate={{opacity: 1, y: 0, scale: 1}}
                  transition={{duration: 0.4}}
                  exit={{opacity: 0, y: -10, scale: 0.90}}
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

			{sideBar}
		</div>
	)
}

export default Navbar
