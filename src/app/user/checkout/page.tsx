"use client";

import React, {
		useCallback,
		useEffect,
		useState
} from "react";
import {MdKeyboardBackspace} from "react-icons/md";
import Link from "next/link";
import {motion} from "framer-motion";
import {LuMapPin} from "react-icons/lu";
import {
		FaTreeCity,
		FaUser,
		FaMapPin,
		FaPhone,
		FaMapLocationDot
} from "react-icons/fa6";
import dynamic from "next/dynamic";
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import {GoHomeFill} from "react-icons/go";
import axios from "axios";
import {TbCurrentLocation} from "react-icons/tb";
import {FaRegCreditCard} from "react-icons/fa";

const Map = dynamic(() => import("@/COMPONENTS/Map"), {ssr: false});

function Checkout() {
		const {userData} = useSelector((state: RootState) => state.user);

		const [userDetails, setUserDetails] = useState({
				fullName: "",
				mobile: "",
				city: "",
				state: "",
				pincode: "",
				fullAddress: "",
		});

		const [coordinates, setCoordinates] = useState<[number, number] | null>(null);
		const [locationError, setLocationError] = useState("");
		const [search, setSearch] = useState("");
		const [currentCoords, setCurrentCoords] = useState<[number, number] | null>(null);
		const myCart = useSelector((state: RootState) => state.cart)
		console.log("myCart->", myCart)

		// Load user data
		useEffect(() => {
				if (userData) {
						setUserDetails((prev) => ({
								...prev,
								fullName: userData.name || "",
								mobile: userData.mobile || "",
						}));
				}
		}, [userData]);

		// Get current location
		useEffect(() => {
				if (!navigator.geolocation) {
						setLocationError("Geolocation is not supported by your browser.");
						return;
				}

				navigator.geolocation.getCurrentPosition(
					(pos) => {
							setCurrentCoords([pos.coords.longitude, pos.coords.latitude])
							setCoordinates([pos.coords.longitude, pos.coords.latitude]);
					},
					() => {
							setLocationError("Unable to retrieve your location. Check permissions.");
					},
					{enableHighAccuracy: true, maximumAge: 0, timeout: 9000}
				);
		}, []);

		// Reverse geocode when coordinates change
		const fetchAddress = useCallback(async () => {
				if (!coordinates) return;

				const res = await axios.get(
					`https://nominatim.openstreetmap.org/reverse?lat=${coordinates[1]}&lon=${coordinates[0]}&format=json`
				);

				const address = res.data.address ?? {};

				setUserDetails((prev) => ({
						...prev,
						city: address.city ?? "",
						state: address.state ?? "",
						pincode: address.postcode ?? "",
						fullAddress:
							address.house_number && address.road
								? `${address.house_number} ${address.road}`
								: prev.fullAddress,
				}));
		}, [coordinates]);

		useEffect(() => {
				fetchAddress();
		}, [fetchAddress]);

		// Forward geocode (search → coordinates)
		const handleAddressSearch = useCallback(async () => {
				if (!search.trim()) return;

				const result = await axios.get(
					`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(search)}`
				);

				if (result.data.length === 0) {
						alert("Address not found");
						return;
				}

				const place = result.data[0];
				const lng = parseFloat(place.lon);
				const lat = parseFloat(place.lat);

				setCoordinates([lng, lat]); // triggers reverse geocode automatically
		}, [search]);

		function handleCurrentCoords() {
				if (currentCoords) {
						setCoordinates(currentCoords)
				}
		}

		return (
			<div className="text-white w-[92%] md:w-[80%] mx-auto py-10 relative rounded-2xl">

					{/* Back Button */}
					<Link
						href="/user/cart"
						className="absolute top-6 left-0 flex gap-2 items-center px-3 py-2 rounded-md text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200"
					>
							<MdKeyboardBackspace className="h-6 w-6"/>
							<span className="hidden sm:inline">Back to checkout</span>
					</Link>

					{/* Main Layout */}
					<div className="w-full flex flex-col md:flex-row md:items-start md:justify-center md:gap-12 gap-10">

							{/* LEFT COLUMN — FORM */}
							<div className="w-full md:w-[38%] mx-auto">

									<h1 className="text-3xl md:text-4xl font-bold text-white/90 mb-6 mt-4 text-center">
											Checkout
									</h1>

									<motion.div
										initial={{opacity: 0, x: -40}}
										animate={{opacity: 1, x: 0}}
										transition={{duration: 0.4}}
										className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200"
									>
											<h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
          <span className="text-green-700">
            <LuMapPin className="h-10 w-10"/>
          </span>
													<span>Delivery Address</span>
											</h2>

											<div className="space-y-5">

													{/* Full Name */}
													<div className="relative">
															<FaUser className="text-black/60 h-4 w-4 absolute top-1/2 -translate-y-1/2 left-4"/>
															<input
																type="text"
																value={userDetails.fullName}
																readOnly
																className="bg-gray-50 border border-gray-300 focus:border-gray-500 focus:ring-1 focus:ring-gray-400 transition-all py-2.5 pl-12 pr-4 w-full rounded-lg text-gray-900"

															/>
													</div>

													{/* Mobile */}
													<div className="relative">
															<FaPhone className="text-black/60 h-4 w-4 absolute top-1/2 -translate-y-1/2 left-4"/>
															<input
																type="text"
																value={userDetails.mobile}
																onChange={(e) =>
																	setUserDetails((prev) => ({...prev, mobile: e.target.value}))
																}
																className="bg-gray-50 border border-gray-300 focus:border-gray-500 focus:ring-1 focus:ring-gray-400 transition-all py-2.5 pl-12 pr-4 w-full rounded-lg text-gray-900"
															/>
													</div>

													{/* Full Address */}
													<div className="relative">
															<GoHomeFill className="text-black/60 h-4 w-4 absolute top-1/2 -translate-y-1/2 left-4"/>
															<input
																type="text"
																value={userDetails.fullAddress}
																onChange={(e) =>
																	setUserDetails((prev) => ({...prev, fullAddress: e.target.value}))
																}
																placeholder="Enter your full address"
																className="bg-gray-50 border border-gray-300 focus:border-gray-500 focus:ring-1 focus:ring-gray-400 transition-all py-2.5 pl-12 pr-4 w-full rounded-lg text-gray-900"


															/>
															<span className="text-red-600 absolute top-1 right-2 text-lg">*</span>
													</div>

													{/* City / State / Pincode */}
													<div className="grid grid-cols-3 gap-3">
															{/* City */}
															<div className="relative">
																	<FaTreeCity className="text-black/60 h-4 w-4 absolute top-1/2 -translate-y-1/2 left-3"/>
																	<input
																		type="text"
																		value={userDetails.city}
																		onChange={(e) =>
																			setUserDetails((prev) => ({...prev, city: e.target.value}))
																		}
																		placeholder="city"
																		className="bg-gray-50 border border-gray-300 focus:border-gray-500 focus:ring-1 focus:ring-gray-400 transition-all py-2.5 pl-10 pr-4 w-full rounded-lg text-gray-900"

																	/>
															</div>

															{/* State */}
															<div className="relative">
																	<FaTreeCity className="text-black/60 h-4 w-4 absolute top-1/2 -translate-y-1/2 left-3"/>
																	<input
																		type="text"
																		value={userDetails.state}
																		onChange={(e) =>
																			setUserDetails((prev) => ({...prev, state: e.target.value}))
																		}
																		placeholder="state"
																		className="bg-gray-50 border border-gray-300 focus:border-gray-500 py-2.5 pl-10 pr-4 w-full rounded-lg text-gray-900 focus:ring-1 focus:ring-gray-400 transition-all"


																	/>
															</div>

															{/* Pincode */}
															<div className="relative">
																	<FaMapPin className="text-black/60 h-4 w-4 absolute top-1/2 -translate-y-1/2 left-3"/>
																	<input
																		type="text"
																		value={userDetails.pincode}
																		onChange={(e) =>
																			setUserDetails((prev) => ({...prev, pincode: e.target.value}))
																		}
																		placeholder="pincode"
																		className="bg-gray-50 border border-gray-300 focus:border-gray-500 py-2.5 pl-10 pr-4 w-full rounded-lg text-gray-900 focus:ring-1 focus:ring-gray-400 transition-all"
																	/>
															</div>
													</div>

													{/* Search Bar */}
													<div className="relative flex items-center gap-3 mt-4">
															<FaMapLocationDot className="text-black/60 h-4 w-4 absolute top-1/2 -translate-y-1/2 left-4"/>
															<input
																type="text"
																value={search}
																onChange={(e) => setSearch(e.target.value)}
																placeholder="search a city or area..."
																className="bg-gray-50 border border-gray-300 focus:border-gray-500 py-2.5 pl-10 pr-4 w-full rounded-lg text-gray-900 focus:ring-1 focus:ring-gray-400 transition-all"
															/>
															<button
																className="bg-gray-900 hover:bg-gray-800 text-white py-2.5 px-6 rounded-lg shadow-sm transition-all"

																onClick={handleAddressSearch}
															>
																	Search
															</button>
													</div>

													{/* Map */}
													<div className="relative mt-6 h-72 rounded-xl overflow-hidden  border border-gray-300 shadow-inner bg-gray-100">

															<Map
																coordinates={coordinates}
																locationError={locationError}
																onMarkerDrag={(lng, lat) => setCoordinates([lng, lat])}
															/>

															<div className="absolute bottom-0 text-[10px] text-gray-400">
																	© Stadia Maps
															</div>

															<div
																className="absolute top-2 right-2"
																onClick={() => handleCurrentCoords()}
															>
																	<TbCurrentLocation className="text-red-900 h-8 w-8 bg-gray-100  p-1 rounded-md hover:scale-105 border border-black/20 cursor-pointer"/>

															</div>
													</div>
											</div>
									</motion.div>
							</div>

							{/* RIGHT COLUMN — PAYMENT */}
							<div className="w-full md:w-[40%] flex flex-col items-center">

									<h1 className="text-3xl md:text-4xl font-bold text-white/90 mb-6 mt-4 text-center">
											Payment
									</h1>

									<motion.div
										initial={{opacity: 0, x: 20}}
										animate={{opacity: 1, x: 0}}
										transition={{duration: 0.4}}
										className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 w-full max-w-md"
									>
											<motion.div
												initial={{opacity: 0, y: 60, scale: 0.9}}
												animate={{opacity: 1, y: 0, scale: 1}}
												className="bg-linear-to-br from-gray-100 to-gray-200 rounded-2xl
          shadow-md p-6 border border-gray-300 sticky top-24"
											>
													<h2 className="text-lg sm:text-xl font-bold text-gray-950 mb-4">
															Order Summary
													</h2>

													<div className="space-y-3 text-gray-700 text-sm sm:text-base">
															<div className="flex justify-between">
																	<span>Sub Total</span>
																	<span className="text-gray-900 font-semibold">$ {myCart.subtotal}</span>
															</div>

															<div className="flex justify-between">
																	<span>Delivery Fee</span>
																	<span className="text-gray-900 font-semibold">$ {myCart.deliveryFee}</span>
															</div>

															<hr className="my-3"/>

															<div className="flex justify-between font-bold">
																	<span>Final Total</span>
																	<span className="text-gray-900 font-semibold">
                <span className="text-lg">$ {myCart.grandTotal}</span> (incl. 13% tax)
              </span>
															</div>
															<button
																className="bg-gray-900 hover:bg-gray-800 text-white py-2.5 px-6
              rounded-lg shadow-sm transition-all"

															>
																	Pay now
															</button>
													</div>

											</motion.div>
									</motion.div>
							</div>
					</div>
			</div>
		)
}

export default Checkout;