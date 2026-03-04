import {NextRequest, NextResponse} from "next/server";
import connectDB from "@/lib/Database";
import {auth} from "@/auth";
import {uploadFileOnCloudinary} from "@/lib/cloudinary";
import Grocery from "@/models/grocery.model";

export async function POST(req: NextRequest) {
	await connectDB();
	try {
		const session = await auth();
		if (session?.user?.role !== "Admin") {
			return NextResponse.json(
				{message: "This Page is for Admin Only."},
				{status: 400}
			)
		}
		const formData = await req.formData();
		const name = formData.get("name") as string;
		const category = formData.get("category") as string;
		const price = formData.get("price") as string;
		const unit = formData.get("unit") as string;
		const file=formData.get("image") as Blob | null;

		let imgUrl;
		if(file){
			imgUrl=await uploadFileOnCloudinary(file)
		}
		const grocery = await Grocery.create({
			name,category,price,unit,image:imgUrl
		})
		return NextResponse.json(
			grocery,
			{status: 200}
		)
	} catch (e) {
		return NextResponse.json(
			{message: `Add grocery error. ${e}`},
			{status: 500}
		)
	}
}