"use client";

import { useFormState } from "react-dom";
import { registerUser } from "@/app/action";
import { SubmitButton } from "@/components/SubmitButton";
import Link from "next/link";

const initialState = { success: false, message: "" };

export default function RegisterPage() {
  const [state, formAction] = useFormState(registerUser, initialState);

  return (
    <div className="container mx-auto px-6 py-12 flex justify-center">
      <form
        action={formAction}
        className="w-full max-w-md bg-gray-800 p-8 rounded-lg border border-gray-700 space-y-6"
      >
        <h1 className="text-3xl font-bold text-center text-white">
          Create an Account
        </h1>

        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-300"
          >
            Full Name
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
            htmlFor="email"
            className="block text-sm font-medium text-gray-300"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm text-white p-2"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-300"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm text-white p-2"
          />
          <p className="text-xs text-gray-400 mt-1">
            Min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char.
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

        <p className="text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link href="/login" className="text-cyan-400 hover:underline">
            Log In
          </Link>
        </p>
      </form>
    </div>
  );
}
