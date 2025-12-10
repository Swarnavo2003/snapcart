"use client";
import { Leaf, ShoppingBasket, Smartphone, Truck } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";

const slides = [
  {
    id: 1,
    icon: (
      <Leaf className="w-20 h-20 sm:w-28 sm:h-28 text-orange-400 drop-shadow-lg" />
    ),
    title: "Fresh Organic Groceries 🥦",
    subtitle:
      "Farm-fresh fruits, vegetables, and daily essentials delivered to your doorstep.",
    btnText: "Shop Now",
    bg: "https://plus.unsplash.com/premium_photo-1663012860167-220d9d9c8aca?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    icon: (
      <Truck className="w-20 h-20 sm:w-28 sm:h-28 text-yellow-400 drop-shadow-lg" />
    ),
    title: "Fast & Reliable Delivery 🚚",
    subtitle:
      "Experience hassle-free delivery with our fast and reliable delivery service.",
    btnText: "Order Now",
    bg: "https://images.unsplash.com/photo-1683553170878-049f180627b0?q=80&w=1025&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    icon: (
      <Smartphone className="w-20 h-20 sm:w-28 sm:h-28 text-blue-400 drop-shadow-lg" />
    ),
    title: "Shop Anywhere, Anytime 📱",
    subtitle:
      "Shop from anywhere, anytime, and get your groceries delivered right to your doorstep.",
    btnText: "Get Started",
    bg: "https://plus.unsplash.com/premium_photo-1663091378026-7bee6e1c7247?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export function HeroSection() {
  const [currrent, setCurrent] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="relative w-[90%] mx-auto mt-32 h-[80vh] rounded-3xl overflow-hidden shadow-xl">
      <AnimatePresence mode="wait">
        <motion.div
          key={currrent}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <Image
            src={slides[currrent].bg}
            fill
            alt="slide"
            priority
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[5px] flex items-center justify-center">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center justify-center gap-4 max-w-4xl"
        >
          <div className="bg-white/10 backdrop-blur-md rounded-full shadow-lg p-6">
            {slides[currrent].icon}
          </div>
          <h1 className="hidden lg:block text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight drop-shadow-lg text-white">
            {slides[currrent].title}
          </h1>
          <p className="hidden lg:block text-lg sm:text-xl text-gray-200 max-w-2xl">
            {slides[currrent].subtitle}
          </p>
          <motion.button
            whileHover={{ scale: 1.09 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.1 }}
            className="mt-4 bg-white text-orange-700 hover:bg-orange-100 px-8 py-3 rounded-full font-semibold shadow-lg transition-all duration-300 flex items-center gap-2 cursor-pointer"
          >
            <ShoppingBasket className="w-5 h-5" /> {slides[currrent].btnText}
          </motion.button>
        </motion.div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currrent ? "bg-white w-6" : "bg-white/50"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}
