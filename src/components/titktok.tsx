import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from "lucide-react";
import useTiktok from "../hooks/useTiktok.ts";
import type { TikTok } from '../interfaces/TikTok.ts';

// Función mejorada para extraer el ID del video de TikTok
const extractTikTokId = (url: string): string | null => {
    try {
        // Limpiar la URL de parámetros innecesarios
        const cleanUrl = url.split('?')[0];

        // Patrones mejorados para diferentes formatos de URL de TikTok
        const patterns = [
            /tiktok\.com\/@[^/]+\/video\/(\d+)/,
            /tiktok\.com\/v\/(\d+)/,
            /vm\.tiktok\.com\/([A-Za-z0-9]+)/,
            /tiktok\.com\/t\/([A-Za-z0-9]+)/,
            /tiktok\.com\/[^/]+\/video\/(\d+)/,
            /\/(\d{19})/  // IDs de TikTok típicamente tienen 19 dígitos
        ];

        for (const pattern of patterns) {
            const match = cleanUrl.match(pattern);
            if (match && match[1]) {
                return match[1];
            }
        }

        return null;
    } catch (error) {
        console.error('Error extracting TikTok ID:', error);
        return null;
    }
};

// Función para validar si una URL es válida de TikTok
const isValidTikTokUrl = (url: string): boolean => {
    return url.includes('tiktok.com') || url.includes('vm.tiktok.com');
};

interface ProcessedTikTokVideo {
    id: string;
    embedId: string;
    embedUrl: string;
    author: string;
    description: string;
    number: number;
    originalData: TikTok;
}

export default function TikTokSlider() {
    const [videos, setVideos] = useState<ProcessedTikTokVideo[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [scriptLoaded, setScriptLoaded] = useState(false);
    const sliderRef = useRef<HTMLDivElement>(null);

    const {
        tiktoks,
        loading: apiLoading,
        error,
        fetchTiktoks
    } = useTiktok();

    const [visibleVideos, setVisibleVideos] = useState(1);
    const maxIndex = Math.max(0, videos.length - visibleVideos);

    // Procesar los datos de la API
    useEffect(() => {
        if (tiktoks && tiktoks.length > 0) {
            console.log('Raw TikTok data:', tiktoks);

            const processedVideos: ProcessedTikTokVideo[] = tiktoks
                .map((tiktok, index) => {
                    console.log(`Processing TikTok ${index + 1}:`, tiktok);

                    // Verificar si la URL es válida
                    if (!isValidTikTokUrl(tiktok.embed)) {
                        console.warn(`Invalid TikTok URL: ${tiktok.embed}`);
                        return null;
                    }

                    const embedId = extractTikTokId(tiktok.embed);
                    console.log(`Extracted ID for ${tiktok.embed}: ${embedId}`);

                    if (!embedId) {
                        console.warn(`Could not extract ID from: ${tiktok.embed}`);
                        return null;
                    }

                    return {
                        id: tiktok.id,
                        embedId: embedId,
                        embedUrl: tiktok.embed,
                        author: tiktok.nombre || '@PacoElMorlaco',
                        description: `Video de TikTok #${index + 1}`,
                        number: index + 1,
                        originalData: tiktok
                    };
                })
                .filter((video): video is ProcessedTikTokVideo => video !== null);

            console.log('Processed videos:', processedVideos);
            setVideos(processedVideos);
        }
    }, [tiktoks]);

    // Cargar TikToks al montar el componente
    useEffect(() => {
        fetchTiktoks();
    }, [fetchTiktoks]);

    // Configurar número de videos visibles según el tamaño de pantalla
    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width >= 1024) {
                setVisibleVideos(3);
            } else if (width >= 640) {
                setVisibleVideos(2);
            } else {
                setVisibleVideos(1);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Cargar el script de TikTok embed
    useEffect(() => {
        const loadTikTokScript = () => {
            // Eliminar script existente si existe
            const existingScript = document.getElementById('tiktok-embed-script');
            if (existingScript) {
                existingScript.remove();
            }

            // Crear nuevo script
            const script = document.createElement('script');
            script.id = 'tiktok-embed-script';
            script.src = 'https://www.tiktok.com/embed.js';
            script.async = true;

            script.onload = () => {
                console.log('TikTok embed script loaded successfully');
                setScriptLoaded(true);
                setIsLoading(false);

                // Reinicializar embeds después de cargar el script
                setTimeout(() => {
                    if (window.tiktokEmbed) {
                        window.tiktokEmbed.load();
                    }
                }, 500);
            };

            script.onerror = () => {
                console.error('Failed to load TikTok embed script');
                setIsLoading(false);
            };

            document.body.appendChild(script);
        };

        if (videos.length > 0) {
            setIsLoading(true);
            loadTikTokScript();
        }

        return () => {
            const script = document.getElementById('tiktok-embed-script');
            if (script) {
                script.remove();
            }
        };
    }, [videos.length]);

    // Reinicializar embeds cuando cambie el índice
    useEffect(() => {
        if (scriptLoaded && videos.length > 0) {
            const timer = setTimeout(() => {
                if (window.tiktokEmbed) {
                    window.tiktokEmbed.load();
                }
            }, 100);

            return () => clearTimeout(timer);
        }
    }, [currentIndex, scriptLoaded]);

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) => {
            const newIndex = prevIndex - 1;
            return newIndex < 0 ? maxIndex : newIndex;
        });
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => {
            const newIndex = prevIndex + 1;
            return newIndex > maxIndex ? 0 : newIndex;
        });
    };

    const jumpToIndex = (index: number) => {
        setCurrentIndex(index);
    };

    const touchStartX = useRef<number | null>(null);

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (touchStartX.current === null) return;

        const touchEndX = e.changedTouches[0].clientX;
        const difference = touchStartX.current - touchEndX;

        if (Math.abs(difference) > 50) {
            if (difference > 0) {
                handleNext();
            } else {
                handlePrevious();
            }
        }

        touchStartX.current = null;
    };

    const displayedVideos = videos.slice(currentIndex, currentIndex + visibleVideos);

    // Componente de video individual
    const VideoEmbed = ({ video }: { video: ProcessedTikTokVideo }) => {
        const [videoLoaded, setVideoLoaded] = useState(false);

        useEffect(() => {
            const timer = setTimeout(() => {
                setVideoLoaded(true);
                if (window.tiktokEmbed) {
                    window.tiktokEmbed.load();
                }
            }, 200);

            return () => clearTimeout(timer);
        }, [video.embedId]);

        return (
            <div className="flex flex-col rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500">
                <div className="bg-[#785D99] py-2 px-4 flex justify-between items-center">
                    <div className="text-white font-medium text-sm sm:text-base">
                        {video.originalData.nombre || video.author}
                    </div>
                    <div className="text-white text-xs opacity-75">
                        #{video.number}
                    </div>
                </div>

                <div className="tiktok-embed-container w-full relative bg-white p-2 sm:p-4">
                    {!videoLoaded && (
                        <div className="flex items-center justify-center w-full h-96 bg-gray-100 rounded-lg">
                            <div className="w-8 h-8 border-4 border-[#785D99] border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    )}

                    <blockquote
                        className="tiktok-embed"
                        cite={video.embedUrl}
                        data-video-id={video.embedId}
                        style={{
                            width: "100%",
                            minHeight: "400px",
                            display: videoLoaded ? "block" : "none"
                        }}
                    >
                        <section>
                            <a
                                target="_blank"
                                title={video.description}
                                href={video.embedUrl}
                                rel="noopener noreferrer"
                            >
                                {video.description}
                            </a>
                        </section>
                    </blockquote>
                </div>
            </div>
        );
    };

    // Estados de carga y error
    if (apiLoading && videos.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center w-full py-8 sm:py-10 md:py-12">
                <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-[#785D99] border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-gray-600">Cargando videos...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center w-full py-8 sm:py-10 md:py-12">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    <p className="font-bold">Error al cargar los videos</p>
                    <p className="text-sm">{error}</p>
                </div>
                <button
                    onClick={fetchTiktoks}
                    className="mt-4 px-4 py-2 bg-[#785D99] text-white rounded hover:bg-[#6a4d89] transition-colors"
                >
                    Intentar de nuevo
                </button>
            </div>
        );
    }

    if (videos.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center w-full py-8 sm:py-10 md:py-12">
                <p className="text-gray-600 text-lg">No hay videos disponibles</p>
                <p className="text-gray-500 text-sm mt-2">
                    Verifica que las URLs de TikTok sean válidas
                </p>
                <button
                    onClick={fetchTiktoks}
                    className="mt-4 px-4 py-2 bg-[#785D99] text-white rounded hover:bg-[#6a4d89] transition-colors"
                >
                    Recargar
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center w-full py-8 sm:py-10 md:py-12 relative">
            {/* Elementos decorativos superiores */}
            <div className="absolute top-0 left-0 w-full overflow-hidden z-0">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none" className="w-full h-32 sm:h-40 md:h-48">
                    <path
                        fill="#FFFFFF"
                        fillOpacity="1"
                        d="M0,224L48,213.3C96,203,192,181,288,170.7C384,160,480,160,576,170.7C672,181,768,203,864,202.7C960,203,1056,181,1152,181.3C1248,181,1344,203,1392,213.3L1440,224L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
                    ></path>
                </svg>
            </div>

            <div className="z-10 relative flex flex-col items-center w-full px-4 sm:px-6">
                <h1 className="text-3xl sm:text-4xl font-bold mb-1 sm:mb-2 text-[#785D99]">TikTok Highlights</h1>
                <p className="text-base sm:text-lg text-gray-700 mb-4 sm:mb-6">
                    Desliza para ver todos nuestros videos ({videos.length} videos)
                </p>

                <div
                    className="w-full max-w-6xl relative"
                    ref={sliderRef}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                >
                    {/* Botones de navegación */}
                    <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full flex justify-between px-2 z-10 pointer-events-none">
                        <button
                            onClick={handlePrevious}
                            disabled={videos.length <= visibleVideos}
                            className="bg-[#785D99] shadow-lg rounded-full p-2 sm:p-3 hover:bg-[#6a4d89] transition-colors pointer-events-auto transform hover:-translate-x-1 transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            aria-label="Previous videos"
                        >
                            <ChevronLeft className="text-white" size={20} />
                        </button>
                        <button
                            onClick={handleNext}
                            disabled={videos.length <= visibleVideos}
                            className="bg-[#785D99] shadow-lg rounded-full p-2 sm:p-3 hover:bg-[#6a4d89] transition-colors pointer-events-auto transform hover:translate-x-1 transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            aria-label="Next videos"
                        >
                            <ChevronRight className="text-white" size={20} />
                        </button>
                    </div>

                    {/* Indicador de carga global */}
                    {isLoading && (
                        <div className="absolute inset-0 bg-white/70 z-10 flex items-center justify-center">
                            <div className="flex flex-col items-center">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-[#785D99] border-t-transparent rounded-full animate-spin"></div>
                                <p className="mt-2 text-gray-600">Cargando embeds...</p>
                            </div>
                        </div>
                    )}

                    {/* Grid de videos */}
                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                        {displayedVideos.map((video) => (
                            <VideoEmbed key={video.id} video={video} />
                        ))}
                    </div>
                </div>

                {/* Indicadores de paginación */}
                {maxIndex > 0 && (
                    <div className="flex justify-center mt-6 sm:mt-8 mb-2">
                        {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
                            <button
                                key={`dot-${idx}`}
                                className={`h-2 sm:h-3 rounded-full mx-1 transition-all duration-300 ${
                                    idx === currentIndex ? "bg-[#785D99] w-6 sm:w-8" : "bg-gray-300 w-2 sm:w-3 hover:bg-[#6a4d89]"
                                }`}
                                onClick={() => jumpToIndex(idx)}
                                aria-label={`Go to slide ${idx + 1}`}
                            />
                        ))}
                    </div>
                )}

                {/* Contador de páginas */}
                {maxIndex > 0 && (
                    <div className="mt-2 sm:mt-4 text-[#785D99] font-medium text-sm sm:text-base">
                        <span>{currentIndex + 1}</span> de <span>{maxIndex + 1}</span>
                    </div>
                )}
            </div>

            {/* Elementos decorativos inferiores */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden z-0">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none" className="w-full h-32 sm:h-40 md:h-48">
                    <path
                        fill="#FFFFFF"
                        fillOpacity="1"
                        d="M0,96L48,128C96,160,192,224,288,245.3C384,267,480,245,576,213.3C672,181,768,139,864,117.3C960,96,1056,96,1152,112C1248,128,1344,160,1392,176L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                    ></path>
                </svg>
            </div>

            {/* Elementos decorativos flotantes */}
            <div className="absolute top-20 left-10 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-[#785D99]/10 animate-pulse z-0 hidden sm:block"></div>
            <div className="absolute bottom-40 right-10 w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full bg-purple-500/10 animate-pulse delay-700 z-0 hidden sm:block"></div>
            <div className="absolute top-40 right-20 w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full bg-[#785D99]/20 animate-pulse delay-1000 z-0 hidden sm:block"></div>
        </div>
    );
}

// Declaración de tipo para window.tiktokEmbed
declare global {
    interface Window {
        tiktokEmbed: {
            load: () => void;
        };
    }
}