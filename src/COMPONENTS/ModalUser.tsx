"use client"
import React, {useEffect, useRef} from 'react'
import Image from "next/image";
import {FaUser} from "react-icons/fa6";
import Link from "next/link";
import {PiPackage} from "react-icons/pi";
import {MdLogout} from "react-icons/md";
import {signOut} from "next-auth/react";

interface UserInterface {
	name: string,
	email: string,
	password?: string,
	image?: string,
	mobile?: string,
	role?: 'User' | 'Delivery Boy' | 'Admin',
	createdAt?: string,
	updatedAt?: string
}

function ModalUser({ user, setOpen }: {
	                   user: UserInterface,
	                   setOpen: React.Dispatch<React.SetStateAction<boolean>>
                   }
) {
	const profileDropDown=useRef<HTMLDivElement>(null);

	useEffect(()=>{

		const handleClickOutside=(e:MouseEvent)=>{
			if(profileDropDown.current && !profileDropDown.current.contains(e.target as Node)){
				setOpen(false)
		}
		}
		document.addEventListener("mousedown",handleClickOutside);
		return ()=>document.removeEventListener("mousedown",handleClickOutside)
	},[])
	return (
		<div ref={profileDropDown}>
			<div className=" h-16 w-full flex items-center gap-4 border-b-2  border-gray-600/40">
				{
					user.image ?
						<Image src={user.image} alt={"user.photo"} width={50} height={50} className="object-cover rounded-full shadow-md "/> :
						<FaUser className="text-green-800 h-4 w-4"/>
				}
				<div className="flex flex-col">
					<span className="capitalize font-semibold text-black/80">{user.name.length > 20 ? user.name.slice(0,19) : user.name} </span>
					<span className="text-sm text-gray-500 tracking-tight leading-3">{user.role}</span>
				</div>
			</div>

<div className="w-full mt-1 transition">
	<div className="    tracking-tight  cursor-pointer px-1 ">
		<Link href={""} className="px-2 rounded-lg py-1.5 flex items-center gap-2 font-medium text-black/80 hover:bg-green-200 ">
			<PiPackage className="w-5 h-5 text-green-700"/>
			My Orders
		</Link>

		<div className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-black/80 font-medium mt-1 hover:bg-red-200 cursor-pointer  " onClick={()=>{
			setOpen(false);

			signOut({ callbackUrl: "/login" })

		}}>
			<MdLogout className="w-5 h-5 text-red-700 "/>
			Logout
		</div>
	</div>

</div>


		</div>
	)
}

export default ModalUser
