"use client";

import { useState, useEffect } from "react";
import { useFormState } from "react-dom";
import { createSubscription } from "@/app/action";
import { SubmitButton } from "./SubmitButton";

const planPrices: { [key: string]: number } = {
  diet: 30000,
  protein: 40000,
  royal: 60000,
};

const mealOptions = ["Breakfast", "Lunch", "Dinner"];
const dayOptions = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const initialState = {
  success: false,
  message: "",
};

export default function SubscriptionForm() {
  const [state, formAction] = useFormState(createSubscription, initialState);

  const [selectedPlan, setSelectedPlan] = useState("diet");
  const [selectedMeals, setSelectedMeals] = useState<string[]>([]);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const pricePerMeal = planPrices[selectedPlan] || 0;
    const numMeals = selectedMeals.length;
    const numDays = selectedDays.length;

    const calculatedPrice = pricePerMeal * numMeals * numDays * 4.3;
    setTotalPrice(calculatedPrice);
  }, [selectedPlan, selectedMeals, selectedDays]);

  const handleMealChange = (meal: string) => {
    setSelectedMeals((prev) =>
      prev.includes(meal) ? prev.filter((m) => m !== meal) : [...prev, meal]
    );
  };

  const handleDayChange = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  return (
    <form
      action={formAction}
      className="max-w-2xl mx-auto bg-gray-800 p-8 rounded-lg border border-gray-700 space-y-6"
    >
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-300"
        >
          Full Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm text-white p-2"
        />
      </div>
      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-gray-300"
        >
          Active Phone Number *
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          required
          className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm text-white p-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300">
          Plan Selection *
        </label>
        <div className="mt-2 space-y-2">
          {Object.keys(planPrices).map((plan) => (
            <label key={plan} className="flex items-center gap-2">
              <input
                type="radio"
                name="plan"
                value={plan}
                checked={selectedPlan === plan}
                onChange={(e) => setSelectedPlan(e.target.value)}
                className="text-cyan-500 focus:ring-cyan-600"
              />
              <span className="capitalize">
                {plan} Plan - Rp{planPrices[plan].toLocaleString("id-ID")}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300">
          Meal Type (select at least one) *
        </label>
        <div className="mt-2 grid grid-cols-3 gap-4">
          {mealOptions.map((meal) => (
            <label key={meal} className="flex items-center gap-2">
              <input
                type="checkbox"
                name="mealType"
                value={meal}
                checked={selectedMeals.includes(meal)}
                onChange={() => handleMealChange(meal)}
              />
              <span>{meal}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300">
          Delivery Days *
        </label>
        <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-4">
          {dayOptions.map((day) => (
            <label key={day} className="flex items-center gap-2">
              <input
                type="checkbox"
                name="deliveryDay"
                value={day}
                checked={selectedDays.includes(day)}
                onChange={() => handleDayChange(day)}
              />
              <span>{day}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label
          htmlFor="allergies"
          className="block text-sm font-medium text-gray-300"
        >
          Allergies (optional)
        </label>
        <textarea
          id="allergies"
          name="allergies"
          rows={3}
          className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm text-white p-2"
        ></textarea>
      </div>

      <input type="hidden" name="totalPrice" value={totalPrice} />

      <div className="text-center bg-gray-900 p-4 rounded-lg">
        <p className="text-lg text-gray-400">Estimated Total Price per Month</p>
        <p className="text-3xl font-bold text-cyan-400">
          Rp
          {totalPrice.toLocaleString("id-ID", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
      </div>

      {state.message && (
        <p
          className={`text-center p-2 rounded-md ${
            state.success
              ? "bg-green-800 text-green-200"
              : "bg-red-800 text-red-200"
          }`}
        >
          {state.message}
        </p>
      )}

      <SubmitButton />
    </form>
  );
}
