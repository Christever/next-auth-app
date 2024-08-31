import { collection, addDoc } from "firebase/firestore";
import { NextResponse } from "next/server";
import { db } from "@/app/db/firebaseConfig";
import bcrypt from "bcrypt";

export async function POST(request) {
    try {
        const { email, password } = await request.json();
        const hashedPassword = await bcrypt.hash(password, 10);
        const userCollection = collection(db, "users");
        const userRef = await addDoc(userCollection, {
            email: email,
            password: hashedPassword,
        });
        return NextResponse.json({
            success: "Compte ajouté",
            userID: userRef.id,
        });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
