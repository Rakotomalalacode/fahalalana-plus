import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token

    // Si l'utilisateur n'est pas authentifié
    if (!token) {
      const callbackUrl = req.nextUrl.pathname
      return NextResponse.redirect(
        new URL(`/auth/signin?callbackUrl=${encodeURIComponent(callbackUrl)}`, req.url)
      )
    }

    // Sinon, on continue normalement
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: () => true // Toujours true, car on gère l'autorisation nous-mêmes dans le handler ci-dessus
    },
  }
)

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*"]
}
