import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface User {
    id: number;
    role?: Role;
    shelterId: number;
  }

  interface Session extends DefaultSession {
    user?: User;
  }
}

export enum Role {
  user = "user",
  admin = "admin",
  manager = "manager"
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: Role;
    shelterId: number;
  }
}