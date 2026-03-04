"use client";

import useSWR from "swr";
import axios from "axios";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { setUserData } from "@/redux/userSlice";
import { useEffect } from "react";

const fetcher = (url: string) => axios.get(url).then(res => res.data);

export default function useGetMe() {
		const dispatch = useDispatch<AppDispatch>();

		const { data, error, isLoading } = useSWR("/api/me", fetcher, {
				revalidateOnFocus: true,
		});

		useEffect(() => {
				if (data) {
						dispatch(setUserData(data));
				}
		}, [data, dispatch]);

		return { data, error, isLoading };
}