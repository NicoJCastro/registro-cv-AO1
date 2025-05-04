import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CVDetails from '../components/CVDetails';

const BusquedaAvanzada = () => {
  const navigate = useNavigate();
  const [cvs, setCVs] = useState([]);
  const [selectedCV, setSelectedCV] = useState(null);
  const [filtros, setFiltros] = useState({
    nombre: '',
    email: '',
    tituloEducacion: '',
    institucion: '',
    cargo: '',
    empleador: '',
    añoGraduacion: '',
    añosExperiencia: ''
  });

  useEffect(() => {    
    const savedCVs = localStorage.getItem('cvs');
    if (savedCVs) {
      setCVs(JSON.parse(savedCVs));
    }
  }, []);

  const handleFiltroChange = (e) => {
    const { name, value } = e.target;
    setFiltros(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const filtrarCVs = () => {
    return cvs.filter(cv => {
      const cumpleNombre = !filtros.nombre || 
        cv.nombre.toLowerCase().includes(filtros.nombre.toLowerCase());
      
      const cumpleEmail = !filtros.email || 
        cv.email.toLowerCase().includes(filtros.email.toLowerCase());
      
      const cumpleEducacion = !filtros.tituloEducacion || 
        cv.educacion.some(edu => 
          edu.titulo.toLowerCase().includes(filtros.tituloEducacion.toLowerCase())
        );
      
      const cumpleInstitucion = !filtros.institucion || 
        cv.educacion.some(edu => 
          edu.institucion.toLowerCase().includes(filtros.institucion.toLowerCase())
        );
      
      const cumpleCargo = !filtros.cargo || 
        cv.experiencia.some(exp => 
          exp.cargo.toLowerCase().includes(filtros.cargo.toLowerCase())
        );
      
      const cumpleEmpleador = !filtros.empleador || 
        cv.experiencia.some(exp => 
          exp.empleador.toLowerCase().includes(filtros.empleador.toLowerCase())
        );
      
      const cumpleAñoGraduacion = !filtros.añoGraduacion || 
        cv.educacion.some(edu => 
          edu.añoGraduacion.toString().includes(filtros.añoGraduacion)
        );

      return cumpleNombre && cumpleEmail && cumpleEducacion && 
             cumpleInstitucion && cumpleCargo && cumpleEmpleador && 
             cumpleAñoGraduacion;
    });
  };

  const handleViewCV = (cv) => {
    setSelectedCV(cv);
  };

  const handleCloseDetails = () => {
    setSelectedCV(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-gray-900">Búsqueda Avanzada</h1>
              <button
                onClick={() => navigate('/')}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Volver al Inicio
              </button>
            </div>

            {/* Filtros */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  value={filtros.nombre}
                  onChange={handleFiltroChange}
                  className="input"
                  placeholder="Buscar por nombre"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="text"
                  name="email"
                  value={filtros.email}
                  onChange={handleFiltroChange}
                  className="input"
                  placeholder="Buscar por email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Título Educativo</label>
                <input
                  type="text"
                  name="tituloEducacion"
                  value={filtros.tituloEducacion}
                  onChange={handleFiltroChange}
                  className="input"
                  placeholder="Buscar por título"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Institución</label>
                <input
                  type="text"
                  name="institucion"
                  value={filtros.institucion}
                  onChange={handleFiltroChange}
                  className="input"
                  placeholder="Buscar por institución"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cargo</label>
                <input
                  type="text"
                  name="cargo"
                  value={filtros.cargo}
                  onChange={handleFiltroChange}
                  className="input"
                  placeholder="Buscar por cargo"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Empleador</label>
                <input
                  type="text"
                  name="empleador"
                  value={filtros.empleador}
                  onChange={handleFiltroChange}
                  className="input"
                  placeholder="Buscar por empleador"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Año de Graduación</label>
                <input
                  type="text"
                  name="añoGraduacion"
                  value={filtros.añoGraduacion}
                  onChange={handleFiltroChange}
                  className="input"
                  placeholder="Buscar por año"
                />
              </div>
            </div>

            {/* Resultados */}
            <div className="space-y-4">
              {filtrarCVs().map((cv, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {cv.foto && (
                        <img
                          src={cv.foto}
                          alt={cv.nombre}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                      )}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">{cv.nombre}</h3>
                        <p className="text-gray-600">{cv.email}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleViewCV(cv)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Ver Detalles
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {selectedCV && (
        <CVDetails
          cv={selectedCV}
          onClose={handleCloseDetails}
        />
      )}
    </div>
  );
};

export default BusquedaAvanzada; 