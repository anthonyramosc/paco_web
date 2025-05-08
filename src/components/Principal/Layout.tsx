import { useEffect, useRef, useState } from 'react';
import "../../assets/css/style.css";
import "../../assets/vendor/animate-wow/animate.min.css";
import "../../assets/icon/flaticon_restics.css";
import "../../assets/vendor/bootstrap/bootstrap.min.css";
import "../../../global.css"

const TypedText = () => {
    const containerRef = useRef(null);
    const [displayText, setDisplayText] = useState("");
    const phrases = ["AYUDA SIN LÍMITES", "PROYECTO SOCIAL", "PACO EL MORLACO"];
    const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);

    const longestPhrase = phrases.reduce((a, b) => (a.length > b.length ? a : b), "");

    useEffect(() => {
        const typePhrase = async (phrase: string) => {
            for (let i = 0; i <= phrase.length; i++) {
                setDisplayText(phrase.substring(0, i));
                await new Promise(resolve => setTimeout(resolve, 100));
            }

            await new Promise(resolve => setTimeout(resolve, 2000));

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
            className={`inline-block relative`}
            style={{ width: `${longestPhrase.length}ch` }}
        >
            <span className="text-white">{displayText}</span>
        </div>
    );
};

const TypedTexts = () => {
    const containerRef = useRef(null);
    const [displayText, setDisplayText] = useState("");
    const phrases = ["AYUDA SIN LÍMITES", "PROYECTO SOCIAL", "PACO EL MORLACO"];
    const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);

    const longestPhrase = phrases.reduce((a, b) => (a.length > b.length ? a : b), "");

    useEffect(() => {
        const typePhrase = async (phrase: string) => {
            for (let i = 0; i <= phrase.length; i++) {
                setDisplayText(phrase.substring(0, i));
                await new Promise(resolve => setTimeout(resolve, 100));
            }

            await new Promise(resolve => setTimeout(resolve, 2000));

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
            className={`inline-block relative`}
            style={{ width: `${longestPhrase.length}ch` }}
        >
            <span className="text-[#785D99]">{displayText}</span>
        </div>
    );
};

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const sidebarRef = useRef<HTMLDivElement>(null);

    const socialLinks = {
        facebook: "https://www.facebook.com/Pacoelmorlaco?_rdr",
        instagram: "https://www.instagram.com/pacoelmorlaco/#",
        tiktok: "https://www.tiktok.com/@pacoelmorlaco99",
        share: `https://wa.me/?text=Visita%20nuestro%20proyecto%20social:%20https://pacoelmorlaco.com`
    };


    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                sidebarRef.current &&
                event.target instanceof Node && // Verifica que event.target sea un nodo válido
                !sidebarRef.current.contains(event.target) &&
                !(event.target as Element).closest('button[aria-label="Toggle menu"]')
            ) {
                setMobileMenuOpen(false);
            }
        };

        if (mobileMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [mobileMenuOpen]);

    // Scroll to component function
    const scrollToComponent = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        // Close mobile menu after clicking
        setMobileMenuOpen(false);
    };

    // Navigation links for both desktop and mobile
    const navLinks = [
        { id: 'profileComponent', label: 'Conoceme', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z' },
        { id: 'donateComponent', label: 'Donaciones', icon: 'M12 2c5.53 0 10 4.47 10 10s-4.47 10-10 10S2 17.53 2 12 6.47 2 12 2zm0 2.79a7.21 7.21 0 100 14.42 7.21 7.21 0 000-14.42zM11 7h2v6h-2V7zm0 8h2v2h-2v-2z' },
        { id: 'prothesisComponent', label: 'Noticias', icon: 'M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 14H4v-6h11v6zm0-8H4V6h11v4zm5 8h-4V6h4v12z' },
        { id: 'segmentationComponent', label: 'Metricas', icon: 'M9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4zm2.5 2.1h-15V5h15v14.1zm0-16.1h-15c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z' },
        { id: 'contactComponent', label: 'Contactame', icon: 'M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z' }
    ];

    return (
        <>
            {/* Main Navbar - Visible on All Screens */}
            <div className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md' : 'bg-white'
                }`}>
                <header className="ul-header">
                    <div className="header-top-bg-wrapper">
                        <div className="ul-header-top px-4 flex flex-col sm:flex-row items-center justify-between sm:justify-between md:justify-around">

                            <div className="flex items-center justify-between w-full sm:w-auto py-0">
                                <div className="font-bold text-xl md:text-2xl sm:block hidden">
                                    {/* Frases en el encabezado de escritorio */}
                                    <TypedText
                                    />
                                    
                                </div>

                                {/* Mobile Logo/Title - Frases en el encabezado móvil */}
                                <div className="font-bold text-xl md:text-2xl sm:hidden">
                                    <TypedText  />
                                </div>

                                <button
                                    aria-label="Toggle menu"
                                    className="sm:hidden text-white"
                                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                </button>
                            </div>
                            {/* Desktop Navigation */}
                            <div className="hidden sm:flex flex-wrap justify-center gap-4 md:gap-6 lg:gap-8">
                                {navLinks.map((link) => (
                                    <button
                                        key={link.id}
                                        onClick={() => scrollToComponent(link.id)}
                                        className="text-white !no-underline text-sm md:text-base lg:text-lg cursor-pointer font-bold whitespace-nowrap"
                                    >
                                        {link.label}
                                    </button>
                                ))}
                            </div>

                            {/* Desktop Social Icons */}
                            <div className="hidden sm:flex space-x-2">
                                <a
                                    href={socialLinks.facebook}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-[#785D99] text-white p-2 rounded-md hover:bg-indigo-100 transition-colors"
                                >
                                    <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                                    </svg>
                                </a>

                                <a
                                    href={socialLinks.instagram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-[#785D99] text-white p-2 rounded-md hover:bg-indigo-100 transition-colors"
                                >
                                    <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                                    </svg>
                                </a>

                                <a
                                    href={socialLinks.tiktok}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-[#785D99] text-white p-2 rounded-md hover:bg-indigo-100 transition-colors"
                                >
                                    <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
                                    </svg>
                                </a>

                                <a
                                    href={socialLinks.share}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-[#785D99] text-white p-2 rounded-md hover:bg-indigo-100 transition-colors"
                                >
                                    <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </header>
            </div>

            {/* Mobile Sidebar Menu - Only Visible on Mobile */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 sm:hidden">
                    <div
                         ref={sidebarRef}
                         className="fixed inset-y-0 right-0 w-5/6 max-w-xs bg-white shadow-lg transform transition-transform duration-300 ease-in-out"
                         style={{ transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(100%)' }}
                     >
                        <div className="h-full flex flex-col overflow-y-auto">

                            {/* Header with Close Button */}
                            <div className="flex items-center justify-between p-4 border-b">
                                {/* Logo removed */}
                                <button
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* Typed Text in Sidebar */}
                            <div className="p-4 border-b text-center">
                                <TypedTexts  />
                            </div>

                            {/* Menu Items */}
                            <div className="flex-grow">
                                {navLinks.map((link) => (
                                    <button
                                        key={link.id}
                                        onClick={() => scrollToComponent(link.id)}
                                        className="flex items-center w-full p-4 text-purple-700 hover:bg-purple-50 border-b"
                                    >
                                        <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
                                            <path d={link.icon} />
                                        </svg>
                                        <span className="text-lg font-medium">{link.label}</span>
                                    </button>
                                ))}
                            </div>

                            {/* Footer with Social Icons */}
                            <div className="p-4 border-t">
                                <p className="text-center mb-4 text-gray-600 font-medium">Síguenos</p>
                                <div className="flex justify-around">
                                    <a
                                        href={socialLinks.facebook}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-[#785D99] text-white p-2 rounded-full"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                                        </svg>
                                    </a>
                                    <a
                                        href={socialLinks.instagram}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-[#785D99] text-white p-2 rounded-full"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                                        </svg>
                                    </a>
                                    <a
                                        href={socialLinks.tiktok}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-[#785D99] text-white p-2 rounded-full"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
                                        </svg>
                                    </a>
                                    <a
                                        href={socialLinks.share}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-[#785D99] text-white p-2 rounded-full"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

import { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow pt-16 sm:pt-20 md:pt-24 lg:pt-28">
                {children}
            </main>
            <footer className="bg-white text-indigo-700 py-6 px-4 sm:px-6">

                <div className="font-bold text-xl md:text-2xl text-center">
                    <TypedTexts />
                </div>
                <div className="max-w-6xl mx-auto mt-3">
                    <p className="text-center">Copyright © {new Date().getFullYear()} Toma mi mano </p>
                </div>
            </footer>
        </div>
    );
};

export default Layout;