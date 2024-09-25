import NextAuth, { AuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"

const authOptions: AuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (credentials?.username === "admin" && credentials?.password === "password") {
          return { id: "1", name: "Admin" }
        }
        return null
      }
    })
  ],
  pages: {
    signIn: '/auth/signin',
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }