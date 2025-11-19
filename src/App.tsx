import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';
import LandingPage from './pages/LandingPage';

function App() {
  const location = useLocation();
  const isLandingPage = location.pathname === '/demo';

  return (
    <div className="min-h-screen flex flex-col">
      {!isLandingPage && <Header />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/demo" element={<LandingPage />} />
        </Routes>
      </main>
      {!isLandingPage && <Footer />}
      {!isLandingPage && <WhatsAppButton />}
    </div>
  );
}

export default App;
