import mongoose from "mongoose";

interface UserInterface {
    _id?:mongoose.Types.ObjectId
    name:string,
    email:string,
    password?:string,
    image?:string,
    mobile?:string,
    role?:'User' | 'Delivery Boy' | 'Admin',
    createdAt?:string,
    updatedAt?:string
}

const UserSchema=new mongoose.Schema<UserInterface>({
    name:{
        type:String,
        required:true,
        maxLength:40,
        minLength:4
    },
    email:{
        type:String,
        required:[true,'Email is required'],
        unique:true,
        validate:{
            validator:function(value){
                return /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(value);
            },
            message:(props)=>`${props.value} is not a valid emailId!`
        }
    },
    password:{
        type:String,

    },
    image:{
        type:String
    },
    mobile:{
        type:String,
    },
    role:{
        type:String,
        enum:["User","Delivery Boy","Admin"],
        default:"User"
    }
},{timestamps:true});

const User = mongoose.models.User || mongoose.model("User",UserSchema);

export default User;
