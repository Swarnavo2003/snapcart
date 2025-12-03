"use client";
import {
  LogOut,
  Package,
  Search,
  ShoppingCart,
  User,
  XCircle,
} from "lucide-react";
import mongoose from "mongoose";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { signOut } from "next-auth/react";

interface IUser {
  _id?: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password?: string;
  mobile?: string;
  role: "user" | "deliveryBoy" | "admin";
  image?: string;
}

export function Navbar({ user }: { user: IUser }) {
  const [open, setOpen] = useState(false);
  const [searchBarOpen, setSearchBarOpen] = useState(false);
  const profileDropDown = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        profileDropDown.current &&
        !profileDropDown.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="w-[95%] fixed top-4 left-1/2 -translate-x-1/2 bg-linear-to-r from-green-500 to-green-700 rounded-xl shadow-lg shadow-black/30 flex justify-between items-center h-20 px-4 md:px-8 z-50"
    >
      <Link
        href={"/"}
        className="text-white font-extrabold text-2xl sm:text-3xl tracking-wide hover:scale-105 transition-transform"
      >
        Snapcart
      </Link>

      <form className="hidden md:flex items-center bg-white rounded-full px-4 py-2 w-1/2 max-w-lg shadow-md">
        <Search className="text-gray-500 w-5 h-5 mr-2" />
        <input
          type="text"
          placeholder="Search groceries..."
          className="w-full outline-none text-grey-700 placeholder-gray-400"
        />
      </form>

      <div className="flex items-center gap-3 md:gap-6 relative">
        <div
          onClick={() => setSearchBarOpen((prev) => !prev)}
          className="bg-white rounded-full w-11 h-11 flex items-center justify-center shadow-md hover:scale-105 transition md:hidden cursor-pointer"
        >
          <Search className="text-gray-500 w-5 h-5" />
        </div>

        <Link
          href={""}
          className="relative bg-white rounded-full w-11 h-11 flex items-center justify-center shadow-sm hover:scale-105 transition"
        >
          <ShoppingCart className="text-green-600 w-6 h-6" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-semibold shadow">
            0
          </span>
        </Link>

        <div className="relative" ref={profileDropDown}>
          <div
            onClick={() => setOpen((prev) => !prev)}
            className="bg-white rounded-full w-11 h-11 flex items-center justify-center shadow overflow-hidden hover:scale-105 transition-transform cursor-pointer"
          >
            {user.image ? (
              <Image
                src={user.image}
                alt="user"
                fill
                className="object-cover rounded-full"
              />
            ) : (
              <User />
            )}
          </div>
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-3 w-50 bg-white rounded-xl shadow-xl border border-gray-200 p-3 z-10"
              >
                <div className="flex items-center gap-3 py-2 border-b border-gray-200">
                  <div className="relative w-12 h-9 rounded-full bg-green-100 flex items-center justify-center overflow-hidden">
                    {user.image ? (
                      <Image
                        src={user.image}
                        alt="user"
                        fill
                        className="object-cover rounded-full"
                      />
                    ) : (
                      <User />
                    )}
                  </div>
                  <div>
                    <p className="text-gray-800 font-semibold">{user.name}</p>
                    <p className="text-xs text-gray-500 capitalize">
                      {user.role}
                    </p>
                  </div>
                </div>

                <Link
                  href={""}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 px-3 py-3 hover:bg-green-50 rounded-lg text-gray-700 font-medium"
                >
                  <Package className="w-5 h-5 text-green-600" />
                  <span>My Orders</span>
                </Link>

                <button
                  onClick={() => {
                    setOpen(false);
                    signOut({ callbackUrl: "/login" });
                  }}
                  className="flex items-center gap-2 w-full text-left px-3 py-3 hover:bg-red-50 rounded-lg text-gray-700 font-medium cursor-pointer"
                >
                  <LogOut className="w-5 h-5 text-red-600" />
                  Log Out
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {searchBarOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.2 }}
                className="fixed top-25 left-1/2 -translate-x-1/2 w-[90%] bg-white rounded-full shadow-lg z-40 flex items-center px-4 py-3"
              >
                <Search className="text-gray-500 w-5 h-5 mr-2" />
                <form className="grow">
                  <input
                    type="text"
                    placeholder="Search groceries..."
                    className="w-full outline-none text-gray-700 placeholder-gray-400"
                  />
                </form>
                <button onClick={() => setSearchBarOpen(false)}>
                  <XCircle className="text-gray-500 w-5 h-5" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
