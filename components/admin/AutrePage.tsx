"use client";

import { useState } from "react";

interface User {
  id: string;
  name?: string | null;
  email: string;
  role: string;
}

interface Report {
  id: string;
  title: string;
  user: { name?: string | null };
  createdAt: string;
}

interface Props {
  users: User[];
  reports: Report[];
}

export default function AutresPage({ users, reports }: Props) {
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [userList, setUserList] = useState(users);
  const [reportList, setReportList] = useState(reports);

  async function handleDeleteUser(userId: string) {
    if (!confirm("Supprimer cet utilisateur ?")) return;

    setLoadingId(userId);
    try {
      const res = await fetch(`/api/admin?userId=${userId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        alert("Utilisateur supprimé");
        setUserList((prev) => prev.filter((u) => u.id !== userId));
      } else {
        alert("Erreur lors de la suppression");
      }
    } catch {
      alert("Erreur réseau");
    } finally {
      setLoadingId(null);
    }
  }

  async function handleDeleteReport(reportId: string) {
    if (!confirm("Supprimer ce rapport ?")) return;

    setLoadingId(reportId);
    try {
      const res = await fetch(`/api/admin?reportId=${reportId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        alert("Rapport supprimé");
        setReportList((prev) => prev.filter((r) => r.id !== reportId));
      } else {
        alert("Erreur lors de la suppression");
      }
    } catch {
      alert("Erreur réseau");
    } finally {
      setLoadingId(null);
    }
  }

  return (
    <div className="p-6 space-y-10">
      <h2 className="text-2xl font-bold">Derniers utilisateurs inscrits</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">Nom</th>
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">Rôle</th>
            <th className="border border-gray-300 p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((user) => (
            <tr key={user.id}>
              <td className="border border-gray-300 p-2">{user.name || "Inconnu"}</td>
              <td className="border border-gray-300 p-2">{user.email}</td>
              <td className="border border-gray-300 p-2 capitalize">{user.role}</td>
              <td className="border border-gray-300 p-2 text-center">
                <button
                  disabled={loadingId === user.id}
                  onClick={() => handleDeleteUser(user.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded disabled:opacity-50"
                >
                  {loadingId === user.id ? "Suppression..." : "Supprimer"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="text-2xl font-bold mt-12">Derniers rapports</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">Titre</th>
            <th className="border border-gray-300 p-2">Auteur</th>
            <th className="border border-gray-300 p-2">Date</th>
            <th className="border border-gray-300 p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {reportList.map((report) => (
            <tr key={report.id}>
              <td className="border border-gray-300 p-2">{report.title}</td>
              <td className="border border-gray-300 p-2">{report.user?.name || "Inconnu"}</td>
              <td className="border border-gray-300 p-2">{new Date(report.createdAt).toLocaleDateString()}</td>
              <td className="border border-gray-300 p-2 text-center">
                <button
                  disabled={loadingId === report.id}
                  onClick={() => handleDeleteReport(report.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded disabled:opacity-50"
                >
                  {loadingId === report.id ? "Suppression..." : "Supprimer"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
