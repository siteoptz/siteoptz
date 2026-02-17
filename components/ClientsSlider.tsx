import React from 'react';

const ClientsSlider: React.FC = () => {
  // Client logos data - using company names that will be styled as logos
  const clients = [
    { name: 'Nestlé', logo: 'NESTLÉ', color: 'text-red-400' },
    { name: 'Duracell', logo: 'DURACELL', color: 'text-orange-400' },
    { name: 'AT&T', logo: 'AT&T', color: 'text-blue-400' },
    { name: 'Reliant', logo: 'RELIANT', color: 'text-green-400' },
    { name: 'US Air Force', logo: 'U.S. AIR FORCE', color: 'text-blue-300' },
    { name: 'PNC', logo: 'PNC', color: 'text-yellow-400' },
    { name: 'American Express', logo: 'AMERICAN EXPRESS', color: 'text-blue-500' },
    { name: 'Proactiv', logo: 'PROACTIV', color: 'text-purple-400' },
    { name: 'Vancouver 2010', logo: 'VANCOUVER 2010', color: 'text-cyan-400' },
    { name: 'P&G', logo: 'P&G', color: 'text-indigo-400' },
    { name: 'NRG', logo: 'NRG', color: 'text-emerald-400' },
  ];

  // Duplicate the clients array to create seamless infinite scroll
  const duplicatedClients = [...clients, ...clients];

  return (
    <section className="py-16 bg-gradient-to-br from-gray-900/50 via-black to-gray-900/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Big and Small, Across Industries, Our Expert Consultants Have Created Value for…
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
        </div>

        {/* Slider Container */}
        <div className="relative py-8">
          {/* Gradient overlays for fade effect */}
          <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-black via-black/90 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-black via-black/90 to-transparent z-10 pointer-events-none"></div>
          
          {/* Sliding Container */}
          <div 
            className="flex animate-infinite-scroll hover:pause-animation"
            style={{
              animation: 'scroll 40s linear infinite'
            }}
          >
            {duplicatedClients.map((client, index) => (
              <div
                key={`${client.name}-${index}`}
                className="flex-none mx-6 md:mx-8 flex items-center justify-center group cursor-pointer"
                style={{ minWidth: '220px', height: '100px' }}
              >
                <div className="text-center transform group-hover:scale-110 transition-all duration-300 group-hover:bg-white/5 rounded-lg p-4 group-hover:shadow-lg group-hover:shadow-blue-500/20">
                  <div className={`text-lg md:text-xl lg:text-2xl font-bold ${client.color} group-hover:text-white transition-colors duration-300 tracking-wider font-mono`}>
                    {client.logo}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Subtitle */}
        <div className="text-center mt-12">
          <p className="text-gray-300 text-lg md:text-xl font-medium">
            Trusted by Fortune 500 companies and growing businesses worldwide
          </p>
          <div className="flex justify-center items-center mt-4 space-x-8 text-sm text-gray-500">
            <span>• $50M+ in productivity gains generated</span>
            <span>• 500+ AI solutions deployed</span>
            <span>• 15x average ROI delivered</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .hover\\:pause-animation:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default ClientsSlider;