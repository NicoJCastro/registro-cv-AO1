import { useState } from 'react';

const CVList = ({ cvs, onDelete, onView, onEdit }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filtroEducacion, setFiltroEducacion] = useState('');
  const [filtroExperiencia, setFiltroExperiencia] = useState('');

  const filteredCVs = cvs.filter(cv => {
    const matchesSearch =
      cv.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cv.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cv.educacion.some(edu =>
        edu.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        edu.institucion.toLowerCase().includes(searchTerm.toLowerCase())
      ) ||
      cv.experiencia.some(exp =>
        exp.empleador.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exp.cargo.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesEducacion = !filtroEducacion ||
      cv.educacion.some(edu => edu.titulo.toLowerCase().includes(filtroEducacion.toLowerCase()));

    const matchesExperiencia = !filtroExperiencia ||
      cv.experiencia.some(exp => exp.cargo.toLowerCase().includes(filtroExperiencia.toLowerCase()));

    return matchesSearch && matchesEducacion && matchesExperiencia;
  });

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Lista de CVs</h2>

        {/* Barra de búsqueda */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Buscar por nombre, email, educación o experiencia..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input"
          />
        </div>

        {/* Filtros */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <input
              type="text"
              placeholder="Filtrar por nivel educativo..."
              value={filtroEducacion}
              onChange={(e) => setFiltroEducacion(e.target.value)}
              className="input"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Filtrar por cargo..."
              value={filtroExperiencia}
              onChange={(e) => setFiltroExperiencia(e.target.value)}
              className="input"
            />
          </div>
        </div>
      </div>

      {/* Lista de CVs */}
      <div className="space-y-4">
        {filteredCVs.map((cv, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md">
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
                  <p className="text-gray-600">{cv.telefono}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => onView(cv)}
                  className="btn btn-primary"
                >
                  Ver
                </button>
                <button
                  onClick={() => onEdit(cv, index)}
                  className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
                >
                  Editar
                </button>
                <button
                  onClick={() => onDelete(index)}
                  className="btn btn-danger"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CVList; 