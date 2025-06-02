import React, { useState, useEffect } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  Target, 
  PiggyBank, 
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Calendar,
  Award,
  Bell,
  Eye,
  EyeOff
} from 'lucide-react';

const DashboardHome = () => {
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Mock data
  const stats = {
    totalBalance: 12847.50,
    monthlyIncome: 4200.00,
    monthlySavings: 850.00,
    savingsRate: 20.2
  };

  const savingsGoals = [
    { id: 1, name: 'Emergency Fund', target: 10000, current: 7500, color: 'bg-emerald-500' },
    { id: 2, name: 'Vacation', target: 3000, current: 1800, color: 'bg-blue-500' },
    { id: 3, name: 'New Car', target: 15000, current: 4200, color: 'bg-purple-500' },
    { id: 4, name: 'Home Down Payment', target: 50000, current: 18500, color: 'bg-orange-500' }
  ];

  const recentTransactions = [
    { id: 1, type: 'deposit', description: 'Salary Deposit', amount: 4200.00, date: '2025-06-01', category: 'Income' },
    { id: 2, type: 'withdrawal', description: 'Grocery Shopping', amount: -127.45, date: '2025-05-31', category: 'Food' },
    { id: 3, type: 'deposit', description: 'Investment Return', amount: 185.30, date: '2025-05-30', category: 'Investment' },
    { id: 4, type: 'withdrawal', description: 'Monthly Rent', amount: -1200.00, date: '2025-05-30', category: 'Housing' },
    { id: 5, type: 'deposit', description: 'Freelance Work', amount: 650.00, date: '2025-05-29', category: 'Income' }
  ];

  const monthlyData = [
    { month: 'Jan', income: 40000, expenses: 3200, savings: 800 },
    { month: 'Feb', income: 41000, expenses: 3100, savings: 1000 },
    { month: 'Mar', income: 42000, expenses: 3400, savings: 800 },
    { month: 'Apr', income: 43000, expenses: 3300, savings: 1000 },
    { month: 'May', income: 42000, expenses: 3350, savings: 850 },
    { month: 'Jun', income: 42000, expenses: 3200, savings: 1000 }
  ];

  const achievements = [
    { id: 1, title: 'First $1000 Saved', completed: true, icon: '🎯' },
    { id: 2, title: '6 Month Streak', completed: true, icon: '🔥' },
    { id: 3, title: 'Emergency Fund 75%', completed: true, icon: '🛡️' },
    { id: 4, title: 'Budget Master', completed: false, icon: '📊' }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'RWF',
      minimumFractionDigits: 2
    }).format(Math.abs(amount));
  };

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {getGreeting()}, Chadrack! 👋
            </h1>
            <p className="text-gray-600">
              Here's your financial overview for {currentTime.toLocaleDateString('en-US', { 
                weekday: 'long',
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
          <div className="flex gap-3">
            <button className="bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-xl border border-gray-200 flex items-center gap-2 transition-all">
              <Bell size={16} />
              Notifications
            </button>
            <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-2 rounded-xl flex items-center gap-2 transition-all shadow-lg">
              <Plus size={16} />
              Add Transaction
            </button>
          </div>
        </div>

        {/* Main Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gradient-to-br from-green-100 to-emerald-100 p-3 rounded-xl">
                <DollarSign className="text-green-600" size={24} />
              </div>
              <button 
                onClick={() => setBalanceVisible(!balanceVisible)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                {balanceVisible ? <Eye size={16} /> : <EyeOff size={16} />}
              </button>
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">Total Balance</h3>
            <p className="text-3xl font-bold text-gray-900">
              {balanceVisible ? formatCurrency(stats.totalBalance) : '••••••'}
            </p>
            <div className="flex items-center mt-3 text-green-600">
              <ArrowUpRight size={16} />
              <span className="text-sm font-medium ml-1">+12.5% this month</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gradient-to-br from-blue-100 to-cyan-100 p-3 rounded-xl">
                <TrendingUp className="text-blue-600" size={24} />
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">Monthly Income</h3>
            <p className="text-3xl font-bold text-gray-900">{formatCurrency(stats.monthlyIncome)}</p>
            <div className="flex items-center mt-3 text-blue-600">
              <ArrowUpRight size={16} />
              <span className="text-sm font-medium ml-1">+2.4% vs last month</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gradient-to-br from-purple-100 to-indigo-100 p-3 rounded-xl">
                <PiggyBank className="text-purple-600" size={24} />
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">Monthly Savings</h3>
            <p className="text-3xl font-bold text-gray-900">{formatCurrency(stats.monthlySavings)}</p>
            <div className="flex items-center mt-3 text-purple-600">
              <ArrowUpRight size={16} />
              <span className="text-sm font-medium ml-1">Target: $1,000</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gradient-to-br from-orange-100 to-red-100 p-3 rounded-xl">
                <Target className="text-orange-600" size={24} />
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">Savings Rate</h3>
            <p className="text-3xl font-bold text-gray-900">{stats.savingsRate}%</p>
            <div className="flex items-center mt-3 text-orange-600">
              <span className="text-sm font-medium">Excellent! 📈</span>
            </div>
          </div>
        </div>

        {/* Savings Goals & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Savings Goals */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Savings Goals</h2>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View All
              </button>
            </div>
            <div className="space-y-4">
              {savingsGoals.map((goal) => {
                const progress = (goal.current / goal.target) * 100;
                return (
                  <div key={goal.id} className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold text-gray-900">{goal.name}</h3>
                      <span className="text-sm text-gray-600">
                        {formatCurrency(goal.current)} / {formatCurrency(goal.target)}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                      <div 
                        className={`h-2 rounded-full ${goal.color} transition-all duration-500`}
                        style={{ width: `${Math.min(progress, 100)}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">{progress.toFixed(1)}% complete</span>
                      <span className="text-sm font-medium text-gray-700">
                        {formatCurrency(goal.target - goal.current)} to go
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View All
              </button>
            </div>
            <div className="space-y-3">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      transaction.type === 'deposit' 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-red-100 text-red-600'
                    }`}>
                      {transaction.type === 'deposit' ? (
                        <ArrowUpRight size={16} />
                      ) : (
                        <ArrowDownRight size={16} />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{transaction.description}</p>
                      <p className="text-sm text-gray-500">{transaction.category} • {transaction.date}</p>
                    </div>
                  </div>
                  <span className={`font-semibold ${
                    transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.amount > 0 ? '+' : ''}{formatCurrency(transaction.amount)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Row - Chart & Achievements */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Savings Trend Chart */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Savings Trend</h2>
              <div className="flex gap-2">
                <button className="px-3 py-1 bg-blue-100 text-blue-600 rounded-lg text-sm font-medium">6M</button>
                <button className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium">1Y</button>
              </div>
            </div>
            <div className="h-64 flex items-end justify-between gap-4">
              {monthlyData.map((data, index) => {
                const maxValue = Math.max(...monthlyData.map(d => d.savings));
                const height = (data.savings / maxValue) * 200;
                return (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg mb-2 hover:from-blue-600 hover:to-blue-500 transition-colors cursor-pointer" 
                         style={{ height: `${height}px` }}
                         title={`${data.month}: ${formatCurrency(data.savings)}`}>
                    </div>
                    <span className="text-sm text-gray-600 font-medium">{data.month}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Achievements</h2>
              <Award className="text-yellow-500" size={20} />
            </div>
            <div className="space-y-4">
              {achievements.map((achievement) => (
                <div key={achievement.id} className={`p-4 rounded-xl border-2 transition-all ${
                  achievement.completed 
                    ? 'border-green-200 bg-green-50' 
                    : 'border-gray-200 bg-gray-50'
                }`}>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{achievement.icon}</span>
                    <div className="flex-1">
                      <h3 className={`font-semibold ${
                        achievement.completed ? 'text-green-900' : 'text-gray-700'
                      }`}>
                        {achievement.title}
                      </h3>
                      <p className={`text-sm ${
                        achievement.completed ? 'text-green-600' : 'text-gray-500'
                      }`}>
                        {achievement.completed ? 'Completed!' : 'In Progress'}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="flex flex-col items-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl hover:from-blue-100 hover:to-indigo-100 transition-all">
              <Plus className="text-blue-600 mb-2" size={24} />
              <span className="text-sm font-medium text-gray-700">Add Income</span>
            </button>
            <button className="flex flex-col items-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl hover:from-green-100 hover:to-emerald-100 transition-all">
              <Target className="text-green-600 mb-2" size={24} />
              <span className="text-sm font-medium text-gray-700">New Goal</span>
            </button>
            <button className="flex flex-col items-center p-4 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl hover:from-purple-100 hover:to-indigo-100 transition-all">
              <Calendar className="text-purple-600 mb-2" size={24} />
              <span className="text-sm font-medium text-gray-700">Budget Plan</span>
            </button>
            <button className="flex flex-col items-center p-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl hover:from-orange-100 hover:to-red-100 transition-all">
              <CreditCard className="text-orange-600 mb-2" size={24} />
              <span className="text-sm font-medium text-gray-700">View Report</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;