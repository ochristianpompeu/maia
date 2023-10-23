import type { Account, NextAuthOptions, Profile, User } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { connectMongoDB } from "./mongodb";
import Usuario from "@/models/usuario";

interface SignInProps {
  user: User | undefined;
  account: Account | null;
  profile?: Profile | undefined;
  email?: any;
}

// Define authentication options using NextAuthOptions interface
export const authOptions: NextAuthOptions = {
  // Customize authentication pages
  pages: {
    signIn: "/login", // Redirect users to "/login" when signing in
  },
  // Configure session management
  session: {
    strategy: "jwt", // Use JSON Web Tokens (JWT) for session management
  },
  // added secret key
  secret: process.env.NEXTAUTH_SECRET,
  // Configure authentication providers
  providers: [
    GoogleProvider({
      // Configure Google authentication provider with environment variables
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GitHubProvider({
      // Configure GitHub authentication provider with environment variables
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    // CredentialsProvider({}), // Include a Credentials provider (username/password)
  ],
  callbacks: {
    async signIn({ user, email, account, profile }: SignInProps | any) {
      if (account.provider === "google") {
        await connectMongoDB();
        const usuarioExiste = await Usuario.findOne({ email: user.email });

        try {
          if (!usuarioExiste) {
            const response = await fetch("http://localhost:3000/api/usuario", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: user.email,
                nome: user.name,
                usuario: user.email,
              }),
            });

            if (response.ok) {
              return user;
            }
          }
        } catch (error) {
          console.log("Erro ao persistir os dados:", error);
        }
      }

      return user;
    },
  },
};
