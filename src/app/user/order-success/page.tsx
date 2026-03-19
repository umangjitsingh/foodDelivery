import React from "react";
import { IoBagCheck } from "react-icons/io5";
import Link from "next/link";
import {FaBorderTopLeft} from "react-icons/fa6";

function OrderSuccess() {
		return (
			<div className="h-screen flex flex-col items-center justify-center min-h-[80vh] px-6 text-center bg-linear-to-br from-green-50 to-white">

					<div className="relative ">
							<span className=" h-full w-full bg-green-300 absolute top-0 left-0 rounded-full blur-2xl shadow-green-300 shadow-xl animate-pulse"></span>
							<IoBagCheck
								className="relative h-16 w-16 text-green-700 z-20 "
							/>

					</div>



					<h2 className="text-3xl md:text-4xl font-bold text-green-700 mt-6">
							Order Placed Successfully
					</h2>

					<p className="mt-3 max-w-md text-gray-700 leading-relaxed">
							Thank you for shopping with us! Your order has been placed and is being
							processed. You can track its progress in your{" "}
							<span className="font-semibold text-green-700">My Orders</span> section.
					</p>

					<div className="flex items-center justify-center gap-2 mt-12 text-lg font-semibold shadow-md  text-white bg-green-700 py-2 hover:bg-green-800/90 rounded-md px-4 hover:shadow-lg hover:scale-[101%]">
							<FaBorderTopLeft />	<Link href={"/user/my-orders"}>Go to my Orders</Link>
					</div>
			</div>
		);
}

export default OrderSuccess;