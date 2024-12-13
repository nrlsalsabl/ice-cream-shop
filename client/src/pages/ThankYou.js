import React from 'react';
import { useLocation } from 'react-router-dom';

const ThankYou = () => {
  const location = useLocation();
  const { state } = location || {};
  const { order } = state || {};

  if (!order) {
    return <div className="text-center text-2xl text-gray-700">Pesanan tidak ditemukan.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-3xl font-bold text-center text-green-600 mb-4">Terima Kasih!</h2>
        <p className="text-xl text-center mb-4 text-gray-700">
          Pesanan Anda telah berhasil diproses. Terima kasih sudah berbelanja!
        </p>

        <div className="space-y-4">
          <p className="text-lg font-semibold">Pesanan Anda:</p>
          <p><strong>Nama:</strong> {order.customer_name}</p>
          <p><strong>Email:</strong> {order.customer_email}</p>
          <p><strong>Total Harga:</strong> Rp {order.total_price}</p>

          <h3 className="text-lg font-semibold mt-4">Item Pesanan:</h3>
          <ul className="space-y-2">
            {order.items.map((item, index) => (
              <li key={index} className="flex justify-between">
                <span>{item.name}</span>
                <span>{item.quantity} x Rp {item.price}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-6 text-lg text-center text-gray-600">Segera diproses. Mohon menunggu.</p>
      </div>
    </div>
  );
};

export default ThankYou;
