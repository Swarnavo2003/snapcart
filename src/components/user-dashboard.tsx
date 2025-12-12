import connectDB from "@/lib/db";
import { CategorySlider } from "./category-slider";
import { HeroSection } from "./hero-section";
import Grocery, { IGrocery } from "@/models/grocery.model";
import { GroceryItemCard } from "./grocery-item-card";

export async function UserDashboard() {
  await connectDB();

  const groceries = await Grocery.find({}).lean();

  const plainGroceries = JSON.parse(JSON.stringify(groceries));

  return (
    <div>
      <HeroSection />
      <CategorySlider />
      <div className="w-[90%] md:w-[80%] mx-auto mt-10 mb-20">
        <h2 className="text-2xl md:text-3xl font-bold text-or4 mb-6 text-center">
          Grocery Items
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {plainGroceries.map((grocery: IGrocery, index: number) => (
            <GroceryItemCard key={index} grocery={grocery} />
          ))}
        </div>
      </div>
    </div>
  );
}
