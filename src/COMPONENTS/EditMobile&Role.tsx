"use client"
import {motion} from "motion/react"
import React, {JSX, useState} from 'react'
import {LuUser} from "react-icons/lu";
import {
		MdOutlineAdminPanelSettings,
		MdOutlineDeliveryDining
} from "react-icons/md";
import axios from "axios";
import {FaArrowRightLong} from "react-icons/fa6";
import {useRouter} from "next/navigation";
import {useSession} from "next-auth/react";

interface Role {
		label: string;
		icon: JSX.Element;
}

function EditMobileRole() {

		const roles: Role[] = [
				{
						label: "Admin", icon:
							<MdOutlineAdminPanelSettings/>
				},
				{label: "User", icon: <LuUser/>},
				{
						label: "Delivery Boy", icon:
							<MdOutlineDeliveryDining/>
				}
		];
		const [currentRole, setCurrentRole] = useState("");
		const [mobile, setMobile] = useState("")
		const router = useRouter();
		const {update} = useSession();

		async function handleEdit(e: React.MouseEvent) {
				e.preventDefault()
				try {
						const response = await axios.post("/api/user/edit-role-mobile", {
								role: currentRole,
								mobile: mobile
						})
						await update({role: currentRole});
						router.push('/');

				} catch (e) {
						console.log(e)
				}
		}

		return (
			<div className="bg-zinc-900 text-white min-h-screen w-full p-0.5 relative">
					<div>
							<motion.p className="text-white/60 text-3xl md:text-3xl  text-center font-medium mt-8"
							          initial={{y: -10, opacity: 0}}
							          animate={{y: 20, opacity: 1}}
							          transition={{duration: 0.7, delay: 0.2}}
							>Select your Role
							</motion.p>
							<div className="flex flex-wrap justify-center gap-6 w-full mt-10 px-4">
									{roles.map((role: Role) =>
										<motion.div whileTap={{scale: 0.96}} key={role.label} className={`w-52 h-52 hover:bg-green-950  p-4  rounded-xl flex flex-col items-center justify-center gap cursor-pointer ${currentRole == role.label ? " shadow-[0_0_8px_8px_rgba(34,197,94,0.2)] bg-green-950  " : "border-2 border-gray-600"}`} onClick={() => setCurrentRole(role.label)}>
												<p className="text-2xl text-gray-300">{role.icon}</p>
												<p className="text-lg font-extralight  text-zinc-300 leading-4 pacifico">{role.label}</p>
										</motion.div>
									)}
							</div>
					</div>

					<div className="flex flex-col items-center mt-34 z-20 relative">
							<label htmlFor="mobile" className="text-xl font-light text-white/60  mb-4">Enter
									your Mobile number</label>
							<input
								type="tel"
								id="mobile"
								placeholder="eg. 000-000-0000"
								className="w-60 md:80 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 placeholder:text-gray-300 focus:ring-green-600 focus:outline-none text-gray-700 bg-white"
								value={mobile}
								onChange={(e) => setMobile(e.target.value)}
							/>
							<button
								onClick={(e) => handleEdit(e)}
								disabled={!currentRole || mobile.length <= 9 || mobile.length > 10}
								className={` ${!currentRole || mobile.length <= 9 || mobile.length > 10 ? "bg-gray-400 text-black px-10 py-2 w-60" : "text-white hover:opacity-90 bg-green-900 px-10 py-2 w-60"} "  mt-4 rounded-xl cursor-pointer flex  items-center justify-between "`}
							>
									Go to Home <FaArrowRightLong/>
							</button>
					</div>
					<div className="w-96 h-96 bg-green-800/90 absolute bottom-[30%] right-[30%] blur-[140px] z-10"></div>

			</div>
		)
}

export default EditMobileRole
