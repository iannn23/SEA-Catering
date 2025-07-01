"use client";

// Tipe data untuk satu meal plan
type MealPlan = {
  name: string;
  price: string;
  description: string;
  details: string; // Detail tambahan untuk modal
};

type ModalProps = {
  plan: MealPlan | null;
  onClose: () => void;
};

const MealPlanModal = ({ plan, onClose }: ModalProps) => {
  if (!plan) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-gray-800 p-8 rounded-lg max-w-lg w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-cyan-400 mb-4">{plan.name}</h2>
        <p className="text-xl text-white mb-4">{plan.price}</p>
        <p className="text-gray-300">{plan.details}</p>
        <button
          onClick={onClose}
          className="mt-6 bg-cyan-500 text-white py-2 px-4 rounded hover:bg-cyan-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default MealPlanModal;
