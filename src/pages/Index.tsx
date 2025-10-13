const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div 
        className="absolute inset-0 z-0"
        style={{
          background: 'linear-gradient(135deg, #CE422B 0%, #1A1A1A 50%, #884513 100%)',
        }}
      />
      
      <div className="relative z-10 flex flex-col items-center justify-center gap-8">
        <div className="w-32 h-32 mb-4">
          <img 
            src="https://v3b.fal.media/files/b/koala/4h-hgZcdEOsUGUrgoCa3-_output.png" 
            alt="Rust Logo"
            className="w-full h-full object-contain drop-shadow-2xl"
          />
        </div>
        
        <div className="flex flex-col items-center gap-2">
          <h1 
            className="text-7xl font-black tracking-wider text-[#E8E8E8] drop-shadow-[0_4px_20px_rgba(206,66,43,0.5)]"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            SENIOR
          </h1>
          <h2 
            className="text-7xl font-black tracking-wider text-[#E8E8E8] drop-shadow-[0_4px_20px_rgba(206,66,43,0.5)]"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            MODERATOR
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Index;