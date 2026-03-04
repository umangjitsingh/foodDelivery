import React from 'react'
import {FaUser} from "react-icons/fa6";
import Image from "next/image"

interface UserInterface {
	name: string;
	email: string;
	password?: string;
	image?: string;
	mobile?: string;
	role?: "User" | "Delivery Boy" | "Admin";
	createdAt?: string;
	updatedAt?: string;
}

function PhotoAndRole({user,className,userNameStyle}:{user:UserInterface,className:string,userNameStyle:string}) {
	return (
		<div className="h-18 w-full flex items-center gap-4 pl-2 border-b-2 border-gray-600/40 " >
			{user.image ? (
				<Image
					src={user.image}
					alt="user.photo"
					width={50}
					height={50}
					className="object-cover rounded-full shadow-md"
				/>
			) : (
				<div className="p-4 bg-[#f1f1fa] rounded-full border border-gray-300 ">
					<FaUser className="text-green-800 h-4 w-4" />
				</div>

			)}

			<div className="flex flex-col">
          <span className={`${userNameStyle}"capitalize" +
          " font-semibold "`}>
            {user.name.length > 20 ? user.name.slice(0, 19) : user.name}
          </span>
				<span className={className}>
            {user.role}
          </span>
			</div>
		</div>
	)
}

export default PhotoAndRole
