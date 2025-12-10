"use client";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  KeyRound,
  Leaf,
  Loader2,
  LogIn,
  Mail,
  User2,
} from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import google from "@/assets/google.png";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

interface iAppProps {
  prevStep: (step: number) => void;
}

export function RegisterForm({ prevStep }: iAppProps) {
  const [inputData, setInputData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);

      const result = await axios.post("/api/auth/register", inputData);
      if (result.status === 200) {
        router.push("/login");
      }

      setInputData({
        name: "",
        email: "",
        password: "",
      });
    } catch (error) {
      const err = error as AxiosError as unknown;
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-10 bg-white relative">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="absolute top-6 left-6 "
      >
        <button
          onClick={() => prevStep(1)}
          className="flex items-center gap-1 bg-orange-700 hover:bg-orange-800 text-white transition-colors cursor-pointer border py-1 px-3 rounded-lg"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="font-medium">Back</span>
        </button>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-extrabold text-orange-700 mb-2"
      >
        Create Account
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="text-gray-600 mb-4 flex items-center gap-2"
      >
        Join Snapcar today <Leaf className="w-5 h-5 text-orange-600" />
      </motion.p>

      <motion.form
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        onSubmit={handleFormSubmit}
        className="flex flex-col gap-5 w-full max-w-md border py-6 px-4 rounded-xl border-gray-300"
      >
        <div className="relative">
          <User2 className="w-5 h-5 absolute top-1/2 transform -translate-y-1/2 left-3" />
          <input
            type="text"
            name="name"
            value={inputData.name}
            onChange={handleFormChange}
            placeholder="Enter your name"
            className="w-full border border-gray-300 rounded-xl py-3 pl-10 pr-4 text-gray-800 focus:ring-2 focus:ring-orange-500 focus:outline-none"
          />
        </div>

        <div className="relative">
          <Mail className="w-5 h-5 absolute top-1/2 transform -translate-y-1/2 left-3" />
          <input
            type="email"
            name="email"
            value={inputData.email}
            onChange={handleFormChange}
            placeholder="Enter your email"
            className="w-full border border-gray-300 rounded-xl py-3 pl-10 pr-4 text-gray-800 focus:ring-2 focus:ring-orange-500 focus:outline-none"
          />
        </div>

        <div className="relative">
          <KeyRound className="w-5 h-5 absolute top-1/2 transform -translate-y-1/2 left-3" />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={inputData.password}
            onChange={handleFormChange}
            placeholder="Enter your password"
            className="w-full border border-gray-300 rounded-xl py-3 pl-10 pr-4 text-gray-800 focus:ring-2 focus:ring-orange-500 focus:outline-none"
          />
          {showPassword ? (
            <EyeOff
              className="w-5 h-5 absolute top-1/2 transform -translate-y-1/2 right-3 cursor-pointer"
              onClick={() => setShowPassword(false)}
            />
          ) : (
            <Eye
              className="w-5 h-5 absolute top-1/2 transform -translate-y-1/2 right-3 cursor-pointer"
              onClick={() => setShowPassword(true)}
            />
          )}
        </div>

        {(() => {
          const formValidation =
            inputData.name !== "" &&
            inputData.email !== "" &&
            inputData.password !== "";

          return (
            <button
              type="submit"
              disabled={!formValidation || loading}
              className={`w-full font-semibold py-3 rounded-lg transition-all duration-200 shadow-sm inline-flex items-center justify-center gap-2 ${
                formValidation
                  ? "bg-orange-600 hover:bg-orange-700 text-white cursor-pointer"
                  : "bg-gray-300 cursor-not-allowed text-gray-700"
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Please Wait</span>
                </>
              ) : (
                <span>Register</span>
              )}
            </button>
          );
        })()}

        <div className="flex items-center gap-2 text-gray-400 text-sm mt-2">
          <span className="flex-1 h-px bg-gray-200"></span>
          OR
          <span className="flex-1 h-px bg-gray-200"></span>
        </div>

        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="w-full flex items-center justify-center gap-3 border border-gray-300 hover:bg-gray-50 py-3 rounded-lg text-gray-700 font-medium transition-all duration-200 hover:cursor-pointer"
        >
          <Image src={google} width={20} height={20} alt="google" />
          Continue with Google
        </button>
      </motion.form>

      <p className="text-gray-600 mt-6 text-sm flex items-center gap-1">
        Already have an account? <LogIn className="size-4" />{" "}
        <span
          onClick={() => router.push("/login")}
          className="text-orange-500 cursor-pointer hover:underline hover:text-orange-600"
        >
          Sign In
        </span>
      </p>
    </div>
  );
}
