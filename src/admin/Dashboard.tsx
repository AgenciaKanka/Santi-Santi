import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogOut, LayoutDashboard, Users, Settings, Bell, Rocket } from 'lucide-react';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar sidebar */}
      <aside className="w-64 bg-dark text-white hidden md:flex flex-col shadow-2xl">
        <div className="p-6 border-b border-gray-800">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <LayoutDashboard size={24} className="text-primary" />
            Painel
          </h2>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <a href="#" className="flex items-center gap-3 bg-blue-600/20 text-blue-400 px-4 py-3 rounded-lg transition-colors border-l-2 border-primary">
            <LayoutDashboard size={20} />
            Visão Geral
          </a>
          <a href="#" className="flex items-center gap-3 hover:bg-gray-800 text-gray-300 px-4 py-3 rounded-lg transition-colors hover:text-white">
            <Users size={20} />
            Usuários
          </a>
          <a href="#" className="flex items-center gap-3 hover:bg-gray-800 text-gray-300 px-4 py-3 rounded-lg transition-colors hover:text-white">
            <Settings size={20} />
            Configurações
          </a>
        </nav>

        <div className="p-4 border-t border-gray-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-gray-800 hover:bg-red-500/10 hover:text-red-400 text-gray-300 py-3 rounded-lg transition-all"
          >
            <LogOut size={18} />
            Sair do sistema
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-8 z-10 shrink-0 shadow-sm">
          <h1 className="text-xl font-semibold text-gray-800">Visão Geral</h1>

          <div className="flex items-center gap-6">
            <button className="text-gray-400 hover:text-primary transition-colors relative">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-3 pl-6 border-l border-gray-200">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-primary to-blue-300 flex items-center justify-center text-white font-bold shadow-md">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-700">{user?.name || 'Administrador'}</span>
                <span className="text-xs text-gray-500">{user?.role || 'Admin'}</span>
              </div>
            </div>
            {/* Mobile logout */}
            <button onClick={handleLogout} className="md:hidden text-gray-500 hover:text-red-500 ml-2">
              <LogOut size={20} />
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 p-8 overflow-y-auto">

          {/* Welcome Banner */}
          <div className="bg-white rounded-2xl p-8 mb-8 shadow-sm border border-gray-100 flex items-center justify-between relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Olá, {user?.name || 'Admin'}! 👋
              </h2>
              <p className="text-gray-500">
                Este é o seu dashboard administrativo. Aqui você poderá gerenciar as funções do seu novo template.
              </p>
            </div>
            <div className="hidden md:flex w-32 h-32 bg-blue-50 rounded-full items-center justify-center relative z-10">
              <Rocket size={48} className="text-primary" />
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
              { title: 'Total de Usuários', value: '1', percent: '+10%' },
              { title: 'Acessos Hoje', value: '14', percent: '+2%' },
              { title: 'Conversões', value: '3.4%', percent: '-1%' },
            ].map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <h3 className="text-gray-500 text-sm font-medium mb-1">{stat.title}</h3>
                <div className="flex items-end justify-between">
                  <span className="text-3xl font-bold text-gray-800">{stat.value}</span>
                  <span className={`text-sm font-medium ${stat.percent.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                    {stat.percent}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>
    </div>
  );
};

export default Dashboard;
