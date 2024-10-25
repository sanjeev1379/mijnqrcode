import logo from './images/logo.png';
import './styles/App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import QRCodeGenerator from './pages/QRCodeGenerator';
import QRCodeDisplay from './pages/QRCodeDisplay';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <Router>
        <Routes>
          <Route path="/" element={<QRCodeGenerator />} />
          <Route path="/share/:uniqueId" element={<QRCodeDisplay />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
