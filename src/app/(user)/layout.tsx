'use client'
import Header from "@/components/ui/Header";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import Slider from "./home/components/Home";
import Footer from "@/components/ui/Footer";

const navItems = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Introduce", path: "/introduce" },
    { name: "Contact", path: "/contact" },
];

export default function Layout({ children }: any) {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className="flex flex-col min-h-screen">
            {/* Header */}
            <Header />
            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden bg-white shadow-md p-4 space-y-3">
                    {navItems.map((item) => (
                        <a key={item.name} href={item.path} className="block text-gray-700 hover:text-blue-600">
                            {item.name}
                        </a>
                    ))}
                </div>
            )}

            {/* Main Content */}
            <main className="flex-1 p-4 bg-gray-50">{children}</main>

            {/* footer */}
            <Footer />
        </div>
    );
}
