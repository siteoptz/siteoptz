import React from 'react';
import Image from 'next/image';

const ClientsSlider: React.FC = () => {
  // Client logos data - using actual logo images
  const clients = [
    { name: 'Nestlé', logo: 'https://siteoptz.com/wp-content/uploads/siteoptz-img-1.jpg', alt: 'Nestlé Logo' },
    { name: 'Duracell', logo: 'https://siteoptz.com/wp-content/uploads/siteoptz-img-10.jpg', alt: 'Duracell Logo' },
    { name: 'AT&T', logo: 'https://siteoptz.com/wp-content/uploads/siteoptz-img-15.jpg', alt: 'AT&T Logo' },
    { name: 'US Air Force', logo: 'https://siteoptz.com/wp-content/uploads/siteoptz-img-13.jpg', alt: 'US Air Force Logo' },
    { name: 'PNC', logo: 'https://siteoptz.com/wp-content/uploads/siteoptz-img-6.jpg', alt: 'PNC Logo' },
    { name: 'American Express', logo: 'https://siteoptz.com/wp-content/uploads/siteoptz-img-11.jpg', alt: 'American Express Logo' },
    { name: 'Proactiv', logo: 'https://siteoptz.com/wp-content/uploads/siteoptz-img-7.jpg', alt: 'Proactiv Logo' },
    { name: 'Vancouver 2010', logo: 'https://siteoptz.com/wp-content/uploads/siteoptz-img-8.jpg', alt: 'Vancouver 2010 Logo' },
    { name: 'P&G', logo: 'https://siteoptz.com/wp-content/uploads/siteoptz-img-4.jpg', alt: 'P&G Logo' },
    { name: 'NRG', logo: 'https://siteoptz.com/wp-content/uploads/siteoptz-img-9.jpg', alt: 'NRG Logo' },
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
          {/* Sliding Container */}
          <div 
            className="flex animate-infinite-scroll hover:pause-animation"
            style={{
              animation: 'scroll 32s linear infinite'
            }}
          >
            {duplicatedClients.map((client, index) => (
              <div
                key={`${client.name}-${index}`}
                className="flex-none mx-1 md:mx-8 flex items-center justify-center group cursor-pointer"
                style={{ minWidth: '160px', height: '100px' }}
              >
                <div className="text-center transform group-hover:scale-110 transition-all duration-300">
                  <div className="relative w-24 h-12 md:w-40 md:h-20 filter grayscale invert opacity-60 group-hover:opacity-90 transition-all duration-300">
                    <Image
                      src={client.logo}
                      alt={client.alt}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 128px, 160px"
                    />
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

        @media (max-width: 768px) {
          .animate-infinite-scroll {
            animation: scroll 12s linear infinite !important;
          }
          .animate-infinite-scroll > div {
            min-width: 100px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default ClientsSlider;