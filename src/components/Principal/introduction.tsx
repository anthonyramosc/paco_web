import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Slide {
  id: number;
  imageSrc: string;
  altText: string;
}

interface IntroductionProps {
  slides?: Slide[];
  onDonate?: () => void;
}

// Imágenes de muestra (reemplazar con tus propias imágenes)
const defaultSlides: Slide[] = [
  {
    id: 1,
    imageSrc: "https://test.tryclicksolutions.com/wp-content/uploads/2024/11/328074845_907657527106548_5780452344093047139_n.jpeg",
    altText: "Paco El Morlaco trabajando en prótesis"
  },
  {
    id: 2,
    imageSrc: "/src/assets/images/paco-slide2.jpg",
    altText: "Paco mostrando sus creaciones"
  },
  {
    id: 3,
    imageSrc: "/src/assets/images/paco-slide3.jpg",
    altText: "Paco inspirando a otros con su historia"
  }
];

const Introduction = ({ slides = defaultSlides, onDonate }: IntroductionProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const handleDonate = () => {
    if (onDonate) {
      onDonate();
    } else {
      console.log("Redirigiendo a la sección de donación");
      // Aquí podrías agregar el comportamiento predeterminado si no se proporciona onDonate
    }
  };

  return (
    <div className="relative w-full">
      {/* Onda superior */}
      <div className="absolute top-0 left-0 w-full overflow-hidden">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
          <path
            fill="#4f46e5"
            fillOpacity="0.2"
            d="M0,224L48,213.3C96,203,192,181,288,170.7C384,160,480,160,576,170.7C672,181,768,203,864,202.7C960,203,1056,181,1152,181.3C1248,181,1344,203,1392,213.3L1440,224L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          ></path>
        </svg>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0 md:space-x-12">
          {/* Sección de imagen con navegación */}
          <div className="w-full md:w-1/2 relative">
            <div className="relative rounded-lg overflow-hidden border border-gray-200 shadow-lg">
              <img
                src={slides[currentSlide].imageSrc}
                alt={slides[currentSlide].altText}
                className="w-full h-96 object-cover object-center"
              />
              
              {/* Botones de navegación */}
              <button
                onClick={goToPrevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 p-2 rounded-full text-indigo-600 transition-all"
                aria-label="Slide anterior"
              >
                <ChevronLeft size={24} />
              </button>
              
              <button
                onClick={goToNextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 p-2 rounded-full text-indigo-600 transition-all"
                aria-label="Siguiente slide"
              >
                <ChevronRight size={24} />
              </button>
            </div>
            
            {/* Indicadores de diapositiva */}
            <div className="flex justify-center mt-4 space-x-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentSlide ? "bg-indigo-600 w-4" : "bg-gray-300"
                  }`}
                  aria-label={`Ir a diapositiva ${index + 1}`}
                />
              ))}
            </div>
          </div>
          
          {/* Sección de texto */}
          <div className="w-full md:w-1/2">
            <h2 className="text-4xl font-bold text-indigo-600 mb-6">Introducción</h2>
            
            <div className="text-gray-700 space-y-4">
              <p>
                Entre 2015 y 2023, los casos de amputaciones por pirotecnia han disminuido,
                aunque en las festividades de Navidad y fin de año aún se reportan al menos
                20 niños con amputaciones, traumas oculares y quemaduras.
              </p>
              
              <p>
                Pedro Brito, conocido como Paco El Morlaco, un tiktoker cuencano de 25 años, se ha
                vuelto viral al mostrar cómo crea sus prótesis tras haber perdido su mano
                derecha a los 13 años por pirotecnia. Paco es un ejemplo de superación,
                enfrentando desafíos desde su infancia hasta su vida adulta, incluyendo
                aspectos académicos y autoestima.
              </p>
              
              <button
                onClick={handleDonate}
                className="mt-6 bg-orange-500 hover:bg-orange-600 text-white font-medium px-6 py-3 rounded-full transition-all shadow-md"
              >
                Donar Ahora
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Onda inferior */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
          <path
            fill="#4f46e5"
            fillOpacity="0.2"
            d="M0,96L48,128C96,160,192,224,288,245.3C384,267,480,245,576,213.3C672,181,768,139,864,117.3C960,96,1056,96,1152,112C1248,128,1344,160,1392,176L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default Introduction;