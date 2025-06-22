"use client"
import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { IconEdit } from "@tabler/icons-react"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"

export default function EditReportPage({ idRapports }: { idRapports: string }) {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [initialTitle, setInitialTitle] = useState("")
    const [initialContent, setInitialContent] = useState("")

useEffect(() => {
    const fetchReport = async () => {
        const res = await fetch(`/api/rapports/${idRapports}`)
        const data = await res.json()
        setTitle(data.title)
        setContent(data.content)
        setInitialTitle(data.title)
        setInitialContent(data.content)
    }

    fetchReport()
}, [idRapports])

    const handleUpdate = async () => {
        const updatedFields: any = {}

        if (title !== initialTitle) updatedFields.title = title
        if (content !== initialContent) updatedFields.content = content

        if (Object.keys(updatedFields).length === 0) {
            alert("Aucune modification détectée.")
            return
        }

        await fetch(`/api/rapports/${idRapports}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedFields),
        })
    }

    return (
        <Dialog>
            <DialogTrigger>
                <div className="h-9 px-4 py-2 has-[>svg]:px-3 rounded bg-green-600 hover:bg-green-600/90">
                <IconEdit size={45} className="text-white" />
                </div>
            </DialogTrigger>
            <DialogContent className="font-outfit">
                <DialogHeader>
                    <DialogTitle className="text-center">Modifier le rapport</DialogTitle>
                    <DialogDescription className="text-center">Vous pouvez modifier le titre ou le contenu du rapport.</DialogDescription>
                </DialogHeader>
                <div className="w-full">
                    <Input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Titre"
                        className="rounded p-2 mb-2 w-full"
                    />
                    <Textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Contenu"
                        className="rounded p-2 mb-2 h-[300px] w-full"
                    />
                    <button
                        onClick={handleUpdate}
                        className="bg-green-600/90 hover:bg-green-600 w-full mt-2 text-white px-4 py-2 rounded"
                    >
                        Enregistrer
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    )
}




// "use client"
// import { useEffect, useState } from "react"
// import { useParams, useRouter } from "next/navigation"

// export default function EditReportPage() {
//   const [title, setTitle] = useState("")
//   const [content, setContent] = useState("")
//   const { id } = useParams()
//   const router = useRouter()

//   useEffect(() => {
//     fetch(`/api/reports`)
//       .then((res) => res.json())
//       .then((data) => {
//         const report = data.find((r: any) => r.id === id)
//         setTitle(report?.title || "")
//         setContent(report?.content || "")
//       })
//   }, [id])

//   const handleUpdate = async () => {
//     await fetch(`/api/reports/${id}`, {
//       method: "PUT",
//       body: JSON.stringify({ title, content }),
//     })
//     router.push("/dashboard/reports")
//   }

//   return (
//     <div className="p-6 max-w-2xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">Modifier le rapport</h1>
//       <input
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         placeholder="Titre"
//         className="border p-2 mb-2 w-full"
//       />
//       <textarea
//         value={content}
//         onChange={(e) => setContent(e.target.value)}
//         placeholder="Contenu"
//         className="border p-2 mb-2 w-full"
//       />
//       <button
//         onClick={handleUpdate}
//         className="bg-green-600 text-white px-4 py-2 rounded"
//       >
//         Enregistrer
//       </button>
//     </div>
//   )
// }
