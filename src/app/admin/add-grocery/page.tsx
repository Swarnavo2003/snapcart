import { AddGroceryForm } from "@/components/add-grocery-form";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AddGrocery() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-orange-50 to-white py-16 px-4 relative">
      <Link
        href={"/"}
        className="absolute top-6 left-6 flex items-center gap-2 text-orange-700 font-semibold bh-white px-4 py-2 rounded-full shadow-md hover:bg-orange-100 hover:shadow-lg transition-all"
      >
        <ArrowLeft /> <span className="hidden md:block">Back to home</span>
      </Link>
      <AddGroceryForm />
    </div>
  );
}
