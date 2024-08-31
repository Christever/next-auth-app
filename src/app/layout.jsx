import Footer from "../components/Footer";
import Header from "../components/Navigation";
import "./styles/globals.css";
import SessionWrapper from "../components/SeesionWrapper";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({ children }) {
    return (
        <SessionWrapper>
            <html lang="fr">
                <body className="flex flex-col h-screen">
                    <Header />
                    <ToastContainer position="bottom-right" theme="colored" />
                    <div className="flex-1 w-[1200px] mx-auto mt-6">
                        {children}
                    </div>
                    <Footer />
                </body>
            </html>
        </SessionWrapper>
    );
}
