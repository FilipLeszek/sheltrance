import { PrismaClient } from "@prisma/client";
import NextAuth, {NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  secret: "halo",
      session: {
  strategy: "jwt",
  },
  pages: {
    signIn: "/login"
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      // @ts-ignore
      authorize: async (credentials, _req) => {
        const prisma = new PrismaClient();
        const user = await prisma.appUser.findFirst({
          where: {
            email: credentials?.email
          },
        });
        if (user?.password === credentials?.password) {
          return { email: user?.email, role: user?.role, shelterId: user?.shelterId }; // Return the user object
        }
        return null;
      },
    }),
  ],
  callbacks: {
  async jwt({ token, user }) {
    /* Step 1: update the token based on the user object */
    if (user) {
      token.role = user.role;
      token.shelterId = user.shelterId;
    }
    return token;
  },
  session({ session, token }) {
    /* Step 2: update the session.user based on the token object */
    if (token && session.user) {
      session.user.role = token.role;
      session.user.shelterId = token.shelterId;
    }
    return session;
  },
}
}

export default NextAuth(authOptions)
