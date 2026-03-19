import mongoose from "mongoose";

interface IOrder{
		_id?:mongoose.Types.ObjectId;
		user:mongoose.Types.ObjectId;
		items:[
				{
						grocery:mongoose.Types.ObjectId,
						name:string,
						price:string,
						unit:string,
						image:string,
						quantity:number
				}
		]
		totalAmount:number,
		address:{
				fullName:string,
				mobile:string,
				city:string,
				state:string,
				pincode:string,
				fullAddress:string,
				latitude:number,
				longitude:number
		}
		status:"pending" | "out for delivery" | "delivered",
		createdAt?:Date,
		updatedAt?:Date
}


const orderSchema =new mongoose.Schema<IOrder>({
		user:{
				type:mongoose.Schema.Types.ObjectId,
				ref:"User",
				required:true
		},
		items:[{
			grocery:{
					type:mongoose.Schema.Types.ObjectId,
					ref:"Grocery",
					required:true
			},
				name:String,
				price:String,
				unit:String,
				image:String,
				quantity:Number

		}],
		totalAmount:{
				type:Number
		},
		address:{
				fullName:{
						type:String,
						required:true
				},
				mobile:{
						type:String,
						required:true
				},
				city:{
						type:String,
						required:true
				},
				state:{
						type:String,
						required:true
				},
				pincode:{
						type:String,
						required:true
				},
				fullAddress:{
						type:String,
						required:true
				},
				latitude:{
						type:Number,
						required:true
				},
				longitude:{
						type:Number,
						required:true
				}
		},
		status:{
				type:String,
				enum:["pending","out for delivery","delivered"]
		}
},{timestamps:true})

const Order= mongoose.models.Order || mongoose.model("Order",orderSchema);
export default Order;