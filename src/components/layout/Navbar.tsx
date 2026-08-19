"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

const links = [
  { href: "/pt", label: "início" },
  { href: "/pt/capitulos", label: "capítulos" },
  { href: "/pt/noticias", label: "notícias" },
  { href: "/pt/universo", label: "universo" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800">
      <div className="max-w-3xl mx-auto px-5 flex items-center justify-between h-12">
        <Link href="/pt" className="text-sm font-medium tracking-wide">
          EPOPEIA <span className="text-indigo-500">DO FIM</span>
        </Link>
        <div className="flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-xs px-3 py-1.5 rounded-md transition-colors ${
                pathname === link.href
                  ? "bg-indigo-50 dark:bg-indigo-950 text-indigo-600"
                  : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
