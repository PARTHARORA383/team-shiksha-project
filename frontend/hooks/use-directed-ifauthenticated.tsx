
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function useRedirectIfAuthenticated() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        // User is already logged in, redirect to dashboard
        router.replace("/Dashboard");
      }
    }
  }, [router]);
}
