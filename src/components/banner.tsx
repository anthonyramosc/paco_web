import React from 'react';


const Waves = ({ position = 'bottom', color = 'bg-teal-200', className = '' }) => {
    const isTop = position === 'top';

    return (
        <div
            className={`w-full overflow-hidden ${color} ${className}`}
            style={{
                height: '40px',
                transform: isTop ? 'rotate(180deg)' : 'rotate(0deg)'
            }}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
                style={{
                    height: '40px',
                    width: '100%',
                    fill: 'currentColor',
                }}
            >
                <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" />
            </svg>
        </div>
    );
};
const HeroBanner: React.FC = () => {
    return (
        <div className="relative overflow-hidden">
            <Waves position="top" color="bg-teal-500" />

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