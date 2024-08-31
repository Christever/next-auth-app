"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { IoIosLogOut } from "react-icons/io";
import Image from "next/image";

export default function Dasboard() {
    const router = useRouter();
    const { data: session } = useSession();
    console.log(session);

    return (
        <>
            {session ? (
                <>
                    <div className="mt-6 flex flex-col gap-5 items-center justify-center">
                        <h1 className="text-center text-4xl mt-6">
                            Bienvenue <b>{session?.user?.name}</b>
                        </h1>
                        <Image
                            src={session?.user?.image}
                            width={100}
                            height={100}
                            alt={session?.user?.name}
                            className="rounded-full"
                        />
                        <b>{session?.user?.email}</b>
                        <button
                            onClick={() => signOut()}
                            className="
                            flex gap-2 items-center
                            bg-gray-300 p-2 rounded-3xl
                            hover:bg-gray-400 duration-150
                            "
                        >
                            <IoIosLogOut />
                            <span>Déconnextion</span>
                        </button>
                    </div>
                </>
            ) : (
                router.push("/login")
            )}
        </>
    );
}
