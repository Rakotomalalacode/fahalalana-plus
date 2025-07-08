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
}

const AnalyticsPage: React.FC = () => {
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

  const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, color, subtitle }) => (
    <div className="bg-white p-6 rounded-lg shadow-md border-l-4" style={{ borderLeftColor: color }}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>
        <Icon className="h-8 w-8" style={{ color }} />
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">

          
          <div className="border p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Répartition des Utilisateurs</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={usersParRole}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ role, count }) => `${role}: ${count}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {usersParRole.map((entry: UserRole, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          
          <div className="border p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Cours par Catégorie</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={coursParCategorie}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="categorie" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          
          <div className="border p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Inscriptions (30 derniers jours)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={inscriptionsParJour}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="inscriptions" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="border p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Achats & Revenus (6 mois)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={achatsParMois}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mois" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Bar yAxisId="left" dataKey="achats" fill="#8884d8" />
                <Line yAxisId="right" type="monotone" dataKey="revenus" stroke="#ff7300" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
  );
};

export default AnalyticsPage;