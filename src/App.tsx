import React, { useState, useEffect } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import Loader from './components/Loader';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import PasscodeModal from './components/PasscodeModal';
import ParticipantForm from './components/ParticipantForm';
import VolunteerScanner from './components/VolunteerScanner';

type ViewType = 'home' | 'participant' | 'volunteer';

function App() {
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [showPasscodeModal, setShowPasscodeModal] = useState(false);
  const [modalType, setModalType] = useState<'participant' | 'volunteer'>('participant');

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleCardClick = (type: 'participant' | 'volunteer') => {
    setModalType(type);
    setShowPasscodeModal(true);
  };

  const handlePasscodeSubmit = (passcode: string) => {
    setShowPasscodeModal(false);
    if (modalType === 'participant') {
      setCurrentView('participant');
    } else {
      setCurrentView('volunteer');
    }
  };

  const handleBackToHome = () => {
    setCurrentView('home');
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <AuthProvider>
      <div className="min-h-screen bg-slate-900 flex flex-col">
        <Header />
        
        <main className="flex-1">
          {currentView === 'home' && (
            <HomePage
              onParticipantClick={() => handleCardClick('participant')}
              onVolunteerClick={() => handleCardClick('volunteer')}
            />
          )}
          
          {currentView === 'participant' && (
            <ParticipantForm onBack={handleBackToHome} />
          )}
          
          {currentView === 'volunteer' && (
            <VolunteerScanner onBack={handleBackToHome} />
          )}
        </main>

        <Footer />

        <PasscodeModal
          isOpen={showPasscodeModal}
          onClose={() => setShowPasscodeModal(false)}
          onSubmit={handlePasscodeSubmit}
          type={modalType}
        />
      </div>
    </AuthProvider>
  );
}

export default App;