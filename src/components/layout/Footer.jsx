"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import { toast, Toaster } from "react-hot-toast"
import { motion } from "framer-motion"
import {
  Facebook,
  Instagram,
  Youtube,
  Building2,
  Mountain,
  Headphones,
  MapPin,
  Phone,
  Mail,
  ExternalLink,
  ChevronRight,
} from "lucide-react"

const Footer = () => {
  const [subscriberEmail, setSubscriberEmail] = useState("")

  const handleSubscribe = async () => {
    if (!subscriberEmail) {
      toast.error("Please enter your email.")
      return
    }
    try {
      const res = await axios.post("http://localhost:5000/api/subscribe", {
        email: subscriberEmail,
      })
      if (res.status === 200) {
        toast.success("Thanks for subscribing us!")
        setSubscriberEmail("") // reset input
      }
    } catch (err) {
      toast.error("Something went wrong. Try again.")
      console.error(err)
    }
  }

  const colVariant = {
    hidden: { opacity: 0, y: 10 },
    show: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.05 * i, duration: 0.35, ease: "easeOut" },
    }),
  }

  const linkHover = {
    rest: { x: 0, opacity: 0.75 },
    hover: { x: 4, opacity: 1 },
  }

  return (
    <footer className="relative overflow-hidden text-gray-200">
      {/* Animated runners and ambient background */}
      <style>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

      {/* Aurora blobs */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full blur-3xl"
        style={{
          background: "radial-gradient(500px 500px at 100% 0%, rgba(99,102,241,.25), rgba(255,255,255,0))",
        }}
        animate={{ x: [0, 20, -10, 0], y: [0, -10, 15, 0] }}
        transition={{ duration: 18, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full blur-3xl"
        style={{
          background: "radial-gradient(500px 500px at 0% 100%, rgba(56,189,248,.22), rgba(255,255,255,0))",
        }}
        animate={{ x: [0, -20, 10, 0], y: [0, 15, -10, 0] }}
        transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />

      {/* Moving top runner */}
      <div className="absolute left-0 right-0 -top-px h-[2px] overflow-hidden">
        <motion.div
          className="h-full w-1/3 bg-gradient-to-r from-transparent via-amber-400 to-transparent"
          animate={{ x: ["-33%", "133%"] }}
          transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
      </div>

      {/* Gradient base */}
      <div
        className="relative z-10 bg-gradient-to-b from-gray-900 via-[#0e1220] to-gray-900"
        style={{
          backgroundSize: "200% 200%",
          animation: "gradientShift 16s ease infinite",
        }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-16 py-14 border-t border-white/10">
          {/* Top brand strip */}
          <div className="mb-10">
            <div className="flex items-center gap-3">
              <div className="relative">
                <motion.div
                  className="absolute inset-0 rounded-xl"
                  style={{
                    background: "conic-gradient(from 0deg, #f59e0b, #f43f5e, #8b5cf6, #22d3ee, #f59e0b)",
                    filter: "blur(8px)",
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                />
                <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg ring-1 ring-white/20">
                  <span className="text-black font-extrabold">AT</span>
                </div>
              </div>
              <div>
                <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400">
                  Adventure Triangle
                </h2>
                <p className="text-xs text-gray-400">Creating unforgettable adventure experiences since 2010.</p>
              </div>
            </div>
          </div>

          {/* Main Footer Content */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 md:gap-12"
          >
            {/* Logo/About + Social */}
            <motion.div variants={colVariant} custom={0} className="col-span-2 md:col-span-1">
              <p className="text-gray-400 text-sm mb-5 leading-relaxed">
                Push your limits with our certified guides. Safety-first thrills across Air, Water, and Land.
              </p>

              <div className="flex gap-3">
                {[
                  { Icon: Facebook, href: "#", color: "from-blue-500 to-indigo-500" },
                  { Icon: Instagram, href: "#", color: "from-pink-500 to-rose-500" },
                  { Icon: Youtube, href: "#", color: "from-red-500 to-orange-500" },
                ].map(({ Icon, href, color }, i) => (
                  <motion.a
                    key={i}
                    href={href}
                    whileHover={{ y: -4, rotate: -3, scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className={`group rounded-lg p-2 bg-white/5 hover:bg-white/10 transition shadow-md border border-white/10`}
                    aria-label="Social link"
                  >
                    <div className={`rounded-md p-1.5 bg-gradient-to-br ${color} text-white shadow-inner`}>
                      <Icon className="h-4 w-4" />
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Company */}
            <motion.div variants={colVariant} custom={1}>
              <h3 className="font-bold text-lg mb-4 text-white flex items-center gap-2">
                <span className="w-3 h-3 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full shadow-sm" />
                <Building2 className="h-4 w-4 text-amber-400" />
                Company
              </h3>
              <ul className="space-y-2.5">
                {["About Us", "Careers", "Press", "Contact"].map((item) => (
                  <motion.li key={item} initial="rest" whileHover="hover" animate="rest">
                    <Link
                      to={item === "About Us" ? "/about" : item === "Contact" ? "/contact" : "#"}
                      className="group flex items-center text-gray-400 hover:text-amber-400 transition-all"
                    >
                      <motion.span variants={linkHover} className="inline-flex items-center justify-center w-5">
                        <ChevronRight className="h-4 w-4" />
                      </motion.span>
                      <span>{item}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Adventures */}
            <motion.div variants={colVariant} custom={2}>
              <h3 className="font-bold text-lg mb-4 text-white flex items-center gap-2">
                <span className="w-3 h-3 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full shadow-sm" />
                <Mountain className="h-4 w-4 text-blue-400" />
                Adventures
              </h3>
              <ul className="space-y-2.5">
                {["Air Zone", "Water Zone", "Land Zone", "All Activities"].map((item) => (
                  <motion.li key={item} initial="rest" whileHover="hover" animate="rest">
                    <Link
                      to={item === "All Activities" ? "/booking" : "#"}
                      className="group flex items-center text-gray-400 hover:text-blue-400 transition-all"
                    >
                      <motion.span variants={linkHover} className="inline-flex items-center justify-center w-5">
                        <ChevronRight className="h-4 w-4" />
                      </motion.span>
                      <span>{item}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Support */}
            <motion.div variants={colVariant} custom={3}>
              <h3 className="font-bold text-lg mb-4 text-white flex items-center gap-2">
                <span className="w-3 h-3 bg-gradient-to-r from-purple-400 to-fuchsia-500 rounded-full shadow-sm" />
                <Headphones className="h-4 w-4 text-purple-400" />
                Support
              </h3>
              <ul className="space-y-2.5">
                {["Help Center", "Safety", "FAQs", "Community"].map((item) => (
                  <motion.li key={item} initial="rest" whileHover="hover" animate="rest">
                    <Link to="#" className="group flex items-center text-gray-400 hover:text-purple-400 transition-all">
                      <motion.span variants={linkHover} className="inline-flex items-center justify-center w-5">
                        <ChevronRight className="h-4 w-4" />
                      </motion.span>
                      <span>{item}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Contact */}
            <motion.div variants={colVariant} custom={4}>
              <h3 className="font-bold text-lg mb-4 text-white flex items-center gap-2">
                <span className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full shadow-sm" />
                <MapPin className="h-4 w-4 text-green-400" />
                Contact
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start group">
                  <div className="rounded-lg bg-white/5 p-1.5 border border-white/10 group-hover:bg-green-500/20 transition-all">
                    <Phone className="h-4 w-4 text-gray-300 group-hover:text-green-300" />
                  </div>
                  <a href="tel:9170097576" className="ml-2 mt-0.5 text-gray-400 hover:text-green-400 transition">
                    9170097576
                  </a>
                </li>
                <li className="flex items-start group">
                  <div className="rounded-lg bg-white/5 p-1.5 border border-white/10 group-hover:bg-green-500/20 transition-all">
                    <Mail className="h-4 w-4 text-gray-300 group-hover:text-green-300" />
                  </div>
                  <a
                    href="mailto:info@himrahi.com"
                    className="ml-2 mt-0.5 text-gray-400 hover:text-green-400 transition"
                  >
                    info@himrahi.com
                  </a>
                </li>
                <li className="flex items-start group">
                  <div className="rounded-lg bg-white/5 p-1.5 border border-white/10 group-hover:bg-green-500/20 transition-all">
                    <MapPin className="h-4 w-4 text-gray-300 group-hover:text-green-300" />
                  </div>
                  <span className="ml-2 mt-0.5 text-gray-400">Adventure Triangle Park</span>
                </li>
              </ul>
            </motion.div>
          </motion.div>

          {/* Newsletter Subscription with animated gradient border */}
          <div className="mt-16 mb-12">
            <div className="relative rounded-2xl p-[1.5px] overflow-hidden">
              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-[200%]"
                style={{
                  background: "conic-gradient(from 0deg, #f59e0b, #f43f5e, #8b5cf6, #22d3ee, #f59e0b)",
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              />
              <div className="relative rounded-2xl bg-gradient-to-r from-gray-800 to-gray-700 p-6 border border-white/10 shadow-xl">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold mb-1 text-white">Stay Updated on New Adventures</h3>
                    <p className="text-gray-400 text-sm">Subscribe to get exclusive offers and adventure tips</p>
                  </div>

                  <div className="flex w-full md:w-auto flex-col sm:flex-row gap-3">
                    <motion.input
                      type="email"
                      placeholder="Your email address"
                      value={subscriberEmail}
                      onChange={(e) => setSubscriberEmail(e.target.value)}
                      whileFocus={{ scale: 1.01 }}
                      className="flex-grow px-4 py-3 rounded-lg bg-gray-900/60 border border-white/10 focus:outline-none focus:ring-2 focus:ring-amber-400 text-white placeholder-gray-500 shadow-inner"
                    />
                    <motion.button
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleSubscribe}
                      className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold px-6 py-3 rounded-lg transition-all shadow-lg"
                    >
                      Subscribe
                      <ExternalLink className="h-4 w-4" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="relative my-8">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />
          </div>

          {/* Copyright and Legal */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">© 2025 Himrahi Adventure Triangle. All rights reserved.</p>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {[
                "Privacy Policy",
                "Terms of Service",
                "Cookie Policy",
                "My Bookings",
                "Certifications",
                "Partner",
                "Dashboard",
              ].map((item) => (
                <Link
                  key={item}
                  to={
                    item === "My Bookings"
                      ? "/my-bookings"
                      : item === "Certifications"
                        ? "/certifications"
                        : item === "Partner"
                          ? "/partner"
                          : item === "Dashboard"
                            ? "/dashboard"
                            : "#"
                  }
                  className="text-gray-500 hover:text-amber-400 text-sm transition-all hover:underline"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Toasts */}
      <Toaster position="top-right" />
    </footer>
  )
}

export default Footer