import { useState, useEffect } from 'react';

const CVForm = ({ onSave, onUpdate, initialData, editMode, onCancel }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    educacion: [{
      titulo: '',
      institucion: '',
      añoGraduacion: ''
    }],
    experiencia: [{
      empleador: '',
      cargo: '',
      fechaInicio: '',
      fechaFin: '',
      responsabilidades: ''
    }],
    foto: null
  });

  // Nuevo estado para saber si tiene experiencia laboral
  const [tieneExperiencia, setTieneExperiencia] = useState(true);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      setTieneExperiencia(initialData.experiencia && initialData.experiencia.length > 0);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEducacionChange = (index, e) => {
    const { name, value } = e.target;
    const newEducacion = [...formData.educacion];
    newEducacion[index] = {
      ...newEducacion[index],
      [name]: value
    };
    setFormData(prev => ({
      ...prev,
      educacion: newEducacion
    }));
  };

  const handleExperienciaChange = (index, e) => {
    const { name, value } = e.target;
    const newExperiencia = [...formData.experiencia];
    newExperiencia[index] = {
      ...newExperiencia[index],
      [name]: value
    };
    setFormData(prev => ({
      ...prev,
      experiencia: newExperiencia
    }));
  };

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 100 * 1024) { // 100KB
        alert('La imagen es demasiado grande. Por favor, selecciona una imagen menor a 100KB.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          foto: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const datosAGuardar = {
      ...formData,
      experiencia: tieneExperiencia ? formData.experiencia : []
    };
    if (editMode && onUpdate) {
      onUpdate(datosAGuardar);
    } else {
      onSave(datosAGuardar);
    }
    setFormData({
      nombre: '',
      email: '',
      telefono: '',
      educacion: [{
        titulo: '',
        institucion: '',
        añoGraduacion: ''
      }],
      experiencia: [{
        empleador: '',
        cargo: '',
        fechaInicio: '',
        fechaFin: '',
        responsabilidades: ''
      }],
      foto: null
    });
    setTieneExperiencia(true);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">{editMode ? 'Editar CV' : 'Completa con tus datos'}</h2>
      
      {/* Datos Personales */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">Datos Personales</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="input"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
            <input
              type="tel"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              className="input"
              required
            />
          </div>
        </div>
      </div>

      {/* Educación */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">Educación</h3>
        {formData.educacion.map((edu, index) => (
          <div key={index} className="mb-4 p-4 border border-gray-200 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                <input
                  type="text"
                  name="titulo"
                  value={edu.titulo}
                  onChange={(e) => handleEducacionChange(index, e)}
                  className="input"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Institución</label>
                <input
                  type="text"
                  name="institucion"
                  value={edu.institucion}
                  onChange={(e) => handleEducacionChange(index, e)}
                  className="input"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Año de Graduación</label>
                <input
                  type="number"
                  name="añoGraduacion"
                  value={edu.añoGraduacion}
                  onChange={(e) => handleEducacionChange(index, e)}
                  className="input"
                  required
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pregunta sobre experiencia laboral */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">¿Tiene experiencia laboral?</h3>
        <div className="flex items-center gap-4 mb-4">
          <label>
            <input
              type="radio"
              name="tieneExperiencia"
              value="si"
              checked={tieneExperiencia === true}
              onChange={() => setTieneExperiencia(true)}
            />{' '}Sí
          </label>
          <label>
            <input
              type="radio"
              name="tieneExperiencia"
              value="no"
              checked={tieneExperiencia === false}
              onChange={() => setTieneExperiencia(false)}
            />{' '}No
          </label>
        </div>
      </div>

      {/* Experiencia Laboral solo si tiene experiencia */}
      {tieneExperiencia && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Experiencia Laboral</h3>
          {formData.experiencia.map((exp, index) => (
            <div key={index} className="mb-4 p-4 border border-gray-200 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Empleador</label>
                  <input
                    type="text"
                    name="empleador"
                    value={exp.empleador}
                    onChange={(e) => handleExperienciaChange(index, e)}
                    className="input"
                    required={tieneExperiencia}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cargo</label>
                  <input
                    type="text"
                    name="cargo"
                    value={exp.cargo}
                    onChange={(e) => handleExperienciaChange(index, e)}
                    className="input"
                    required={tieneExperiencia}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Inicio</label>
                  <input
                    type="date"
                    name="fechaInicio"
                    value={exp.fechaInicio}
                    onChange={(e) => handleExperienciaChange(index, e)}
                    className="input"
                    required={tieneExperiencia}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Fin</label>
                  <input
                    type="date"
                    name="fechaFin"
                    value={exp.fechaFin}
                    onChange={(e) => handleExperienciaChange(index, e)}
                    className="input"
                    required={tieneExperiencia}
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Responsabilidades</label>
                  <textarea
                    name="responsabilidades"
                    value={exp.responsabilidades}
                    onChange={(e) => handleExperienciaChange(index, e)}
                    className="input"
                    rows="3"
                    required={tieneExperiencia}
                  />
                </div>
              </div>
              {/* Botón para eliminar experiencia si hay más de una */}
              {formData.experiencia.length > 1 && (
                <button
                  type="button"
                  className="btn btn-danger mt-2"
                  onClick={() => {
                    setFormData(prev => ({
                      ...prev,
                      experiencia: prev.experiencia.filter((_, i) => i !== index)
                    }));
                  }}
                >
                  Eliminar experiencia
                </button>
              )}
            </div>
          ))}
          {/* Botón para agregar nueva experiencia */}
          <button
            type="button"
            className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
            onClick={() => {
              setFormData(prev => ({
                ...prev,
                experiencia: [
                  ...prev.experiencia,
                  {
                    empleador: '',
                    cargo: '',
                    fechaInicio: '',
                    fechaFin: '',
                    responsabilidades: ''
                  }
                ]
              }));
            }}
          >
            Agregar otra experiencia
          </button>
        </div>
      )}

      {/* Foto */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">Foto</h3>
        <input
          type="file"
          accept="image/*"
          onChange={handleFotoChange}
          className="input"
          required={!editMode}
        />
        {formData.foto && (
          <div className="mt-4">
            <img src={formData.foto} alt="Preview" className="max-w-xs rounded-lg" />
          </div>
        )}
      </div>

      <button
        type="submit"
        className="btn btn-primary w-full"
      >
        {editMode ? 'Actualizar CV' : 'Guardar CV'}
      </button>
      {onCancel && (
        <button
          type="button"
          className="btn btn-secondary w-full mt-2"
          onClick={onCancel}
        >
          Cancelar
        </button>
      )}
    </form>
  );
};

export default CVForm; 