import { Link } from 'react-router-dom';
import { LayoutTemplate, Sparkles, ChevronRight } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-light text-dark font-sans flex flex-col selection:bg-primary/20">
      {/* Navbar Minimalista */}
      <nav className="w-full h-20 flex items-center justify-between px-8 md:px-16 border-b border-gray-200/60 bg-white/50 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-blue-400 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <LayoutTemplate size={22} className="text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight text-gray-900">Kanka</span>
        </div>
        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className="items-center justify-center gap-2 bg-dark hover:bg-gray-800 text-white px-6 py-2.5 rounded-full font-medium transition-all shadow-md active:scale-95 hidden md:flex"
          >
            Acessar Admin
            <ChevronRight size={16} />
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-primary text-sm font-medium mb-8 animate-fade-in-up">
          <Sparkles size={16} />
          <span>Setup concluído com sucesso</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 mb-6 max-w-4xl leading-tight">
          Kanka — Full Stack Template
        </h1>

        {/* <p className="text-xl md:text-2xl text-gray-500 mb-12 max-w-2xl font-light">
          Um ponto de partida visualmente impressionante, construído com ferramentas modernas para criar aplicações robustas e limpas.
        </p> */}

        {/* <div className="flex flex-col sm:flex-row items-center gap-4 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          <Link 
            to="/login"
            className="w-full sm:w-auto bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-xl font-semibold transition-all shadow-xl shadow-blue-500/20 hover:shadow-blue-500/40 flex items-center justify-center gap-2 text-lg active:scale-95"
          >
            Visualizar Dashboard
            <Rocket size={20} />
          </Link>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto bg-white hover:bg-gray-50 text-dark border border-gray-200 px-8 py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 text-lg active:scale-95 shadow-sm"
          >
            Ver Repositório
            <Code2 size={20} />
          </a>
        </div> */}
      </main>

      {/* Footer Minimalista
      <footer className="w-full py-8 text-center text-gray-500 text-sm">
        <p>Desenvolvido para criar o futuro da web. {new Date().getFullYear()}</p>
      </footer> */}
    </div>
  );
};

export default Home;
