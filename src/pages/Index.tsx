import { useState, useEffect, useRef, useMemo } from 'react';

const Index = () => {
  const [isFlashing, setIsFlashing] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [moderkiColor, setModerkiColor] = useState('#E8E8E8');
  const [clickCount, setClickCount] = useState(0);
  const [isRainbowMode, setIsRainbowMode] = useState(false);
  const [showSnowflakes, setShowSnowflakes] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });

  const colors = ['#E8E8E8', '#CE422B', '#884513', '#FF8C00', '#FFD700', '#00FF00', '#00BFFF', '#FF00FF'];
  
  const changeModerkiColor = () => {
    const currentIndex = colors.indexOf(moderkiColor);
    const nextIndex = (currentIndex + 1) % colors.length;
    setModerkiColor(colors[nextIndex]);
    
    setTimeout(() => {
      setModerkiColor('#E8E8E8');
    }, 2000);
    
    const newCount = clickCount + 1;
    setClickCount(newCount);
    
    if (newCount === 3) {
      setIsRainbowMode(true);
      setClickCount(0);
    }
  };
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const snowflakes = useMemo(() => {
    return Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 5 + Math.random() * 10
    }));
  }, []);

  useEffect(() => {
    const bgAudio = new Audio('https://cdn.pixabay.com/audio/2022/03/10/audio_c34dd1eb37.mp3');
    bgAudio.loop = true;
    bgAudio.volume = 0.5;
    audioRef.current = bgAudio;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(err => console.log('Play failed:', err));
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let time = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = 1;

      const waves = 30;
      const spacing = canvas.height / waves;
      
      const mouseInfluence = 150;
      const mouseX = mousePos.current.x;
      const mouseY = mousePos.current.y;

      for (let i = 0; i < waves; i++) {
        ctx.beginPath();
        
        for (let x = 0; x <= canvas.width; x += 5) {
          const distanceToMouse = Math.sqrt(Math.pow(x - mouseX, 2) + Math.pow((canvas.height * 0.2 + i * spacing * 0.3) - mouseY, 2));
          const mouseEffect = Math.max(0, 1 - distanceToMouse / mouseInfluence) * 80;
          
          const y = (canvas.height * 0.2) + 
                    Math.sin((x * 0.003) + (i * 0.3) + time) * 80 +
                    Math.sin((x * 0.002) + time * 0.8) * 60 +
                    (i * spacing * 0.3) +
                    mouseEffect * Math.sin(time * 2);
          
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        
        ctx.stroke();
      }

      for (let i = 0; i < waves; i++) {
        ctx.beginPath();
        
        for (let x = 0; x <= canvas.width; x += 5) {
          const distanceToMouse = Math.sqrt(Math.pow(x - mouseX, 2) + Math.pow((canvas.height * 0.6 + i * spacing * 0.25) - mouseY, 2));
          const mouseEffect = Math.max(0, 1 - distanceToMouse / mouseInfluence) * 80;
          
          const y = (canvas.height * 0.6) + 
                    Math.sin((x * 0.004) + (i * 0.25) - time * 1.2) * 70 +
                    Math.sin((x * 0.0015) - time) * 50 +
                    (i * spacing * 0.25) +
                    mouseEffect * Math.sin(time * 2);
          
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        
        ctx.stroke();
      }

      time += 0.01;
      requestAnimationFrame(draw);
    };

    draw();

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const playRocketSound = () => {
    if (isPlaying) {
      const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2158/2158-preview.mp3');
      audio.volume = 0.6;
      audio.play().catch(err => console.log('Audio play failed:', err));
    }
    
    setIsFlashing(true);
    setTimeout(() => setIsFlashing(false), 300);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div 
        className="absolute inset-0 z-0"
        style={{
          background: '#0a0a0a',
        }}
      />
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 z-0"
      />
      <div 
        className={`absolute inset-0 z-0 transition-opacity duration-300 ${isRainbowMode ? 'rainbow-bg' : ''}`}
        style={{
          background: isRainbowMode ? undefined : 'radial-gradient(circle at 30% 50%, rgba(206,66,43,0.15) 0%, transparent 50%), radial-gradient(circle at 70% 50%, rgba(136,69,19,0.15) 0%, transparent 50%)',
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

      {showSnowflakes && snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute text-white opacity-70 pointer-events-none"
          style={{
            left: `${flake.left}%`,
            top: '-10px',
            animation: `fall ${flake.duration}s linear infinite`,
            animationDelay: `${flake.delay}s`,
            fontSize: `${Math.random() * 10 + 10}px`,
          }}
        >
          ❄
        </div>
      ))}

      <style>{`
        @keyframes fall {
          to {
            transform: translateY(100vh) translateX(${Math.random() * 100 - 50}px);
          }
        }
        
        @keyframes rainbow {
          0% { color: #ff0000; }
          16.66% { color: #ff7f00; }
          33.33% { color: #ffff00; }
          50% { color: #00ff00; }
          66.66% { color: #0000ff; }
          83.33% { color: #8b00ff; }
          100% { color: #ff0000; }
        }
        
        @keyframes rainbowBg {
          0% { background: linear-gradient(135deg, #ff0000 0%, #1A1A1A 50%, #ff7f00 100%); }
          16.66% { background: linear-gradient(135deg, #ff7f00 0%, #1A1A1A 50%, #ffff00 100%); }
          33.33% { background: linear-gradient(135deg, #ffff00 0%, #1A1A1A 50%, #00ff00 100%); }
          50% { background: linear-gradient(135deg, #00ff00 0%, #1A1A1A 50%, #0000ff 100%); }
          66.66% { background: linear-gradient(135deg, #0000ff 0%, #1A1A1A 50%, #8b00ff 100%); }
          83.33% { background: linear-gradient(135deg, #8b00ff 0%, #1A1A1A 50%, #ff0000 100%); }
          100% { background: linear-gradient(135deg, #ff0000 0%, #1A1A1A 50%, #ff7f00 100%); }
        }
        
        .rainbow-text {
          animation: rainbow 3s linear infinite;
        }
        
        .rainbow-fast {
          animation: rainbow 0.5s linear infinite;
        }
        
        .rainbow-bg {
          animation: rainbowBg 1s linear infinite;
        }
      `}</style>
      
      <div className="absolute top-8 left-8 z-20">
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="bg-[#CE422B] hover:bg-[#A03522] text-white font-bold px-6 py-3 rounded-lg transition-all hover:scale-105 drop-shadow-lg"
          style={{ fontFamily: 'Montserrat, sans-serif' }}
        >
          ССЫЛКИ
        </button>
        
        {isMenuOpen && (
          <div className="absolute top-16 left-0 bg-black/80 backdrop-blur-sm rounded-lg overflow-hidden drop-shadow-2xl min-w-[250px]">
            <a
              href="https://www.youtube.com/@markofin_cheats"
              target="_blank"
              rel="noopener noreferrer"
              className="block px-6 py-4 hover:bg-[#CE422B] transition-colors font-semibold rainbow-text"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              YOUTUBE
            </a>
            <a
              href="https://discord.gg/PkBhywnB"
              target="_blank"
              rel="noopener noreferrer"
              className="block px-6 py-4 hover:bg-[#CE422B] transition-colors font-semibold rainbow-text"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              DISCORD
            </a>
          </div>
        )}
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center gap-20">
        <div className="flex flex-col items-center gap-4">
          {isRainbowMode && (
            <button
              onClick={() => setIsRainbowMode(false)}
              className="bg-[#CE422B] hover:bg-[#A03522] text-white font-bold px-6 py-2 rounded-lg transition-all hover:scale-105 drop-shadow-lg"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              Отключить RGB
            </button>
          )}
          <p 
            className={`text-2xl font-bold tracking-wide drop-shadow-lg ${isRainbowMode ? 'rainbow-fast' : 'text-[#E8E8E8]'}`}
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            Путь до{' '}
            <button
              onClick={changeModerkiColor}
              className="hover:scale-105 transition-transform cursor-pointer"
              style={{ color: isRainbowMode ? undefined : moderkiColor }}
            >
              Модерки
            </button>
          </p>
          <p 
            className={`text-2xl font-bold tracking-wide drop-shadow-lg ${isRainbowMode ? 'rainbow-fast' : 'text-[#E8E8E8]'}`}
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            CHEATERS ARE BAD
          </p>
        </div>
        
        <div 
          className="flex flex-col items-center gap-2 cursor-pointer select-none transition-transform hover:scale-105 active:scale-95"
          onClick={playRocketSound}
        >
          <h1 
            className={`text-7xl font-black tracking-wider drop-shadow-[0_4px_20px_rgba(206,66,43,0.5)] ${isRainbowMode ? 'rainbow-fast' : 'text-[#E8E8E8]'}`}
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            SENIOR
          </h1>
          <div className="flex items-center gap-4">
            <h2 
              className={`text-7xl font-black tracking-wider drop-shadow-[0_4px_20px_rgba(206,66,43,0.5)] ${isRainbowMode ? 'rainbow-fast' : 'text-[#E8E8E8]'}`}
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

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 bg-black/30 backdrop-blur-sm px-6 py-3 rounded-full flex items-center gap-4">
        <button 
          onClick={toggleMusic}
          className="text-white text-2xl hover:scale-110 transition-transform"
        >
          {isPlaying ? '🔊' : '🔇'}
        </button>
        <button 
          onClick={() => setShowSnowflakes(!showSnowflakes)}
          className="text-white text-2xl hover:scale-110 transition-transform"
        >
          {showSnowflakes ? '❄️' : '🚫'}
        </button>
        <button 
          onClick={() => setIsAboutOpen(!isAboutOpen)}
          className="text-white text-2xl hover:scale-110 transition-transform"
        >
          ❓
        </button>
      </div>

      {isAboutOpen && (
        <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 z-20 bg-black/90 backdrop-blur-sm rounded-lg p-6 max-w-md drop-shadow-2xl">
          <button 
            onClick={() => setIsAboutOpen(false)}
            className="absolute top-2 right-2 text-white text-xl hover:scale-110 transition-transform"
          >
            ✕
          </button>
          <p 
            className="text-white text-lg leading-relaxed pr-6"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            Я Senior Moderator Александр, мне 17 лет. Играю в игру RUST на проекте СompanyRust и хочу стать там администратором.
          </p>
        </div>
      )}
    </div>
  );
};

export default Index;