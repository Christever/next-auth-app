import Link from "next/link";
import { FaHome } from "react-icons/fa";
import { MdArticle, MdDashboard, MdSupervisedUserCircle } from "react-icons/md";
import { TfiInfo } from "react-icons/tfi";

export default function Header() {
    const menuNav = [
        { name: "Home", icone: FaHome, path: "/" },
        { name: "Blog", icone: MdArticle, path: "/blog" },
        { name: "Dashboard", icone: MdDashboard, path: "/dashboard" },
        { name: "About", icone: TfiInfo, path: "/about" },
    ];
    return (
        <nav className="bg-gray-600 py-5 shadow-md shadow-black ">
            <div className="flex justify-between w-[1200px] mx-auto text-gray-300">
                <ul className="flex items-center gap-5 ">
                    {menuNav.map((item) => (
                        <li key={item.name}>
                            <Link
                                href={item.path}
                                className=" flex gap-1 items-center hover:text-orange-400 duration-150"
                            >
                                <item.icone /> <span>{item.name}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
                <Link
                    href={"/login"}
                    className="
                        text-gray-200 
                        bg-gray-500 
                        h-8 w-8 
                        flex items-center justify-center 
                        hover:bg-gray-700 duration-150 
                        rounded-full"
                >
                    <MdSupervisedUserCircle />
                </Link>
            </div>
        </nav>
    );
}
