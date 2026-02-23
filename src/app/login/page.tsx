
"use client";

import React, { useState } from "react";
import { RxEyeOpen } from "react-icons/rx";
import { FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { SiGnuprivacyguard } from "react-icons/si";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

function LoginForm() {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState(false);

	const router = useRouter();
	const session = useSession();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const togglePassword = () => setShowPassword((prev) => !prev);

	async function handleLogin(e: React.FormEvent) {
		e.preventDefault();
		setLoading(true);

		const result = await signIn("credentials", {
			email: formData.email,
			password: formData.password,
			redirect: false,
		});

		setLoading(false);

		if (result?.error) {
			console.log("Login failed:", result.error);
			return;
		}

		router.push("/");
	}

	const formValid =
		formData.email !== "" && formData.password.length >= 5;

	return (
		<div className="min-h-screen flex flex-col items-center space-y-10 p-24 w-full">
			<div className="h-100 flex  flex-col gap-4 md:w-96 w-84 p-6 bg-white rounded-xl shadow">
				<form onSubmit={handleLogin} className="flex flex-col ">
					<h2 className="text-2xl font-bold mb-4 pacifico text-gray-700">
						Login to <span>Carryo</span>
					</h2>

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

					<button
						disabled={!formValid || loading}
						className={`py-2 rounded-lg transition ${
							formValid
								? "bg-[#1d4919] text-white hover:bg-[#163a14]"
								: "bg-gray-300 text-black cursor-not-allowed"
						}`}
					>
						{loading ? (
							<AiOutlineLoading3Quarters className="h-4 w-4 animate-spin mx-auto" />
						) : (
							"Sign In"
						)}
					</button>


				</form>
				<div className="flex items-baseline justify-center gap-2 text-stone-600 text-sm mt-2 w-full right-[0.6px] px-2">
					<hr className="text-black w-full h-2" />
					<p className="font-bold">OR</p>
					<hr className="text-black w-full h-2" />
				</div>

				<button
					className="w-full flex items-center justify-center gap-4 border border-gray-300 hover:bg-gray-100 mt-2 py-2 rounded-xl text-gray-700 font-medium transition-all duration-200 cursor-pointer"
					onClick={() => signIn("google", { callbackUrl: "/" })}
				>
					<FcGoogle className="text-xl" />
					<p>Sign In with Google</p>
				</button>

				<p className="text-gray-400 mt-1 text-sm flex items-center gap-1 cursor-pointer justify-center">
					Do not have an account?
					<SiGnuprivacyguard className="text-sm font-bold w-4 h-4 text-blue-400" />
					<span
						className="text-sm font-semibold text-blue-400"
						onClick={() => router.push("/register")}
					>
            Signup
          </span>
				</p>
			</div>
		</div>
	);
}

export default LoginForm;