"use client"

import {motion} from "motion/react"
import React from 'react'

type propType = {
		nextStep: (s: number) => void
}

function Welcome({nextStep}: propType) {
		return (
			<div className="h-screen overflow-hidden relative ">
					<div className="flex items-start justify-between p-6 mt-12 md:mt-24">
							<h1 className="z-10 text-[#878787] test-shadow-[#a2a2a7] text-shadow-lg text-7xl lg:text-[400px] font-bold pacifico leading-[0.4] ">Carryo
									.</h1>

					</div>
					<p className="text-white tracking-tight w-2/3 md:w-1/3 absolute right-12 cedar top-1/5 md:top-2/3 text-2xl z-20 leading-6">Carryo
							is built on a simple belief: great food
							should reach you quickly, reliably, and with
							genuine care. We partner with the best local
							kitchens and trusted home‑grown favorites to
							bring fresh, flavorful meals right to your
							door .</p>
					<motion.div className="md:pt-24 pt-2  rotate-12 flex justify-between items-center border border-yellow-300"
					            initial={
							            {x: -20, y: -20, scale: 0.8}
					            }
					            animate={
							            {x: -120, y: -60, scale: 0.9}}

					            transition={{duration: 1, delay: 0.2}}
					>
							<svg xmlns="http://www.w3.org/2000/svg" width="1400" height="1204" viewBox="0 0 640 512" className="drop-shadow-lg scale-125 md:scale-100 drop-shadow-black/20 bg-stone-900 rounded-2xl">
									<path fill="#AAAEA6" d="M58.9 42.1c3-6.1 9.6-9.6 16.3-8.7L320 64l244.8-30.6c6.7-.8 13.3 2.7 16.3 8.7l41.7 83.4c9 17.9-.6 39.6-19.8 45.1l-163.4 46.7c-13.9 4-28.8-1.9-36.2-14.3L320 64l-83.4 139c-7.4 12.4-22.3 18.3-36.2 14.3L37.1 170.6c-19.3-5.5-28.8-27.2-19.8-45.1zM321.1 128l54.9 91.4c14.9 24.8 44.6 36.6 72.5 28.6L576 211.6v167c0 22-15 41.2-36.4 46.6l-204.1 51c-10.2 2.6-20.9 2.6-31 0l-204.1-51C79 419.7 64 400.5 64 378.5v-167L191.6 248c27.8 8 57.6-3.8 72.5-28.6l54.8-91.4z"/>
							</svg>


					</motion.div>
					<div className="flex flex-col items-center justify-center mb-4 absolute md:right-[22%] md:bottom-20 scale-50 md:scale-80 right-2 bottom-76">
							<motion.button
								onClick={() => nextStep(1)}
								className="flex items-center gap-4 px-12 py-3 lato bg-stone-100 text-stone-900 rounded-full text-2xl font-bold shadow-xs shadow-[#1d4919]/30 transition-all duration-300 hover:bg-white hover:text-yellow-300"

								initial={{x: -120, y: -60, scale: 0.98, opacity: 0}}
								animate={{x: -20, y: -20, scale: 0.99, opacity: 1}}
								whileHover={{scale: 1.0, rotate: -2}}
								transition={{duration: 0.2}}
							>
									<span className="pacifico">Next</span>

									<span>
   <svg xmlns="http://www.w3.org/2000/svg" width="48" height="44" viewBox="0 0 24 24">
        <g fill="[#004919]">
            <path fill="black" d="M7.506 15.265a.75.75 0 0 0 1.446-.4zm-1.43-7.99l.724-.2zM4.705 5.92l-.2.723zM3.2 4.725a.75.75 0 1 0-.402 1.445zm16.988 11a.75.75 0 1 0-.378-1.451zm-9.991 1.834c.31 1.12-.37 2.303-1.574 2.616L9 21.626c1.977-.513 3.185-2.502 2.643-4.467zm-1.574 2.616c-1.212.315-2.428-.389-2.74-1.519l-1.446.4c.54 1.955 2.594 3.082 4.563 2.57zm-2.74-1.519c-.31-1.12.37-2.303 1.574-2.616l-.377-1.45c-1.977.513-3.186 2.502-2.643 4.467zm1.574-2.616c1.212-.315 2.428.389 2.74 1.519l1.446-.4c-.54-1.955-2.594-3.082-4.563-2.57zm1.494-1.175L6.8 7.075l-1.446.4l2.152 7.79zM4.904 5.197l-1.703-.472l-.402 1.445l1.704.473zM6.8 7.075a2.71 2.71 0 0 0-1.896-1.878l-.4 1.446c.425.118.742.44.85.831zm4.31 11.01l9.079-2.36l-.378-1.451l-9.079 2.36z"/>
            <path stroke="orange" strokeWidth="1.5" d="M9.565 8.73c-.485-1.755-.727-2.633-.315-3.324c.411-.692 1.316-.927 3.126-1.398l1.92-.498c1.81-.47 2.715-.706 3.428-.307c.713.4.956 1.277 1.44 3.033l.515 1.862c.485 1.755.728 2.633.316 3.325c-.412.691-1.317.927-3.127 1.397l-1.92.499c-1.81.47-2.715.705-3.428.306c-.713-.4-.955-1.277-1.44-3.032z" opacity="0.5"/>
        </g>
    </svg>
  </span>

							</motion.button>
							<h4 className="font-semibold text-2xl md:text-3xl lato  text-white pt-1 ">Get
									It. Got It. Done</h4>

					</div>


			</div>
		)
}

export default Welcome