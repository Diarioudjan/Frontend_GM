import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Carousel = ({ slides, autoPlay = true, autoPlayInterval = 5000 }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [currentSlide, isPlaying, slides.length, autoPlayInterval]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handleMouseEnter = () => {
    if (autoPlay) setIsPlaying(false);
  };

  const handleMouseLeave = () => {
    if (autoPlay) setIsPlaying(true);
  };

  return (
    <div
      className="relative w-full h-[300px] md:h-[400px] lg:h-[480px] overflow-hidden shadow-2xl"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Slides */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
          >
            {/* Background Image/Gradient */}
            <div
              className={`absolute inset-0 ${slide.background || 'bg-gradient-to-br from-green-600 to-green-800'}`}
              style={slide.backgroundImage ? {
                backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${slide.backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              } : {}}
            />

            {/* Content */}
            <div className="relative z-10 flex items-center justify-center h-full px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-4xl mx-auto text-white">
                {slide.badge && (
                  <div className="inline-block bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-4 py-2 mb-4">
                    <span className="text-sm font-medium">{slide.badge}</span>
                  </div>
                )}

                <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
                  {slide.title}
                </h1>

                <p className="text-lg md:text-xl mb-6 opacity-90 max-w-3xl mx-auto">
                  {slide.description}
                </p>

                {slide.actions && (
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    {slide.actions.map((action, actionIndex) => (
                      <Link
                        key={actionIndex}
                        to={action.link}
                        className={`${action.style || 'bg-white text-green-600 hover:bg-gray-100'} 
                          px-8 py-4 rounded-lg font-semibold transition-all duration-300 
                          transform hover:scale-105 shadow-lg hover:shadow-xl`}
                      >
                        {action.text}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 
          bg-white bg-opacity-20 backdrop-blur-sm hover:bg-opacity-30 
          text-white p-3 rounded-full transition-all duration-300 
          hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
        aria-label="Slide précédent"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 
          bg-white bg-opacity-20 backdrop-blur-sm hover:bg-opacity-30 
          text-white p-3 rounded-full transition-all duration-300 
          hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
        aria-label="Slide suivant"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 
                ${index === currentSlide
                  ? 'bg-white scale-125'
                  : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                }`}
              aria-label={`Aller au slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Play/Pause Button */}
      {autoPlay && (
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="absolute top-4 right-4 z-20 
            bg-white bg-opacity-20 backdrop-blur-sm hover:bg-opacity-30 
            text-white p-2 rounded-full transition-all duration-300 
            hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
          )}
        </button>
      )}
    </div>
  );
};

export default Carousel;
