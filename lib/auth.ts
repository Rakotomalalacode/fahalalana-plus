//auth.ts

import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import GitHubProvider from "next-auth/providers/github"
import bcrypt from "bcryptjs"
import { NextAuthOptions } from "next-auth";
import { PrismaClient } from "@prisma/client"


const prisma = new PrismaClient()

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        })

        if (!user || !user.hashedPassword) {
          return null
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        )

        if (!isPasswordValid) {
          return null
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        }
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    })
  ],
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signup",
    //signUp: "/auth/signup",
  },
  callbacks: {
  async signIn({ user, account, profile }) {
    if (account?.provider === "github" || account?.provider === "google") {
      const existingUser = await prisma.user.findUnique({
        where: {
          email: user.email ?? undefined,
        },
      })

      if (existingUser) {
        // Vérifie si ce compte est déjà lié
        const linkedAccount = await prisma.account.findUnique({
          where: {
            provider_providerAccountId: {
              provider: account.provider,
              providerAccountId: account.providerAccountId,
            },
          },
        })

        // Si le compte n'est pas encore lié
        if (!linkedAccount) {
          await prisma.account.create({
            data: {
              userId: existingUser.id,
              provider: account.provider,
              providerAccountId: account.providerAccountId,
              type: account.type,
              access_token: account.access_token,
              token_type: account.token_type,
              scope: account.scope,
              id_token: account.id_token,
              refresh_token: account.refresh_token,
              expires_at: account.expires_at,
              session_state: account.session_state,
            },
          })
        }
      }
    }

    return true // Toujours autoriser le sign in
  },

async jwt({ token, user }) {
  if (user) {
    token.id = user.id
    token.image = user.image
token.role = user.role
    // Récupère les infos complètes de l'utilisateur depuis la DB
    const dbUser = await prisma.user.findUnique({
      where: { email: user.email || undefined },
    })

    token.role = dbUser?.role
  }

  return token
},
redirect({ url, baseUrl }) {
  if (url.startsWith("/")) return `${baseUrl}${url}`
  else if (url.startsWith(baseUrl)) return url
  return baseUrl
}

,

async session({ session, token }) {
  if (token) {
    session.user.id = token.id as string
    session.user.role = token.role as string
    session.user.image = token.image
  }
  return session
}

}

// callbacks volohany

  // callbacks: {
  //   async jwt({ token, user }) {
  //     if (user) {
  //       token.id = user.id
  //     }
  //     return token
  //   },
  //   async session({ session, token }) {
  //     if (token) {
  //       session.user.id = token.id as string
  //     }
  //     return session
  //   }
  // }
}
