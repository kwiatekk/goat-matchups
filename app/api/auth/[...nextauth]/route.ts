import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { kv } from '@vercel/kv'
import { compare } from 'bcryptjs'

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await kv.get(`user:${credentials.email}`) as { id: string, email: string, name: string, hashedPassword: string } | null
        if (!user || !user.hashedPassword) {
          return null
        }

        const isValid = await compare(credentials.password, user.hashedPassword)
        if (!isValid) {
          return null
        }

        return { id: user.id, email: user.email, name: user.name }
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user = {
          ...session.user,
          id: token.id as string
        } as {
          id: string;
          name?: string | null;
          email?: string | null;
          image?: string | null;
        }
      }
      return session
    },
  },
})

export { handler as GET, handler as POST }