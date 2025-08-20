// import { motion } from 'framer-motion';
import testimonials from '../../data/testimonials.json';

export function TestimonialsSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-white mb-4">
          Trusted by Industry Leaders
        </h2>
        <p className="text-lg text-gray-300">
          Real results from companies using SiteOptz.ai to accelerate growth
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-black border border-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl hover:border-gray-600 transition-all"
          >
            <div className="flex items-center mb-4">
              <div className="w-16 h-16 bg-gray-800 border border-gray-700 rounded-lg flex items-center justify-center mr-4">
                {/* Logo placeholder - in production, use Next/Image */}
                <span className="text-xs text-gray-400 text-center">
                  {testimonial.company.split(' ')[0]}
                </span>
              </div>
              <div>
                <h3 className="font-semibold text-white">{testimonial.company}</h3>
                <p className="text-sm text-gray-400">
                  {testimonial.name}, {testimonial.role}
                </p>
              </div>
            </div>
            
            <blockquote className="text-gray-300 italic">
              &ldquo;{testimonial.testimonial}&rdquo;
            </blockquote>
            
            <div className="mt-4 flex items-center">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-300">5.0</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}