import { useState, useEffect, useRef } from 'react';
import {ChevronLeft, ChevronRight} from "lucide-react";

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
    const timerRef = useRef<number | null>(null);

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
        const existingScript = document.getElementById('tiktok-embed-script');
        if (existingScript) {
            existingScript.remove();
        }

        const script = document.createElement('script');
        script.id = 'tiktok-embed-script';
        script.src = 'https://www.tiktok.com/embed.js';
        script.async = true;
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


    const displayedVideos = videos.slice(currentIndex, currentIndex + visibleVideos);

    return (
        <div className="flex flex-col items-center w-full bg-gradient-to-br from-purple-50 to-indigo-50 py-12 ">

            <h1 className="text-4xl font-bold mb-2 text-[#5A67F9FF] tracking-wide">TikTok Highlights</h1>
            <p className="text-lg text-black mb-4">Desliza para ver todos nuestros videos</p>


            <button
                className="flex items-center space-x-1 text-blue-500 hover:text-pink-500 transition-colors mb-6"
                onClick={() => setIsPaused(!isPaused)}
            >
                <span className={`w-3 h-3 inline-block ${isPaused ? "border-l-8 border-l-blue-500 border-t-4 border-t-transparent border-b-4 border-b-transparent" : "bg-blue-500"}`}></span>
                <span>{isPaused ? "Reanudar" : "Pausar"} autoslide</span>
            </button>

            <div className="w-full max-w-6xl relative px-4">

                <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full flex justify-between px-1">
                    <button
                        onClick={handlePrevious}
                        className="bg-white/80 rounded-full p-2 transition-colors"
                    >
                        <ChevronLeft className="text-blue-600" size={24} />
                    </button>
                    <button
                        onClick={handleNext}
                        className="bg-white/80 rounded-full p-2 transition-colors"
                    >
                        <ChevronRight className="text-blue-600" size={24} />
                    </button>
                </div>


                <div className="max-w-6xl overflow-hidden">
                    <div className="flex transition-transform duration-500" style={{ transform: `translateX(0%)` }}>
                        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 px-8">
                            {displayedVideos.map((video) => (
                                <div
                                    key={video.id}
                                    className="flex flex-col rounded-2xl overflow-hidden transform transition-all duration-500 shadow-md hover:shadow-xl"
                                    onMouseEnter={() => setIsPaused(true)}
                                    onMouseLeave={() => setIsPaused(false)}
                                >

                                    <div className="h-2 bg-[#5A67F9FF]"></div>


                                    <div className="tiktok-embed-container w-full aspect-[9/16] relative bg-white p-2">
                                        <blockquote
                                            className="tiktok-embed"
                                            cite={`https://www.tiktok.com/@pacoelmorlaco99/video/${video.embedId}`}
                                            data-video-id={video.embedId}
                                            style={{ maxWidth: '100%', minWidth: '100%', display: "flex", flexDirection: "column", alignItems: "center" }}
                                        >
                                            <section></section>
                                        </blockquote>
                                    </div>


                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>


            <div className="flex justify-center space-x-2 mt-6">
                {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
                    <button
                        key={`dot-${idx}`}
                        className={`w-3 h-3 rounded transition-all flex gap-3 duration-300 ${
                            idx === currentIndex ? "bg-pink-500 w-6" : "bg-blue-300"
                        }`}
                        style={{backgroundColor:"#5A67F9FF"}}
                        onClick={() => jumpToIndex(idx)}
                        aria-label={`Go to slide ${idx + 1}`}
                    />
                ))}
            </div>


            <div className="mt-4 text-blue-500">
                <span className="font-medium">{currentIndex + 1}</span> de {maxIndex + 1}
            </div>
        </div>
    );
}