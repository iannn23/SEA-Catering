"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useFormState } from "react-dom";
import { loginUser } from "@/app/action";
import { SubmitButton } from "@/components/SubmitButton";
import Link from "next/link";

const initialState = { success: false, message: "" };

export default function LoginPage() {
  const router = useRouter();
  const [state, formAction] = useFormState(loginUser, initialState);

  useEffect(() => {
    if (state.success) {
      router.push("/");
    }
  }, [state.success, router]);

  return (
    <div className="container mx-auto px-6 py-12 flex justify-center">
      <form
        action={formAction}
        className="w-full max-w-md bg-gray-800 p-8 rounded-lg border border-gray-700 space-y-6"
      >
        <h1 className="text-3xl font-bold text-center text-white">Log In</h1>

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
        </div>

        {state.message &&
          !state.success && ( 
            <p className="text-center p-2 rounded-md bg-red-800 text-red-200">
              {state.message}
            </p>
          )}

        <SubmitButton />

        <p className="text-center text-sm text-gray-400">
          Don&apos;t have an account?
          <Link href="/register" className="text-cyan-400 hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
