import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import IceCreamList from './components/iceCreamList';
import Cart from './components/Cart';
import ThankYou from './pages/ThankYou';  // Import halaman Terima Kasih

function App() {
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (iceCream) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === iceCream.id);
      if (existingItem) {
        return prevItems.map(item => 
          item.id === iceCream.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...iceCream, quantity: 1 }];
    });
  };

  const handleRemoveItem = (iceCreamId) => {
    setCartItems(prevItems => 
      prevItems.filter(item => item.id !== iceCreamId)
    );
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  return (
    <Router>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4 text-center">Toko Es Krim Online</h1>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <IceCreamList onAddToCart={handleAddToCart} />
          </div>
          <div>
            <Cart 
              cartItems={cartItems} 
              onRemoveItem={handleRemoveItem}
              onClearCart={handleClearCart}
            />
          </div>
        </div>

        <Routes>
          <Route path="/thank-you" element={<ThankYou />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
