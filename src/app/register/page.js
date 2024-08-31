"use client";

import ButtonsProviders from "../../components/ButtonsProviders";
import FormRegister from "../../components/FormRegister";

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
            <h1 className="text-center text-4xl mt-6">Inscription</h1>
            <div className="text-center">
                <FormRegister />
            </div>
            <ButtonsProviders />
        </div>
    );
}
