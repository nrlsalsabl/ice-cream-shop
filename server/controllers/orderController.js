exports.createOrder = async (req, res) => {
    try {
      const { customer_name, customer_email, items } = req.body;
      
      // Hitung total harga
      const totalPrice = items.reduce((total, item) => total + item.subtotal, 0);
  
      // Transaksi untuk membuat pesanan dan item pesanan
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert([{ 
          customer_name, 
          customer_email, 
          total_price: totalPrice 
        }])
        .select();
  
      if (orderError) throw orderError;
  
      const orderId = orderData[0].id;
  
      // Masukkan item pesanan
      const orderItemsData = items.map(item => ({
        order_id: orderId,
        ice_cream_id: item.ice_cream_id,
        quantity: item.quantity,
        subtotal: item.subtotal
      }));
  
      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItemsData);
  
      if (itemsError) throw itemsError;
  
      res.status(201).json(orderData[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };