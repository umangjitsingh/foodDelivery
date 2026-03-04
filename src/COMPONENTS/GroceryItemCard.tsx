"use client";
import React from "react";
import {motion} from "framer-motion";
import Image from "next/image";
import {FaCartShopping} from "react-icons/fa6";
import {MdAddShoppingCart} from "react-icons/md";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/redux/store";
import {addToCart} from "@/redux/cartSlice";
import {FaMinus, FaPlus} from "react-icons/fa";

interface IGrocery {
		_id: string;          // REQUIRED
		name: string;
		category: string;
		price: string;
		unit: string;
		image: string;
		createdAt?: Date;
		updatedAt?: Date;
}

const GroceryItemCard = ({item}: { item: IGrocery }) => {
		const dispatch = useDispatch<AppDispatch>();

		const quantity = useSelector(
			(state: RootState) => state.cart.items[item._id]?.quantity ?? 0
		);

		function handleAddMore() {
				dispatch(addToCart({item, quantity: quantity + 1}));
		}

		function handleRemoveItem() {
				dispatch(addToCart({item, quantity: quantity - 1}))
		}

		return (
			<motion.div
				initial={{opacity: 0, y: 40, scale: 0.9}}
				whileInView={{opacity: 1, y: 0, scale: 1}}
				viewport={{once: false}}
				transition={{duration: 0.7}}
				className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-300 flex flex-col"
			>
					<div className="relative w-full aspect-4/3 bg-white overflow-hidden">
							<Image
								src={item.image}
								alt={item.name}
								fill
								className="object-cover p-4 transition-transform duration-500 group-hover:scale-105 rounded-lg opacity-90"
							/>
							<div className="absolute inset-0 bg-linear-to-br from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"/>
					</div>

					<div className="p-4 flex flex-col gap-1 grow">
							<h3 className="font-semibold text-gray-900">{item.name}</h3>
							<p className="text-sm text-gray-500">{item.category}</p>
							<p className="text-lg font-bold text-gray-800">
									${item.price}
									<span className="text-sm font-medium text-gray-500"> / {item.unit}</span>
							</p>
					</div>

					{quantity > 0 ? (
						<button
							className="cursor-pointer m-4 mt-0 text-white bg-linear-to-r from-green-700/90 to-green-900/90 py-1.5 px-4 rounded-full flex items-center justify-center gap-3 font-medium shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] active:scale-95"

						>

								<span className="flex items-center justify-center gap-2"><FaMinus className="bg-green-400/40 h-6 w-6 p-1 rounded-full ring ring-green-100/70" onClick={() => handleRemoveItem()}/> ( {quantity} in cart ) <FaPlus className="bg-green-400/40 h-6 w-6 p-1 rounded-full ring ring-green-100/70" onClick={handleAddMore}/></span>
						</button>
					) : (
						<button
							className="cursor-pointer m-4 mt-0 text-white bg-linear-to-r from-green-600 to-green-800 py-1.5 px-4 rounded-full flex items-center justify-center gap-3 font-medium shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] active:scale-95"
							onClick={() => dispatch(addToCart({item, quantity: 1}))}
						>
								<FaCartShopping className="text-lg"/>
								<span>Add to cart</span>
						</button>
					)}
			</motion.div>
		);
};

export default GroceryItemCard;