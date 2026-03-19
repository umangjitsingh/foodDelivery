import {NextRequest, NextResponse} from "next/server";
import connectDB from "@/lib/Database";
import User from "@/models/user.model";
import Order from "@/models/order.model";

export async function POST(req: NextRequest) {
		try {
				await connectDB();

				const {userId, items, totalAmount, address} = await req.json();
				console.log("data from BE", userId, items, totalAmount, address)
				if(!userId || !items || !totalAmount || !address){
						return NextResponse.json(
							{message:"missing credentials",userId, items, totalAmount, address},
							{status:400}
						)
				}
				const user = await User.findById(userId);
				if(!user){
						return NextResponse.json(
							{message:"user not found"},
							{status:400}
						)
				}

				await Order.create({
						user:userId,
						items,
						totalAmount,
						address
				})
				return NextResponse.json(
					{message:Order},
					{status:201}
				)
		} catch (e) {
				return NextResponse.json(
					{message:`place order error, ${e} `},
					{status:500}
				)
		}
}