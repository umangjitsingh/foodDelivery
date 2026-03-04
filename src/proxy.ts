import {NextRequest, NextResponse} from "next/server";
import {auth} from "@/auth";

export async function proxy(req: NextRequest) {
	const {pathname} = req.nextUrl;

	const publicRoutes = ["/login", "/register", "/api/auth"];
	if (publicRoutes.some((path) => pathname.startsWith(path))) {
		return NextResponse.next()
	}

	const session = await auth();
	if (!session) {

		const loginUrl = new URL("/login", req.url);
		loginUrl.searchParams.set("callbackUrl", req.url)

		return NextResponse.redirect(loginUrl)
	}
	const role = session?.user?.role;
	if (pathname.startsWith('/user') && role !== "User") {
			return NextResponse.redirect(new URL('/unauthorized',req.url))
	}

	if (pathname.startsWith('/admin') && role !== "Admin") {
		return NextResponse.redirect(new URL('/unauthorized',req.url))
	}

	if (pathname.startsWith('/delivery') && role !== "Delivery Boy") {
		return NextResponse.redirect(new URL('/unauthorized',req.url))
	}
	return NextResponse.next();

}

export const config = {
	matcher:
		'/((?!api|_next/static|_next/image|.*\\.png$|.*\\.jpg$).*)',

};