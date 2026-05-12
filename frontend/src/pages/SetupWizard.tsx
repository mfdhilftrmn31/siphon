import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, Copy, CheckCircle2, XCircle, Loader2, Lock, User, Terminal, ShieldAlert, AlertTriangle } from 'lucide-react';
import { useAppStore } from '@/store/appStore';
import { downloadCACertificate, testConnection } from '@/api/setup';

import siphonLogo from '@/assets/siphonlogo.png';

export const SetupWizard: React.FC = () => {
  const navigate = useNavigate();
  const { isSetupComplete, setSetupComplete, isAuthenticated, setAuthenticated, hasRegistered, setRegistered } = useAppStore();
  
  const getInitialView = () => {
    if (!isSetupComplete) return 'setup';
    if (!hasRegistered) return 'register';
    return 'login';
  };

  const [view, setView] = useState<'login' | 'register' | 'setup'>(getInitialView());
  const [setupStep, setSetupStep] = useState(1);
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); 
  const [regError, setRegError] = useState(''); 

  const [isAuthLoading, setIsAuthLoading] = useState(false);

  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<'idle' | 'success' | 'error'>('idle');
  const [testMessage, setTestMessage] = useState('');

  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showWarningModal, setShowWarningModal] = useState(false);

  useEffect(() => {
    if (isSetupComplete && hasRegistered && isAuthenticated) {
      navigate('/app');
    }
  }, [isSetupComplete, hasRegistered, isAuthenticated, navigate]);

  const finishSetup = () => {
    setSetupComplete(true);
    setView('register'); 
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRegError('');
    
    if (!username || !password || !confirmPassword) return;
    
    if (password !== confirmPassword) {
      setRegError('Passphrases do not match. Please verify.');
      return;
    }
    setShowSaveModal(true);
  };

  const finalizeRegistration = () => {
    setShowSaveModal(false);
    setShowWarningModal(false);
    setIsAuthLoading(true);
    setTimeout(() => {
      setIsAuthLoading(false);
      setRegistered(true);
      setUsername('');
      setPassword('');
      setConfirmPassword('');
      setView('login');
    }, 800);
  };

  const handleDownloadCredentials = () => {
    const textContent = `SIPHON LOCAL OPERATOR CREDENTIALS\n=================================\nOperator ID : ${username}\nPassphrase  : ${password}\n\nWARNING: Store this securely. SIPHON operates offline. There is NO cloud recovery.`;
    const blob = new Blob([textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'siphoncredential.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    finalizeRegistration();
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) return;
    setIsAuthLoading(true);
    setTimeout(() => {
      setIsAuthLoading(false);
      setAuthenticated(true); 
    }, 800);
  };

  const handleTestConnection = async () => {
    setIsTesting(true);
    setTestResult('idle');
    try {
      const res = await testConnection();
      if (res.success) {
        setTestResult('success');
        setTestMessage(res.message);
      } else {
        setTestResult('error');
        setTestMessage("Connection failed. Check proxy port 8080.");
      }
    } catch {
      setTestResult('error');
      setTestMessage("Backend unreachable.");
    } finally {
      setIsTesting(false);
    }
  };

  // RAW HTML SVG & CSS FROM siphon-bg.html
  const rawAnimatedBackground = `
    <style>
      @keyframes travel-cyan{ 0%{stroke-dashoffset:800} 100%{stroke-dashoffset:0} }
      @keyframes travel-red{ 0%{stroke-dashoffset:-800} 100%{stroke-dashoffset:0} }
      @keyframes dot-blink{ 0%,100%{opacity:1} 50%{opacity:0.1} }
      @keyframes dot-blink2{ 0%,100%{opacity:0.85} 50%{opacity:0.05} }
      @keyframes glow-cyan{ 0%,100%{filter:drop-shadow(0 0 5px #00dcff) drop-shadow(0 0 15px #00dcff88)} 50%{filter:drop-shadow(0 0 1px #00dcff)} }
      @keyframes glow-red{ 0%,100%{filter:drop-shadow(0 0 5px #ff2a2a) drop-shadow(0 0 15px #ff2a2a88)} 50%{filter:drop-shadow(0 0 1px #ff2a2a)} }
      .g-cyan{animation:glow-cyan 3s ease-in-out infinite}
      .g-red{animation:glow-red 3.5s ease-in-out infinite 0.5s}
    </style>
    <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;">
      <defs>
        <filter id="glow-c"><feGaussianBlur stdDeviation="2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <filter id="glow-r"><feGaussianBlur stdDeviation="2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      <g filter="url(#glow-c)" class="g-cyan">
        <polyline points="0,120 80,120 80,180 200,180 200,140 400,140" fill="none" stroke="#00dcff" stroke-width="1.5" stroke-dasharray="800" style="animation:travel-cyan 4s linear infinite"/>
        <polyline points="0,260 70,260 70,210 180,210 180,290 380,290" fill="none" stroke="#00dcff" stroke-width="1" stroke-dasharray="700" style="animation:travel-cyan 5s linear infinite 0.5s"/>
        <polyline points="0,400 100,400 100,360 240,360 240,430 480,430" fill="none" stroke="#00dcff" stroke-width="1.5" stroke-dasharray="750" style="animation:travel-cyan 4.5s linear infinite 1s"/>
        <polyline points="0,550 90,550 90,500 200,500 200,570 440,570" fill="none" stroke="#00dcff" stroke-width="1" stroke-dasharray="800" style="animation:travel-cyan 6s linear infinite 0.3s"/>
        <polyline points="0,700 120,700 120,660 280,660 280,720 560,720" fill="none" stroke="#00dcff" stroke-width="1.5" stroke-dasharray="780" style="animation:travel-cyan 4.8s linear infinite 0.8s"/>
        <polyline points="0,820 80,820 80,780 220,780 220,850 500,850" fill="none" stroke="#00dcff" stroke-width="1" stroke-dasharray="720" style="animation:travel-cyan 5.5s linear infinite 1.3s"/>
        <polyline points="220,0 220,80 320,80 320,160 500,160 500,80 660,80" fill="none" stroke="#00dcff" stroke-width="1.5" stroke-dasharray="760" style="animation:travel-cyan 5s linear infinite 0.8s"/>
        <polyline points="400,0 400,100 520,100 520,200 620,200 620,100 780,100" fill="none" stroke="#00dcff" stroke-width="1" stroke-dasharray="700" style="animation:travel-cyan 4.3s linear infinite 0.2s"/>
        <polyline points="120,0 120,60 240,60 240,130 360,130 360,60 520,60" fill="none" stroke="#00dcff" stroke-width="1.5" stroke-dasharray="680" style="animation:travel-cyan 5.8s linear infinite 0.6s"/>
        <polyline points="560,0 560,120 680,120 680,220 760,220 760,120 900,120" fill="none" stroke="#00dcff" stroke-width="1" stroke-dasharray="740" style="animation:travel-cyan 4.6s linear infinite 1.1s"/>
        <polyline points="80,900 80,860 200,860 200,800 340,800 340,860 640,860" fill="none" stroke="#00dcff" stroke-width="1.5" stroke-dasharray="760" style="animation:travel-cyan 5.2s linear infinite 0.4s"/>
      </g>
      <g filter="url(#glow-r)" class="g-red">
        <polyline points="1440,120 1360,120 1360,180 1240,180 1240,140 1040,140" fill="none" stroke="#ff2a2a" stroke-width="1.5" stroke-dasharray="800" style="animation:travel-red 4.2s linear infinite 0.4s"/>
        <polyline points="1440,260 1370,260 1370,210 1260,210 1260,290 1060,290" fill="none" stroke="#ff2a2a" stroke-width="1" stroke-dasharray="700" style="animation:travel-red 5.2s linear infinite 0.9s"/>
        <polyline points="1440,400 1340,400 1340,360 1200,360 1200,430 960,430" fill="none" stroke="#ff2a2a" stroke-width="1.5" stroke-dasharray="750" style="animation:travel-red 4.7s linear infinite 0.1s"/>
        <polyline points="1440,550 1350,550 1350,500 1240,500 1240,570 1000,570" fill="none" stroke="#ff2a2a" stroke-width="1" stroke-dasharray="800" style="animation:travel-red 6.2s linear infinite 0.7s"/>
        <polyline points="1440,700 1320,700 1320,660 1160,660 1160,720 880,720" fill="none" stroke="#ff2a2a" stroke-width="1.5" stroke-dasharray="780" style="animation:travel-red 5s linear infinite 0.3s"/>
        <polyline points="1440,820 1360,820 1360,780 1220,780 1220,850 940,850" fill="none" stroke="#ff2a2a" stroke-width="1" stroke-dasharray="720" style="animation:travel-red 5.7s linear infinite 1.2s"/>
        <polyline points="1220,0 1220,80 1120,80 1120,160 940,160 940,80 780,80" fill="none" stroke="#ff2a2a" stroke-width="1.5" stroke-dasharray="760" style="animation:travel-red 5.2s linear infinite 0.3s"/>
        <polyline points="1040,0 1040,100 920,100 920,200 820,200 820,100 660,100" fill="none" stroke="#ff2a2a" stroke-width="1" stroke-dasharray="700" style="animation:travel-red 4.5s linear infinite 1.1s"/>
        <polyline points="1320,0 1320,60 1200,60 1200,130 1080,130 1080,60 920,60" fill="none" stroke="#ff2a2a" stroke-width="1.5" stroke-dasharray="680" style="animation:travel-red 5.9s linear infinite 0.7s"/>
        <polyline points="880,0 880,120 760,120 760,220 680,220" fill="none" stroke="#ff2a2a" stroke-width="1" stroke-dasharray="740" style="animation:travel-red 4.8s linear infinite 0.2s"/>
        <polyline points="1360,900 1360,860 1240,860 1240,800 1100,800 1100,860 800,860" fill="none" stroke="#ff2a2a" stroke-width="1.5" stroke-dasharray="760" style="animation:travel-red 5.4s linear infinite 0.5s"/>
      </g>
      <g filter="url(#glow-c)">
        <circle cx="80" cy="120" r="3.5" fill="#00dcff" style="animation:dot-blink 2s ease-in-out infinite"/>
        <circle cx="200" cy="180" r="3" fill="#00dcff" style="animation:dot-blink 2.5s ease-in-out infinite 0.3s"/>
        <circle cx="70" cy="260" r="3" fill="#00dcff" style="animation:dot-blink 3s ease-in-out infinite 0.7s"/>
        <circle cx="220" cy="80" r="3.5" fill="#00dcff" style="animation:dot-blink 2.2s ease-in-out infinite 1s"/>
        <circle cx="320" cy="80" r="3" fill="#00dcff" style="animation:dot-blink 2.8s ease-in-out infinite 0.4s"/>
        <circle cx="500" cy="160" r="3.5" fill="#00dcff" style="animation:dot-blink 3.2s ease-in-out infinite 0.2s"/>
        <circle cx="100" cy="400" r="3" fill="#00dcff" style="animation:dot-blink 2.6s ease-in-out infinite 0.8s"/>
        <circle cx="240" cy="360" r="3.5" fill="#00dcff" style="animation:dot-blink 2s ease-in-out infinite 1.2s"/>
        <circle cx="520" cy="100" r="3" fill="#00dcff" style="animation:dot-blink 2.4s ease-in-out infinite 0.5s"/>
        <circle cx="680" cy="120" r="3.5" fill="#00dcff" style="animation:dot-blink 3s ease-in-out infinite 0.9s"/>
        <circle cx="620" cy="200" r="3" fill="#00dcff" style="animation:dot-blink 2.7s ease-in-out infinite 0.1s"/>
        <circle cx="760" cy="220" r="3.5" fill="#00dcff" style="animation:dot-blink 2.3s ease-in-out infinite 0.6s"/>
        <circle cx="90" cy="550" r="3" fill="#00dcff" style="animation:dot-blink 2.9s ease-in-out infinite 0.4s"/>
        <circle cx="200" cy="500" r="3.5" fill="#00dcff" style="animation:dot-blink 2.1s ease-in-out infinite 1.1s"/>
        <circle cx="120" cy="700" r="3" fill="#00dcff" style="animation:dot-blink 3.1s ease-in-out infinite 0.3s"/>
        <circle cx="280" cy="660" r="3.5" fill="#00dcff" style="animation:dot-blink 2.4s ease-in-out infinite 0.8s"/>
        <circle cx="40" cy="120" r="2.5" fill="none" stroke="#00dcff" stroke-width="1" style="animation:dot-blink 3s ease-in-out infinite 0.4s"/>
        <circle cx="180" cy="290" r="2.5" fill="none" stroke="#00dcff" stroke-width="1" style="animation:dot-blink 2.5s ease-in-out infinite 0.9s"/>
        <circle cx="280" cy="660" r="2.5" fill="none" stroke="#00dcff" stroke-width="1" opacity="0"/>
        <circle cx="400" cy="80" r="2.5" fill="none" stroke="#00dcff" stroke-width="1" style="animation:dot-blink 3.2s ease-in-out infinite 0.7s"/>
        <rect x="78" y="178" width="5" height="5" fill="none" stroke="#00dcff" stroke-width="1" style="animation:dot-blink 2.5s ease-in-out infinite 0.2s"/>
        <rect x="198" y="288" width="5" height="5" fill="none" stroke="#00dcff" stroke-width="1" style="animation:dot-blink 3s ease-in-out infinite 0.6s"/>
        <rect x="518" y="198" width="5" height="5" fill="none" stroke="#00dcff" stroke-width="1" style="animation:dot-blink 2.7s ease-in-out infinite 1s"/>
        <rect x="758" y="118" width="5" height="5" fill="none" stroke="#00dcff" stroke-width="1" style="animation:dot-blink 2.3s ease-in-out infinite 0.5s"/>
      </g>
      <g filter="url(#glow-r)">
        <circle cx="1360" cy="120" r="3.5" fill="#ff2a2a" style="animation:dot-blink2 2.1s ease-in-out infinite"/>
        <circle cx="1240" cy="180" r="3" fill="#ff2a2a" style="animation:dot-blink2 2.6s ease-in-out infinite 0.4s"/>
        <circle cx="1370" cy="260" r="3" fill="#ff2a2a" style="animation:dot-blink2 3.1s ease-in-out infinite 0.8s"/>
        <circle cx="1220" cy="80" r="3.5" fill="#ff2a2a" style="animation:dot-blink2 2.3s ease-in-out infinite 1.1s"/>
        <circle cx="1120" cy="80" r="3" fill="#ff2a2a" style="animation:dot-blink2 2.9s ease-in-out infinite 0.5s"/>
        <circle cx="940" cy="160" r="3.5" fill="#ff2a2a" style="animation:dot-blink2 3.3s ease-in-out infinite 0.3s"/>
        <circle cx="1340" cy="400" r="3" fill="#ff2a2a" style="animation:dot-blink2 2.7s ease-in-out infinite 0.9s"/>
        <circle cx="1200" cy="360" r="3.5" fill="#ff2a2a" style="animation:dot-blink2 2.1s ease-in-out infinite 1.3s"/>
        <circle cx="920" cy="100" r="3" fill="#ff2a2a" style="animation:dot-blink2 2.5s ease-in-out infinite 0.6s"/>
        <circle cx="760" cy="120" r="3.5" fill="#ff2a2a" style="animation:dot-blink2 3.1s ease-in-out infinite 1s"/>
        <circle cx="820" cy="200" r="3" fill="#ff2a2a" style="animation:dot-blink2 2.8s ease-in-out infinite 0.2s"/>
        <circle cx="680" cy="220" r="3.5" fill="#ff2a2a" style="animation:dot-blink2 2.4s ease-in-out infinite 0.7s"/>
        <circle cx="1350" cy="550" r="3" fill="#ff2a2a" style="animation:dot-blink2 3s ease-in-out infinite 0.5s"/>
        <circle cx="1240" cy="500" r="3.5" fill="#ff2a2a" style="animation:dot-blink2 2.2s ease-in-out infinite 1.2s"/>
        <circle cx="1320" cy="700" r="3" fill="#ff2a2a" style="animation:dot-blink2 3.2s ease-in-out infinite 0.4s"/>
        <circle cx="1160" cy="660" r="3.5" fill="#ff2a2a" style="animation:dot-blink2 2.5s ease-in-out infinite 0.9s"/>
        <circle cx="1400" cy="120" r="2.5" fill="none" stroke="#ff2a2a" stroke-width="1" style="animation:dot-blink2 3.1s ease-in-out infinite 0.5s"/>
        <circle cx="1260" cy="290" r="2.5" fill="none" stroke="#ff2a2a" stroke-width="1" style="animation:dot-blink2 2.6s ease-in-out infinite 1s"/>
        <circle cx="1160" cy="660" r="2.5" fill="none" stroke="#ff2a2a" stroke-width="1" opacity="0"/>
        <circle cx="1040" cy="80" r="2.5" fill="none" stroke="#ff2a2a" stroke-width="1" style="animation:dot-blink2 3.3s ease-in-out infinite 0.8s"/>
        <rect x="1238" cy="178" width="5" height="5" fill="none" stroke="#ff2a2a" stroke-width="1" style="animation:dot-blink2 2.6s ease-in-out infinite 0.3s"/>
        <rect x="1258" y="178" width="5" height="5" fill="none" stroke="#ff2a2a" stroke-width="1" style="animation:dot-blink2 2.6s ease-in-out infinite 0.3s"/>
        <rect x="1258" y="288" width="5" height="5" fill="none" stroke="#ff2a2a" stroke-width="1" style="animation:dot-blink2 3.1s ease-in-out infinite 0.7s"/>
        <rect x="918" y="198" width="5" height="5" fill="none" stroke="#ff2a2a" stroke-width="1" style="animation:dot-blink2 2.8s ease-in-out infinite 1.1s"/>
        <rect x="678" y="118" width="5" height="5" fill="none" stroke="#ff2a2a" stroke-width="1" style="animation:dot-blink2 2.3s ease-in-out infinite 0.6s"/>
      </g>
      <g opacity="0.2">
        <line x1="300" y1="0" x2="300" y2="900" stroke="#00dcff" stroke-width="0.4" stroke-dasharray="5,12"/>
        <line x1="460" y1="0" x2="460" y2="900" stroke="#00dcff" stroke-width="0.4" stroke-dasharray="5,12"/>
        <line x1="0" y1="450" x2="680" y2="450" stroke="#00dcff" stroke-width="0.4" stroke-dasharray="5,12"/>
        <line x1="980" y1="0" x2="980" y2="900" stroke="#ff2a2a" stroke-width="0.4" stroke-dasharray="5,12"/>
        <line x1="1140" y1="0" x2="1140" y2="900" stroke="#ff2a2a" stroke-width="0.4" stroke-dasharray="5,12"/>
        <line x1="760" y1="450" x2="1440" y2="450" stroke="#ff2a2a" stroke-width="0.4" stroke-dasharray="5,12"/>
      </g>
      <line x1="720" y1="0" x2="720" y2="900" stroke="#ffffff" stroke-width="0.2" opacity="0.05"/>
    </svg>
  `;

  return (
    <div className="min-h-screen bg-[#050a0e] flex flex-col items-center justify-center p-4 font-sans select-none relative overflow-hidden">
      
      {/* INJECT RAW HTML/CSS BACKGROUND */}
      <div 
        className="absolute inset-0 w-full h-full z-0 pointer-events-none"
        dangerouslySetInnerHTML={{ __html: rawAnimatedBackground }}
      />

      {/* MODAL 1: Save Credentials Overlay */}
      {showSaveModal && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="bg-[#18181b] border border-[#444444] w-full max-w-sm rounded-[4px] shadow-[0_10px_40px_rgba(0,0,0,0.8)] flex flex-col animate-in zoom-in-95 duration-200">
            <div className="px-4 py-3 border-b border-[#333333] flex items-center gap-2 bg-[#252526]">
              <Lock size={14} className="text-[#00dcff]" />
              <h3 className="text-[12px] font-semibold text-[#cccccc] uppercase tracking-wide">Credentials Backup</h3>
            </div>
            <div className="p-4 flex flex-col gap-3">
              <p className="text-[12px] text-[#cccccc] leading-relaxed">
                Would you like to export your credentials to <code className="text-[#ff2a2a] bg-[#252526] px-1 py-0.5 font-mono text-[11px] border border-[#333333]">~/kali/home/siphoncredential.txt</code>?
              </p>
              <p className="text-[11px] text-[#969696] italic">
                Highly recommended. If you lose your passphrase, you will lose access to the local workspace forever.
              </p>
            </div>
            <div className="px-4 py-3 border-t border-[#333333] bg-[#252526] flex justify-end gap-2">
              <button 
                onClick={() => { setShowSaveModal(false); setShowWarningModal(true); }}
                className="px-4 py-1.5 bg-[#1e1e1e] border border-[#333333] hover:bg-[#2a2d2e] text-[#cccccc] text-[11px] rounded-[2px]"
              >
                No, skip
              </button>
              <button 
                onClick={handleDownloadCredentials}
                className="px-4 py-1.5 bg-[#00dcff] hover:bg-[#00b8d4] text-black text-[11px] font-bold rounded-[2px] flex items-center gap-2 transition-none shadow-[0_0_10px_rgba(0,220,255,0.4)]"
              >
                <Download size={12} /> Download
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Are you sure Warning Overlay */}
      {showWarningModal && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="bg-[#18181b] border border-[#ff2a2a]/60 w-full max-w-sm rounded-[4px] shadow-[0_10px_40px_rgba(255,42,42,0.2)] flex flex-col animate-in zoom-in-95 duration-200">
            <div className="px-4 py-3 border-b border-[#333333] flex items-center gap-2 bg-[#ff2a2a]/10">
              <AlertTriangle size={14} className="text-[#ff2a2a]" />
              <h3 className="text-[12px] font-semibold text-[#ff2a2a] uppercase tracking-wide">Confirm Unsaved Credentials</h3>
            </div>
            <div className="p-4 flex flex-col gap-3">
              <p className="text-[12px] text-[#cccccc] leading-relaxed">
                Are you absolutely sure you want to proceed without backing up?
              </p>
              <p className="text-[11px] text-[#d4d4d4] bg-[#252526] border-l-2 border-[#ff2a2a] p-2 leading-relaxed">
                SIPHON uses a strict zero-transmission architecture. We cannot recover your passphrase. If you forget it, your local traffic data and configurations will be permanently inaccessible.
              </p>
            </div>
            <div className="px-4 py-3 border-t border-[#333333] bg-[#252526] flex justify-end gap-2">
              <button 
                onClick={finalizeRegistration}
                className="px-4 py-1.5 bg-[#1e1e1e] border border-[#ff2a2a]/50 hover:bg-[#ff2a2a]/20 text-[#ff2a2a] text-[11px] rounded-[2px]"
              >
                I understand the risk
              </button>
              <button 
                onClick={() => { setShowWarningModal(false); setShowSaveModal(true); }}
                className="px-4 py-1.5 bg-[#00dcff] hover:bg-[#00b8d4] text-black text-[11px] font-bold rounded-[2px]"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      )}

      {/* BRAND HEADER */}
      <div className="flex flex-col items-center gap-3 mb-8 relative z-10 drop-shadow-[0_0_15px_rgba(0,0,0,1)]">
        <div className="w-12 h-12 relative flex items-center justify-center">
          <img src={siphonLogo} alt="SIPHON Logo" className="w-full h-full object-contain" />
        </div>
        <h1 className="text-[16px] font-bold text-[#ffffff] tracking-[0.2em] font-mono shadow-black drop-shadow-md">SIPHON</h1>
      </div>

      {/* MAIN CONTAINER (High Opacity + Blur + Shadow for maximum clarity against neon background) */}
      <div className="w-full max-w-md bg-[#1e1e1e]/95 backdrop-blur-xl border border-[#444444] overflow-hidden rounded-[4px] shadow-[0_20px_50px_rgba(0,0,0,0.7)] relative z-10">
        
        {/* VIEW: SETUP WIZARD */}
        {view === 'setup' && (
          <div className="flex flex-col w-full">
            <div className="flex border-b border-[#333333] bg-[#18181b]">
              {[1, 2, 3].map((num) => (
                <div key={num} className={`flex-1 py-2 text-center text-[10px] font-semibold uppercase tracking-wider border-t-2 transition-none ${
                  setupStep === num ? 'bg-[#252526] text-[#00dcff] border-[#00dcff]' : 
                  setupStep > num ? 'bg-[#18181b] text-[#b5cea8] border-transparent' : 
                  'bg-[#18181b] text-[#666666] border-transparent'
                }`}>
                  {num === 1 ? 'CA Cert' : num === 2 ? 'Proxy' : 'Verify'}
                </div>
              ))}
            </div>

            <div className="p-6">
              {setupStep === 1 && (
                <div className="animate-in fade-in duration-300">
                  <h2 className="text-[13px] font-semibold mb-2 text-[#ffffff]">Core CA Certificate</h2>
                  <p className="text-[#a1a1aa] mb-4 text-[11px] leading-relaxed">
                    SIPHON requires a custom Certificate Authority to intercept HTTPS traffic. Import this into your browser's trusted root store.
                  </p>
                  <div className="bg-[#18181b] border border-[#333333] rounded-[2px] p-3 mb-4">
                     <span className="font-mono text-[11px] text-[#d4d4d4]">File: <span className="text-[#ff2a2a]">siphon-ca.crt</span></span>
                  </div>
                  <div className="flex items-center justify-between">
                    <button onClick={downloadCACertificate} className="flex items-center justify-center gap-2 h-7 px-3 bg-[#00dcff] hover:bg-[#00b8d4] text-black font-bold text-[11px] rounded-[2px]">
                      <Download size={12} /> Download
                    </button>
                    <button onClick={() => setSetupStep(2)} className="h-7 px-3 bg-[#18181b] border border-[#444] hover:bg-[#2a2d2e] text-[#ffffff] text-[11px] rounded-[2px]">
                      Next →
                    </button>
                  </div>
                </div>
              )}

              {setupStep === 2 && (
                <div className="animate-in fade-in duration-300">
                  <h2 className="text-[13px] font-semibold mb-2 text-[#ffffff]">Traffic Routing</h2>
                  <p className="text-[#a1a1aa] mb-4 text-[11px] leading-relaxed">
                    Set your browser proxy to route through the local SIPHON engine.
                  </p>
                  <div className="bg-[#18181b] border border-[#333333] rounded-[2px] p-3 mb-4 flex justify-between items-center">
                     <span className="font-mono text-[12px] text-[#b5cea8]">127.0.0.1:8080</span>
                     <button onClick={() => navigator.clipboard.writeText('127.0.0.1:8080')} className="flex items-center gap-1 h-6 px-2 bg-[#333333] hover:bg-[#404040] text-[#ffffff] text-[10px] rounded-[2px]">
                       <Copy size={10} /> Copy
                     </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <button onClick={() => setSetupStep(1)} className="text-[#a1a1aa] text-[11px] hover:text-[#ffffff]">← Back</button>
                    <button onClick={() => setSetupStep(3)} className="h-7 px-3 bg-[#00dcff] hover:bg-[#00b8d4] text-black font-bold text-[11px] rounded-[2px]">
                      Next →
                    </button>
                  </div>
                </div>
              )}

              {setupStep === 3 && (
                <div className="animate-in fade-in duration-300">
                  <h2 className="text-[13px] font-semibold mb-2 text-[#ffffff]">Verification</h2>
                  <p className="text-[#a1a1aa] mb-4 text-[11px] leading-relaxed">
                    Verify engine connectivity before proceeding to operator registration.
                  </p>
                  
                  <div className="bg-[#18181b] border border-[#333333] rounded-[2px] p-4 mb-4 flex flex-col items-center justify-center min-h-[100px]">
                    {testResult === 'idle' && (
                      <button onClick={handleTestConnection} disabled={isTesting} className="flex items-center justify-center gap-2 h-7 px-4 bg-[#00dcff] hover:bg-[#00b8d4] text-black font-bold text-[11px] rounded-[2px]">
                        {isTesting ? <><Loader2 size={12} className="animate-spin" /> Verifying...</> : 'Run Diagnostics'}
                      </button>
                    )}
                    {testResult === 'success' && (
                      <div className="flex flex-col items-center">
                        <CheckCircle2 size={24} className="text-[#b5cea8] mb-1" />
                        <span className="text-[11px] text-[#ffffff]">Connection Verified</span>
                      </div>
                    )}
                    {testResult === 'error' && (
                      <div className="flex flex-col items-center">
                        <XCircle size={24} className="text-[#ff2a2a] mb-1" />
                        <span className="text-[11px] text-[#ffffff] mb-2">{testMessage}</span>
                        <button onClick={handleTestConnection} className="h-6 px-3 bg-[#1e1e1e] border border-[#444] hover:bg-[#2a2d2e] text-[#ffffff] text-[10px] rounded-[2px]">Retry</button>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <button onClick={() => setSetupStep(2)} className="text-[#a1a1aa] text-[11px] hover:text-[#ffffff]">← Back</button>
                    {testResult === 'success' && (
                      <button onClick={finishSetup} className="h-7 px-4 bg-[#155e3a] hover:bg-[#1a7348] text-white text-[11px] font-semibold rounded-[2px]">
                        CONTINUE TO REGISTRATION
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* VIEW: REGISTER */}
        {view === 'register' && (
          <div className="p-6">
            <div className="flex items-center gap-2 mb-6 text-[#ffffff] border-b border-[#333333] pb-3">
              <Terminal size={14} />
              <h2 className="text-[12px] font-semibold tracking-wide uppercase">Initialize Identity</h2>
            </div>

            <div className="flex items-start gap-3 p-3 bg-[#18181b] border border-[#333333] rounded-[2px] mb-6">
              <ShieldAlert size={16} className="text-[#cca700] mt-0.5 shrink-0" />
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-[#cca700] uppercase tracking-wider mb-1">Zero-Transmission Policy</span>
                <span className="text-[11px] text-[#a1a1aa] leading-relaxed">
                  SIPHON operates entirely offline. Your credentials, proxy configurations, and intercepted traffic are encrypted and stored strictly on this local machine. No data is transmitted to external servers.
                </span>
              </div>
            </div>
            
            <form onSubmit={handleRegisterSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-semibold text-[#a1a1aa] uppercase">Desired Operator ID</label>
                <div className="relative">
                  <User size={14} className="absolute left-2.5 top-2 text-[#888888]" />
                  <input type="text" required value={username} onChange={(e) => setUsername(e.target.value)} className="w-full h-8 pl-8 pr-3 bg-[#18181b] border border-[#444] text-[12px] text-[#ffffff] focus:outline-none focus:border-[#00dcff] rounded-[2px]" />
                </div>
              </div>
              
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-semibold text-[#a1a1aa] uppercase">New Passphrase</label>
                <div className="relative">
                  <Lock size={14} className="absolute left-2.5 top-2 text-[#888888]" />
                  <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full h-8 pl-8 pr-3 bg-[#18181b] border border-[#444] text-[12px] text-[#ffffff] focus:outline-none focus:border-[#00dcff] rounded-[2px]" />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-semibold text-[#a1a1aa] uppercase">Confirm Passphrase</label>
                <div className="relative">
                  <Lock size={14} className="absolute left-2.5 top-2 text-[#888888]" />
                  <input type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className={`w-full h-8 pl-8 pr-3 bg-[#18181b] border text-[12px] text-[#ffffff] focus:outline-none rounded-[2px] ${regError ? 'border-[#ff2a2a]' : 'border-[#444] focus:border-[#00dcff]'}`} />
                </div>
                {regError && <span className="text-[10px] text-[#ff2a2a] mt-1">{regError}</span>}
              </div>

              <button type="submit" disabled={isAuthLoading} className="w-full h-8 bg-[#00dcff] hover:bg-[#00b8d4] text-black text-[11px] font-bold transition-none mt-2 rounded-[2px] flex items-center justify-center shadow-[0_0_10px_rgba(0,220,255,0.3)]">
                {isAuthLoading ? <Loader2 size={14} className="animate-spin" /> : 'CREATE LOCAL IDENTITY'}
              </button>
            </form>
          </div>
        )}

        {/* VIEW: LOGIN */}
        {view === 'login' && (
          <div className="p-6">
            <div className="flex items-center gap-2 mb-6 text-[#ffffff] border-b border-[#333333] pb-3">
              <Lock size={14} />
              <h2 className="text-[12px] font-semibold tracking-wide uppercase">System Access</h2>
            </div>
            
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-semibold text-[#a1a1aa] uppercase">Operator ID</label>
                <div className="relative">
                  <User size={14} className="absolute left-2.5 top-2 text-[#888888]" />
                  <input type="text" required value={username} onChange={(e) => setUsername(e.target.value)} className="w-full h-8 pl-8 pr-3 bg-[#18181b] border border-[#444] text-[12px] text-[#ffffff] focus:outline-none focus:border-[#00dcff] rounded-[2px]" />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-semibold text-[#a1a1aa] uppercase">Passphrase</label>
                <div className="relative">
                  <Lock size={14} className="absolute left-2.5 top-2 text-[#888888]" />
                  <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full h-8 pl-8 pr-3 bg-[#18181b] border border-[#444] text-[12px] text-[#ffffff] focus:outline-none focus:border-[#00dcff] rounded-[2px]" />
                </div>
              </div>
              <button type="submit" disabled={isAuthLoading} className="w-full h-8 bg-[#00dcff] hover:bg-[#00b8d4] text-black text-[11px] font-bold transition-none mt-2 rounded-[2px] flex items-center justify-center shadow-[0_0_10px_rgba(0,220,255,0.3)]">
                {isAuthLoading ? <Loader2 size={14} className="animate-spin" /> : 'AUTHENTICATE'}
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
