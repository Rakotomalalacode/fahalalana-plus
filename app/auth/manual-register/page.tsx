import { Suspense } from "react"
import ManualRegisterClient from "./ManualRegisterForm"

export default function ManualRegisterPage() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <ManualRegisterClient />
    </Suspense>
  )
}