const supabase = require('../config/supabaseConfig');

exports.getAllIceCreams = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('ice_creams')
      .select('*')
      .gt('stock', 0);

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createIceCream = async (req, res) => {
  try {
    const { name, description, price, stock, image_url } = req.body;
    const { data, error } = await supabase
      .from('ice_creams')
      .insert([{ name, description, price, stock, image_url }])
      .select();

    if (error) throw error;
    res.status(201).json(data[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
