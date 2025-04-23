import { useState} from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import imgP from "../assets/img/banner-img-1.png";
import imgP1 from "../assets/img/img.png";
import imgP2 from "../assets/img/img_1.png";


interface Slide {
  id: number;
  imageSrc: string;
  altText: string;
}

interface IntroductionProps {
  slides?: Slide[];
  onDonate?: () => void;
}

const defaultSlides: Slide[] = [
  {
    id: 1,
    imageSrc: imgP,
    altText: "Paco El Morlaco trabajando en prótesis"
  },
  {
    id: 2,
    imageSrc: "/api/placeholder/500/300",
    altText: "Paco mostrando sus creaciones"
  },
  {
    id: 3,
    imageSrc: "/api/placeholder/500/300",
    altText: "Paco inspirando a otros con su historia"
  }
];

const Introduction = ({ slides = defaultSlides }: IntroductionProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);


  const goToNextSlide = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToPrevSlide = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentSlide) return;

    setIsAnimating(true);
    setCurrentSlide(index);
    setTimeout(() => setIsAnimating(false), 500);
  };



  return (
      <div className="relative w-full bg-gradient-to-br from-purple-50 to-indigo-50 overflow-hidden">

        <div className="absolute top-0 left-0 w-full overflow-hidden">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
            <path
                fill="#FFFFFF"
                fillOpacity="1"
                d="M0,224L48,213.3C96,203,192,181,288,170.7C384,160,480,160,576,170.7C672,181,768,203,864,202.7C960,203,1056,181,1152,181.3C1248,181,1344,203,1392,213.3L1440,224L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
            ></path>
          </svg>
        </div>

        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10">

            <div className="w-full md:w-1/2 order-2 md:order-1">
              <div className="relative">
                <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-8 inline-block">
                  Superando Límites
                </h2>
                <div className="h-1 w-24 bg-gradient-to-r from-indigo-500 to-purple-500 mb-6 rounded-full"></div>
              </div>

              <div className="text-gray-700 space-y-5 text-lg">
                <p className="leading-relaxed">
                  Entre 2015 y 2023, aunque los casos de amputaciones por pirotecnia han disminuido,
                  todavía se reportan al menos 20 niños con amputaciones, traumas oculares y quemaduras
                  durante las festividades navideñas.
                </p>

                <p className="leading-relaxed">
                  <span className="font-semibold text-indigo-600">Pedro Brito</span>, conocido como
                  <span className="font-semibold italic"> "Paco El Morlaco"</span>, es un tiktoker cuencano
                  de 25 años que se ha vuelto viral al compartir cómo diseña y crea sus propias prótesis
                  tras perder su mano derecha a los 13 años en un accidente con pirotecnia.
                </p>

                <p className="leading-relaxed">
                  Su historia es un poderoso ejemplo de superación y resiliencia, enfrentando y venciendo
                  desafíos desde su infancia hasta su vida adulta, transformando su adversidad en inspiración
                  para miles de personas.
                </p>
              </div>



            </div>

            <div className="w-full md:w-1/2 order-1 md:order-2">
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0  z-10"></div>

                <div className={`relative h-full transition-all duration-500 ease-in-out transform ${isAnimating ? 'scale-105 opacity-90' : 'scale-100 opacity-100'}`}>
                  <img
                      src={slides[currentSlide].imageSrc}
                      alt={slides[currentSlide].altText}
                      className="w-full h-full object-cover"
                  />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 z-20 ">
                  <p className="text-white text-lg ">{slides[currentSlide].altText}</p>
                </div>

                <button
                    onClick={goToPrevSlide}
                    className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/30 hover:bg-white/60 p-2 rounded-full z-20 backdrop-blur-sm transition-all"
                >
                  <ChevronLeft size={24} className="text-white" />
                </button>

                <button
                    onClick={goToNextSlide}
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/30 hover:bg-white/60 p-2 rounded-full z-20 backdrop-blur-sm transition-all"
                >
                  <ChevronRight size={24} className="text-white" />
                </button>

                <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-20 cursor-pointer">
                  {slides.map((_, index) => (
                      <button
                          key={index}
                          onClick={() => goToSlide(index)}
                          className={`w-2 h-2 rounded-full transition-all ${
                              index === currentSlide
                                  ? 'bg-white w-8'
                                  : 'bg-white/50 hover:bg-white/80'
                          }`}
                          style={{borderRadius:"15%"}}
                      />
                  ))}
                </div>
              </div>


            </div>
          </div>
        </div>


        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
            <path
                fill="#FFFFFF"
                fillOpacity="1"
                d="M0,96L48,128C96,160,192,224,288,245.3C384,267,480,245,576,213.3C672,181,768,139,864,117.3C960,96,1056,96,1152,112C1248,128,1344,160,1392,176L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>


        <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-indigo-500/10 animate-pulse"></div>
        <div className="absolute bottom-40 right-10 w-32 h-32 rounded-full bg-purple-500/10 animate-pulse delay-700"></div>
        <div className="absolute top-40 right-20 w-16 h-16 rounded-full bg-indigo-300/20 animate-pulse delay-1000"></div>
      </div>
  );
};

export default Introduction;