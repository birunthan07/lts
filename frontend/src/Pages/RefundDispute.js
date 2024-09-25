import React from 'react';
import './RefundDispute.css';

const RefundDispute = () => {
  const disputes = [
    { id: 1, user: 'John Doe', service: 'Brake Repair', status: 'Pending', amount: '$200' },
  ];

  return (
    <div className="dispute-container">
      <h1>Manage Refunds & Disputes</h1>
      <table className="dispute-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Service</th>
            <th>Status</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {disputes.map((dispute) => (
            <tr key={dispute.id}>
              <td>{dispute.user}</td>
              <td>{dispute.service}</td>
              <td>{dispute.status}</td>
              <td>{dispute.amount}</td>
              <td>
                <button className="resolve-button">Resolve</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RefundDispute;
