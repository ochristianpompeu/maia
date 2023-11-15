import { Routes } from "@/lib/Links";
import { User as UserModel } from "@/models/user";
import bcrypt from "bcryptjs";
import type {
  Account,
  NextAuthOptions,
  User as NextUser,
  Profile,
} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { connectMongoDB } from "./mongodb";

interface SignInProps {
  user: NextUser | undefined;
  account: Account | null;
  profile?: Profile | undefined;
  email?: any;
}

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: Routes.home.link,
    signOut: Routes.home.link,
  },
  session: {
    strategy: "jwt", // Use JSON Web Tokens (JWT) for session management
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        try {
          await connectMongoDB();
          const user = await UserModel.findOne({
            email: email,
          });

          if (!user) {
            return null;
          }

          const passwordMatches = await bcrypt.compare(password, user.password);

          if (!passwordMatches) {
            return null;
          }

          return user;
        } catch (error) {
          console.log("Ocorreu um erro: ", error);
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, email, account, profile }: SignInProps | any) {
      const baseUrl = process.env.BASE_URL as string;
      if (account.provider === "google") {
        await connectMongoDB();
        const userExists = await UserModel.findOne({ email: user.email });

        try {
          if (!userExists) {
            const response = await fetch(baseUrl + Routes.user.create.link, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: user.email,
                name: user.name,
                user: user.email,
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
    jwt({ token, trigger, session }) {
      if (trigger === "update" && session?.name) {
        // Note, that `session` can be any arbitrary object, remember to validate it!
        token.name = session.name;
      }
      return token;
    },
  },
};
