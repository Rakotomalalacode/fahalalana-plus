import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, Area, AreaChart
} from 'recharts';
import { 
  Users, BookOpen, Briefcase, AlertTriangle, ShoppingCart, 
  TrendingUp, Eye, Calendar, DollarSign, Activity
} from 'lucide-react';
import { IconLoader } from '@tabler/icons-react';
import Image from 'next/image';
import { images } from '@/constants/images';

// Types pour les données du dashboard
interface DashboardStats {
  totalUsers: number;
  totalCours: number;
  totalBusiness: number;
  totalReports: number;
  totalAchats: number;
  revenusTotal: number;
  progressionStats: number;
}

interface UserRole {
  role: string;
  count: number;
}

interface CoursCategorie {
  categorie: string;
  count: number;
}

interface InscriptionData {
  date: string;
  inscriptions: number;
}

interface AchatMensuel {
  mois: string;
  achats: number;
  revenus: number;
}

interface TopCours {
  id: string;
  titre: string;
  prix: number;
  achats: number;
  revenus: number;
  imageUrl: string;
}

interface ActiviteRecente {
  id: string;
  name: string | null;
  email: string;
  role: string;
  createdAt: string;
}

interface DashboardData {
  stats: DashboardStats;
  usersParRole: UserRole[];
  coursParCategorie: CoursCategorie[];
  inscriptionsParJour: InscriptionData[];
  achatsParMois: AchatMensuel[];
  topCours: TopCours[];
  activiteRecente: ActiviteRecente[];
}

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ComponentType<any>;
  color: string;
  subtitle?: string;
  bgColor?: string;
}

const AdminDashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async (): Promise<void> => {
      try {
        const response = await fetch('/api/admin');
        if (!response.ok) {
          throw new Error('Erreur lors du chargement des données');
        }
        const data: DashboardData = await response.json();
        setDashboardData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const COLORS: string[] = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#00C49F'];

     const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, color, subtitle, bgColor }) => (
  <div className={` p-6 rounded-lg text-white`} style={{ backgroundColor: bgColor }}>
     <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium ">{title}</p>
          <p className="text-2xl font-bold ">{value}</p>
          {subtitle && <p className="text-sm ">{subtitle}</p>}
        </div>
        <Icon className="h-8 w-8 text-white" />
      </div>
    </div>
  );

  if (loading) {
    return <div className="h-[600px] flex justify-center items-center"><IconLoader className="animate-spin h-8 w-8 text-muted-foreground" /></div>
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-600">Erreur: {error}</p>
        </div>
      </div>
    );
  }

  const { stats, usersParRole, coursParCategorie, inscriptionsParJour, achatsParMois, topCours, activiteRecente } = dashboardData as DashboardData;

  return (
    <div className="w-full">
      
      <div className="">
          <div className=" pb-6">
            <h1 className="text-3xl font-bold">Dashboard Administrateur</h1>
            <p className="mt-1 text-gray-600">Vue d'ensemble de votre plateforme</p>
          </div>
      </div>

      <div className="w-full">
     
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Total Utilisateurs"
            value={stats.totalUsers}
            icon={Users}
            color="#3B82F6"
            subtitle="Inscrits sur la plateforme"
            bgColor='#3B82F6'
          />
          <StatCard
            title="Cours Disponibles"
            value={stats.totalCours}
            icon={BookOpen}
            color="#10B981"
            subtitle="Cours publiés"
            bgColor='#10B981'
          />
          <StatCard
            title="Business"
            value={stats.totalBusiness}
            icon={Briefcase}
            color="#F59E0B"
            subtitle="Projets business"
            bgColor='#F59E0B'
          />
          
        </div>

       
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatCard
            title="Revenus Total"
            value={`${stats.revenusTotal.toLocaleString()} Ar`}
            icon={DollarSign}
            color="#EF4444"
            subtitle="Chiffre d'affaires"
            bgColor="#EF4444"
          />
          <StatCard
            title="Achats de Cours"
            value={stats.totalAchats}
            icon={ShoppingCart}
            color="#8B5CF6"
            subtitle="Ventes totales"
            bgColor='#8B5CF6'
          />
          {/* <StatCard
            title="Signalements"
            value={stats.totalReports}
            icon={AlertTriangle}
            color="#F97316"
            subtitle="Reports à traiter"
          /> */}
          <StatCard
            title="Progression"
            value={stats.progressionStats}
            icon={TrendingUp}
            color="#06B6D4"
            subtitle="Activités de cours"
            bgColor='#06B6D4'
          />
        </div>

        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          <div className=" p-6 rounded-lg border">
            <h3 className="text-lg font-semibold mb-4">Top 5 Cours les Plus Vendus</h3>
            <div className="space-y-4">
              {topCours.map((cours: TopCours, index: number) => (
                <div key={cours.id} className="flex items-center justify-between p-3 border hover:bg-gray-50 rounded-md dark:hover:bg-transparent dark:border">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      {/* <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div> */}
                      <Image src={cours.imageUrl ? cours.imageUrl : images.ImageDefault} width={200} height={200} className="w-[100px] h-[60px] rounded" alt={cours.titre} />
                    </div>
                    <div>
                      <p className="font-medium">{cours.titre}</p>
                      <p className="text-sm text-gray-500">{cours.achats} achats</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{cours.prix} Ar</p>
                    <p className="text-sm text-green-600">{cours.revenus}Ar total</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          
          <div className=" p-6 rounded-lg border">
            <h3 className="text-lg font-semibold mb-4">Nouveaux Utilisateurs (7 derniers jours)</h3>
            <div className="space-y-4">
              {activiteRecente.map((user: ActiviteRecente) => (
                <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                      </div>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{user.name || 'Utilisateur'}</p>
                      <p className="text-sm hidden lg:block text-gray-500">{user.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{user.role}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;