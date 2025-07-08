// app/api/admin/dashboard/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Statistiques générales
    const totalUsers = await prisma.user.count();
    const totalCours = await prisma.cours.count();
    const totalBusiness = await prisma.busines.count();
    const totalReports = await prisma.report.count();
    const totalAchats = await prisma.achatCours.count();

    // Revenus totaux
    const revenusCoursData = await prisma.achatCours.findMany({
      include: {
        cours: true,
      },
    });
    const revenusTotal = revenusCoursData.reduce((sum, achat) => sum + achat.cours.prix, 0);

    // Utilisateurs par rôle
    const usersParRole = await prisma.user.groupBy({
      by: ['role'],
      _count: {
        id: true,
      },
    });

    // Cours par catégorie
    const coursParCategorie = await prisma.cours.groupBy({
      by: ['categorie'],
      _count: {
        id: true,
      },
    });

    // Évolution des inscriptions (30 derniers jours)
    const inscriptionsParJour = await prisma.user.groupBy({
      by: ['createdAt'],
      _count: {
        id: true,
      },
      where: {
        createdAt: {
          gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 jours
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    // Achats par mois (6 derniers mois)
    const achatsParMois = await prisma.achatCours.groupBy({
      by: ['createdAt'],
      _count: {
        id: true,
      },
      where: {
        createdAt: {
          gte: new Date(Date.now() - 6 * 30 * 24 * 60 * 60 * 1000), // 6 mois
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    // Revenus par mois
    const revenusParMois = await prisma.achatCours.findMany({
      include: {
        cours: true,
      },
      where: {
        createdAt: {
          gte: new Date(Date.now() - 6 * 30 * 24 * 60 * 60 * 1000), // 6 mois
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    // Progression des utilisateurs
    const progressionStats = await prisma.progression.count();

    // Top 5 cours les plus achetés
    const topCours = await prisma.cours.findMany({
      include: {
        _count: {
          select: {
            achatCours: true,
          },
        },
      },
      orderBy: {
        achatCours: {
          _count: 'desc',
        },
      },
      take: 5,
    });

    // Activité récente
    const activiteRecente = await prisma.user.findMany({
      where: {
        createdAt: {
          gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 jours
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 10,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    // Formatage des données pour les graphiques
    const formattedInscriptions = inscriptionsParJour.map(item => ({
      date: item.createdAt.toISOString().split('T')[0],
      inscriptions: item._count.id,
    }));

    const formattedAchats = achatsParMois.reduce((acc, item) => {
      const mois = item.createdAt.toISOString().slice(0, 7);
      acc[mois] = (acc[mois] || 0) + item._count.id;
      return acc;
    }, {} as Record<string, number>);

    const formattedRevenus = revenusParMois.reduce((acc, item) => {
      const mois = item.createdAt.toISOString().slice(0, 7);
      acc[mois] = (acc[mois] || 0) + item.cours.prix;
      return acc;
    }, {} as Record<string, number>);

    const achatsParMoisData = Object.entries(formattedAchats).map(([mois, count]) => ({
      mois,
      achats: count,
      revenus: formattedRevenus[mois] || 0,
    }));

    return NextResponse.json({
      stats: {
        totalUsers,
        totalCours,
        totalBusiness,
        totalReports,
        totalAchats,
        revenusTotal,
        progressionStats,
      },
      usersParRole: usersParRole.map(item => ({
        role: item.role,
        count: item._count.id,
      })),
      coursParCategorie: coursParCategorie.map(item => ({
        categorie: item.categorie,
        count: item._count.id,
      })),
      inscriptionsParJour: formattedInscriptions,
      achatsParMois: achatsParMoisData,
      topCours: topCours.map(cours => ({
        id: cours.id,
        titre: cours.titre,
        prix: cours.prix,
        achats: cours._count.achatCours,
        revenus: cours.prix * cours._count.achatCours,
        imageUrl: cours.imageUrl,
      })),
      activiteRecente,
    });
  } catch (error) {
    console.error('Erreur dashboard admin:', error);
    return NextResponse.json(
      { error: 'Erreur lors du chargement du dashboard' },
      { status: 500 }
    );
  }
}