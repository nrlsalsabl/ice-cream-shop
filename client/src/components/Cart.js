import React, { useState } from 'react';
import { supabase } from '../services/supabaseClient';
import { useNavigate } from 'react-router-dom';

const Cart = ({ cartItems, onRemoveItem, onClearCart }) => {
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce((total, item) => 
    total + (item.price * item.quantity), 0
  );

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const orderDate = new Date().toISOString();

      const { data, error } = await supabase
        .from('orders')
        .insert([
          {
            customer_name: customerName,
            customer_email: customerEmail,
            total_price: totalPrice,
            order_date: orderDate,
            status: 'pending',
          }
        ]);

      if (error) {
        console.error('Error:', error);
        alert('Gagal membuat pesanan');
        return;
      }

      alert('Pesanan berhasil dibuat!');
      onClearCart();
      setCustomerName('');
      setCustomerEmail('');

      navigate('/thank-you', {
        state: {
          order: {
            customer_name: customerName,
            customer_email: customerEmail,
            total_price: totalPrice,
            items: cartItems
          }
        }
      });
    } catch (error) {
      console.error('Error:', error);
      alert('Gagal membuat pesanan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Keranjang Belanja</h2>
      
      {cartItems.length === 0 ? (
        <p className="text-center text-xl text-gray-500">Keranjang Anda kosong.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map(item => (
            <div key={item.id} className="flex justify-between items-center bg-white shadow-md rounded-lg p-4">
              <div>
                <p className="text-xl font-semibold">{item.name}</p>
                <p className="text-gray-600">{item.quantity} x Rp {item.price}</p>
              </div>
              <button 
                onClick={() => onRemoveItem(item.id)}
                className="text-red-500 hover:text-red-700 font-semibold"
              >
                Hapus
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 flex justify-between items-center">
        <p className="text-xl font-semibold text-gray-800">Total: Rp {totalPrice}</p>
      </div>

      <form onSubmit={handleSubmitOrder} className="mt-8 space-y-4">
        <input 
          type="text" 
          placeholder="Nama Anda" 
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          required
          className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input 
          type="email" 
          placeholder="Email Anda" 
          value={customerEmail}
          onChange={(e) => setCustomerEmail(e.target.value)}
          required
          className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button 
          type="submit" 
          disabled={cartItems.length === 0 || loading}
          className={`w-full py-3 text-white font-semibold rounded-lg transition-all duration-300 ${
            cartItems.length === 0 || loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-green-500 hover:bg-green-600'
          }`}
        >
          {loading ? 'Memproses...' : 'Buat Pesanan'}
        </button>
      </form>
    </div>
  );
};

export default Cart;
