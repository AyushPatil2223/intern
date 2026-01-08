import { useAuthStore } from '@/store/authStore';
import { useState, useEffect } from 'react';
import { visitorApi } from '@/lib/api'; 

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, UserCheck, FileText, TrendingUp, Building2, LogOut } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

export default function Dashboard() {
  const { user } = useAuthStore();

  const [stats, setStats] = useState({
    totalVisitors: 0,
    todaysVisitors: 0,
    totalCompanies: 0,
    growthRate: 0,
  });

  const [monthlyData, setMonthlyData] = useState([]);
  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await visitorApi.getAllVisitors(); // all visitors
        const visitors = res.data;

        // Total visitors
        const totalVisitors = visitors.length;

        // Today's visitors
        const today = new Date().toISOString().split('T')[0];
        const todaysVisitors = visitors.filter(v => v.visitDate.startsWith(today)).length;



        // Unique companies count
const companySet = new Set(
  visitors
    .map(v => v.companyName)
    .filter(name => name && name.trim() !== '')
);

const totalCompanies = companySet.size;


        // Monthly trends (last 6 months)
        const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        const monthlyMap: Record<string, number> = {};
        for(let i = 5; i >= 0; i--){
          const d = new Date();
          d.setMonth(d.getMonth() - i);
          monthlyMap[monthNames[d.getMonth()]] = 0;
        }
        visitors.forEach(v => {
          const date = new Date(v.visitDate);
          const month = monthNames[date.getMonth()];
          if(month in monthlyMap) monthlyMap[month]++;
        });
        const newMonthlyData = Object.entries(monthlyMap).map(([month, visitors]) => ({ month, visitors }));

        // Daily trends (last 7 days)
        const dailyMap: Record<string, number> = {};
        const dayNames = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
        for(let i = 6; i >= 0; i--){
          const d = new Date();
          d.setDate(d.getDate() - i);
          const day = dayNames[d.getDay()];
          dailyMap[day] = 0;
        }
        visitors.forEach(v => {
          const date = new Date(v.visitDate);
          const day = dayNames[date.getDay()];
          if(day in dailyMap) dailyMap[day]++;
        });
        const newDailyData = Object.entries(dailyMap).map(([day, count]) => ({ day, count }));

        // Growth rate example (today vs yesterday)
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];
        const yesterdayVisitors = visitors.filter(v => v.visitDate.startsWith(yesterdayStr)).length;
        const growthRate = yesterdayVisitors === 0 ? 0 : ((todaysVisitors - yesterdayVisitors) / yesterdayVisitors) * 100;



        // Set stats
        setStats({
          totalVisitors,
          todaysVisitors,
          totalCompanies, // if reports exist, calculate from API
          growthRate,
        });
        setMonthlyData(newMonthlyData);
        setDailyData(newDailyData);

      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const statsCards = [
    { title: 'Total Visitors', value: stats.totalVisitors, icon: Users, change: '+0%', color: 'from-primary to-primary-glow' },
    { title: "Today's Visitors", value: stats.todaysVisitors, icon: UserCheck, change: `${stats.growthRate.toFixed(1)}%`, color: 'from-secondary to-accent' },
    { title: 'Total Companies', 
  value: stats.totalCompanies, 
  icon: Building2, 
  change: '+0%', 
  color: 'from-accent to-destructive' },
    { title: 'Growth Rate', value: `${stats.growthRate.toFixed(1)}%`, icon: TrendingUp, change: '+0%', color: 'from-primary to-secondary' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">
         {user?.name}
        </h1>
        <p className="text-muted-foreground mt-1">
          
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statsCards.map((stat) => (
          <Card key={stat.title} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.color}`}>
                <stat.icon className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-green-600 mt-1">
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Visitor Trends (Monthly)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '0.5rem',
                  }}
                />
                <Bar dataKey="visitors" fill="url(#colorGradient)" radius={[8, 8, 0, 0]} />
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--primary))" />
                    <stop offset="100%" stopColor="hsl(var(--primary-glow))" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Daily Activity (This Week)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '0.5rem',
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="count" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                  dot={{ fill: 'hsl(var(--primary))', r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {user?.role === 'admin' && (
        <Card className="border-0 shadow-lg bg-gradient-to-br from-primary/5 to-secondary/5">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="p-4 rounded-lg bg-card border border-border hover:shadow-md transition-shadow cursor-pointer">
                <Users className="h-8 w-8 text-primary mb-2" />
                <h3 className="font-semibold">Manage Users</h3>
                <p className="text-sm text-muted-foreground">Add or remove system users</p>
              </div>
              <div className="p-4 rounded-lg bg-card border border-border hover:shadow-md transition-shadow cursor-pointer">
                <FileText className="h-8 w-8 text-secondary mb-2" />
                <h3 className="font-semibold">View Reports</h3>
                <p className="text-sm text-muted-foreground">Access detailed visitor reports</p>
              </div>
              <div className="p-4 rounded-lg bg-card border border-border hover:shadow-md transition-shadow cursor-pointer">
                <TrendingUp className="h-8 w-8 text-accent mb-2" />
                <h3 className="font-semibold">Analytics</h3>
                <p className="text-sm text-muted-foreground">View detailed analytics</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
