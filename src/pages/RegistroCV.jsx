import { useNavigate } from 'react-router-dom';
import CVForm from '../components/CVForm';

const RegistroCV = () => {
  const navigate = useNavigate();

  const handleSaveCV = (newCV) => {    
    try {
      if (typeof(Storage) === 'undefined') {
        alert('El navegador no soporta almacenamiento local.');
        return;
      }
      const existingCVs = JSON.parse(localStorage.getItem('cvs') || '[]');    
      const updatedCVs = [...existingCVs, newCV];    
      localStorage.setItem('cvs', JSON.stringify(updatedCVs));    
      alert('CV guardado correctamente.');
      navigate('/lista');
    } catch (e) {
      alert('Ocurrió un error al guardar el CV. Verifique la consola.');
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-gray-900">Registrar Nuevo CV</h1>
              <button
                onClick={() => navigate('/')}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Volver al Inicio
              </button>
            </div>
            <CVForm onSave={handleSaveCV} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistroCV; 