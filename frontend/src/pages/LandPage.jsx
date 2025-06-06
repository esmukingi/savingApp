import React, { useState, useEffect } from 'react';
import { Plus, DollarSign, TrendingUp, Target, Save, X } from 'lucide-react';
import { useSavingsStore } from '../store/ClassStore.js';

const LandPage = () => {
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [isSettingGoal, setIsSettingGoal] = useState(false);
  const [yearlyGoals, setYearlyGoals] = useState([]);
  const [newGoal, setNewGoal] = useState({ year: new Date().getFullYear(), goal: 0 });
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const { savings, loading, error, fetchSavings, addSaving } = useSavingsStore();

  const [newSaving, setNewSaving] = useState({
    categoryName: 'Class Service',
    year: new Date().getFullYear(),
    month: new Date().toLocaleString('default', { month: 'long' }),
    amount: 0
  });

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i);

  // Calculate total saved for selected year and selected category
  const totalSavedForYear = savings.reduce((sum, savingDoc) => {
    return sum + savingDoc.categories.reduce((catSum, category) => {
      if (category.name !== newSaving.categoryName) return catSum; // Only count selected category
      return catSum + (category.yearlySavings || []).reduce((savingSum, saving) => {
        return saving.year === selectedYear ? savingSum + saving.amount : savingSum;
      }, 0);
    }, 0);
  }, 0);

  const goalForYear = yearlyGoals.find(yg => yg.year === selectedYear)?.goal || 0;
  const remainingForYear = goalForYear - totalSavedForYear;
  const progressForYear = goalForYear > 0 ? (totalSavedForYear / goalForYear) * 100 : 0;

  // Calculate monthly savings (only for the selected category and selected year)
  const monthlySavings = {};
  savings.forEach(doc => {
    doc.categories.forEach(category => {
      if (category.name !== newSaving.categoryName) return; // Only for the chosen category
      (category.yearlySavings || []).forEach(saving => {
        if (saving.year !== selectedYear) return;
        const key = `${saving.year}-${saving.month}`;
        if (!monthlySavings[key]) {
          monthlySavings[key] = { year: saving.year, month: saving.month, total: 0 };
        }
        monthlySavings[key].total += saving.amount;
      });
    });
  });

  const monthlySavingsArray = Object.values(monthlySavings).sort((a, b) => {
    if (a.year !== b.year) return a.year - b.year;
    return months.indexOf(a.month) - months.indexOf(b.month);
  });

  // Add new saving handler
  const handleAddNew = async () => {
    if (!newSaving.amount || newSaving.amount <= 0) {
      alert('Please enter a valid amount');
      return;
    }
    const success = await addSaving(newSaving);
    if (success) {
      setNewSaving({
        categoryName: 'Class Service',
        year: new Date().getFullYear(),
        month: new Date().toLocaleString('default', { month: 'long' }),
        amount: 0
      });
      setIsAddingNew(false);
      fetchSavings();
    }
  };

  // Set yearly goal handler
  const handleSetGoal = () => {
    if (newGoal.goal <= 0) {
      alert('Please enter a valid goal amount');
      return;
    }
    const existingIndex = yearlyGoals.findIndex(yg => yg.year === newGoal.year);
    if (existingIndex >= 0) {
      setYearlyGoals(yearlyGoals.map((yg, idx) => idx === existingIndex ? newGoal : yg));
    } else {
      setYearlyGoals([...yearlyGoals, newGoal]);
    }
    setIsSettingGoal(false);
    setNewGoal({ year: new Date().getFullYear(), goal: 0 });
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'RWF',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  useEffect(() => {
    fetchSavings();
  }, []);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <div className="bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-100 min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                <TrendingUp className="text-purple-600" size={40} />
                Savings Management
              </h1>
              <p className="text-gray-600 text-lg">
                Track your savings progress and financial goals
              </p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setIsAddingNew(!isAddingNew)}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-6 py-2 rounded-xl flex items-center gap-2 transition-all shadow-lg"
              >
                <Plus size={16} />
                Add Savings
              </button>
              <button
                onClick={() => setIsSettingGoal(true)}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-6 py-2 rounded-xl flex items-center gap-2 transition-all shadow-lg"
              >
                <Target size={16} />
                Set Yearly Goal
              </button>
            </div>
          </div>
        </div>

        {/* Year Selection */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Select Year</h3>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>

        {/* Add New Savings Form */}
        {isAddingNew && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Savings</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <select
                value={newSaving.year}
                onChange={(e) => setNewSaving({ ...newSaving, year: parseInt(e.target.value) })}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
              <select
                value={newSaving.month}
                onChange={(e) => setNewSaving({ ...newSaving, month: e.target.value })}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {months.map(month => (
                  <option key={month} value={month}>{month}</option>
                ))}
              </select>
              <input
                type="number"
                placeholder="Amount *"
                value={newSaving.amount}
                onChange={(e) => setNewSaving({ ...newSaving, amount: parseFloat(e.target.value) || 0 })}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2 mt-4">
              <button
                onClick={handleAddNew}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <Save size={16} /> Save
              </button>
              <button
                onClick={() => setIsAddingNew(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <X size={16} /> Cancel
              </button>
            </div>
          </div>
        )}

        {/* Set Yearly Goal Modal */}
        {isSettingGoal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-lg relative">
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                onClick={() => setIsSettingGoal(false)}
                aria-label="Close"
              >
                <X size={24} />
              </button>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Set Yearly Savings Goal</h3>
              <select
                value={newGoal.year}
                onChange={(e) => setNewGoal({ ...newGoal, year: parseInt(e.target.value) })}
                className="border border-gray-300 rounded-lg px-3 py-2 w-full mb-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
              <input
                type="number"
                placeholder="Goal Amount *"
                value={newGoal.goal}
                onChange={(e) => setNewGoal({ ...newGoal, goal: parseFloat(e.target.value) || 0 })}
                className="border border-gray-300 rounded-lg px-3 py-2 w-full mb-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={handleSetGoal}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl w-full transition-colors"
              >
                Set Goal
              </button>
            </div>
          </div>
        )}

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
            <DollarSign className="text-green-600" size={32} />
            <div>
              <p className="text-sm font-medium text-gray-600">Total Saved ({selectedYear})</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalSavedForYear)}</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
            <Target className="text-blue-600" size={32} />
            <div>
              <p className="text-sm font-medium text-gray-600">Goal ({selectedYear})</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(goalForYear)}</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
            <Save className="text-purple-600" size={32} />
            <div>
              <p className="text-sm font-medium text-gray-600">Remaining to Goal</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(Math.max(remainingForYear, 0))}</p>
            </div>
          </div>
        </div>

        {/* Monthly Savings Table */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 overflow-x-auto">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Monthly Savings for {selectedYear}</h3>
          <table className="min-w-full text-left">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b border-gray-200">Month</th>
                <th className="px-4 py-2 border-b border-gray-200">Amount Saved</th>
              </tr>
            </thead>
            <tbody>
              {monthlySavingsArray.length === 0 && (
                <tr>
                  <td colSpan="2" className="px-4 py-2 text-center text-gray-500">
                    No savings recorded for this year.
                  </td>
                </tr>
              )}
              {monthlySavingsArray.map(({ month, total }) => (
                <tr key={month}>
                  <td className="px-4 py-2 border-b border-gray-100">{month}</td>
                  <td className="px-4 py-2 border-b border-gray-100 font-semibold">{formatCurrency(total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LandPage;
