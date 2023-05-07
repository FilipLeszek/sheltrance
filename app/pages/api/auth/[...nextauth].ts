import { PrismaClient } from "@prisma/client";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
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
      async authorize(credentials) {
        const prisma = new PrismaClient();

        const foundUser = await prisma.user.findFirstOrThrow({
          where: {
            email: {
              equals: credentials?.email,
            },
            password: {
              equals: credentials?.password,
            },
          },
        });

        return { name: foundUser.email };
      },
    }),
  ],
});
