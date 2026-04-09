import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './admin/Dashboard';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      
      {/* Protected Admin Routes */}
      <Route path="/admin" element={<PrivateRoute />}>
        <Route index element={<Dashboard />} />
        {/* Adicione mais rotas filhas admin aqui */}
      </Route>

      {/* Catch-all Not Found */}
      <Route path="*" element={<div className="flex items-center justify-center h-screen bg-gray-50 text-2xl font-bold bg-light">404 - Page Not Found</div>} />
    </Routes>
  );
}

export default App;
