import connectDB from "@/lib/Database";
import User from "@/models/user.model";
import {auth} from "@/auth"
import {redirect} from "next/navigation";
import EditMobileRole from "@/COMPONENTS/EditMobile&Role";
import Navbar from "@/COMPONENTS/Navbar";

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
		</>
	);
}

export default Home;