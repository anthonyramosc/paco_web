import React, { useEffect, useRef, useState } from 'react';
import "../../assets/css/style.css";
import "../../assets/vendor/animate-wow/animate.min.css";
import "../../assets/icon/flaticon_restics.css";
import "../../assets/vendor/bootstrap/bootstrap.min.css";
import "../../../global.css"

const TypedText: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [displayText, setDisplayText] = useState("");
    const phrases = ["AYUDA SIN LÍMITES", "PROYECTO SOCIAL", "PACO EL MORLACO"];
    const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);

    const longestPhrase = phrases.reduce((a, b) => (a.length > b.length ? a : b), "");

    useEffect(() => {
        const typePhrase = async (phrase: string) => {
            for (let i = 0; i <= phrase.length; i++) {
                setDisplayText(phrase.substring(0, i));
                await new Promise(resolve => setTimeout(resolve, 100)); // Velocidad de escritura
            }

            // Espera antes de pasar a la siguiente frase
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Cambia a la siguiente frase
            setCurrentPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
        };

        const animateText = async () => {
            await typePhrase(phrases[currentPhraseIndex]);
        };

        animateText();
    }, [currentPhraseIndex]);

    return (
        <div
            ref={containerRef}
            className="inline-block relative"
            style={{ width: `${longestPhrase.length}ch` }} // Fija el ancho basado en la frase más larga
        >
            <span className="text-[#5A67F9FF]">{displayText}</span>
        </div>
    );
};

const Navbar: React.FC = () => {
    return (
        <header className="ul-header">
            <div className="header-top-bg-wrapper">
                <div className="ul-header-top  flex items-center justify-center gap-80">


                    <div className="font-bold text-xl md:text-2xl">
                        <TypedText />
                    </div>


                    <div className="md:flex space-x-8 z-10">
                        <a href="#inicio" className="text-[#5A67F9FF] !no-underline text-lg">Inicio</a>
                        <a href="#conoceme" className="text-[#5A67F9FF] !no-underline text-lg">Conoceme</a>
                        <a href="#donaciones" className="text-[#5A67F9FF] !no-underline text-lg">Donaciones</a>
                        <a href="#contactame" className="text-[#5A67F9FF] !no-underline text-lg">Contactame</a>
                    </div>



                    <div className="flex space-x-2">

                        <a href="#" className="bg-white text-indigo-500 p-2 rounded-md hover:bg-indigo-100 transition-colors">
                            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                            </svg>
                        </a>


                        <a href="#" className="bg-white text-indigo-500 p-2 rounded-md hover:bg-indigo-100 transition-colors">
                            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                            </svg>
                        </a>


                        <a href="#" className="bg-white text-indigo-500 p-2 rounded-md hover:bg-indigo-100 transition-colors">
                            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
                            </svg>
                        </a>


                        <a href="#" className="bg-white text-indigo-500 p-2 rounded-md hover:bg-indigo-100 transition-colors">
                            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
                            </svg>
                        </a>
                    </div>


                    <button className="md:hidden">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </button>
                    

                </div>
            </div></header>
    );
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow" style={{ marginTop: "-80px", zIndex: "100" }}>
          {children}

        </main>
        <footer className="bg-white text-indigo-700 py-6 px-6">
          <div className="font-bold text-xl md:text-2xl text-center">
            <TypedText />
          </div>
          <div className="max-w-6xl mx-auto mt-3">
            <p className="text-center">
              Copyright © {new Date().getFullYear()} Toma mi mano | Developed by Anthony Ramos.
            </p>
          </div>
        </footer>
      </div>
    );
  };

export default Layout;