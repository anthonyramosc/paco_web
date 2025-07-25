import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import img2 from '../assets/img/paco2.jpg'

import "../../global.css"

const ProfileComponent = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            id: 1,
            text: "Hola, soy Pedro Brito, me conocen como Paco el Morlaco, un tiktoker cuencano de 25 años, quien se ha vuelto viral al mostrar cómo crea sus protesis."
        },
        {
            id: 2,
            text: "Perdí mi mano derecha a los 13 años por pirotecnia. Paco es un ejemplo de superación, enfrentando desafíos desde su infancia hasta su vida adulta, incluyendo aspectos académicos y autoestima."
        },
        {
            id: 3,
            text: "Mi historia inspira a jóvenes a perseguir sus metas sin importar los obstáculos, demostrando que las limitaciones físicas no definen nuestro potencial."
        }
    ];

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    const iconElements = ['⚙️', '🔧', '📊', '✓', '🔍', '📐', '🛠️', '📈', '🔩', '⚒️', '📏', '✅','⚙️', '🔧', '📊', '✓', '🔍', '📐', '🛠️', '📈', '🔩', '⚒️', '📏', '✅','⚙️', '🔧', '📊', '✓', '🔍', '📐', '🛠️', '📈', '🔩', '⚒️', '📏', '✅'];

    const generateDecorativeElements = (count :number) => {
        return Array(count).fill(0).map((_, i) => (
            <span
                key={i}
                className="absolute text-[#785D99]"
                style={{
                    top: `${Math.random() * 100}%`,
                    right: `${Math.random() * 100}%`,
                    transform: `rotate(${Math.random() * 360}deg)`,
                    fontSize: `${Math.random() * 14 + 8}px`,
                    opacity: Math.random() * 0.5 + 0.5
                }}
            >
              {iconElements[Math.floor(Math.random() * iconElements.length)]}
            </span>
        ));
    };

    return (
        <div className="flex flex-col md:flex-row items-center bg-white rounded-xl overflow-hidden mx-auto relative px-4 sm:px-6 py-8 max-w-6xl">

            <div className="relative w-full md:w-1/2 aspect-square mb-8 md:mb-0">
                <div className="absolute inset-0 z-0">

                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="absolute w-full h-full">
                            {generateDecorativeElements(40)}
                        </div>
                    </div>


                    <div className="absolute inset-0">
                        {Array(10).fill(0).map((_, i) => (
                            <div
                                key={`shape-${i}`}
                                className="absolute bg-blue-100 rounded-full opacity-20"
                                style={{
                                    width: `${Math.random() * 30 + 10}px`,
                                    height: `${Math.random() * 30 + 10}px`,
                                    top: `${Math.random() * 100}%`,
                                    left: `${Math.random() * 100}%`,
                                }}
                            />
                        ))}
                    </div>


                    <div className="absolute inset-0">
                        {Array(8).fill(0).map((_, i) => (
                            <div
                                key={`line-${i}`}
                                className="absolute bg-blue-300 opacity-30"
                                style={{
                                    width: i % 2 === 0 ? '1px' : `${Math.random() * 50 + 20}px`,
                                    height: i % 2 === 0 ? `${Math.random() * 50 + 20}px` : '1px',
                                    top: `${Math.random() * 100}%`,
                                    left: `${Math.random() * 100}%`,
                                    transform: `rotate(${Math.random() * 180}deg)`
                                }}
                            />
                        ))}
                    </div>
                </div>


                <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="w-full max-w-xs sm:max-w-sm md:max-w-md overflow-hidden">
                        <div className="ul-chef-card">
                            <div className="ul-chef-card-img">
                                <img
                                    src={img2}
                                    alt="Paco El Morlaco"
                                    className="w-full h-auto rounded-t-lg"
                                />
                            </div>

                            <div className="ul-chef-card-txt p-4 text-center bg-white shadow z-10">
                                <h4 className="ul-chef-card-title text-lg sm:text-xl font-bold text-[#785D99]">PEDRO BRITO</h4>
                                <span className="ul-chef-card-subtitle text-sm sm:text-base font-bold">PACO EL MORLACO</span>
                            </div>

                        </div>
                    </div>
                </div>
            </div>


            <div className="w-full md:w-1/2 p-4 sm:p-6 md:p-8 relative">

                <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full flex justify-between px-1">
                    <button
                        onClick={prevSlide}
                        className="bg-white/80 rounded-full p-1 sm:p-2 transition-colors shadow-md hover:bg-white"
                        aria-label="Previous slide"
                    >
                        <ChevronLeft className="text-blue-600" size={20} />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="bg-white/80 rounded-full p-1 sm:p-2 transition-colors shadow-md hover:bg-white"
                        aria-label="Next slide"
                    >
                        <ChevronRight className="text-blue-600" size={20} />
                    </button>
                </div>


                <div className="text-center">
                    <h2 className="text-[#785D99] text-2xl sm:text-3xl font-bold mb-4 sm:mb-8">CONÓCEME</h2>

                    <div className="min-h-24 sm:min-h-32 flex items-center justify-center p-2 sm:p-4">
                        <p className="text-gray-600 italic text-base sm:text-lg">
                            {slides[currentSlide].text}
                        </p>
                    </div>


                    <div className="flex justify-center mt-4 md:mt-6 mb-4 md:mb-8 gap-1 sm:gap-2">
                        {slides.map((slide, index) => (
                            <button
                                key={slide.id}
                                onClick={() => setCurrentSlide(index)}
                                className={`h-2 rounded-full transition-all ${
                                    index === currentSlide ? "rounded-full w-6 bg-black" : "w-2 bg-gray-300"
                                }`} style={{ borderRadius: "calc(infinity * 1px)"}}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileComponent;