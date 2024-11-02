import React, { useState, useEffect, Suspense } from 'react';
import { TransactionForm, Transaction } from './components/TransactionForm';
import { TransactionList } from './components/TransactionList';
import { generatePDF } from './utils/pdfGenerator';
import { Preloader } from './components/Preloader';

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Simulate any initial data loading or setup
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsInitialized(true);
      } catch (error) {
        console.error('Failed to initialize app:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeApp();
  }, []);

  const handleAddTransaction = (transaction: Transaction) => {
    setTransactions(prev => [...prev, transaction]);
  };

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  const balance = totalIncome - totalExpense;

  if (!isInitialized || isLoading) {
    return <Preloader />;
  }

  return (
    <Suspense fallback={<Preloader />}>
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Ganesh General Store</h1>
            <p className="text-gray-600">Daily Account Book</p>
            <button
              onClick={() => generatePDF(transactions)}
              className="mt-4 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Download PDF
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-700 mb-2">Income</h2>
              <p className="text-2xl font-bold text-green-600">₹{totalIncome.toFixed(2)}</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-700 mb-2">Expenses</h2>
              <p className="text-2xl font-bold text-red-600">₹{totalExpense.toFixed(2)}</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-700 mb-2">Balance</h2>
              <p className={`text-2xl font-bold ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ₹{balance.toFixed(2)}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <TransactionForm onAddTransaction={handleAddTransaction} />
            </div>
            <div className="md:col-span-2">
              <TransactionList transactions={transactions} />
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
}

export default App;