"use client";
import {
  Eye,
  EyeOff,
  KeyRound,
  Leaf,
  Loader2,
  LogIn,
  Mail,
} from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import { FormEvent, useState } from "react";
import google from "@/assets/google.png";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export function LoginForm() {
  const [inputData, setInputData] = useState({
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

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signIn("credentials", inputData);
      router.push("/");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-10 bg-white relative">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-extrabold text-green-700 mb-2"
      >
        Welcome Back
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="text-gray-600 mb-4 flex items-center gap-2"
      >
        Login To Snapcart <Leaf className="w-5 h-5 text-green-600" />
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col gap-5 w-full max-w-md border py-6 px-4 rounded-xl border-gray-300"
      >
        <motion.form onSubmit={handleLogin} className="flex flex-col gap-5">
          <div className="relative">
            <Mail className="w-5 h-5 absolute top-1/2 transform -translate-y-1/2 left-3" />
            <input
              type="email"
              name="email"
              value={inputData.email}
              onChange={handleFormChange}
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-xl py-3 pl-10 pr-4 text-gray-800 focus:ring-2 focus:ring-green-500 focus:outline-none"
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
              className="w-full border border-gray-300 rounded-xl py-3 pl-10 pr-4 text-gray-800 focus:ring-2 focus:ring-green-500 focus:outline-none"
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
              inputData.email !== "" && inputData.password !== "";

            return (
              <button
                type="submit"
                disabled={!formValidation || loading}
                className={`w-full font-semibold py-3 rounded-lg transition-all duration-200 shadow-sm inline-flex items-center justify-center gap-2 ${
                  formValidation
                    ? "bg-green-600 hover:bg-green-700 text-white cursor-pointer"
                    : "bg-gray-300 cursor-not-allowed text-gray-700"
                }`}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Please Wait</span>
                  </>
                ) : (
                  <span>Login</span>
                )}
              </button>
            );
          })()}
        </motion.form>

        <div className="flex items-center gap-2 text-gray-400 text-sm mt-2">
          <span className="flex-1 h-px bg-gray-200"></span>
          OR
          <span className="flex-1 h-px bg-gray-200"></span>
        </div>

        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="w-full flex items-center justify-center gap-3 border border-gray-300 hover:bg-gray-50 py-3 rounded-lg text-gray-700 font-medium transition-all duration-200"
        >
          <Image src={google} width={20} height={20} alt="google" />
          Continue with Google
        </button>
      </motion.div>

      <p className="text-gray-600 mt-6 text-sm flex items-center gap-1">
        Don&apos;t have an account? <LogIn className="size-4" />{" "}
        <span
          onClick={() => router.push("/register")}
          className="text-green-500 cursor-pointer hover:underline hover:text-green-600"
        >
          Sign Up
        </span>
      </p>
    </div>
  );
}
