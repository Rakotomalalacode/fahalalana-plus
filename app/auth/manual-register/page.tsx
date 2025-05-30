import { Suspense } from "react"
import ManualRegisterClient from "./ManualRegisterForm"
import Loading from "@/components/loading/Loading"

export default function ManualRegisterPage() {
  return (
    <Suspense fallback={<div className="h-screen w-screen"><Loading /></div>}>
      <ManualRegisterClient />
    </Suspense>
  )
}