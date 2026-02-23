import {NextRequest, NextResponse} from "next/server";
import connectDB from "@/lib/Database";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
    await connectDB();
    try {
        const {name, email, password} = await req.json();
        if (!name || !email || !password) {
            return NextResponse.json(
                {"message": "Please enter all the required fields"},
                {status: 400}
            )
        }
        const isExistingUser= await User.findOne({email});
        if(isExistingUser){
            return NextResponse.json(
                {"message": "User already present with this email."},
                {status: 400}
            )
        }
        const hashedPassword=await  bcrypt.hash(password,10);
        const user=await User.create({
            name,email,password:hashedPassword
        })
return NextResponse.json(
    user,
    {status: 201}
)
    } catch (error) {
        console.error("Error:", error);

        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }

}