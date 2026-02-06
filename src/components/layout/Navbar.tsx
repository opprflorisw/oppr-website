"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CaretDown,
  List,
  X,
  Factory,
  Buildings,
  ChartLineUp,
  Notebook,
  Robot,
  FileText,
  GearSix,
  BookOpen,
  ChatCircleDots,
  ChartBar,
  Lightbulb,
} from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";

const dropdownIcons: Record<string, Icon> = {
  "/solutions/sme": Factory,
  "/solutions/enterprise": Buildings,
  "/solutions/consultants": ChartLineUp,
  "/how-it-works": GearSix,
  "/how-it-works#logs": Notebook,
  "/how-it-works#ida": Robot,
  "/how-it-works#docs": FileText,
  "/examples": BookOpen,
  "/blog": ChatCircleDots,
  "/faq": Lightbulb,
  "/operational-intelligence-matrix": ChartBar,
};

import { OpprLogo } from "@/components/icons/OpprLogo";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { navLinks } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { EASE_SNAP } from "@/lib/animations";

export function Navbar() {
  const scrolled = useScrollPosition(50);
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "glass-heavy shadow-elevated border-b border-white/20"
          : "bg-transparent"
      )}
    >
      <div className="container-wide flex items-center justify-between h-[72px]">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0 group focus-ring rounded-lg">
          <OpprLogo className="h-8 w-auto transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(30,58,95,0.3)]" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const isHighlighted = "highlighted" in link && link.highlighted;
            const badge = "badge" in link ? (link as { badge?: string }).badge : undefined;

            return link.dropdown ? (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => setOpenDropdown(link.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={link.href}
                  className={cn(
                    "flex items-center gap-1 px-4 py-2 text-[0.925rem] font-medium rounded-lg transition-colors relative focus-ring",
                    pathname.startsWith(link.href)
                      ? "text-oppr-primary"
                      : "text-text-secondary hover:text-oppr-primary hover:bg-bg-subtle"
                  )}
                >
                  {link.label}
                  <CaretDown
                    size={14}
                    weight="bold"
                    className={cn(
                      "transition-transform duration-200",
                      openDropdown === link.label && "rotate-180"
                    )}
                  />
                  {pathname.startsWith(link.href) && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-oppr-primary rounded-full"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </Link>

                <AnimatePresence>
                  {openDropdown === link.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.2, ease: EASE_SNAP }}
                      className="absolute top-full left-0 mt-1 w-[280px] py-2 bg-white rounded-xl shadow-elevated border border-border-light"
                    >
                      {link.dropdown.map((item) => {
                        const DropdownIcon = dropdownIcons[item.href];
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-text-secondary hover:text-oppr-primary hover:bg-oppr-primary/5 transition-all rounded-lg mx-1 focus-ring"
                          >
                            {DropdownIcon && (
                              <DropdownIcon
                                size={18}
                                weight="duotone"
                                className="text-oppr-primary/60 flex-shrink-0"
                              />
                            )}
                            {item.label}
                          </Link>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  "px-4 py-2 text-[0.925rem] font-medium rounded-lg transition-colors relative focus-ring",
                  isHighlighted && "text-oppr-secondary font-semibold",
                  !isHighlighted && pathname === link.href && "text-oppr-primary",
                  !isHighlighted &&
                    pathname !== link.href &&
                    "text-text-secondary hover:text-oppr-primary hover:bg-bg-subtle"
                )}
              >
                <span className="flex items-center gap-1.5">
                  {link.label}
                  {badge && (
                    <span className="px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-oppr-secondary/10 text-oppr-secondary rounded-full">
                      {badge}
                    </span>
                  )}
                </span>
                {pathname === link.href && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute bottom-0 left-2 right-2 h-0.5 bg-oppr-primary rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Desktop CTAs — Dual-path */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/insights/contact"
            className="px-5 py-2.5 text-sm font-semibold text-oppr-secondary border-2 border-oppr-secondary/30 rounded-lg hover:border-oppr-secondary hover:bg-oppr-secondary/5 transition-all hover:-translate-y-0.5 hover:shadow-glow-orange focus-ring"
          >
            Start with Insights
          </Link>
          <Link
            href="/demo"
            className="px-5 py-2.5 text-sm font-semibold text-white bg-oppr-primary border-2 border-oppr-primary rounded-lg hover:bg-oppr-dark hover:border-oppr-dark transition-all hover:-translate-y-0.5 hover:shadow-glow-primary focus-ring"
          >
            Book a Demo
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 text-text-primary focus-ring rounded-lg"
          aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
        >
          {mobileOpen ? <X size={24} weight="bold" /> : <List size={24} weight="bold" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: EASE_SNAP }}
            className="lg:hidden overflow-hidden glass-heavy border-t border-white/20"
          >
            <div className="container-wide py-6 flex flex-col gap-2">
              {navLinks.map((link) => {
                const isHighlighted = "highlighted" in link && link.highlighted;
                const badge = "badge" in link ? (link as { badge?: string }).badge : undefined;

                return (
                  <div key={link.label}>
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "block px-4 py-3 text-base font-medium rounded-lg transition-colors",
                        isHighlighted
                          ? "text-oppr-secondary font-semibold"
                          : "text-text-secondary hover:text-oppr-primary hover:bg-bg-light"
                      )}
                    >
                      <span className="flex items-center gap-2">
                        {link.label}
                        {badge && (
                          <span className="px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-oppr-secondary/10 text-oppr-secondary rounded-full">
                            {badge}
                          </span>
                        )}
                      </span>
                    </Link>
                    {link.dropdown && (
                      <div className="pl-6">
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setMobileOpen(false)}
                            className="block px-4 py-2 text-sm text-text-muted hover:text-oppr-primary transition-colors"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
              <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-border-light">
                <Link
                  href="/insights/contact"
                  onClick={() => setMobileOpen(false)}
                  className="text-center px-5 py-3 text-sm font-semibold text-oppr-secondary border-2 border-oppr-secondary/30 rounded-lg"
                >
                  Start with Insights
                </Link>
                <Link
                  href="/demo"
                  onClick={() => setMobileOpen(false)}
                  className="text-center px-5 py-3 text-sm font-semibold text-white bg-oppr-primary rounded-lg"
                >
                  Book a Demo
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
