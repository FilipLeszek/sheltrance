import { PrismaClient } from "@prisma/client";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { comparePasswords } from "@/lib/passwd-utils";

export const authOptions: NextAuthOptions = {
  secret: "halo",
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
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
        if (!credentials) throw Error("Credentials are undefined.");

        const prisma = new PrismaClient();
        const foundUser = await prisma.appUser.findFirst({
          where: {
            email: credentials.email,
          },
        });
        if (!foundUser) throw Error("User with given email not found.");

        const isSamePass = comparePasswords(
          credentials.password,
          foundUser.password
        );

        if (isSamePass) {
          return {
            email: foundUser.email,
            role: foundUser.role,
            shelterId: foundUser.shelterId,
          }; // Return the user object
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
  },
};

export default NextAuth(authOptions);
