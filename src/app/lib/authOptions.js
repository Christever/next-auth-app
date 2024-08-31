import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { auth } from "../db/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

export const authOptions = {
    providers: [
        GithubProvider({
            clientID: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "email", type: "email" },
                password: { label: "password", type: "password" },
            },
            async authorize(credentials, res) {
                if (!credentials) {
                    return null;
                }
                try {
                    const userCredentials = await signInWithEmailAndPassword(
                        auth,
                        credentials.email,
                        credentials.password
                    );
                    const user = userCredentials.user;
                    if (user) {
                        return {
                            id: user.uid,
                            email: user.email,
                        };
                    } else {
                        return null;
                    }
                } catch (error) {
                    console.error(error.message);
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        jwt: async ({ user, token, trigger, session }) => {
            if (trigger === "update") {
                return { ...token, ...session.user };
            }
            return { ...token, ...user };
        },
    },
};
