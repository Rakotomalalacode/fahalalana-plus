"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { SquarePen } from "lucide-react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

export default function BuinsesEdit({ busines }: { busines: any }) {
  const [form, setForm] = useState({
    titre: busines.titre,
    prix: busines.prix,
    categorie: busines.categorie,
    description: busines.description,
  });
  const [zip, setZip] = useState<File | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [intro, setIntro] = useState<File | null>(null);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("titre", form.titre);
    formData.append("prix", String(form.prix));
    formData.append("categorie", form.categorie);
    formData.append("description", form.description);
    if (zip) formData.append("zip", zip);
    if (image) formData.append("image", image);
    if (intro) formData.append("intro", intro);

    const res = await fetch(`/api/busines/${busines.id}`, {
      method: "PUT",
      body: formData,
    });

    if (res.ok) {
      router.push("/dashboard");
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <div className="h-9 px-4 py-2 has-[>svg]:px-3 rounded border bg-green-700 text-white shadow-xs hover:bg-green-700/90 hover:text-accent-foreground dark:bg-green-700 dark:border-input dark:hover:bg-green-700/90">
          <SquarePen size={45} className="text-white" />
        </div>
      </DialogTrigger>
      <DialogContent className="lg:min-w-[800px] font-outfit rounded">
        <DialogHeader className=" w-full">
          <DialogTitle className="text-center">Modification du cours {busines.titre}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="w-full lg:flex flex-wrap-reverse justify-between">
              <div className="w-full  lg:w-[48.5%] space-y-3">
                <div className="space-y-2">
                  <label htmlFor="tire" className="block text-sm font-medium text-gray-700">Changer le titre</label>
                  <Input type="text" name="titre" className="rounded" value={form.titre} onChange={handleChange} placeholder="Titre" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="prix" className="block text-sm font-medium text-gray-700">Changer le prix</label>
                  <Input type="number" name="prix" className="rounded" value={form.prix} onChange={handleChange} placeholder="Prix" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="categorie" className="block text-sm font-medium text-gray-700">Changer la catégorie</label>
                  <Input type="text" name="categorie" className="rounded" value={form.categorie} onChange={handleChange} placeholder="Catégorie" />
                </div>
              </div>

              <div className="w-full  lg:w-[48.5%] space-y-3">
                <div className="space-y-2">
                  <label htmlFor="zip" className="block text-sm font-medium text-gray-700">Changer le zip</label>
                  <Input type="file" accept=".zip" className="rounded" onChange={(e) => setZip(e.target.files?.[0] || null)} />
                </div>
                <div className="space-y-2">
                  <label htmlFor="image" className="block text-sm font-medium text-gray-700">Changer l'image</label>
                  <Input type="file" accept="image/*" className="rounded" onChange={(e) => setImage(e.target.files?.[0] || null)} />
                </div>
                <div className="space-y-2">
                  <label htmlFor="intro" className="block text-sm font-medium text-gray-700">Changer l'introduction</label>
                  <Input type="file" accept=".pdf" className="rounded" onChange={(e) => setIntro(e.target.files?.[0] || null)} />
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="space-y-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Changer la description</label>
                <Textarea name="description" className="rounded" value={form.description} onChange={handleChange} placeholder="Description" />
              </div>
              <Button type="submit" className="rounded w-full" >Mettre à jour</Button>
            </div>
          </form>
        
      </DialogContent>
    </Dialog>
  );
}
