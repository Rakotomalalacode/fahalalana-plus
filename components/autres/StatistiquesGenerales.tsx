'use client'

import { useEffect, useState } from "react";
import { IconDeviceLaptop, IconCrown, IconSchool, IconChalkboardTeacher, IconLoader } from "@tabler/icons-react"
import { Loader2 } from "lucide-react"

type Stats = {
  totalVideos: number;
  totalTeachers: number;
  totalStudents: number;
  finishedCoursCount: number;
};

export default function StatistiquesGenerales() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      const res = await fetch("/api/statistiques");
      const data = await res.json();
      setStats(data);
    };

    fetchStats();
  }, []);

  if (!stats) return <div className="flex justify-center items-center"><IconLoader className="animate-spin h-8 w-8 text-muted-foreground" /></div>;

  return (
    <div className="grid grid-cols-1 text-white bg-[#06141c] md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      <div className="p-4 flex gap-3">
        <div className="w-16 h-16 flex bg-blue-500 rounded justify-center items-center">
            <IconDeviceLaptop size={40} className=" text-white" />
        </div>
        <div>
            <p className="text-2xl font-bold">{stats.totalVideos} +</p>
            <h3 className="text-xl font-semibold">Total Vidéos</h3>
        </div>
      </div>
      <div className="p-4 flex gap-3">
        <div className="w-16 h-16 flex bg-green-500 rounded justify-center items-center">
            <IconChalkboardTeacher size={40} className=" text-white" />
        </div>
        <div>
                    <p className="text-2xl font-bold">{stats.totalTeachers} +</p>
        <h3 className="text-xl font-semibold">Total Enseignants</h3>
        </div>
      </div>
      <div className="p-4 flex gap-3">
        <div className="w-16 h-16 flex bg-yellow-500 rounded justify-center items-center">
            <IconSchool size={40} className=" text-white" />
        </div>
        <div>
                    <p className="text-2xl font-bold">{stats.totalStudents} +</p>
        <h3 className="text-lg font-semibold">Total Étudiants</h3>
      </div>
      </div>
      <div className=" p-4 flex gap-3">
        <div className="w-16 h-16 flex bg-purple-500 rounded justify-center items-center">
            <IconCrown size={40} className=" text-white" />
        </div>
        <div>
                    <p className="text-2xl font-bold">{stats.finishedCoursCount} +</p>
        <h3 className=" text-lg font-semibold">Cours Terminés</h3>
      </div>
      </div>
    </div>
  );
}