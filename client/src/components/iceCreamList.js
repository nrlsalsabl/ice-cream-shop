// src/components/IceCreamList.js
import React, { useState, useEffect } from 'react';
import { supabase } from '../services/supabaseClient';

const IceCreamList = ({ onAddToCart }) => {
  const [iceCreams, setIceCreams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchIceCreams();
  }, []);

  // Fungsi untuk mengambil data es krim dari Supabase
  const fetchIceCreams = async () => {
    try {
      const { data, error } = await supabase
        .from('ice_creams')
        .select('*')
        .gt('stock', 0);

      if (error) throw error;
      setIceCreams(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching ice creams:', error);
      setLoading(false);
    }
  };

  if (loading) return <div>Memuat es krim...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {iceCreams.map(iceCream => (
        <div key={iceCream.id} className="border p-4 rounded">
          {/* Menampilkan gambar es krim jika URL gambar ada */}
          {iceCream.image_url && (
            <img 
              src={iceCream.image_url} 
              alt={iceCream.name} 
              className="w-full h-48 object-cover rounded-t-lg"
            />
          )}
          <h3 className="text-lg font-semibold">{iceCream.name}</h3>
          <p>{iceCream.description}</p>
          <p>Harga: Rp {iceCream.price}</p>
          <p>Stok: {iceCream.stock}</p>
          <button 
            onClick={() => onAddToCart(iceCream)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Tambah ke Keranjang
          </button>
        </div>
      ))}
    </div>
  );
};

export default IceCreamList;
