"use client"

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Loading from "@/components/loading/Loading";

export default function AuthErrorClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  useEffect(() => {
    if (error?.startsWith("REDIRECT:")) {
      const redirectTo = error.replace("REDIRECT:", "");
      router.replace(redirectTo);
    }
  }, [error, router]);

  return (
    <div className="w-screen h-screen">
      <Loading />
    </div>
  );
}
