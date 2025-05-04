import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            Sistema de Gestión de CVs
          </h1>
          <p className="text-xl text-gray-600 mb-12">
            Gestiona y organiza los currículos de tus candidatos de manera eficiente
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Tarjeta de Registro */}
          <Link to="/registro" className="block">
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="text-center">
                <div className="inline-block p-4 bg-blue-100 rounded-full mb-4">
                  <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Registrar Nuevo CV</h2>
                <p className="text-gray-600">Agrega un nuevo currículo al sistema</p>
              </div>
            </div>
          </Link>

          {/* Tarjeta de Lista */}
          <Link to="/lista" className="block">
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="text-center">
                <div className="inline-block p-4 bg-green-100 rounded-full mb-4">
                  <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Ver CVs</h2>
                <p className="text-gray-600">Explora y gestiona todos los currículos</p>
              </div>
            </div>
          </Link>

          {/* Tarjeta de Búsqueda */}
          <Link to="/busqueda" className="block">
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="text-center">
                <div className="inline-block p-4 bg-purple-100 rounded-full mb-4">
                  <svg className="w-12 h-12 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Búsqueda Avanzada</h2>
                <p className="text-gray-600">Encuentra candidatos específicos</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home; 