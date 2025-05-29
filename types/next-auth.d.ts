import NextAuth from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      role?: string
      image?: string
      name?: string
      email?: string
    }
  }

  interface User {
    id: string
    role?: string
    image?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    role?: string
    image?: string
  }
}




// declare module "next-auth" {
//   interface Session {
//     user: {
//       id: string
//       email: string
//       name?: string | null
//       image?: string | null
//     }
//   }

//   interface User {
//     id: string
//     email: string
//     name?: string | null
//     image?: string | null
//   }
// }

// declare module "next-auth/jwt" {
//   interface JWT {
//     id: string
//   }
// }