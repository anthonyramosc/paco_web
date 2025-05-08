import { useState, useEffect } from 'react';
import video from '../assets/final.png';
// Use the provided mobile image
import videoMobile from '../assets/img/toma-mi-mano_1.png'

const Banner = () => {
    // State to track if the device is mobile
    const [isMobile, setIsMobile] = useState(false);

    // Function to check if the viewport is mobile sized
    const checkMobile = () => {
        setIsMobile(window.innerWidth <= 768); // Common breakpoint for mobile devices
    };

    useEffect(() => {
        // Check on initial render
        checkMobile();
        
        // Add event listener for window resize
        window.addEventListener('resize', checkMobile);
        
        // Clean up event listener
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <div className="relative overflow-hidden" style={{ marginTop: "5px" }}>
            <div className="pt-6 pb-10 relative">
                <div className="w-full md:w-full relative z-10">
                    <img
                        src={isMobile ? videoMobile : video}
                        alt="Prótesis con mancuerna"
                        className="max-w-full"
                    />
                </div>
            </div>
        </div>
    );
};

export default Banner;