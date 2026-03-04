"use client"
import {TfiHeadphone} from "react-icons/tfi";
import {FiTruck} from "react-icons/fi";
import {LuLeafyGreen} from "react-icons/lu";
import {useEffect, useState} from "react";
import Image from "next/image";
import {AnimatePresence, motion} from "framer-motion";

function HeroUser() {
		const [index, setIndex] = useState(0);
		const [isPaused, setIsPaused] = useState(false)

		const slides = [
				{
						id: 1,
						icon:
							<LuLeafyGreen className="w-20 h-20 sm:h-24 sm:w-24 text-green-400 drop-shadow-xl"/>,
						title: "Fresh Organic Groceries",
						subtitle: "Farm-fresh fruits, vegetables, and daily essentials delivered to you.",
						buttonText: "Shop Now 🍃",
						bg: "https://garlickygrill.com/wp-content/uploads/2020/10/Garlicky0015-scaled.jpg"
				},
				{
						id: 2,
						icon:
							<FiTruck className="w-20 h-20 sm:h-24 sm:w-24 text-green-600 drop-shadow-xl"/>,
						title: "Fast & Reliable Delivery",
						subtitle: "We ensure your groceries reach your doorstep in no time.",
						buttonText: "Order Now 🚚",
						bg: "https://img.cdn4dd.com/cdn-cgi/image/fit=contain,width=1920,format=auto,quality=100/https://doordash-static.s3.amazonaws.com/media/photosV2/ebcd983f-1f95-4026-adc6-36959339d22a-retina-large.png"
				},
				{
						id: 3,
						icon:
							<TfiHeadphone className="w-20 h-20 sm:h-24 sm:w-24 text-green-600 drop-shadow-xl"/>,
						title: "Shop Anytime, Anywhere",
						subtitle: "Easy and seamless online grocery shopping experience.",
						buttonText: "Get Started 📞",

						bg: "https://plus.unsplash.com/premium_photo-1723118424218-54c1de8140c7?q=80&w=1553&auto=format&fit=crop"
				}
		];

		useEffect(() => {
				if (isPaused) return;

				const timer = setInterval(() => {
						setIndex((prev) => (prev + 1) % slides.length);
				}, 4500);

				return () => clearInterval(timer);
		}, [isPaused, slides.length]);

		function handleDotClicked(ind: number) {
				setIndex(ind);
				setIsPaused(true)

				setTimeout(() => {
						setIsPaused(false)
				}, 10000)
		}

		return (
			<div className="relative w-[98%] mx-auto mt-32 h-[80vh] rounded-3xl overflow-hidden shadow-2xl">
					<AnimatePresence mode="wait">
							<motion.div
								key={index}
								initial={{opacity: 0, scale: 1.02}}
								animate={{opacity: 1, scale: 1}}
								exit={{opacity: 0, scale: 0.98}}
								transition={{duration: 0.8, ease: "easeOut"}}
								className="absolute inset-0"
							>
									<Image
										src={slides[index].bg}
										alt="background image"
										fill
										priority
										className="object-cover opacity-40"
									/>

									{/* Content */}
									<motion.div
										initial={{y: 20, opacity: 0}}
										animate={{y: 0, opacity: 1}}
										transition={{duration: 0.7, ease: "easeOut"}}
										className="flex flex-col items-center justify-center w-full h-full text-center px-4"
									>
											<motion.div
												initial={{scale: 0.9}}
												animate={{scale: 1}}
												transition={{duration: 0.6}}
												className="flex items-center gap-4 bg-black/60 backdrop-blur-xl px-6 py-4 rounded-2xl shadow-lg"
											>
													{slides[index].icon}
													<p className="text-white text-3xl sm:text-4xl md:text-5xl font-extrabold drop-shadow-lg">
															{slides[index].title}
													</p>
											</motion.div>

											<p className="text-white text-lg sm:text-xl font-medium mt-4 drop-shadow-md">
													{slides[index].subtitle}
											</p>
									</motion.div>
							</motion.div>
					</AnimatePresence>

					{/* CTA Button */}
					<motion.button
						whileHover={{scale: 1.08}}
						whileTap={{scale: 0.95}}
						className="text-white bg-black/80 hover:bg-black px-10 py-3 rounded-full absolute top-[65%] left-1/2 -translate-x-1/2 shadow-lg backdrop-blur-md transition"
					>
							{slides[index].buttonText}
					</motion.button>

					{/* Indicators */}
					<div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
							{slides.map((s, ind) => (
								<motion.span
									onClick={() => handleDotClicked(ind)}
									key={s.id}
									animate={{
											scale: ind === index ? 1.2 : 1,
											opacity: ind === index ? 1 : 0.5
									}}
									className={`rounded-full h-3 w-3 transition-all ${
										ind === index ? "bg-gray-700" : "bg-white"
									}`}
								/>
							))}
					</div>
			</div>
		);
}

export default HeroUser;