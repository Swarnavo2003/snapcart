"use client";
import {
  Boxes,
  ClipboardCheck,
  LogOut,
  Menu,
  Package,
  PlusCircle,
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
import { createPortal } from "react-dom";

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
  const [menuOpen, setMenuOpen] = useState(false);

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

  const sideBar = menuOpen
    ? createPortal(
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="fixed top-0 left-0 w-[75%] h-full z-9999 bg-linear-to-b from-green-800/90 via-green-700/80 to-green-900/90 backdrop-blur-xl border-r border-green-400/20 shadow-[0_0_50px_-10px_rgba(0,255,100,0.3)] flex flex-col p-6 text-white"
          >
            <div className="flex justify-between items-center mb-2">
              <h1 className="font-extrabold text-2xl tracking-wide text-white/90">
                Admin Panel
              </h1>
              <button
                onClick={() => setMenuOpen(false)}
                className="text-white/80 hover:text-red-400 text-2xl font-bold transition-all cursor-pointer"
              >
                <XCircle />
              </button>
            </div>
            <div className="mt-3 flex items-center gap-3 p-3 rounded-xl bg-white/10 hover:bg-white/15 transition-all shadow-inner cursor-pointer">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-green-400/60 shadow-lg">
                {user.image ? (
                  <Image
                    src={user.image}
                    fill
                    alt="user"
                    className="object-cover rounded-full"
                  />
                ) : (
                  <User className="w-10 h-10" />
                )}
              </div>
              <div>
                <h1 className="text-lg font-semibold text-white">
                  {user.name}
                </h1>
                <p className="text-xs text-green-200 capitalize tracking-wide">
                  {user.role}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 font-medium mt-6">
              <Link
                href={""}
                className="flex items-center gap-3 p-3 rounded-lg bg-white/10 hover:bg-white/20 hover:pl-4 transition-all"
              >
                <PlusCircle className="w-5 h-5" />
                Add Grocery
              </Link>
              <Link
                href={""}
                className="flex items-center gap-3 p-3 rounded-lg bg-white/10 hover:bg-white/20 hover:pl-4 transition-all"
              >
                <Boxes className="w-5 h-5" />
                View Grocery
              </Link>
              <Link
                href={""}
                className="flex items-center gap-3 p-3 rounded-lg bg-white/10 hover:bg-white/20 hover:pl-4 transition-all"
              >
                <ClipboardCheck className="w-5 h-5" />
                Manage Orders
              </Link>
            </div>

            <div className="my-5 border-t border-white/20"></div>
            <div
              onClick={async () => await signOut({ callbackUrl: "/" })}
              className="flex items-center gap-3 text-red-300 font-semibold mt-auto hover:bg-red-500/20 p-3 rounded-lg transition-all cursor-pointer"
            >
              <LogOut className="w-5 h-5 text-red-300" />
              Logout
            </div>
          </motion.div>
        </AnimatePresence>,
        document.body
      )
    : null;
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

      {user.role == "user" && (
        <form className="hidden md:flex items-center bg-white rounded-full px-4 py-2 w-1/2 max-w-lg shadow-md">
          <Search className="text-gray-500 w-5 h-5 mr-2" />
          <input
            type="text"
            placeholder="Search groceries..."
            className="w-full outline-none text-grey-700 placeholder-gray-400"
          />
        </form>
      )}

      <div className="flex items-center gap-3 md:gap-6 relative">
        {user.role == "user" && (
          <>
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
          </>
        )}

        {user.role == "admin" && (
          <>
            <div className="hidden md:flex items-center gap-4">
              <Link
                href={""}
                className="flex items-center gap-2 bg-white text-green-700 font-semibold px-4 py-2 rounded-lg hover:bg-green-100 transition-all"
              >
                <PlusCircle className="text-green-700 w-5 h-5" />
                Add Grocery
              </Link>
              <Link
                href={""}
                className="flex items-center gap-2 bg-white text-green-700 font-semibold px-4 py-2 rounded-lg hover:bg-green-100 transition-all"
              >
                <Boxes className="text-green-700 w-5 h-5" />
                View Grocery
              </Link>
              <Link
                href={""}
                className="flex items-center gap-2 bg-white text-green-700 font-semibold px-4 py-2 rounded-lg hover:bg-green-100 transition-all"
              >
                <ClipboardCheck className="text-green-700 w-5 h-5" />
                Manage Orders
              </Link>
            </div>

            <div
              onClick={() => setMenuOpen((prev) => !prev)}
              className="md:hidden bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md"
            >
              <Menu className="text-green-500 w-6 h-6" />
            </div>
          </>
        )}

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

                {user.role == "user" && (
                  <Link
                    href={""}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 px-3 py-3 hover:bg-green-50 rounded-lg text-gray-700 font-medium"
                  >
                    <Package className="w-5 h-5 text-green-600" />
                    <span>My Orders</span>
                  </Link>
                )}

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
      {sideBar}
    </motion.div>
  );
}
