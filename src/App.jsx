import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Predictor from './pages/Predictor';
import AllScenarios from './pages/AllScenarios';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-bg-primary">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/predictor" element={<Predictor />} />
          <Route path="/scenarios" element={<AllScenarios />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
