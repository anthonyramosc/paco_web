import { useState } from 'react';

interface TikTokVideo {
    id: string;
    videoUrl: string;
    embedUrl: string;
    author: string;
    description: string;
    likes: number;
}

// Videos reales de TikTok
const tiktokVideos: TikTokVideo[] = [
    {
        id: '7353728401980673286',
        videoUrl: '/api/placeholder/320/560',
        embedUrl: 'https://www.tiktok.com/@pacoelmorlaco99/video/7353728401980673286',
        author: '@pacoelmorlaco99',
        description: 'Video de TikTok #1',
        likes: 4578
    },
    {
        id: '7380373261068160262',
        videoUrl: '/api/placeholder/320/560',
        embedUrl: 'https://www.tiktok.com/@pacoelmorlaco99/video/7380373261068160262',
        author: '@pacoelmorlaco99',
        description: 'Video de TikTok #2',
        likes: 7890
    },
    {
        id: '7420077257965817094',
        videoUrl: '/api/placeholder/320/560',
        embedUrl: 'https://www.tiktok.com/@pacoelmorlaco99/video/7420077257965817094',
        author: '@pacoelmorlaco99',
        description: 'Video de TikTok #3',
        likes: 3240
    }
];

export default function TikTokSlider() {
    const [videos] = useState<TikTokVideo[]>(tiktokVideos);

    const openTikTok = (url: string) => {
        window.open(url, '_blank');
    };

    return (
        <div className="flex flex-col items-center w-full max-w-5xl mx-auto py-8 bg-black text-white">
            <h1 className="text-2xl font-bold mb-6">TikTok Viewer</h1>

            <div className="w-full grid grid-cols-3 gap-4">
                {videos.map((video) => (
                    <div
                        key={video.id}
                        className="relative bg-gray-900 rounded-xl overflow-hidden h-96 cursor-pointer hover:opacity-90 transition-opacity"
                        onClick={() => openTikTok(video.embedUrl)}
                    >
                        <img
                            src={video.videoUrl}
                            alt={`TikTok video by ${video.author}`}
                            className="w-full h-full object-cover"
                        />

                        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black to-transparent">
                            <p className="font-bold text-lg">{video.author}</p>
                            <p className="text-sm">{video.description}</p>
                            <div className="flex items-center mt-2">
                                <svg className="w-4 h-4 fill-current text-red-500" viewBox="0 0 24 24">
                                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                </svg>
                                <span className="ml-1">{video.likes.toLocaleString()}</span>
                            </div>
                        </div>

                        <div className="absolute top-0 left-0 right-0 p-2 flex justify-end">
                            <div className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                                TikTok
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}