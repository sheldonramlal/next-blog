"use client";

import { signOut } from "@/src/lib/auth-client";
import { redirect } from "next/navigation";

export default function LogoutButton() {
  return (
    <button
      onClick={() => {
        signOut();
        redirect("/sign-in");
      }}
      className="w-full bg-[#2E60FA] font-medium rounded-md px-4 py-2 cursor-pointer text-white"
    >
      Sign Out
    </button>
  );
}
