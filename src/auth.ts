import NextAuth from "next-auth"
import connectDB from "@/lib/Database";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import Credentials from "@auth/core/providers/credentials";
import Google from "@auth/core/providers/google";

export const {handlers, signIn, signOut, auth} = NextAuth({
	providers: [
		Credentials({
			credentials: {
				email: {type: "email", label: "Email"},
				password: {type: "password", label: "Password"},
			},

			async authorize(credentials) {
				await connectDB();

				const {email, password} = credentials;

				const user = await User.findOne({email});
				if (!user) throw new Error("User does not exist.");

				const isMatch = bcrypt.compare(password as string, user.password);
				if (!isMatch) throw new Error("Please check your password");

				return {
					id: user._id.toString(),
					email: user.email,
					name: user.name,
					role: user.role,
				};
			},
		}),
		Google({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET
		})
	],

	callbacks: {
		async signIn({user, account}) {
			if (account?.provider == "google") {
				await connectDB();
				let dbUser = await User.findOne({email: user.email})

				if (!dbUser) {
					dbUser = await User.create({
						name: user.name,
						email: user.email,
						image: user.image
					})
				}
				user.id=dbUser._id.toString();
				user.role=dbUser.role
			}
			return true
		}
		,
		async jwt({token, user}) {
			if (user) {
				token.id = user.id;
				token.name = user.name;
				token.email = user.email;
				token.role = user.role;
			}
			return token;
		},

		async session({session, token}) {
			if (session.user) {
				session.user.id = token.id as string;
				session.user.name = token.name as string;
				session.user.email = token.email as string;
				session.user.role = token.role as string;
			}
			return session;
		},
	},

	pages: {
		signIn: "/login",
		error: "/login"
	},

	session: {
		strategy: "jwt",
		maxAge: 30 * 24 * 60 * 60
	},

	secret: process.env.AUTH_SECRET
});