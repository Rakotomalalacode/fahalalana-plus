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
      className="group relative w-full  flex justify-center py-3 text-center border border-transparent text-lg font-medium rounded-lg  bg-green-500 hover:bg-green-400 shadow-2xl focus:outline-none  cursor-pointer disabled:opacity-50"
    >
      Télécharger mon certificat
    </button>
  )
}
