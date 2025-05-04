const CVDetails = ({ cv, onClose, onEdit }) => {
  if (!cv) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Detalles del CV</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ✕
            </button>
          </div>

          {/* Foto y Datos Personales */}
          <div className="flex items-start space-x-6 mb-8">
            {cv.foto && (
              <img
                src={cv.foto}
                alt={cv.nombre}
                className="w-32 h-32 rounded-lg object-cover shadow-md"
              />
            )}
            <div>
              <h3 className="text-xl font-semibold text-gray-800">{cv.nombre}</h3>
              <p className="text-gray-600">{cv.email}</p>
              <p className="text-gray-600">{cv.telefono}</p>
            </div>
          </div>

          {/* Educación */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Educación</h3>
            <div className="space-y-4">
              {cv.educacion.map((edu, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                  <h4 className="font-medium text-gray-800">{edu.titulo}</h4>
                  <p className="text-gray-600">{edu.institucion}</p>
                  <p className="text-gray-600">Año de graduación: {edu.añoGraduacion}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Experiencia Laboral */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Experiencia Laboral</h3>
            <div className="space-y-4">
              {cv.experiencia.map((exp, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                  <h4 className="font-medium text-gray-800">{exp.cargo}</h4>
                  <p className="text-gray-600">{exp.empleador}</p>
                  <p className="text-gray-600">
                    {exp.fechaInicio} - {exp.fechaFin}
                  </p>
                  <p className="text-gray-600 mt-2">{exp.responsabilidades}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Botón Editar */}
          {onEdit && (
            <div className="mt-6 flex justify-end">
              <button
                onClick={onEdit}
                className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
              >
                Editar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CVDetails; 