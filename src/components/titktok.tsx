import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface TikTokVideo {
    id: string;
    videoUrl: string;
    author: string;
    description: string;
    likes: number;
}

const dummyVideos: TikTokVideo[] = [
    {
        id: '1',
        videoUrl: 'https://www.tiktok.com/@pacoelmorlaco99/video/7380373261068160262',
        author: '@usuario1',
        description: 'Este es mi primer video viral 🔥',
        likes: 1500
    },
    {
        id: '2',
        videoUrl: 'https://www.tiktok.com/@pacoelmorlaco99/video/7353728401980673286',
        author: '@usuario2',
        description: 'Tutorial rápido de cocina 🍳',
        likes: 2300
    },
    {
        id: '3',
        videoUrl: 'https://www.tiktok.com/@pacoelmorlaco99/video/7420077257965817094',
        author: '@usuario3',
        description: 'Mi rutina diaria 🏋️‍♂️',
        likes: 4200
    },
    {
        id: '4',
        videoUrl: '/api/placeholder/320/560',
        author: '@usuario4',
        description: 'Mira este truco increíble ✨',
        likes: 3100
    }
];

export default function TikTokSlider() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [videos, setVideos] = useState<TikTokVideo[]>(dummyVideos);

    const nextVideo = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length);
    };

    const prevVideo = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + videos.length) % videos.length);
    };

    return (
        <div className="relative flex flex-col items-center w-full max-w-md mx-auto h-screen bg-black text-white">
            <h1 className="text-2xl font-bold my-4">TikTok Viewer</h1>

            <div className="relative w-full h-4/5 overflow-hidden">
                <div className="w-full h-full relative bg-gray-900 rounded-xl overflow-hidden">
                    <img
                        src={videos[currentIndex].videoUrl}
                        alt="TikTok video"
                        className="w-full h-full object-cover"
                    />

                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                        <p className="font-bold text-lg">{videos[currentIndex].author}</p>
                        <p className="text-sm">{videos[currentIndex].description}</p>
                        <div className="flex items-center mt-2">
                            <svg className="w-4 h-4 fill-current text-red-500" viewBox="0 0 24 24">
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                            </svg>
                            <span className="ml-1">{videos[currentIndex].likes.toLocaleString()}</span>
                        </div>
                    </div>

                    <button
                        onClick={prevVideo}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 rounded-full p-1 hover:bg-opacity-50"
                        aria-label="Previous video"
                    >
                        <ChevronLeft size={24} />
                    </button>

                    <button
                        onClick={nextVideo}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 rounded-full p-1 hover:bg-opacity-50"
                        aria-label="Next video"
                    >
                        <ChevronRight size={24} />
                    </button>
                </div>
            </div>

            <div className="flex justify-center mt-4 space-x-2">
                {videos.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-3 h-3 rounded-full ${
                            index === currentIndex ? "bg-white" : "bg-gray-600"
                        }`}
                        aria-label={`Go to video ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}