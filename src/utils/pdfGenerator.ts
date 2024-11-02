import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Transaction } from '../components/TransactionForm';
import { format } from 'date-fns';

export const generatePDF = (transactions: Transaction[]) => {
  const doc = new jsPDF();

  // Add title
  doc.setFontSize(20);
  doc.text('Ganesh General Store', 14, 15);
  
  doc.setFontSize(16);
  doc.text('Daily Account Book', 14, 25);

  // Add date
  doc.setFontSize(10);
  doc.text(`Generated on: ${format(new Date(), 'MMMM dd, yyyy')}`, 14, 35);

  // Calculate totals
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  const balance = totalIncome - totalExpense;

  // Add summary
  doc.text(`Total Income: ₹${totalIncome.toFixed(2)}`, 14, 45);
  doc.text(`Total Expenses: ₹${totalExpense.toFixed(2)}`, 14, 52);
  doc.text(`Balance: ₹${balance.toFixed(2)}`, 14, 59);

  // Create table
  autoTable(doc, {
    startY: 70,
    head: [['Date', 'Description', 'Type', 'Amount']],
    body: transactions.map((transaction) => [
      format(new Date(transaction.date), 'MMM dd, yyyy'),
      transaction.description,
      transaction.type,
      `₹${transaction.amount.toFixed(2)}`,
    ]),
    styles: { fontSize: 8 },
    headStyles: { fillColor: [66, 139, 202] },
  });

  doc.save('ganesh-store-accounts.pdf');
};