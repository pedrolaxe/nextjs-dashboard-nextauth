/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

interface StaticUser {
  username: string;
  password: string;
}

const STATIC_USERS: StaticUser[] = [
  {
    username: "admin",
    password: "api",
  },
  {
    username: "user",
    password: "userpass",
  },
];

const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error("Credentials are required");
        }

        const { username, password } = credentials;

        const user = STATIC_USERS.find(
          (u) => u.username === username && u.password === password
        );

        if (user) {
          return { id: user.username, name: user.username };
        }

        throw new Error("Invalid credentials");
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "credentials") {
        return true;
      }
      return false;
    },
  },
};

const handler = NextAuth(options);

export { handler as GET, handler as POST };
