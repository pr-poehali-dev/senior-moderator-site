import { useState } from 'react';

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="absolute top-8 left-8 z-20">
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="bg-[#CE422B] hover:bg-[#A03522] text-white font-bold px-6 py-3 rounded-lg transition-all hover:scale-105 drop-shadow-lg"
        >
          ССЫЛКИ
        </button>
        
        {isMenuOpen && (
          <div className="absolute top-16 left-0 bg-black/80 backdrop-blur-sm rounded-lg overflow-hidden drop-shadow-2xl min-w-[250px]">
            <a
              href="https://www.youtube.com/@markofin_cheats"
              target="_blank"
              rel="noopener noreferrer"
              className="block px-6 py-4 text-white hover:bg-[#CE422B] transition-colors font-semibold"
            >
              YOUTUBE
            </a>
            <a
              href="https://discord.gg/PkBhywnB"
              target="_blank"
              rel="noopener noreferrer"
              className="block px-6 py-4 text-white hover:bg-[#CE422B] transition-colors font-semibold"
            >
              DISCORD
            </a>
          </div>
        )}
      </div>

      <div className="flex flex-col items-center gap-8">
        <img 
          src="https://cdn.poehali.dev/projects/e4911389-7d8d-4ad0-b4c6-ca28c6c65697/files/896f560e-cdcf-4170-866d-07dd53fc528d.jpg" 
          alt="Rust Logo"
          className="w-32 h-32 object-contain drop-shadow-2xl"
        />
        <h1 className="text-6xl font-bold text-white drop-shadow-lg">
          SeniorModerator
        </h1>
      </div>
    </div>
  );
};

export default Index;
