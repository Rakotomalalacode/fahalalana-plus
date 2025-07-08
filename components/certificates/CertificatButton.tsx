"use client"

export default function CertificatButton({ coursId }: { coursId: string }) {
  const telecharger = () => {
    const link = document.createElement("a")
    link.href = `/api/certificat/${coursId}`
    link.target = "_blank"
    link.click()
  }

  return (
    <button
      onClick={telecharger}
      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
    >
      Télécharger mon certificat
    </button>
  )
}
