import React from 'react';
import video from '../assets/final.png'



const HeroBanner: React.FC = () => {
    return (
        <div className="relative overflow-hidden z-50">

            <div className="pt-6 pb-10 relative">
                <div className="w-full md:w-full relative z-10">
                    <img
                        src={video}
                        alt="Prótesis con mancuerna"
                        className="max-w-full "
                    />
                </div>
            </div>


        </div>
    );
};

export default HeroBanner;