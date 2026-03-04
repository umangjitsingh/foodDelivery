"use client"
import React from 'react'
import Image from "next/image"
import { motion } from "framer-motion"
import {AiFillStop} from "react-icons/ai";


function Unauthorized() {


	return (

		<div className="flex items-center justify-center h-screen">

			<motion.div
				className="relative w-full h-full"
				initial={{opacity:1}}
				animate={{opacity:0.2}}
				transition={{duration:2}}
			>
				<Image src={"/lion.jpg"} alt="unauthorized" fill/>
			</motion.div>

			<motion.div className="absolute flex flex-col items-center"
			            initial={{opacity:0,y:-10}}
			            animate={{opacity:1,y:0}}
			            transition={{duration:1}}>
				<AiFillStop className="text-red-700 h-84 w-84"/>
				<p className="text-6xl text-white font-bold">Access Denied</p>
				<p className="text-2xl text-gray-200/60">This page is not for you, Sorry.</p>

			</motion.div>
		</div>

	)
}

export default Unauthorized
