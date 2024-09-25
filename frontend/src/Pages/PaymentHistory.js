import React from 'react';
import './PaymentHistory.css';

const PaymentHistory = () => {
  const transactions = [
    { id: 1, date: '2024-09-15', service: 'Oil Change', amount: '$50' },
    { id: 2, date: '2024-09-10', service: 'Brake Repair', amount: '$200' },
  ];

  return (
    <div className="history-container">
      <h1>Payment History</h1>
      <table className="history-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Service</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.date}</td>
              <td>{transaction.service}</td>
              <td>{transaction.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentHistory;
