import {NextRequest, NextResponse} from "next/server";
import connectDB from "@/lib/Database";
import {auth} from "@/auth";
import User from "@/models/user.model";

export async function GET(req:NextRequest){
				await connectDB();
				try{
						const session=await auth()		;
						if(!session || !session.user){
										return NextResponse.json(
											{message:"user not authenticated"},
											{status:400}
										)
						}
						const user=await User.findOne({email:session.user.email}).select("-password");
						if(!user){
										return NextResponse.json(
											{message:"user not found"},
											{status:400}
										)
						}
								return NextResponse.json(
									user,
									{status:200}
								)
				}catch (e) {
								return NextResponse.json(
									{message:`get me error ${e}`},
									{status:500}
								)
				}
}