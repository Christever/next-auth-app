import { toast } from "react-toastify";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/app/db/firebaseConfig";
import { useRouter } from "next/navigation";
import Link from "next/link";

const formSchema = z
    .object({
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
        confirmPassword: z.string().min(6, {
            message: "Le mot de passe doit contenir au minimum 6 catractères.",
        }),
    })
    .refine(
        ({ confirmPassword, password }) => {
            return confirmPassword === password;
        },
        {
            message: "Les mots de passe ne correspondent pas",
            path: ["confirmPassword"],
        }
    );

async function addUserToFirestore(userId, email) {
    try {
        const userRef = doc(db, "users", userId);
        await setDoc(userRef, {
            email: email,
        });
    } catch (error) {
        console.error(error);
    }
}

export default function FormRegister() {
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
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                values.email,
                values.password
            );
            const user = userCredential.user;
            await addUserToFirestore(user.uid, values.email);
            toast.success("Compte crée avec succes");
            router.push("/dashboard");
        } catch (error) {
            toast.error(error.message);
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

                <label className="text-slate-900">Confirmer mot de passe</label>
                <input
                    type="password"
                    {...register("confirmPassword")}
                    className="h-10 border border-slate-900 rounded p-4"
                />
                {errors.confirmPassword && (
                    <p className="text-red-500">
                        {errors.confirmPassword.message}
                    </p>
                )}

                <button
                    type="submit"
                    className="bg-gray-600 px-3 py-1.5 text-white my-3 rounded hover:bg-gray-700 duration-150"
                >
                    Inscription
                </button>

                <Link
                    href={"/login"}
                    className="text-red-500 hover:text-red-900"
                >
                    Déjà un compte ? Connectez-vous
                </Link>
            </form>
        </>
    );
}
