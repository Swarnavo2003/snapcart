"use client";
import { CATEGORIES, UNITS } from "@/constants";
import axios from "axios";
import { Loader2, Plus, PlusCircle, Upload } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";

const categories = CATEGORIES;
const units = UNITS;

export function AddGroceryForm() {
  const [inputData, setInputData] = useState({
    name: "",
    category: "",
    unit: "",
    price: "",
  });
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setImage(files[0]);
    setPreview(URL.createObjectURL(files[0]));
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", inputData.name);
      formData.append("category", inputData.category);
      formData.append("unit", inputData.unit);
      formData.append("price", inputData.price);
      if (image) {
        formData.append("image", image as Blob);
      }
      const result = await axios.post("/api/admin/add-grocery", formData);
      if (result.status === 201) {
        setInputData({
          name: "",
          category: "",
          unit: "",
          price: "",
        });
        setImage(null);
        setPreview(null);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="bg-white w-full max-w-2xl shadow-2xl rounded-3xl border border-orange-100 p-8"
    >
      <div className="flex flex-col items-center mb-8">
        <div className="flex items-center gap-2">
          <PlusCircle className="w-8 h-8 text-orange-500" />
          <h1>Add Your Grocery</h1>
        </div>
        <p className="text-gray-500 text-sm mt-2 text-center">
          Fill out the details below to add a new grocery item.
        </p>
      </div>
      <form onSubmit={handleFormSubmit} className="flex flex-col gap-6 w-full">
        <div>
          <label
            htmlFor="name"
            className="block text-gray-700 font-medium mb-1"
          >
            Grocery Name<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={inputData.name}
            onChange={handleInputChange}
            placeholder="Eg: Milk, Chips, Soap, etc."
            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400 transition-all"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Category<span className="text-red-500">*</span>
            </label>
            <select
              name="category"
              value={inputData.category}
              onChange={handleSelectChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400 transition-all bg-white"
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Unit<span className="text-red-500">*</span>
            </label>
            <select
              name="unit"
              value={inputData.unit}
              onChange={handleSelectChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400 transition-all bg-white"
            >
              <option value="">Select Unit</option>
              {units.map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label
            htmlFor="price"
            className="block text-gray-700 font-medium mb-1"
          >
            Price<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="price"
            name="price"
            value={inputData.price}
            onChange={handleInputChange}
            placeholder="Eg. 100, 200, 300, etc."
            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400 transition-all"
          />
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-5">
          <label
            htmlFor="image"
            className="cursor-pointer flex items-center justify-center gap-2 bg-orange-50 text-orange-700 font-semibold border border-orange-200 rounded-xl px-6 py-2 hover:bg-orange-100 transition-all w-full sm:w-auto"
          >
            <Upload className="w-5 h-5" />
            Upload Image
          </label>
          <input
            type="file"
            accept="image/*"
            id="image"
            onChange={handleImageChange}
            hidden
          />
          {preview && (
            <Image
              width={100}
              height={100}
              src={preview}
              alt="Preview"
              className="rounded-xl shadow-md border border-gray-200 object-cover"
            />
          )}
        </div>

        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          type="submit"
          className="mt-5 w-full bg-linear-to-r from-orange-500 to-orange-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl disabled:opacity-60 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Please Wait
            </>
          ) : (
            <>
              <Plus className="w-5 h-5" />
              Add Grocery
            </>
          )}
        </motion.button>
      </form>
    </motion.div>
  );
}
