"use client";

import { FaGithub } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";

import { signIn } from "next-auth/react";

import React from "react";

export default function ButtonsProviders() {
    return (
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
    );
}
