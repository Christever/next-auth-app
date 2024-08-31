import { toast } from "react-toastify";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const formSchema = z.object({
    email: z
        .string()
        .min(1, {
            message: "Ce champs est requis",
        })
        .email("Format non valide")
        .max(150, {
            message: "Votre mail doit contenir au maximum 150 catactères",
        }),
    password: z.string().min(6, {
        message: "Le mot de passe doit contenir au minimum 6 catractères.",
    }),
});

export default function FormLogin() {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    async function onSubmit(values) {
        try {
            const response = await signIn("credentials", {
                email: values.email,
                password: values.password,
                redirect: false,
            });

            if (!response?.error) {
                router.push("/dashboard");
                toast.success("Vous etes connecté");
            } else {
                toast.error("Impossible de vous connecter");
            }
        } catch (error) {
            toast.error("error.message");
        }
    }

    return (
        <>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="mt-5 max-w-[800px] flex flex-col gap-2 bg-slate-50 p-5 rounded-md shadow-md"
            >
                <label htmlFor="Email" className="text-slate-900">
                    Email
                </label>
                <input
                    type="email"
                    {...register("email")}
                    className="h-10 border border-slate-900 p-4 rounded-sm"
                />
                {errors.email && (
                    <p className="text-red-500">{errors.email.message}</p>
                )}
                <label className="text-slate-900">Mot de passe</label>
                <input
                    type="password"
                    {...register("password")}
                    className="h-10 border border-slate-900 rounded p-4"
                />
                {errors.password && (
                    <p className="text-red-500">{errors.password.message}</p>
                )}

                <button
                    type="submit"
                    className="bg-gray-600 px-3 py-1.5 text-white my-3 rounded hover:bg-gray-700 duration-150"
                >
                    Connexion
                </button>

                <Link
                    href={"/register"}
                    className="text-red-500 hover:text-red-900"
                >
                    Pas de compte? Inscrivez-vous maintenant
                </Link>
            </form>
        </>
    );
}
