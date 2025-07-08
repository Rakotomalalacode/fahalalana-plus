"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Pencil ,SquarePen } from "lucide-react";

type VideoItem = {
  id: number
  title: string
  description: string
  videoUrl: string
  thumbnail: string
}


export default function VideoEdit({ video }: { video: any }) {
  const [form, setForm] = useState({
    title: video.title,
    description: video.description,
  });
  const [newVideo, setNewVideo] = useState<File | null>(null);
  const [newThumbnail, setNewThumbnail] = useState<File | null>(null);
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    if (newVideo) formData.append("video", newVideo);
    if (newThumbnail) formData.append("thumbnail", newThumbnail);

    const res = await fetch(`/api/admin/videos/${video.id}`, {
      method: "PUT",
      body: formData,
    });

    if (res.ok) {
      router.refresh();
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <div className="h-9 px-4 py-2 has-[>svg]:px-3 rounded border bg-green-700 text-white shadow-xs hover:bg-green-700/90 hover:text-accent-foreground dark:bg-green-700 dark:border-input dark:hover:bg-green-700/90">
          <SquarePen size={45} className="text-white" />
        </div>
      </DialogTrigger>
      <DialogContent className="lg:min-w-[600px] rounded font-outfit">
        <DialogHeader>
          <DialogTitle className="text-center">
            Modifier la vidéo : {video.title}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Titre</label>
            <Input
              name="title"
              value={form.title}
              onChange={handleChange}
              className="rounded"
              placeholder="Titre de la vidéo"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <Textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="rounded"
              placeholder="Description"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Remplacer la vidéo</label>
            <Input
              type="file"
              accept="video/*"
              className="rounded"
              onChange={(e) => setNewVideo(e.target.files?.[0] || null)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Remplacer la miniature</label>
            <Input
              type="file"
              accept="image/*"
              className="rounded"
              onChange={(e) => setNewThumbnail(e.target.files?.[0] || null)}
            />
          </div>
          <Button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 rounded">
            Mettre à jour
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
