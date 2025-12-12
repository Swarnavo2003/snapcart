"use client";
import { IGrocery } from "@/models/grocery.model";
import { PlusCircle, ShoppingCart } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";

export function GroceryItemCard({ grocery }: { grocery: IGrocery }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: false, amount: 0.3 }}
      className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col"
    >
      <div className="relative w-full aspect-4/3 bg-gray-50 overflow-hidden group">
        <Image
          src={grocery.image}
          fill
          alt={grocery.name}
          sizes="(max-width:768px) 100vw, 25vw"
          className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
      </div>
      <div className="p-4 flex flex-col flex-1">
        <p className="text-xs text-gray-500 font-medium mb-1">
          {grocery.category}
        </p>
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
            {grocery.unit}
          </span>
          <span className="text-orange-700 font-bold text-lg">
            ₹{grocery.price}
          </span>
        </div>

        <motion.button
          whileTap={{ scale: 0.96 }}
          className="mt-4 flex items-center justify-center gap-2 bg-orange-600 text-white py-2 rounded-full text-sm font-medium transition-all hover:bg-orange-700"
        >
          <ShoppingCart />
          Add to cart
        </motion.button>
      </div>
    </motion.div>
  );
}
