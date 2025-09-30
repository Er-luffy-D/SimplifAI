import Link from "next/link";
import { X } from "lucide-react";
import { useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { Logo } from "@/components/logo";

export default function MobileMenu({ onClose }: { onClose: () => void }) {
  const { data: session } = useSession();

  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => document.body.classList.remove("overflow-hidden");
  }, []);

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Pricing", href: "/pricing" },
  ];

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/30 z-40"
        onClick={onClose}
        aria-label="Close menu overlay"
      />
      {/* Toast-like popup menu */}
      <div className="fixed top-4 left-4 z-50">
        <div className="bg-gray-950/95 border border-gray-800 shadow-2xl rounded-2xl w-72 max-w-[90vw] p-0 animate-fade-in">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-800">
            <Logo showText={true} size="sm" href="/" />
            <button
              aria-label="Close Menu"
              className="text-purple-400 hover:text-pink-400 transition"
              onClick={onClose}
            >
              <X className="w-7 h-7" />
            </button>
          </div>
          <ul className="flex flex-col px-5 py-4 gap-2">
            {menuItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block py-3 px-3 rounded-lg text-lg font-medium text-gray-200 hover:bg-purple-700/20 hover:text-purple-300 transition"
                  onClick={onClose}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              {session ? (
                <button
                  className="block w-full text-left py-3 px-3 rounded-lg text-lg font-medium text-gray-200 hover:bg-purple-700/20 hover:text-purple-300 transition"
                  onClick={() => {
                    signOut();
                    onClose();
                  }}
                >
                  Log out
                </button>
              ) : (
                <Link
                  href="/signin"
                  className="block py-3 px-3 rounded-lg text-lg font-medium text-gray-200 hover:bg-purple-700/20 hover:text-purple-300 transition"
                  onClick={onClose}
                >
                  Sign In
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
      {/* Simple fade-in animation */}
      <style>{`
		@keyframes fade-in {
		  from { opacity: 0; transform: translateY(-20px);}
		  to { opacity: 1; transform: none;}
		}
		.animate-fade-in {
		  animation: fade-in 0.18s cubic-bezier(.4,0,.2,1);
		}
	  `}</style>
    </>
  );
}
