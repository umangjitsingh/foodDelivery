import {NextRequest, NextResponse} from "next/server";
import connectDB from "@/lib/Database";
import User from "@/models/user.model";
import {auth} from "@/auth";

export async function POST(req:NextRequest){
	try{
		await connectDB();
		const {role,mobile}=await req.json();
		const session=await auth();
		const user=await User.findOneAndUpdate({email:session?.user?.email},
			{role,mobile},{ new: true }
		)
		if(!user){
			return NextResponse.json({
				message:"user not found"
			},{status:400})
		}
		return NextResponse.json({
			user
		},{status:200})
	}catch (e) {
		return NextResponse.json({
			message:`edit Role and Mobile error : ${e}`
		},{status:500})
	}
}