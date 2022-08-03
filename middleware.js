import { NextResponse } from "next/server";

const getPersonalizedRoute = (request) => {
    const { nextUrl: {pathname}, cookies } = request

    return new URL(`${pathname}${cookies.get('country')? `-${cookies.get('country')}`:''}`, request.url);
}

export function middleware(request) {
    const { pathname } = request.nextUrl
   
   // Ignore files and API calls
    if (pathname.includes('.') || pathname.startsWith('/api')) {
        return NextResponse.next()
    } // Get the personalized route
    const {cookies} = request
    console.log({request, cookies: cookies.get('country')}, pathname)
    const newRoute = getPersonalizedRoute(request)

   
    if (!newRoute) {
        return
    }

    return NextResponse.rewrite(newRoute)
}

export const config = {
    matcher: '/:path*',
}