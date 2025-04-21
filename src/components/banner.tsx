import React from 'react';



const HeroBanner: React.FC = () => {
    return (
        <div className="relative overflow-hidden">

            <div className=" pt-6 pb-24 relative">
                    <div className="w-full md:w-full relative z-10">
                        <img
                            src="https://test.tryclicksolutions.com/wp-content/uploads/2024/11/banner-paco-2048x559.webp"
                            alt="Prótesis con mancuerna"
                            className="max-w-full"
                        />
                    </div>
            </div>


        </div>
    );
};

export default HeroBanner;