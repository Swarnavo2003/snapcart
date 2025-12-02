"use client";
import { ArrowRight, Bike, User, UserCog } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const roleArray = [
  { id: "user", label: "User", icon: User },
  { id: "admin", label: "Admin", icon: UserCog },
  { id: "deliveryBoy", label: "Delhivery Boy", icon: Bike },
];

export function EditRoleMobile() {
  const [roles, setRoles] = useState(roleArray);
  const [selectedRole, setSelectedRole] = useState("");
  const [mobile, setMobile] = useState("");
  return (
    <div className="flex flex-col items-center min-h-screen p-6 w-full">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-extrabold text-green-700 text-center mt-8"
      >
        Select Your Role
      </motion.h1>

      <div className="flex flex-col md:flex-row justify-center items-center gap-6 mt-10">
        {roles.map((role) => {
          const Icon = role.icon;
          const isSelected = selectedRole === role.id;
          return (
            <motion.div
              key={role.id}
              whileTap={{ scale: 0.96 }}
              onClick={() => setSelectedRole(role.id)}
              className={`flex flex-col items-center justify-center w-48 h-44 rounded-2xl border-2 transition-all cursor-pointer ${
                isSelected
                  ? "border-green-600 bg-green-100 shadow-lg"
                  : "border-gray-300 bg-white hover:border-green-400"
              }`}
            >
              <Icon
                className={`size-8 ${isSelected ? "text-green-700" : ""}`}
              />
              <span
                className={`font-medium ${isSelected ? "text-green-700" : ""}`}
              >
                {role.label}
              </span>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="flex flex-col items-center mt-10"
      >
        <label htmlFor="mobile" className="text-gray-700 font-medium mb-2">
          Enter Your Mobile No.
        </label>
        <input
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          type="tel"
          id="mobile"
          placeholder="eg. 9876543210"
          className="w-64 md:w-80 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none text-gray-800"
        />
      </motion.div>
      <motion.button
        disabled={!selectedRole || mobile.length !== 10}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className={`inline-flex items-center justify-center gap-2 font-semibold py-3 px-8 rounded-lg shadow-md transition-all duration-200 w-[200px] mt-10 ${
          selectedRole && mobile.length === 10
            ? "bg-green-700 hover:bg-green-600 text-white cursor-pointer"
            : "bg-gray-300 text-gray-600 cursor-not-allowed"
        }`}
      >
        Go to Home
        <ArrowRight className="w-4 h-4" />
      </motion.button>
    </div>
  );
}
