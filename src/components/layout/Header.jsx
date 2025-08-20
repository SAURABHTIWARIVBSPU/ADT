"use client"

import React, { useEffect, useId, useMemo, useRef, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react"

const MENU = [
  { key: "certifications", label: "Certifications", icon: "🎓", path: "/certifications" },
  { key: "triangle", label: "Triangle Escapes", icon: "▲", path: "#triangle-section", mobileOnly: true },
  { key: "support", label: "Support", icon: "🛟", path: "#support" },
  { key: "aboutus", label: "About Us", icon: "🏢", path: "/about" },
  {
    key: "about",
    label: "About Company",
    icon: "🏢",
    dropdown: [
      {
        title: "ABOUT",
        links: [
          { label: "About Company", path: "/about" },
          { label: "Newsroom", path: "/newsroom" },
          { label: "Pricing", path: "/pricing" },
        ],
      },
      {
        title: "WORK WITH US",
        links: [
          { label: "Careers", path: "/careers" },
          { label: "Diversity", path: "/diversity" },
          { label: "Our Partner", path: "/partners" },
        ],
      },
      {
        title: "CONTACT",
        links: [
          { label: "Contact Sales", path: "/contact-sales" },
          { label: "Contact Support", path: "/contact-support" },
        ],
      },
    ],
  },
  { key: "blogs", label: "Blogs", icon: "📝", path: "/blogs" },
]

export default function Header() {
  const prefersReducedMotion = useReducedMotion()
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openKey, setOpenKey] = useState(null)       // which dropdown is open
  const [hoverKey, setHoverKey] = useState(null)     // hover underline
  const [scrolled, setScrolled] = useState(false)    // shadow on scroll
  const navId = useId()
  const dropdownRef = useRef(null)

  // close menus when route changes
  useEffect(() => {
    setMobileOpen(false)
    setOpenKey(null)
    setHoverKey(null)
  }, [location.pathname, location.hash])

  // sticky header shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // keyboard: close dropdown with ESC / Tab-out
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setOpenKey(null)
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [])

  const isActive = (path) =>
    path && path !== "#" && path !== "#support" && location.pathname.startsWith(path)

  const ddVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: prefersReducedMotion ? 0 : -8, scale: prefersReducedMotion ? 1 : 0.98 },
      show: {
        opacity: 1,
        y: prefersReducedMotion ? 0 : 8,
        scale: 1,
        transition: { duration: prefersReducedMotion ? 0 : 0.18, ease: "easeOut" },
      },
      exit: {
        opacity: 0,
        y: prefersReducedMotion ? 0 : -6,
        scale: prefersReducedMotion ? 1 : 0.98,
        transition: { duration: prefersReducedMotion ? 0 : 0.12, ease: "easeIn" },
      },
    }),
    [prefersReducedMotion]
  )

  return (
    <header className={`sticky top-0 z-[80] ${scrolled ? "shadow-[0_6px_24px_rgba(0,0,0,.25)]" : ""}`}>
      {/* Skip link for accessibility */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:z-[999] bg-black text-white px-3 py-1 rounded"
      >
        Skip to content
      </a>

      {/* animated top runner */}
      <div className="relative">
        <div className="absolute inset-x-0 -top-px h-[2px] overflow-hidden pointer-events-none select-none">
          <motion.div
            className="h-full w-1/3 bg-gradient-to-r from-transparent via-white to-transparent"
            animate={prefersReducedMotion ? {} : { x: ["-33%", "133%"] }}
            transition={{ duration: 5.5, repeat: prefersReducedMotion ? 0 : Infinity, ease: "linear" }}
          />
        </div>

        {/* glass background */}
        <div
          className={`
            border-b ${scrolled ? "border-white/20" : "border-white/10"}
            bg-[#0B0F1A]/70 supports-[backdrop-filter]:bg-[#0B0F1A]/45 backdrop-blur-2xl
          `}
          style={{
            backgroundImage:
              "radial-gradient(1200px 900px at 0% 0%, rgba(99,102,241,.22), transparent 60%), radial-gradient(1200px 900px at 100% 0%, rgba(34,211,238,.18), transparent 60%), linear-gradient(90deg, rgba(255,255,255,.04), rgba(255,255,255,.04))",
            backgroundSize: "cover, cover, 200% 200%",
            animation: prefersReducedMotion ? undefined : "gradientShift 22s ease infinite",
          }}
        >
          {/* util animations */}
          <style>{`
            @keyframes gradientShift {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
            @keyframes glowPulse {
              0% { opacity:.35; filter:blur(10px); }
              50% { opacity:.7; filter:blur(16px); }
              100% { opacity:.35; filter:blur(10px); }
            }
          `}</style>

          <nav
            id={navId}
            className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 text-white"
            aria-label="Primary"
          >
            <div className="flex items-center justify-between gap-4">
              {/* Brand */}
              <Link to="/" className="flex items-center gap-3 group">
                <div className="relative">
                  {!prefersReducedMotion && (
                    <motion.div
                      className="absolute inset-0 -m-[6px] rounded-2xl"
                      style={{
                        background:
                          "conic-gradient(from 0deg, rgba(34,211,238,.5), rgba(99,102,241,.5), rgba(236,72,153,.5), rgba(34,211,238,.5))",
                        filter: "blur(10px)",
                      }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
                      aria-hidden="true"
                    />
                  )}
                  <div className="relative h-10 w-10 rounded-2xl bg-gradient-to-br from-cyan-400 to-indigo-600 shadow-lg ring-1 ring-white/10 flex items-center justify-center">
                    <img src="/logo1.svg" alt="Adventure Triangle logo" className="w-10 h-10" />
                  </div>
                </div>
                <span className="text-base sm:text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80 group-hover:opacity-90 transition-opacity">
                  ADVENTURE TRIANGLE
                </span>
              </Link>

              {/* Desktop nav */}
              <div className="hidden md:flex items-center gap-6">
                <ul className="flex items-center gap-6 font-semibold">
                  {MENU.filter((m) => !m.mobileOnly).map((item) => {
                    const active = isActive(item.path)
                    return (
                      <li
                        key={item.key}
                        className="relative group"
                        onMouseEnter={() => {
                          setHoverKey(item.key)
                          if (item.dropdown) setOpenKey(item.key)
                        }}
                        onMouseLeave={() => {
                          setHoverKey(null)
                          if (item.dropdown) setOpenKey(null)
                        }}
                      >
                        {!item.dropdown ? (
                          <>
                            <Link
                              to={item.path}
                              className={`flex items-center gap-1 py-2 transition-colors ${
                                active ? "text-white" : "text-white/90 hover:text-white"
                              }`}
                              aria-current={active ? "page" : undefined}
                            >
                              <span className="hidden sm:inline">{item.icon}</span>
                              <span>{item.label}</span>
                            </Link>
                            <AnimatePresence>
                              {hoverKey === item.key && (
                                <motion.span
                                  layoutId="nav-underline"
                                  className="absolute left-2 right-2 -bottom-1 h-[2px] rounded-full bg-gradient-to-r from-white/0 via-white to-white/0"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                  transition={{ duration: prefersReducedMotion ? 0 : 0.15 }}
                                />
                              )}
                            </AnimatePresence>
                          </>
                        ) : (
                          <>
                            <button
                              type="button"
                              className={`flex items-center gap-1 py-2 transition-colors ${
                                openKey === item.key || hoverKey === item.key
                                  ? "text-white"
                                  : "text-white/90 hover:text-white"
                              }`}
                              aria-haspopup="true"
                              aria-expanded={openKey === item.key}
                              onClick={() => setOpenKey(openKey === item.key ? null : item.key)}
                            >
                              <span className="hidden sm:inline">{item.icon}</span>
                              <span>{item.label}</span>
                              <ChevronDown className="h-4 w-4 opacity-70" />
                            </button>

                            <AnimatePresence>
                              {hoverKey === item.key && (
                                <motion.span
                                  layoutId="nav-underline"
                                  className="absolute left-2 right-2 -bottom-1 h-[2px] rounded-full bg-gradient-to-r from-white/0 via-white to-white/0"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                  transition={{ duration: prefersReducedMotion ? 0 : 0.15 }}
                                />
                              )}
                            </AnimatePresence>

                            <AnimatePresence>
                              {openKey === item.key && (
                                <motion.div
                                  variants={ddVariants}
                                  initial="hidden"
                                  animate="show"
                                  exit="exit"
                                  className="absolute top-full left-1/2 -translate-x-1/2 z-50"
                                  ref={dropdownRef}
                                >
                                  <div className="relative p-[1.5px] rounded-2xl">
                                    {!prefersReducedMotion && (
                                      <motion.div
                                        className="pointer-events-none absolute inset-0 -m-8"
                                        style={{
                                          background:
                                            "conic-gradient(from 0deg, rgba(34,211,238,.6), rgba(99,102,241,.6), rgba(236,72,153,.6), rgba(34,211,238,.6))",
                                        }}
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                      />
                                    )}
                                    <div
                                      className="relative w-[360px] rounded-2xl bg-[#0D1220]/95 backdrop-blur-xl border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,.45)] p-6 grid grid-cols-3 gap-4 text-sm text-white"
                                      role="menu"
                                      aria-label={`${item.label} menu`}
                                    >
                                      {item.dropdown.map((section) => (
                                        <div key={section.title}>
                                          <h4 className="font-bold mb-2 text-white/80 tracking-wide">{section.title}</h4>
                                          <ul className="space-y-1.5">
                                            {section.links.map((link) => {
                                              const activeChild = isActive(link.path)
                                              return (
                                                <li key={link.label}>
                                                  <Link
                                                    to={link.path}
                                                    className={`group flex items-center justify-between py-1.5 px-2 rounded-md transition-colors ${
                                                      activeChild
                                                        ? "bg-white/10 text-white"
                                                        : "hover:bg-white/5 text-white/90 hover:text-white"
                                                    }`}
                                                    onClick={() => setOpenKey(null)}
                                                    role="menuitem"
                                                  >
                                                    <span>{link.label}</span>
                                                    <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition" />
                                                  </Link>
                                                </li>
                                              )
                                            })}
                                          </ul>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </>
                        )}
                      </li>
                    )
                  })}
                </ul>

                {/* Booking CTA */}
                <motion.div whileHover={{ y: prefersReducedMotion ? 0 : -1 }} whileTap={{ scale: prefersReducedMotion ? 1 : 0.98 }}>
                  <Link
                    to="/booking"
                    className="relative inline-flex items-center justify-center px-5 py-2 rounded-full font-bold text-white"
                  >
                    <span className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-pink-500" />
                    {!prefersReducedMotion && (
                      <span
                        className="absolute -inset-[2px] rounded-full opacity-60 animate-[glowPulse_3s_ease-in-out_infinite]"
                        style={{
                          background:
                            "conic-gradient(from 0deg, rgba(34,211,238,.45), rgba(99,102,241,.45), rgba(236,72,153,.45), rgba(34,211,238,.45))",
                          filter: "blur(12px)",
                        }}
                        aria-hidden="true"
                      />
                    )}
                    <span className="relative">Booking</span>
                  </Link>
                </motion.div>
              </div>

              {/* Mobile controls */}
              <div className="md:hidden flex items-center">
                <Link
                  to="/booking"
                  className="mr-3 px-4 py-1.5 rounded-full font-bold text-white bg-gradient-to-r from-cyan-500 via-indigo-500 to-pink-500 shadow hover:opacity-95 transition"
                >
                  Book
                </Link>
                <button
                  onClick={() => setMobileOpen((v) => !v)}
                  className="text-white p-2 rounded-lg bg-white/10 hover:bg-white/20 transition"
                  aria-label="Toggle menu"
                  aria-expanded={mobileOpen}
                  aria-controls={`${navId}-mobile`}
                >
                  {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </div>
            </div>

            {/* Mobile menu */}
            <AnimatePresence>
              {mobileOpen && (
                <motion.div
                  id={`${navId}-mobile`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.25, ease: "easeInOut" }}
                  className="md:hidden overflow-hidden"
                >
                  <div className="py-3">
                    <ul className="space-y-2">
                      {MENU.map((item) => (
                        <li key={item.key}>
                          {!item.dropdown ? (
                            <Link
                              to={item.path}
                              className={`block py-2 px-4 font-semibold rounded-lg bg-white/5 hover:bg-white/10 transition ${
                                isActive(item.path) ? "text-white" : "text-white/90 hover:text-white"
                              }`}
                              onClick={() => setMobileOpen(false)}
                            >
                              <span className="mr-2">{item.icon}</span>
                              {item.label}
                            </Link>
                          ) : (
                            <details className="group">
                              <summary
                                className="flex items-center justify-between w-full list-none cursor-pointer py-2 px-4 font-semibold rounded-lg bg-white/5 hover:bg-white/10 text-white/90 hover:text-white transition"
                                onClick={(e) => e.preventDefault()}
                                onMouseDown={(e) => e.preventDefault()}
                              >
                                <span className="flex items-center gap-2">
                                  <span>{item.icon}</span>
                                  {item.label}
                                </span>
                                <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
                              </summary>
                              <div className="pl-6 py-3 space-y-3">
                                {item.dropdown.map((section) => (
                                  <div key={section.title}>
                                    <h4 className="font-bold mb-1 text-white/80 text-sm">{section.title}</h4>
                                    <ul className="space-y-1">
                                      {section.links.map((link) => (
                                        <li key={link.label}>
                                          <Link
                                            to={link.path}
                                            className={`block py-1.5 px-2 rounded-md transition text-sm ${
                                              isActive(link.path) ? "bg-white/10 text-white" : "hover:bg-white/5 text-white/90 hover:text-white"
                                            }`}
                                            onClick={() => setMobileOpen(false)}
                                          >
                                            {link.label}
                                          </Link>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                ))}
                              </div>
                            </details>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </nav>
        </div>

        {/* bottom runner */}
        <div className="absolute inset-x-0 -bottom-[2px] h-[2px] overflow-hidden pointer-events-none select-none">
          <motion.div
            className="h-full w-1/3 bg-gradient-to-r from-transparent via-white to-transparent"
            animate={prefersReducedMotion ? {} : { x: ["-33%", "133%"] }}
            transition={{ duration: 6, repeat: prefersReducedMotion ? 0 : Infinity, ease: "linear" }}
          />
        </div>
      </div>
    </header>
  )
}
