"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

type VideoItem = {
  id: number;
  title: string;
  description: string;
  videoUrl: string;
  thumbnail: string;
};

export default function VideoListPage() {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchVideos = async () => {
    const res = await fetch("/api/videos");
    const data = await res.json();
    setVideos(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleDelete = async (id: number) => {
    const confirm = window.confirm("Supprimer cette vidéo ?");
    if (!confirm) return;

    const res = await fetch(`/api/videos/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      alert("Vidéo supprimée");
      fetchVideos();
    }
  };

  if (loading) return <div className="p-10">Chargement...</div>;

  return (
    <div className="p-10 space-y-6">
      <h1 className="text-3xl font-bold">🎞 Liste des vidéos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <div key={video.id} className="border rounded p-4 relative">
            <video src={video.videoUrl} controls className="w-full mb-3 rounded" />
            <h2 className="text-xl font-semibold">{video.title}</h2>
            <p className="text-sm text-gray-600">{video.description.slice(0, 80)}...</p>
            <div className="flex gap-3 mt-3">
              <Link
                href={`/admin/videos/${video.id}`}
                className="px-3 py-1 bg-yellow-500 text-white rounded text-sm"
              >
                ✏️ Modifier
              </Link>
              <button
                onClick={() => handleDelete(video.id)}
                className="px-3 py-1 bg-red-600 text-white rounded text-sm"
              >
                🗑 Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
