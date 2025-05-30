import { Suspense } from "react";
import AuthErrorClient from "./AuthErrorClient";

export default function AuthErrorPage() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <AuthErrorClient />
    </Suspense>
  );
}
