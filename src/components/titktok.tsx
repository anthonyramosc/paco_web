import { useState, useEffect } from 'react';

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
    }
];

export default function TikTokSlider() {
    const [videos] = useState<TikTokVideo[]>(tiktokVideos);


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
    }, []);

    return (
        <div className="flex flex-col items-center w-full  text-blue-600 py-8">
            <h1 className="text-3xl font-bold mb-8">TikTok Viewer</h1>

            <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
                {videos.map((video) => (
                    <div key={video.id} className="flex flex-col  rounded-xl overflow-hidden">
                        <div className="tiktok-embed-container w-full aspect-[9/16] relative">
                            <blockquote
                                className="tiktok-embed"
                                cite={`https://www.tiktok.com/@pacoelmorlaco99/video/${video.embedId}`}
                                data-video-id={video.embedId}
                                style={{ maxWidth: '100%', minWidth: '100%',display:"flex", flexDirection:"column",alignItems:"center" }}
                            >
                                <section ></section>
                            </blockquote>
                        </div>


                    </div>
                ))}
            </div>
        </div>
    );
}