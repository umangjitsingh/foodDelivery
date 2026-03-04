

"use client";

import { useEffect } from "react";
import useGetMe from "@/hooks/useGetMe";
import { useRouter } from "next/navigation";

export default function Me() {
		const router = useRouter();
		const {  error, isLoading } = useGetMe();

		useEffect(() => {
				if (error?.response?.status === 401) {
						router.push("/login");
				}
		}, [error, router]);

		if (isLoading) {
				return (
					<div className="p-4 text-sm text-gray-500">
						Loading user...
				</div>
		);
		}

		if (error && error?.response?.status !== 401) {
				return (
					<div className="p-4 text-red-500 text-sm">
						Failed to load user.
				</div>
		);
		}

		return null;
}