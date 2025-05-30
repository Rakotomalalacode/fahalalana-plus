import { Suspense } from "react";
import AuthErrorClient from "./AuthErrorClient";
import Loading from "@/components/loading/Loading";

export default function AuthErrorPage() {
  return (
    <Suspense fallback={<div className="h-screen w-screen"><Loading /></div>}>
      <AuthErrorClient />
    </Suspense>
  );
}
