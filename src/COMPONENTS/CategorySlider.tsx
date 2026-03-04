"use client";

import React, {
		useCallback,
		useEffect,
		useRef,
		useState
} from "react";

import {
		GiBananaBunch,
		GiBroom,
		GiFastNoodles,
		GiGrain,
		GiHotSpices,
		GiMilkCarton,
		GiOpenedFoodCan,
		GiShintoShrineMirror,
		GiWineBottle
} from "react-icons/gi";

import { FaBaby, FaCaretLeft, FaCaretRight } from "react-icons/fa";
import { motion } from "framer-motion";

function CategorySlider() {
		const scrollRef = useRef<HTMLDivElement>(null);
		const [showLeft, setShowLeft] = useState(false);
		const [showRight, setShowRight] = useState(true);

		const categories = [
				{ name: "Fruits & Vegetables", icon: GiBananaBunch, color: "bg-amber-100" },
				{ name: "Dairy & Eggs", icon: GiMilkCarton, color: "bg-sky-100" },
				{ name: "Rice, Atta & Grains", icon: GiGrain, color: "bg-green-100" },
				{ name: "Snacks & Biscuits", icon: GiOpenedFoodCan, color: "bg-pink-100" },
				{ name: "Spices & Masalas", icon: GiHotSpices, color: "bg-yellow-100" },
				{ name: "Drinks & Beverages", icon: GiWineBottle, color: "bg-purple-100" },
				{ name: "Personal Care", icon: GiShintoShrineMirror, color: "bg-teal-100" },
				{ name: "Household Essentials", icon: GiBroom, color: "bg-blue-100" },
				{ name: "Instant & Packaged Food", icon: GiFastNoodles, color: "bg-lime-100" },
				{ name: "Baby & Pet Care", icon: FaBaby, color: "bg-rose-100" }
		];

		const checkScroll = useCallback(() => {
				const el = scrollRef.current;
				if (!el) return;

				const { scrollLeft, clientWidth, scrollWidth } = el;

				setShowLeft(scrollLeft > 0);
				setShowRight(scrollLeft + clientWidth < scrollWidth - 5);
		}, []);

		useEffect(() => {
				const el = scrollRef.current;
				if (!el) return;

				el.addEventListener("scroll", checkScroll);
				checkScroll();

				return () => el.removeEventListener("scroll", checkScroll);
		}, [checkScroll]);

		const handleScroll = (direction: "left" | "right") => {
				if (!scrollRef.current) return;
				const amount = direction === "left" ? -200 : 200;
				scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
		};

		return (
			<motion.div
				className="w-[90%] md:w-[80%] mx-auto mt-10 relative"
				initial={false}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: false }}
				transition={{ duration: 0.7 }}
			>
					<h2 className="text-2xl md:text-3xl font-bold text-white/80 mb-6 text-center">
							Shop by category 🛒
					</h2>

					<div className="flex items-center justify-center gap-3">
							{showLeft && (
								<button
									className="p-1 rounded-full bg-zinc-200/20"
									onClick={() => handleScroll("left")}
								>
										<FaCaretLeft className="w-8 h-8 text-white/90" />
								</button>
							)}

							<div
								ref={scrollRef}
								className="flex gap-6 overflow-x-auto px-4 scrollbar-hide scroll-smooth"
							>
									{categories.map((cat) => {
											const Icon = cat.icon;
											return (
												<motion.div
													key={cat.name}
													className={`min-w-37.5 md:min-w-45 flex flex-col items-center justify-center rounded-xl shadow-md hover:shadow-xl transition-all cursor-pointer ${cat.color}`}
												>
														<div className="flex items-center justify-between gap-2 p-2">
                  <span className="text-green-800">
                    <Icon className="w-6 h-6" />
                  </span>
																<p className="text-xs sm:text-sm">{cat.name}</p>
														</div>
												</motion.div>
											);
									})}
							</div>

							{showRight && (
								<button
									className="p-1 rounded-full bg-zinc-200/20"
									onClick={() => handleScroll("right")}
								>
										<FaCaretRight className="w-8 h-8 text-white/90" />
								</button>
							)}
					</div>
			</motion.div>
		);
}

export default CategorySlider;
