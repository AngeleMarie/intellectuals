"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Import usePathname from next/navigation
import { GoDotFill } from "react-icons/go";

interface NavLinkProps {
    href: string;
    children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children }) => {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <Link href={href} legacyBehavior>
            <a
                className={`px-4 py-3 ${
                    isActive ? " text-submain" : "text-main"
                } `}
            >
                {children}
            </a>
        </Link>
    );
};
export default function Navbar() {
    return (
        <main className="h-full bg-#D9F3E6">
            <div className="flex justify-center my-5">
                <Image alt="logo" src="/RMC.png" width={100} height={100} />
            </div>
            <div className="font-semibold text-xl  text-center py-3 text-main">
                Let's get you started!
            </div>
            <div className=" font-bold px-auto text-xl font-mono text-center">
                MUSLIM INTELLECTUAL PORTAL
            </div>
            <div className="parent-nav">
                <div>
                    <GoDotFill className="dot" />
                   <NavLink href="/">General Information</NavLink>
                </div>
                <div>
                    <GoDotFill className="dot" />
                    <NavLink href="/education">Education Background</NavLink>
                </div>
                <div>
                    <GoDotFill className="dot" />
                    <NavLink href="/professional">
                        Proffessional Credentials
                    </NavLink>
                </div>
            </div>
        </main>
    );
}
