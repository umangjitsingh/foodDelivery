import connectDB from "@/lib/Database";
import User from "@/models/user.model";
import {auth} from "@/auth"
import {redirect} from "next/navigation";
import EditMobileRole from "@/COMPONENTS/EditMobile&Role";
import Navbar from "@/COMPONENTS/Navbar";
import UserDashboard
	from "@/COMPONENTS/Dashboard/UserDashboard";
import DeliveryDashboard
	from "@/COMPONENTS/Dashboard/DeliveryDashboard";
import AdminDashboard
	from "@/COMPONENTS/Dashboard/AdminDashboard";

async function Home() {

	await connectDB();
	const session = await auth();

	const user = await User.findOne({_id: session?.user?.id})
	if (!user) {
		redirect('/login');
	}
	if (!user.role || !user.mobile || (!user.mobile && user.role == "role")) {
		return <EditMobileRole/>
	}
const plainUser=JSON.parse(JSON.stringify(user))
	return (
		< >


			<Navbar user={plainUser}/>
			{user.role == "User" ? (
				<UserDashboard/>
			):user.role == "Delivery Boy" ? (
				<DeliveryDashboard/>
			):<AdminDashboard/>}
		</>
	);
}

export default Home;