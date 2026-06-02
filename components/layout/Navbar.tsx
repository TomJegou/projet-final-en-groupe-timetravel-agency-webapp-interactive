"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/#destinations", label: "Destinations" },
  { href: "/#agence", label: "L'agence" },
  { href: "/reservation", label: "Réserver" },
];

export function Navbar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 80], [0, 1]);
  const blur = useTransform(scrollY, [0, 80], [0, 20]);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className="fixed inset-x-0 top-0 z-40"
    >
      <motion.div
        style={{
          backgroundColor: useTransform(
            opacity,
            (v) => `rgba(11, 9, 7, ${v * 0.7})`,
          ),
          backdropFilter: useTransform(blur, (v) => `blur(${v}px)`),
        }}
        className={cn(
          "transition-[border-color] duration-500",
          scrolled
            ? "border-b border-gold/10"
            : "border-b border-transparent",
        )}
      >
        <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 sm:px-10">
          <Link
            href="/"
            className="group flex items-center gap-3"
            aria-label="TimeTravel Agency, retour à l'accueil"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/30 transition-colors group-hover:border-gold">
              <span className="font-serif text-lg italic text-gold">T</span>
            </span>
            <span className="hidden flex-col leading-tight sm:flex">
              <span className="text-[10px] uppercase tracking-[0.4em] text-ivory-mute">
                TimeTravel
              </span>
              <span className="font-serif text-sm tracking-wider text-ivory">
                Agency
              </span>
            </span>
          </Link>

          <ul className="hidden items-center gap-10 md:flex">
            {links.map((link) => {
              const isActive =
                link.href === pathname ||
                (link.href.startsWith("/#") && pathname === "/");
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "link-underline text-[11px] uppercase tracking-[0.3em] transition-colors",
                      isActive ? "text-gold" : "text-ivory-dim hover:text-ivory",
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <Link
            href="/reservation"
            className="hidden rounded-full border border-gold/40 px-5 py-2 text-[10px] uppercase tracking-[0.3em] text-gold transition-all duration-500 hover:border-gold hover:bg-gold/10 md:inline-flex"
          >
            Réserver un voyage
          </Link>

          <Link
            href="/reservation"
            className="rounded-full border border-gold/40 px-4 py-2 text-[10px] uppercase tracking-[0.3em] text-gold md:hidden"
          >
            Réserver
          </Link>
        </nav>
      </motion.div>
    </motion.header>
  );
}
