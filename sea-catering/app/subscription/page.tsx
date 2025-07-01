import SubscriptionForm from "@/components/SubcriptionForm";

export default function SubscriptionPage() {
  return (
    <div className="container mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-bold text-white">
          Join Our Program
        </h1>
        <p className="mt-4 text-lg text-gray-400">
          Customize your healthy meal plan and start your journey with us!
        </p>
      </div>
      <SubscriptionForm />
    </div>
  );
}
