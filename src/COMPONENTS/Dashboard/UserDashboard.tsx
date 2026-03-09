import React from 'react'
import HeroUser from "@/COMPONENTS/Dashboard/Hero/HeroUser";
import CategorySlider from "@/COMPONENTS/CategorySlider";
import GroceryItemCard from "@/COMPONENTS/GroceryItemCard";
import Grocery from "@/models/grocery.model";
import connectDB from "@/lib/Database";

export interface IGrocery {
		_id: string;
		name: string;
		price: string;
		unit: string;
		image: string;
		category: string;
}

async function getGroceries() {
		await connectDB();
		const groceries = await Grocery.find({});
		const plainGroceries = JSON.parse(JSON.stringify(groceries));
		return plainGroceries as IGrocery[];
}

export default async function UserDashboard() {
		const groceries = await getGroceries();

		return (
			<>
					<HeroUser/>
					<CategorySlider/>
					<div className="mt-12  mx-14">
							<h2 className="text-white font-semibold text-xl text-center border-t border-t-gray-800 pt-8">Popular Grocery
									Items</h2>
							<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
									{groceries.map((item, index) => (
										<GroceryItemCard key={index} item={item}/>
									))}
							</div>
					</div>

			</>
		);
}

// make it a server component - better performance lai