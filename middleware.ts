import { withAuth } from "next-auth/middleware"

export default withAuth(
  function middleware(req) {
    // Lógica adicional si es necesaria
    signIn: '/auth/signin',
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    },
  }
)

export const config = {
//  matcher: ["/dashboard/:path*", "/profile/:path*"]
   matcher: ["/dashboard"]
}
