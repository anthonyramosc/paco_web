import React, { useEffect, useRef, useState } from 'react';

const TypedText = ({ showInMobileMenu = false, isMenuOpen = false }) => {
    const [displayText, setDisplayText] = useState("");
    const phrases = ["AYUDA SIN LÍMITES", "PROYECTO SOCIAL", "PACO EL MORLACO"];
    const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
    const animationRef = useRef<number | null>(null);

    const longestPhrase = phrases.reduce((a, b) => (a.length > b.length ? a : b), "");

    // Clear existing animation timeout when component unmounts or dependencies change
    useEffect(() => {
        return () => {
            if (animationRef.current) {
                clearTimeout(animationRef.current);
            }
        };
    }, []);

    useEffect(() => {
        // Only run animation if this instance should be visible
        const shouldAnimate = (showInMobileMenu && isMenuOpen) || (!showInMobileMenu && !isMenuOpen);
        
        if (!shouldAnimate) {
            setDisplayText("");
            return;
        }

        const typePhrase = async (phrase: string) => {
            // Clear any existing animation
            if (animationRef.current) {
                clearTimeout(animationRef.current);
            }
            
            // Reset display text
            setDisplayText("");
            
            // Type each character with a slower speed (300ms)
            for (let i = 0; i <= phrase.length; i++) {
                const typeNextChar = () => {
                    setDisplayText(phrase.substring(0, i));
                    
                    // If we've typed the full phrase, wait longer before moving to next phrase
                    if (i === phrase.length) {
                        animationRef.current = setTimeout(() => {
                            setCurrentPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
                        }, 3000); // Wait 3 seconds when phrase is complete
                    }
                };
                
                await new Promise<void>(resolve => {
                    animationRef.current = setTimeout(() => {
                        typeNextChar();
                        resolve();
                    }, 300); // Slower typing speed (300ms per character)
                });
            }
        };

        const animateText = async () => {
            await typePhrase(phrases[currentPhraseIndex]);
        };

        animateText();
    }, [currentPhraseIndex, phrases, showInMobileMenu, isMenuOpen]);

    // Don't render anything if this instance should be hidden
    if ((showInMobileMenu && !isMenuOpen) || (!showInMobileMenu && isMenuOpen)) {
        return null;
    }

    return (
        <div
            className="inline-block relative"
            style={{ width: `${longestPhrase.length}ch` }}
        >
            <span className="text-[#785D99] font-bold">{displayText}</span>
        </div>
    );
};

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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
        // Prevent body scrolling when menu is open
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target;
            if (isMenuOpen && target instanceof Element && !target.closest('.mobile-menu') && !target.closest('.menu-button')) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            // Ensure overflow is restored when component unmounts
            document.body.style.overflow = '';
        };
    }, [isMenuOpen]);

    const scrollToComponent = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsMenuOpen(false);
        }
    };

    return (
        <div className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
            scrolled ? 'bg-white shadow-md' : 'bg-white'
        }`}>
            <header className="w-full">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between px-4 py-3">
                        {/* Logo/Title Section */}
                        <div className="font-bold text-xl md:text-2xl">
                            <TypedText showInMobileMenu={false} isMenuOpen={isMenuOpen} />
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex space-x-8">
                            <button
                                onClick={() => scrollToComponent('profileComponent')}
                                className="text-[#785D99] font-bold text-lg hover:text-purple-800 transition-colors"
                            >
                                Conoceme
                            </button>
                            <button
                                onClick={() => scrollToComponent('donateComponent')}
                                className="text-[#785D99] font-bold text-lg hover:text-purple-800 transition-colors"
                            >
                                Donaciones
                            </button>
                            <button
                                onClick={() => scrollToComponent('prothesisComponent')}
                                className="text-[#785D99] font-bold text-lg hover:text-purple-800 transition-colors"
                            >
                                Noticias
                            </button>
                            <button
                                onClick={() => scrollToComponent('segmentationComponent')}
                                className="text-[#785D99] font-bold text-lg hover:text-purple-800 transition-colors"
                            >
                                Metricas
                            </button>
                            <button
                                onClick={() => scrollToComponent('contactComponent')}
                                className="text-[#785D99] font-bold text-lg hover:text-purple-800 transition-colors"
                            >
                                Contactame
                            </button>
                        </div>

                        {/* Social Links - Desktop */}
                        <div className="hidden md:flex space-x-2">
                            <a
                                href={socialLinks.facebook}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#785D99] p-2 rounded-full hover:bg-purple-100 transition-colors"
                            >
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                                </svg>
                            </a>
                            <a
                                href={socialLinks.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#785D99] p-2 rounded-full hover:bg-purple-100 transition-colors"
                            >
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                                </svg>
                            </a>
                            <a
                                href={socialLinks.tiktok}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#785D99] p-2 rounded-full hover:bg-purple-100 transition-colors"
                            >
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
                                </svg>
                            </a>
                            <a
                                href={socialLinks.share}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#785D99] p-2 rounded-full hover:bg-purple-100 transition-colors"
                            >
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" />
                                </svg>
                            </a>
                        </div>

                        {/* Mobile Menu Button */}
                        <button 
                            className="md:hidden menu-button focus:outline-none"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            <svg className="w-6 h-6 text-[#785D99]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                {isMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
                
                {/* Mobile Menu Panel */}
                <div 
                    className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 mobile-menu ${
                        isMenuOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
                >
                    <div className="flex justify-between items-center p-4 border-b">
                        <h2 className="text-xl font-bold text-[#785D99]">
                            <TypedText showInMobileMenu={true} isMenuOpen={isMenuOpen} />
                        </h2>
                        <button 
                            onClick={() => setIsMenuOpen(false)}
                            className="text-[#785D99] hover:text-purple-800"
                            aria-label="Close menu"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>
                    
                    <div className="py-4">
                        <button
                            onClick={() => scrollToComponent('profileComponent')}
                            className="block w-full text-left px-4 py-3 text-[#785D99] font-bold hover:bg-purple-50"
                        >
                            Conoceme
                        </button>
                        <button
                            onClick={() => scrollToComponent('donateComponent')}
                            className="block w-full text-left px-4 py-3 text-[#785D99] font-bold hover:bg-purple-50"
                        >
                            Donaciones
                        </button>
                        <button
                            onClick={() => scrollToComponent('prothesisComponent')}
                            className="block w-full text-left px-4 py-3 text-[#785D99] font-bold hover:bg-purple-50"
                        >
                            Noticias
                        </button>
                        <button
                            onClick={() => scrollToComponent('segmentationComponent')}
                            className="block w-full text-left px-4 py-3 text-[#785D99] font-bold hover:bg-purple-50"
                        >
                            Metricas
                        </button>
                        <button
                            onClick={() => scrollToComponent('contactComponent')}
                            className="block w-full text-left px-4 py-3 text-[#785D99] font-bold hover:bg-purple-50"
                        >
                            Contactame
                        </button>
                    </div>
                    
                    {/* Mobile Social Links */}
                    <div className="absolute bottom-8 w-full px-4">
                        <p className="text-center text-[#785D99] mb-4 font-bold">Síguenos</p>
                        <div className="flex justify-center space-x-4">
                            <a
                                href={socialLinks.facebook}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#785D99] hover:text-purple-800"
                                aria-label="Facebook"
                            >
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                                </svg>
                            </a>
                            <a
                                href={socialLinks.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#785D99] hover:text-purple-800"
                                aria-label="Instagram"
                            >
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                                </svg>
                            </a>
                            <a
                                href={socialLinks.tiktok}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#785D99] hover:text-purple-800"
                                aria-label="TikTok"
                            >
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
                                </svg>
                            </a>
                            <a
                                href={socialLinks.share}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#785D99] hover:text-purple-800"
                                aria-label="Share"
                            >
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
};

import { ReactNode } from 'react';

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow" style={{ paddingTop: "100px"}}>
                {children}
            </main>
            <footer className="bg-white text-[#785D99] py-6 px-6">
                <div className="font-bold text-xl md:text-2xl text-center">
                    <TypedText />
                </div>
                <div className="max-w-6xl mx-auto mt-3">
                    <p className="text-center">Copyright © {new Date().getFullYear()} Toma mi mano | Developed by Anthony Ramos.</p>
                </div>
            </footer>
        </div>
    );
};

export default Layout;