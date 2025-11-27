"use client";
import { ArrowRight, Bike, ShoppingBasket } from "lucide-react";
import { motion } from "motion/react";

interface iAppProps {
  nextStep: (step: number) => void;
}

export function Welcome({ nextStep }: iAppProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex items-center gap-2"
      >
        <ShoppingBasket className="w-12 h-12 text-green-600" />
        <h1 className="text-4xl md:text-5xl font-extrabold text-green-600">
          Snapcart
        </h1>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-4 text-gray-700 text-lg md:text-xl max-w-lg"
      >
        Your one stop destination for fresh groceries, organic produce, and
        daily essentials delivered right to your doorstep.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.5 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="mt-5 flex items-center justify-center gap-5"
      >
        <ShoppingBasket className="w-24 h-24 md:w-32 md:h-32 text-green-600 drop-shadow-md" />
        <Bike className="w-24 h-24 md:w-32 md:h-32 text-orange-600 drop-shadow-md" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="mt-10"
      >
        <button
          onClick={() => nextStep(2)}
          className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-all duration-200 cursor-pointer"
        >
          Next
          <ArrowRight />
        </button>
      </motion.div>
    </div>
  );
}
