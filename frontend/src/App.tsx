import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SplashScreen } from '@/pages/SplashScreen';
import { SetupWizard } from '@/pages/SetupWizard';
import { MainApp } from '@/pages/MainApp';
import { useAppStore } from '@/store/appStore';

// Guard: Harus sudah login DAN sudah setup untuk masuk ke Main App
const RequireAuthAndSetup: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isSetupComplete, isAuthenticated } = useAppStore();
  if (!isAuthenticated || !isSetupComplete) {
    return <Navigate to="/setup" replace />;
  }
  return <>{children}</>;
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        
        {/* /setup sekarang menjadi Gateway utama (Setup + Register + Login) */}
        <Route path="/setup" element={<SetupWizard />} />
        
        <Route 
          path="/app" 
          element={
            <RequireAuthAndSetup>
              <MainApp />
            </RequireAuthAndSetup>
          } 
        />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
