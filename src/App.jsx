import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import RegistroCV from './pages/RegistroCV';
import ListaCVs from './pages/ListaCVs';
import BusquedaAvanzada from './pages/BusquedaAvanzada';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registro" element={<RegistroCV />} />
        <Route path="/lista" element={<ListaCVs />} />
        <Route path="/busqueda" element={<BusquedaAvanzada />} />
      </Routes>
    </Router>
  );
}

export default App;
