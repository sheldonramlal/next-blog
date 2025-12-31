"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "@/src/lib/auth-client";

export default function SignInPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);

    const res = await signIn.email({
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    });

    if (res.error) {
      setError(res.error.message || "Something went wrong.");
    } else {
      router.push("/dashboard");
    }
  }

  return (
    <main className="max-w-md  flex items-center flex-col mx-auto p-6 space-y-4 mt-20 ">
      <h1 className="text-2xl font-medium text-black">Sign In</h1>

      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4 w-full">
        <div className="sm:col-span-4">
         <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                Email
          </label>
          
        <div className="mt-2 ">
          <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">     
            <input
              name="email"
              type="email"
              placeholder="Email"
              required
              className="block min-w-0 grow bg-white py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
            />
         </div>
        </div>
        </div>
        
        <div className="sm:col-span-4">
        <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
          Password
        </label>

        <div className="mt-2">
          <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
         
            <input
              name="password"
              type="password"
              placeholder="Password"
              required
              className="block min-w-0 grow bg-white py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
            />
          </div>
        </div>
        </div>

        <button
          type="submit"
          className="w-full bg-[#2E60FA] text-white font-medium rounded-md px-4 mt-5 py-2 cursor-pointer"
        >
          Sign In
        </button>

        <p className="text-gray-600 text-sm text-center">Don't have an account yet? <span  className="text-blue-500"><a href="/sign-up">Create an account</a></span>.</p>
      </form>
    </main>
  );
}