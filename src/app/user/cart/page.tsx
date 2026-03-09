"use client"
import React from 'react'
import Link from "next/link";
import {
		MdKeyboardBackspace
} from "react-icons/md";
import {AnimatePresence, motion} from "framer-motion";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/redux/store";
import Image from "next/image"
import {FaMinus, FaPlus} from "react-icons/fa";
import {
		addToCart,
		removeParticularItem
} from "@/redux/cartSlice";
import {useRouter} from "next/navigation";

function Cart() {
		const router = useRouter()
		const myCart = useSelector((state: RootState) => state.cart)
		const dispatch = useDispatch<AppDispatch>()

		return (
			<div className="text-gray-100 w-[95%] sm:w-[90%] md:w-[80%] mx-auto mt-8 mb-24 relative ">
					<Link href={"/"} className="absolute -top-2 left-0 flex gap-2">
							<MdKeyboardBackspace className="h-6 w-6"/>
							<span className="hidden sm:inline mb-24">Back to home</span>
					</Link>

					<motion.h2
						initial={{opacity: 0, y: 60, x: 40, scale: 0.7}}
						animate={{opacity: 1, y: 40, x: 10, scale: 1}}
						transition={{duration: 0.7}}
						className="text-2xl sm:text-3xl md:text-4xl  text-gray-200 text-center pt-4"
					>
							<div className="flex items-center justify-center gap-4 mt-12 mb-4">
									{/*<MdOutlineShoppingCart/>*/}
									<span className="tracking-tight font-extrabold uppercase ">Your Shopping Cart</span>
							</div>

							{
									Object.values(myCart.items).length == 0 ? (
											<p className="font-light text-base flex flex-col items-center bg-slate-400/20 py-14 rounded-md shadow-lg">OPPS
													Your cart is Empty. Add some
													groceries to continue shopping.
													<Link href={"/"} className=" text-gray-50 font-medium cursor-pointer test-xl w-48 bg-green-700 px-4 py-2 rounded-full mt-4"> Continue
															Shopping </Link></p>) :
										(

											<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
													<div>
															<AnimatePresence>
																	{
																			Object.values(myCart.items).map((item) => {
																						return <motion.div
																							initial={{opacity: 0, y: 30}}
																							animate={{opacity: 1, y: 0}}
																							exit={{opacity: 0, y: -30}}
																							key={item._id}
																							className=" relative flex flex-col sm:flex-row items-center bg-white/10 rounded-xl shadow-md p-5 hover:shadow-md transition-all duration-400 border border-gray-100 mb-1 ">

																								<div className="relative w-28 h-28 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-xl overflow-hidden bg-gray-100 shrink-0">
																										<Image src={item.image} alt={item.name} fill className="object-cover  transition-transform duration-400 hover:scale-105"/>
																								</div>

																								<button className="bg-red-400/80 text-black py-1 px-4 text-base font-medium absolute right-4 bottom-4 rounded-md hover:bg-red-400/90 hover:scale-105 " onClick={() => dispatch(removeParticularItem(item._id))}>Remove</button>

																								<div className="mt-4 sm:t-0 sm:ml-4 flex-1 text-center sm:text-left">
																										<p className="text-xl  font-semibold text-white/80 line-clamp-1  ">{item.name}</p>

																										<div className="flex   gap-8">
																												<p className="text-lg text-yellow-200  font-light"> Quantity
																														: {item.quantity} </p>
																												<p className="w-20 flex items-center justify-between ">
																														<span onClick={() => dispatch(addToCart({item, quantity: item.quantity + 1}))} className="bg-zinc-900 p-2 rounded-full hover:scale-105 hover:shadow-xs hover:shadow-slate-400 "><FaPlus className="h-4 w-4 "/></span>
																														<span onClick={() => dispatch(addToCart({item, quantity: item.quantity - 1}))} className="bg-zinc-900 p-2 rounded-full hover:scale-105 hover:shadow-xs hover:shadow-slate-400  "><FaMinus className="h-4 w-4 "/></span>
																												</p>

																										</div>


																										<span className="text-lg text-yellow-200  font-light">${item.price}/{item.unit} </span>
																								</div>
																								<div className="text-xl  font-medium text-white/70 line-clamp-1  ">Price
																										:
																										${Number(item.price) * (item.quantity)}</div>


																						</motion.div>
																				}
																			)
																	}
															</AnimatePresence>
													</div>

													<motion.div initial={{opacity: 0, y: 60, x: 40, scale: 0.7}}
													            animate={{opacity: 1, y: 40, x: 10, scale: 1}}
													            className="bg-linear-to-r from-slate-200 to-gray-200 rounded-2xl shadow-xl p-6 h-fit sticky top-24 border border-gray-800 flex flex-col"
													>
															<h2 className="text-lg sm:text-xl font-bold text-gray-950 mb-4">Order
																	Summary
															</h2>
															<div className="space-y-3 text-gray-700 text-sm sm:text-base">
																	<div className="flex justify-between">
																			<span>Sub Total</span>
																			<span className="text-gray-900 font-semibold">
																					 $ {myCart.subtotal} </span>
																	</div>
																	<div className="flex justify-between">
																			<span>Delivery Fee</span>
																			<span className="text-gray-900 font-semibold">
																					 $ {myCart.deliveryFee} </span>
																	</div>

																	<hr className="my-3"/>

																	<div className="flex justify-between font-bold">
																			<span>Final Total</span>
																			<span className="text-gray-900 font-semibold">
																					<span className="text-lg ">$ {myCart.grandTotal} </span>  (incl. 13%  tax)</span>
																	</div>
															</div>

															<motion.button whileTap={{scale: 0.95}} className="w-full mt-6 bg-green-400/70 text-black py-3 rounded-full hover:bg-green-400/40 transition-all font-semibold text-sm sm:text-base" onClick={() => router.push("/user/checkout")}>Proceed
																	to Checkout
															</motion.button>

													</motion.div>

											</div>
										)
							}

					</motion.h2>
			</div>
		)
}

export default Cart
