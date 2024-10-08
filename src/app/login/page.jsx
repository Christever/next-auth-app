"use client";

import ButtonsProviders from "../../components/ButtonsProviders";
import FormLogin from "../../components/FormLogin";
export default function Login() {
    return (
        <div
            className="
            flex flex-col 
            mt-10 
            h-3/4 w-[500px] mx-auto 
            justify-center 
            rounded-3xl
            "
        >
            <h1 className="text-center text-4xl mt-6">Connexion</h1>
            <div className="text-center">
                <FormLogin />
            </div>
            <ButtonsProviders />
        </div>
    );
}
