"use client";
import { FaGithub } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Login() {
    const router = useRouter();
    const { data: session } = useSession();

    useEffect(() => {
        if (session) {
            router.push("/dashboard");
        }
    }, [session, router]);
    return (
        <div
            className="
            flex flex-col 
            mt-10 
            h-3/4 w-[500px] mx-auto 
            justify-center bg-slate-400
            rounded-3xl
            "
        >
            <h1 className="text-center text-4xl mt-6">PAGE LOGIN</h1>
            <div className="flex flex-col gap-5 items-center mt-6">
                <button
                    onClick={() => signIn("google")}
                    className="
                flex items-center gap-2 justify-center
                bg-gray-200
                px-2 py-2
                rounded-xl
                text-center
                w-[300px]
                hover:bg-gray-300
                duration-150
                "
                >
                    <FaGoogle />
                    <span>Se connecter avec Google</span>
                </button>
                <button
                    onClick={() => signIn("github")}
                    className="
                    flex items-center gap-2 justify-center
                    bg-gray-200
                    px-2 py-2
                    rounded-xl
                    text-center
                    w-[300px]
                    hover:bg-gray-300
                    duration-150
                    "
                >
                    <FaGithub />
                    <span>Se connecter avec Github</span>
                </button>
            </div>
        </div>
    );
}
