import React, {useState} from "react";
import {RxEyeOpen} from "react-icons/rx";
import {FiEyeOff} from "react-icons/fi";
import {FcGoogle} from "react-icons/fc";
import {MdLogin} from "react-icons/md";
import axios from "axios";
import {AiOutlineLoading3Quarters} from "react-icons/ai";
import {useRouter} from "next/navigation";
import {signIn} from "next-auth/react";


type propType = {
	nextStep: (s: number) => void
}

type RegistrationFormData = {
	name: string
	email: string
	password: string
}

function RegisterForm({nextStep}: propType) {
	const [formData, setFormData] = useState<RegistrationFormData>({
		name: "",
		email: "",
		password: ""
	})

	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState(false)
const router=useRouter();
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		})
	}

	function togglePassword() {
		setShowPassword(prev => !prev)
	}

	async function handleSubmit(e: React.SubmitEvent) {
		e.preventDefault();

		try {
setLoading(true)
			const response = await axios.post("/api/auth/signup", {
				name: formData?.name,
				email: formData?.email,
				password: formData?.password
			})
			console.log("Registered:", response);
			setLoading(false)

		} catch (err) {
			console.log(err)
			setLoading(false)
		}
	}

	return (

	<div className="min-h-screen flex flex-col items-center space-y-10 p-24 w-full mx-auto">

		<button
			onClick={() => nextStep(0)}
			className="
    flex items-center gap-3
    px-8 py-3
    rounded-full
    bg-stone-100
    text-zinc-900
    text-xl font-bold
    hover:bg-white
    transition-all duration-300 md:scale-80

    hover:ring-1 hover:ring-zinc-700 hover:ring-offset-2
  "
		>
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
				<g fill="none" stroke="currentColor" strokeWidth="1.5">
					<path d="m13 8.768l6.097-4.46C20.399 3.411 22 4.58 22 6.426v11.148c0 1.847-1.6 3.015-2.903 2.118L13 15.232" opacity="0.5"/>
					<path d="M2.921 10.147c-1.228.807-1.228 2.899 0 3.706l7.418 4.877c1.194.785 2.661-.237 2.661-1.853V7.123c0-1.616-1.467-2.638-2.661-1.853z"/>
				</g>
			</svg>

			<span>Back</span>
		</button>

<div className="flex  flex-col gap-4 md:w-96 w-84 p-6  rounded-xl shadow h-100 mx-4 bg-white">
	<form
		onSubmit={handleSubmit}
		className="w-full flex flex-col "
	>
		<h2 className="text-2xl font-bold mb-4 pacifico">Join <span>Carryo</span>
		</h2>

		<input
			type="text"
			name="name"
			placeholder="Full Name"
			value={formData.name}
			onChange={handleChange}
			className="border p-2 rounded mb-2"
			required
		/>

		<input
			type="email"
			name="email"
			placeholder="Email Address"
			value={formData.email}
			onChange={handleChange}
			className="border p-2 rounded mb-2"
			required
		/>
		<div className="relative">
			<input
				type={showPassword ? "text" : "password"}
				name="password"
				placeholder="Password"
				value={formData.password}
				onChange={handleChange}
				className="border p-2 rounded w-full mb-2"
				required
			/>

			{showPassword ? (
				<FiEyeOff
					className="absolute top-3 right-2 cursor-pointer"
					onClick={togglePassword}
				/>
			) : (
				<RxEyeOpen
					className="absolute top-3 right-2 cursor-pointer"
					onClick={togglePassword}
				/>
			)}
		</div>
		{
			(() => {
				const formValidation = formData.name !== "" && formData.email !== "" && formData.password !== "" && formData.password.length >= 5;
				return <button className={`py-2 rounded-lg transition ${formValidation ? "bg-[#1d4919] text-white  hover:bg-[#163a14] transition cursor-pointer" :
					"bg-gray-300 text-black  hover:bg-gray-200 disabled  "}`}>
					{loading ?<p className="w-full px-40"><AiOutlineLoading3Quarters className="h-4 w-4 animate-spin "  /></p>:<p>Create Account</p>}
				</button>
			})()
		}


		<div className="flex items-baseline  justify-center gap-2  text-stone-600 test-sm mt-2 w-full   px-2">
			<hr className="text-black w-full  h-2 "/>
			<p className="font-bold">OR</p>
			<hr className="text-black  w-full h-2"/>
		</div>
	</form>
	<button className="w-full flex items-center justify-center gap-4 border border-gray-300 hover:bg-gray-100 mt-2 py-2 rounded-xl text-gray-700 font-medium transition-all duration-200 cursor-pointer" onClick={()=>signIn("google",{redirectTo:'/'})}>
		<p><FcGoogle className="text-xl"/></p>
		<p>Continue with Google</p>
	</button>

	<p className="text-gray-600 -mt-2 text-sm flex items-center gap-1 cursor-pointer justify-center " >Already
		have an account
		? <MdLogin className="text-sm font-semibold w-4 h-3 text-blue-500"/>
		<span className="text-sm font-semibold text-blue-500" onClick={()=>router.push('/login')}>SignIn</span>
	</p>

</div>



	</div>

	)
}

export default RegisterForm
