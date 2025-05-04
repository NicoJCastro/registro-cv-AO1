import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CVList from '../components/CVList';
import CVDetails from '../components/CVDetails';
import CVForm from '../components/CVForm';

const ListaCVs = () => {
  const navigate = useNavigate();
  const [cvs, setCVs] = useState([]);
  const [selectedCV, setSelectedCV] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {    
    const savedCVs = localStorage.getItem('cvs');
    if (savedCVs) {
      setCVs(JSON.parse(savedCVs));
    }
  }, []);

  const handleDeleteCV = (index) => {
    const newCVs = cvs.filter((_, i) => i !== index);
    setCVs(newCVs);
    localStorage.setItem('cvs', JSON.stringify(newCVs));
    setSelectedCV(null);
    setEditIndex(null);
    setShowForm(false);
  };

  const handleViewCV = (cv) => {
    setSelectedCV(cv);
    setShowForm(false);
    setEditIndex(null);
  };

  const handleCloseDetails = () => {
    setSelectedCV(null);
  };

  const handleEditCV = (cv, index) => {
    setEditIndex(index);
    setShowForm(true);
    setSelectedCV(null);
  };

  const handleUpdateCV = (updatedCV) => {
    const updatedCVs = cvs.map((cv, idx) => idx === editIndex ? updatedCV : cv);
    setCVs(updatedCVs);
    localStorage.setItem('cvs', JSON.stringify(updatedCVs));
    setEditIndex(null);
    setShowForm(false);
  };

  const handleAddCV = () => {
    setShowForm(true);
    setEditIndex(null);
    setSelectedCV(null);
  };

  const handleSaveCV = (newCV) => {
    const updatedCVs = [...cvs, newCV];
    setCVs(updatedCVs);
    localStorage.setItem('cvs', JSON.stringify(updatedCVs));
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="p-6">
            {!showForm && (
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-900">Lista de CVs</h1>
                <div className="flex space-x-4">
                  <button
                    onClick={handleAddCV}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Nuevo CV
                  </button>
                  <button
                    onClick={() => navigate('/')}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Volver al Inicio
                  </button>
                </div>
              </div>
            )}
            {showForm ? (
              <CVForm
                onSave={handleSaveCV}
                onUpdate={handleUpdateCV}
                initialData={editIndex !== null ? cvs[editIndex] : null}
                editMode={editIndex !== null}
                onCancel={() => { setShowForm(false); setEditIndex(null); }}
              />
            ) : selectedCV ? (
              <CVDetails
                cv={selectedCV}
                onClose={handleCloseDetails}
                onEdit={() => handleEditCV(selectedCV, cvs.findIndex(c => c === selectedCV))}
              />
            ) : (
              <CVList
                cvs={cvs}
                onDelete={handleDeleteCV}
                onView={handleViewCV}
                onEdit={handleEditCV}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListaCVs; 