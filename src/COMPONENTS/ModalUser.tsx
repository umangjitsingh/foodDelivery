"use client"
import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { PiPackage } from "react-icons/pi";
import { MdLogout } from "react-icons/md";
import { signOut } from "next-auth/react";
import PhotoAndRole from "@/COMPONENTS/PhotoAndRole";

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

function ModalUser({
	                   user,
	                   setOpen,
                   }: {
	user: UserInterface;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	const profileDropDown = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (
				profileDropDown.current &&
				!profileDropDown.current.contains(e.target as Node)
			) {
				setOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () =>
			document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	return (
		<div ref={profileDropDown}>
			{/* Header */}
			<PhotoAndRole user={user} className={"text-gray-500 text-sm  tracking-tight leading-3"} userNameStyle={"text-black/80"}/>

			{/* Body — auto height, no forced max-h */}
			<div className="w-full mt-1 transition-all duration-200">
				<div className="tracking-tight cursor-pointer px-1 space-y-1 ">
					{/* My Orders only for User */}
					{user.role === "User" && (
						<Link
							href={""}
							className="px-2 rounded-lg py-1.5 flex items-center gap-2 font-medium text-black/80 hover:bg-green-200"
						>
							<PiPackage className="w-5 h-5 text-green-700" />
							My Orders
						</Link>
					)}

					{/* Logout */}
					<div
						className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-black/80 font-medium hover:bg-red-200 cursor-pointer"
						onClick={async () => {
							setOpen(false);
							await signOut({ callbackUrl: "/login" });
						}}
					>
						<MdLogout className="w-5 h-5 text-red-700" />
						Logout
					</div>
				</div>
			</div>
		</div>
	);
}

export default ModalUser;