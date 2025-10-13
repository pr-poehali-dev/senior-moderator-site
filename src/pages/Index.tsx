import { useState } from 'react';

const Index = () => {
  const [isFlashing, setIsFlashing] = useState(false);

  const playRocketSound = () => {
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2158/2158-preview.mp3');
    audio.volume = 0.6;
    audio.play().catch(err => console.log('Audio play failed:', err));
    
    setIsFlashing(true);
    setTimeout(() => setIsFlashing(false), 300);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div 
        className="absolute inset-0 z-0 transition-opacity duration-300"
        style={{
          background: 'linear-gradient(135deg, #CE422B 0%, #1A1A1A 50%, #884513 100%)',
          opacity: isFlashing ? 0.3 : 1,
        }}
      />
      
      {isFlashing && (
        <div 
          className="absolute inset-0 z-0 animate-pulse"
          style={{
            background: 'radial-gradient(circle, rgba(255,140,0,0.8) 0%, rgba(206,66,43,0.4) 50%, transparent 100%)',
          }}
        />
      )}
      
      <div className="relative z-10 flex flex-col items-center justify-center">
        <div 
          className="flex flex-col items-center gap-2 cursor-pointer select-none transition-transform hover:scale-105 active:scale-95"
          onClick={playRocketSound}
        >
          <h1 
            className="text-7xl font-black tracking-wider text-[#E8E8E8] drop-shadow-[0_4px_20px_rgba(206,66,43,0.5)]"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            SENIOR
          </h1>
          <div className="flex items-center gap-4">
            <h2 
              className="text-7xl font-black tracking-wider text-[#E8E8E8] drop-shadow-[0_4px_20px_rgba(206,66,43,0.5)]"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              MODERATOR
            </h2>
            <img 
              src="https://cdn.poehali.dev/files/50deea39-8a1a-4189-ac12-3da18238a504.jpg" 
              alt="Rust Logo"
              className="w-20 h-20 object-contain drop-shadow-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;