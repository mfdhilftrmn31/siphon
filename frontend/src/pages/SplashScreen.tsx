import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '@/store/appStore';

// IMPORT LOGO
import siphonLogo from '@/assets/siphonlogo.png';

export const SplashScreen: React.FC = () => {
  const [phase, setPhase] = useState<'entrance' | 'settle' | 'complete'>('entrance');
  const navigate = useNavigate();

  useEffect(() => {
    // PHASE 1: Entrance (Zoom Gede + Listrik di Tengah) - Durasi 1 Detik
    
    // PHASE 2: Settle (Mengecil & Geser ke Kiri) - Mulai setelah 1 detik
    const settleTimeout = setTimeout(() => {
      setPhase('settle');
    }, 1000);

    // PHASE 3: Complete (Teks Muncul) - Mulai sedikit setelah geser (1.8 detik)
    const completeTimeout = setTimeout(() => {
      setPhase('complete');
    }, 1800);

    // Navigasi ke Main App - Setelah 3.5 detik total
    const navTimeout = setTimeout(() => {
      navigate('/setup');
    }, 3500);

    return () => {
      clearTimeout(settleTimeout);
      clearTimeout(completeTimeout);
      clearTimeout(navTimeout);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#09090b] flex items-center justify-center overflow-hidden select-none relative">
      
      {/* Container Utama untuk animasi pergeseran */}
      <div className={`relative flex items-center justify-center transition-all duration-1000 cubic-bezier(0.4, 0, 0.2, 1) ${
        phase === 'settle' || phase === 'complete' 
          ? 'translate-x-[-80px] sm:translate-x-[-100px]' // Posisi Akhir (Kiri)
          : 'translate-x-0' // Posisi Awal (Tengah)
      }`}>
        
        {/* LOGO CONTAINER - Menangani Zoom dan Efek Listrik */}
        <div 
          className={`flex items-center justify-center relative transition-all duration-1000 cubic-bezier(0.4, 0, 0.2, 1) ${
            phase === 'entrance'
              ? 'scale-[2.5] sm:scale-[3]' // Zoom Gede di Awal
              : 'scale-100' // Ukuran Akhir (Sama kayak Font)
          }`}
        >
          {/* Efek Pulsa Listrik/Glow di Belakang Logo (Hanya saat Fase Entrance) */}
          <div className={`absolute inset-0 rounded-full bg-primary/30 blur-2xl transition-opacity duration-500 ${
            phase === 'entrance' ? 'opacity-100 animate-pulse-fast' : 'opacity-0'
          }`}></div>

          {/* Image Logo */}
          <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center relative z-10 drop-shadow-[0_0_15px_rgba(0,220,255,0.5)]">
             <img
               src={siphonLogo}
               alt="Siphon Icon"
               className="w-full h-full object-contain animate-fade-in-quick"
             />
          </div>
        </div>

        {/* TEXT "SIPHON" - Muncul di samping logo setelah settle */}
        <div 
          className={`absolute left-[100%] transition-all duration-700 ease-out pl-4 overflow-hidden ${
            phase === 'complete' 
              ? 'opacity-100 translate-x-0' 
              : 'opacity-0 translate-x-10 pointer-events-none'
          }`}
        >
          <h1 className="text-4xl sm:text-5xl font-bold tracking-[0.1em] text-white font-sans whitespace-nowrap drop-shadow-md">
            Siphon
          </h1>
        </div>
        
      </div>

      {/* Custom Animations */}
      <style>{`
        /* Curve kustom biar gerakannya terasa berat & premium */
        .cubic-bezier(0.4, 0, 0.2, 1) {
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }

        @keyframes pulseFast {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.1); }
        }
        .animate-pulse-fast {
          animation: pulseFast 0.3s ease-in-out infinite;
        }

        @keyframes fadeInQuick {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in-quick {
          animation: fadeInQuick 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};
