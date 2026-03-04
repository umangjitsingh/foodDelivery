"use client"
import React, {
	ChangeEvent, FormEvent,
	useEffect,
	useState
} from 'react'
import Link from "next/link";
import {motion} from "framer-motion";
import {MdKeyboardBackspace} from "react-icons/md";
import {HiOutlinePlusCircle} from "react-icons/hi";
import Grainient from "@/COMPONENTS/UI/Grainient";
import Image from "next/image"
import {FaUpload} from "react-icons/fa6";
import axios from "axios";

const categories: string[] = [
	"Fruits & Vegetables",
	"Dairy & Eggs",
	"Rice, Atta & Grains",
	"Snacks & Biscuits",
	"Spices & Masalas",
	"Drinks & Beverages",
	"Personal Care",
	"Household Essentials",
	"Instant & Packaged Food",
	"Baby & Pet Care"
];

const units: string[] = ["kg", "g", "liter", "ml", "piece", "pack"]

function AddGrocery() {

	const [name, setName] = useState("");
	const [category, setCategory] = useState("");
	const [unit, setUnit] = useState("");
	const [price, setPrice] = useState("");
	const [previewImage, setPreviewImage] = useState<string | null>();
	const [backendImage, setBackendImage] = useState<Blob | File | null>()

	function handleImageChange(e: ChangeEvent<HTMLInputElement>) {
		const files = e.target.files;
		if (!files || files.length < 1) {
			return
		}
		const file = files[0];
		setBackendImage(file);
		setPreviewImage(URL.createObjectURL(file))
	}

	useEffect(() => {
		return () => {
			if (previewImage) {
				URL.revokeObjectURL(previewImage)
			}

		}
	}, [previewImage])

	async function handleSubmit(e:FormEvent) {
e.preventDefault();
try{
	const formData=new FormData();
	formData.append("name",name);
	formData.append("category",category);
	formData.append("unit",unit);
	formData.append("price",price);
	if(backendImage){
		formData.append("image",backendImage)
	}

	const response=await axios.post("/api/admin/add-grocery",formData)

}catch (e) {
	console.log(e)
}
	}

	return (

		<div style={{width: '100%', height: '100vh', position: 'relative'}}>
			<Grainient
				color1="#c9e4de"
				color2="#e2e2df"
				color3="d2d2cf"
				timeSpeed={0.25}
				colorBalance={0}
				warpStrength={1}
				warpFrequency={5}
				warpSpeed={2}
				warpAmplitude={50}
				blendAngle={0}
				blendSoftness={0.05}
				rotationAmount={500}
				noiseScale={2}
				grainAmount={0.1}
				grainScale={2}
				grainAnimated={false}
				contrast={1.5}
				gamma={1}
				saturation={1}
				centerX={0}
				centerY={0}
				zoom={0.9}
			/>
			<div className=" min-h-screen bg-black/20 py-16 px-4  ">
				<Link href={"/"} className="absolute top-6 left-6 flex items-center gap-2 text-green-700 font-semibold bg-white px-4 py-2 rounded-full shadow-md hover:bg-green-100 hover:shadow-lg transition-all">
					<MdKeyboardBackspace className="h-6 w-6"/>
					<span className="hidden md:flex">  Back to Home </span>
				</Link>

				<motion.div initial={{y: 20, opacity: 0}}
				            animate={{y: 0, opacity: 1}}
				            transition={{duration: 0.9}}
				            className="bg-white w-full max-w-2xl shadow-2xl rounded-3xl border border-green-100 p-8 absolute top-1/2 left-1/2 -translate-1/2">
					<div className="flex flex-col items-center mb-8">
						<div className="flex items-center gap-2">
							<HiOutlinePlusCircle className="text-green-600 w-7 h-7"/>
							<h1>Add Your Grocery</h1>
						</div>
						<p className="text-gray-500 text-sm mt-2 text-center">Fill
							out the details below to add a new grocery
							item.</p>
					</div>

					<form className="flex flex-col gap-6 w-full" onSubmit={(e)=>handleSubmit(e)}>
						<div>
							<label htmlFor="name">Grocery
								Name <span className="text-red-600">*</span>
							</label>
							<input type="text"
							       id="name" placeholder="eg: grapes, milk ..."
							       className="pl-4 w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-400 transition-all"
							       value={name}
							       onChange={(e) => setName(e.target.value)}
							/>
						</div>

						<div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-2">
							<div>
								<label className="block text-gray-700 font-medium mb-1">Category <span className="text-red-600">*</span></label>
								<select
									name="category"
									className="custom-select w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-green-400 transition-all"
									value={category}
									onChange={(e) => setCategory(e.target.value)}
								>
									<option value="" disabled hidden>Select
										Category
									</option>
									{categories.map((cat, index) => (
										<option key={index} value={cat}>
											{cat}
										</option>
									))}
								</select>
							</div>
							<div>
								<label className="block text-gray-700 font-medium mb-1">Unit <span className="text-red-600">*</span></label>
								<select
									name="category"
									className="custom-select w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-green-400 transition-all"
									value={unit}
									onChange={(e) => setUnit(e.target.value)}
								>
									<option value="" disabled hidden>Select
										Unit
									</option>
									{units.map((unit, index) => (
										<option key={index} value={unit}>
											{unit}
										</option>
									))}
								</select>
							</div>
						</div>

						<div>
							<label htmlFor="price">
								Price <span className="text-red-600">*</span>
							</label>
							<input type="text"
							       id="price"
							       placeholder="eg: 990"
							       className="pl-4 w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-400 transition-all"
							       value={price}
							       onChange={(e) => setPrice(e.target.value)}
							/>
						</div>


						<div className="flex flex-col sm:flex-row gap-2 items-center">
							<label htmlFor="image" className="cursor-pointer flex items-center justify-center gap-2 bg-green-50 text-green-700 font-semibold border border-green-200 rounded-xl px-6 py-3 hover:bg-green-100 transition-all width-full sm:w-auto">
								<FaUpload/> Upload Image
								<span className="text-red-600 pr-2">*</span>
							</label>
							<input type="file"
							       accept="image/*"
							       id="image"
							       hidden
							       onChange={(e) => handleImageChange(e)}
							/>

							{previewImage &&
                 <div className="w-30 h-30 mx-auto rounded-xl shadow-inner border border-gray-200 p-0.5 mb-2 ">
                    <Image
                       src={previewImage}
                       width={120}
                       height={120}
                       alt="grocery photo"
                       className="rounded-xl object-cover"
                    />
                 </div>}
						</div>

						<motion.button
						whileHover={{scale:1.01}}
						whileTap={{scale:0.9}}
						className="mt-4 w-full bg-linear-to-r from-green-500 to-green-700 font-semibold py-3 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-60 text-white">
							Add Grocery🍊
						</motion.button>

					</form>

				</motion.div>

			</div>

		</div>

	)
}

export default AddGrocery
