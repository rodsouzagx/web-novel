"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { signOut } from "@/lib/supabase/actions";
import type { User } from "@supabase/supabase-js";

const links = [
  { href: "/pt", label: "início" },
  { href: "/pt/capitulos", label: "capítulos" },
  { href: "/pt/noticias", label: "notícias" },
  { href: "/pt/universo", label: "universo" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [showMenu, setShowMenu] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

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

          {user ? (
            <div className="relative ml-2">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-medium"
              >
                {user.email?.[0].toUpperCase()}
              </button>
              {showMenu && (
                <div className="absolute right-0 top-9 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-lg py-1 w-40">
                  <p className="text-xs text-zinc-500 px-3 py-1.5 truncate">{user.email}</p>
                  <hr className="border-zinc-100 dark:border-zinc-800 my-1" />
                  <form action={signOut}>
                    <button className="w-full text-left text-xs text-red-500 px-3 py-1.5 hover:bg-zinc-50 dark:hover:bg-zinc-800">
                      sair
                    </button>
                  </form>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/pt/login"
              className="ml-2 text-xs bg-indigo-600 text-white px-3 py-1.5 rounded-md"
            >
              entrar
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
