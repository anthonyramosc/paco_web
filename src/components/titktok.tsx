import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

interface TikTokVideo {
    id: string;
    embedId: string;
    author: string;
    description: string;
    number: number;
}

const tiktokVideos: TikTokVideo[] = [
    {
        id: '1',
        embedId: '7353728401980673286',
        author: '@pacoelmorlaco99',
        description: 'Video de TikTok #1',
        number: 1
    },
    {
        id: '2',
        embedId: '7380373261068160262',
        author: '@pacoelmorlaco99',
        description: 'Video de TikTok #2',
        number: 2
    },
    {
        id: '3',
        embedId: '7420077257965817094',
        author: '@pacoelmorlaco99',
        description: 'Video de TikTok #3',
        number: 3
    },
    {
        id: '4',
        embedId: '7353728401980673286',
        author: '@pacoelmorlaco99',
        description: 'Video de TikTok #4',
        number: 4
    },
    {
        id: '5',
        embedId: '7380373261068160262',
        author: '@pacoelmorlaco99',
        description: 'Video de TikTok #5',
        number: 5
    },
    {
        id: '6',
        embedId: '7420077257965817094',
        author: '@pacoelmorlaco99',
        description: 'Video de TikTok #6',
        number: 6
    }
];

export default function TikTokSlider() {
    const [videos] = useState<TikTokVideo[]>(tiktokVideos);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const timerRef = useRef<number | null>(null);
    const sliderRef = useRef<HTMLDivElement>(null);

    const visibleVideos = 3;
    const maxIndex = Math.max(0, videos.length - visibleVideos);


    useEffect(() => {
        if (timerRef.current) {
            window.clearInterval(timerRef.current);
        }

        if (!isPaused) {
            timerRef.current = window.setInterval(() => {
                setCurrentIndex((prevIndex) => {
                    const nextIndex = prevIndex + 1;
                    return nextIndex > maxIndex ? 0 : nextIndex;
                });
            }, 5000) as unknown as number;
        }

        return () => {
            if (timerRef.current) {
                window.clearInterval(timerRef.current);
            }
        };
    }, [isPaused, maxIndex]);


    useEffect(() => {
        setIsLoading(true);


        const existingScript = document.getElementById('tiktok-embed-script');
        if (existingScript) {
            existingScript.remove();
        }


        const script = document.createElement('script');
        script.id = 'tiktok-embed-script';
        script.src = 'https://www.tiktok.com/embed.js';
        script.async = true;


        script.onload = () => {
            setIsLoading(false);
        };

        document.body.appendChild(script);

        return () => {
            if (document.getElementById('tiktok-embed-script')) {
                document.getElementById('tiktok-embed-script')?.remove();
            }
        };
    }, [currentIndex]);


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

    return (
        <div className="flex flex-col items-center w-full py-12 relative">

            <div className="absolute top-0 left-0 w-full overflow-hidden z-0">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none" className="w-full h-48">
                    <path
                        fill="#FFFFFF"
                        fillOpacity="1"
                        d="M0,224L48,213.3C96,203,192,181,288,170.7C384,160,480,160,576,170.7C672,181,768,203,864,202.7C960,203,1056,181,1152,181.3C1248,181,1344,203,1392,213.3L1440,224L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
                    ></path>
                </svg>
            </div>

            <div className="z-10 relative flex flex-col items-center w-full">
                <h1 className="text-4xl font-bold mb-2 text-indigo-600 tracking-wide">TikTok Highlights</h1>
                <p className="text-lg text-gray-700 mb-6">Desliza para ver todos nuestros videos</p>


                <button
                    className="flex items-center space-x-2 bg-white rounded-full py-2 px-4 mb-8 shadow-md hover:shadow-lg transition-all duration-300"
                    onClick={() => setIsPaused(!isPaused)}
                >
                    {isPaused ?
                        <Play size={18} className="text-indigo-600" /> :
                        <Pause size={18} className="text-indigo-600" />
                    }
                    <span className="text-gray-700 font-medium">{isPaused ? "Reanudar" : "Pausar"} reproducción</span>
                </button>


                <div
                    className="w-full max-w-6xl relative px-6"
                    ref={sliderRef}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                >

                    <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full flex justify-between px-2 z-10 pointer-events-none">
                        <button
                            onClick={handlePrevious}
                            className="bg-white/90 shadow-lg rounded-full p-3 hover:bg-indigo-100 transition-colors pointer-events-auto transform hover:-translate-x-1 transition-transform duration-300"
                            aria-label="Previous videos"
                        >
                            <ChevronLeft className="text-indigo-600" size={24} />
                        </button>
                        <button
                            onClick={handleNext}
                            className="bg-white/90 shadow-lg rounded-full p-3 hover:bg-indigo-100 transition-colors pointer-events-auto transform hover:translate-x-1 transition-transform duration-300"
                            aria-label="Next videos"
                        >
                            <ChevronRight className="text-indigo-600" size={24} />
                        </button>
                    </div>


                        {isLoading && (
                            <div className="absolute inset-0 bg-white/70 z-10 flex items-center justify-center">
                                <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        )}

                        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8">
                            {displayedVideos.map((video) => (
                                <div
                                    key={video.id}
                                    className="flex flex-col rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500"
                                    onMouseEnter={() => setIsPaused(true)}
                                    onMouseLeave={() => setIsPaused(false)}
                                >
                                    {/* Video header */}
                                    <div className="bg-indigo-600 py-2 px-4 flex justify-between items-center">
                                        <div className="text-white font-medium">{video.author}</div>
                                    </div>

                                    {/* TikTok embed container */}
                                    <div className="tiktok-embed-container w-full relative bg-white p-4">
                                        <blockquote
                                            className="tiktok-embed"
                                            cite={`https://www.tiktok.com/@pacoelmorlaco99/video/${video.embedId}`}
                                            data-video-id={video.embedId}
                                            style={{width:"100%"}}
                                        >
                                            <section></section>
                                        </blockquote>
                                    </div>
                                </div>
                            ))}
                        </div>

                </div>

                <div className="flex justify-center mt-8 mb-2">
                    {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
                        <button
                            key={`dot-${idx}`}
                            className={`h-3 rounded-full mx-1 transition-all duration-300 ${
                                idx === currentIndex ? "bg-indigo-600 w-8" : "bg-gray-300 w-3 hover:bg-indigo-400"
                            }`}
                            onClick={() => jumpToIndex(idx)}
                            aria-label={`Go to slide ${idx + 1}`}
                        />
                    ))}
                </div>


                <div className="mt-4 text-indigo-600 font-medium">
                    <span>{currentIndex + 1}</span> de <span>{maxIndex + 1}</span>
                </div>
            </div>


            <div className="absolute bottom-0 left-0 w-full overflow-hidden z-0">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none" className="w-full h-48">
                    <path
                        fill="#FFFFFF"
                        fillOpacity="1"
                        d="M0,96L48,128C96,160,192,224,288,245.3C384,267,480,245,576,213.3C672,181,768,139,864,117.3C960,96,1056,96,1152,112C1248,128,1344,160,1392,176L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                    ></path>
                </svg>
            </div>


            <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-indigo-500/10 animate-pulse z-0"></div>
            <div className="absolute bottom-40 right-10 w-32 h-32 rounded-full bg-purple-500/10 animate-pulse delay-700 z-0"></div>
            <div className="absolute top-40 right-20 w-16 h-16 rounded-full bg-indigo-300/20 animate-pulse delay-1000 z-0"></div>
        </div>
    );
}