"use client";

import { useState } from "react";
import MealPlanModal from "@/components/MealPlanModal";

type MealPlan = {
  name: string;
  price: string;
  description: string;
  details: string;
};

// Data Meal Plan Sampel
const mealPlans: MealPlan[] = [
  {
    name: "Diet Plan",
    price: "Rp30.000/meal",
    description:
      "Rendah kalori dan kaya serat untuk mendukung program diet Anda.",
    details:
      "Menu Diet Plan mencakup dada ayam panggang, salad sayuran segar dengan dressing lemon, dan nasi merah. Cocok untuk menjaga berat badan ideal.",
  },
  {
    name: "Protein Plan",
    price: "Rp40.000/meal",
    description:
      "Tinggi protein untuk membantu pembentukan otot dan pemulihan.",
    details:
      "Menu Protein Plan terdiri dari steak sirloin, brokoli rebus, dan ubi jalar. Didesain untuk Anda yang aktif berolahraga.",
  },
  {
    name: "Royal Plan",
    price: "Rp60.000/meal",
    description:
      "Menu premium dengan bahan-bahan terbaik untuk pengalaman makan istimewa.",
    details:
      "Menu Royal Plan menyajikan salmon panggang dengan saus asparagus, quinoa, dan salad buah premium. Gizi lengkap dengan rasa mewah.",
  },
];

export default function MenuPage() {
  const [selectedPlan, setSelectedPlan] = useState<MealPlan | null>(null);

  const handleOpenModal = (plan: MealPlan) => {
    setSelectedPlan(plan);
  };

  const handleCloseModal = () => {
    setSelectedPlan(null);
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-5xl md:text-6xl font-bold text-center mb-12 text-white">
        Our Meal Plans
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {mealPlans.map((plan) => (
          <div
            key={plan.name}
            className="bg-gray-800 p-6 rounded-lg border border-gray-700 flex flex-col"
          >
            <h2 className="text-2xl font-bold text-cyan-400 mb-2">
              {plan.name}
            </h2>
            <p className="text-lg text-white mb-4">{plan.price}</p>
            <p className="text-gray-400 flex-grow">{plan.description}</p>
            <button
              onClick={() => handleOpenModal(plan)}
              className="mt-6 bg-cyan-500 text-white py-2 px-4 rounded hover:bg-cyan-600 transition-colors"
            >
              See More Details
            </button>
          </div>
        ))}
      </div>
      <MealPlanModal plan={selectedPlan} onClose={handleCloseModal} />
    </div>
  );
}
