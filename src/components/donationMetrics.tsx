import { useState, useEffect } from "react";
import avatarImage from "../assets/img/123.jpg";
const CampaignInterface = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isQrExpanded, setIsQrExpanded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 300);
        return () => clearTimeout(timer);
    }, []);

    // User data
    const userData = {
        name: "Paco",
        id: "#0035000000",
        balance: "$0.00",
        balanceLabel: "Disponible",
        avatar: "🐱"
    };

    // Campaign data
    const campaignData = {
        totalRecaudado: 5000,
        progreso: 50,
        promedioDonacion: 33333,
        donacionMasAlta: 500,
    };

    const valueFormatter = (number: number) =>
        `${Intl.NumberFormat("es-MX").format(number)}`;

    const toggleQrCode = () => {
        setIsQrExpanded(!isQrExpanded);
    };

    // QR Code renderer - simplified SVG version
    const QrCode = () => (
        <div className="bg-white p-4 rounded-lg">
            <svg width="100%" height="100%" viewBox="0 0 29 29" fill="none">
                <rect width="29" height="29" fill="white" />
                {/* QR Code pattern - simplified version */}
                <rect x="2" y="2" width="3" height="3" fill="black" />
                <rect x="5" y="2" width="3" height="3" fill="black" />
                <rect x="8" y="2" width="3" height="3" fill="black" />
                <rect x="2" y="5" width="3" height="3" fill="black" />
                <rect x="8" y="5" width="3" height="3" fill="black" />
                <rect x="2" y="8" width="3" height="3" fill="black" />
                <rect x="5" y="8" width="3" height="3" fill="black" />
                <rect x="8" y="8" width="3" height="3" fill="black" />

                <rect x="18" y="2" width="3" height="3" fill="black" />
                <rect x="21" y="2" width="3" height="3" fill="black" />
                <rect x="24" y="2" width="3" height="3" fill="black" />
                <rect x="18" y="5" width="3" height="3" fill="black" />
                <rect x="24" y="5" width="3" height="3" fill="black" />
                <rect x="18" y="8" width="3" height="3" fill="black" />
                <rect x="21" y="8" width="3" height="3" fill="black" />
                <rect x="24" y="8" width="3" height="3" fill="black" />

                <rect x="2" y="18" width="3" height="3" fill="black" />
                <rect x="5" y="18" width="3" height="3" fill="black" />
                <rect x="8" y="18" width="3" height="3" fill="black" />
                <rect x="2" y="21" width="3" height="3" fill="black" />
                <rect x="8" y="21" width="3" height="3" fill="black" />
                <rect x="2" y="24" width="3" height="3" fill="black" />
                <rect x="5" y="24" width="3" height="3" fill="black" />
                <rect x="8" y="24" width="3" height="3" fill="black" />

                <rect x="13" y="5" width="3" height="3" fill="black" />
                <rect x="13" y="11" width="3" height="3" fill="black" />
                <rect x="5" y="13" width="3" height="3" fill="black" />
                <rect x="11" y="13" width="3" height="3" fill="black" />
                <rect x="21" y="13" width="3" height="3" fill="black" />
                <rect x="16" y="16" width="3" height="3" fill="black" />
                <rect x="24" y="16" width="3" height="3" fill="black" />
                <rect x="13" y="21" width="3" height="3" fill="black" />
                <rect x="16" y="24" width="3" height="3" fill="black" />
                <rect x="21" y="21" width="3" height="3" fill="black" />

                {/* Center logo */}
                <rect x="12" y="12" width="5" height="5" fill="indigo" rx="1" />
                <text x="14.5" y="15.5" fontSize="3" fill="white" textAnchor="middle" dominantBaseline="middle">P</text>
            </svg>
            {isQrExpanded &&
                <p className="text-center text-xs mt-2 text-gray-600">Escanea para donar a la campaña</p>
            }
        </div>
    );

    return (
        <div className="flex px-6 flex-col mb-6 w-full mx-auto" style={{ maxWidth: "1140px" }}>
            <div className={`flex flex-col w-full bg-gradient-to-br from-[#785D99] to-[#785D99] text-white shadow-2xl overflow-hidden rounded-xl transition-all duration-500 border-2 border-indigo-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-50 translate-y-8'}`}>
                <div className="relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-12 opacity-20">
                        {[...Array(8)].map((_, i) => (
                            <div
                                key={i}
                                className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
                                style={{
                                    top: `${Math.random() * 100}%`,
                                    left: `${Math.random() * 100}%`,
                                    animationDelay: `${Math.random() * 2}s`,
                                    animationDuration: `${2 + Math.random() * 3}s`
                                }}
                            />
                        ))}
                    </div>
                </div>

                {/* User profile section */}
                <div className="p-6 pt-8">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center">
                            <div className="relative">
                                <div className="h-32 w-32 rounded-full bg-gradient-to-br from-[#785D99] to-pink-500 flex items-center justify-center overflow-hidden border-4 border-white shadow-lg transform hover:scale-105 transition-transform duration-300">
                                    <img
                                        src= {avatarImage}
                                        alt="Avatar"
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <div className="absolute -bottom-2 -right-2 bg-green-500 w-8 h-8 rounded-full border-2 border-white flex items-center justify-center">
                                    <span className="text-lg">✓</span>
                                </div>
                            </div>
                            <div className="ml-4">
                                <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-200 drop-shadow-md">{userData.name}</h2>
                                <p className="text-indigo-200 text-lg">{userData.id}</p>
                            </div>
                        </div>

                        <div className="text-right bg-indigo-800 bg-opacity-50 p-3 rounded-lg shadow-inner border-2 border-indigo-400">
                            <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-200">{userData.balance}</h3>
                            <p className="text-indigo-200 text-xs">{userData.balanceLabel}</p>
                        </div>
                    </div>

                  
                    <div className="flex justify-end gap-4 mb-6">
                        <button className="bg-gradient-to-r from-indigo-600 to-indigo-600 rounded-lg px-4 py-3 text-center text-base font-medium hover:from-indigo-700 hover:to-indigo-700 transition duration-300 shadow-lg transform hover:-translate-y-1 border-4 border-white focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50 relative overflow-hidden">
                            <span className="relative z-10 text-lg font-bold">Compartir</span>
                            <div className="absolute inset-0 opacity-20 bg-gradient-to-r from-blue-300 to-indigo-300 animate-pulse"></div>
                        </button>
                        <button
                            className={`bg-gradient-to-r from-indigo-600 to-infigo-600 rounded-lg p-3 w-14 h-14 flex items-center justify-center hover:from-indigo-700 hover:to-indigo-700 transition duration-300 shadow-lg transform ${isQrExpanded ? 'rotate-45' : 'hover:-translate-y-1'} border-4 border-white focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50 relative`}
                            onClick={toggleQrCode}
                        >
                            <div className="absolute inset-0 opacity-20 bg-gradient-to-r from-blue-300 to-indigo-300 animate-pulse rounded-lg"></div>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative z-10">
                                <rect x="4" y="4" width="6" height="6" rx="1" stroke="white" strokeWidth="2" />
                                <rect x="14" y="4" width="6" height="6" rx="1" stroke="white" strokeWidth="2" />
                                <rect x="4" y="14" width="6" height="6" rx="1" stroke="white" strokeWidth="2" />
                                <rect x="14" y="14" width="6" height="6" rx="1" stroke="white" strokeWidth="2" />
                                <rect x="7" y="7" width="2" height="2" fill="white" />
                                <rect x="17" y="7" width="2" height="2" fill="white" />
                                <rect x="7" y="17" width="2" height="2" fill="white" />
                                <rect x="17" y="17" width="2" height="2" fill="white" />
                            </svg>
                        </button>
                    </div>
                    {/* Expandable QR code */}
                    {isQrExpanded && (
                        <div className="bg-white bg-opacity-10 p-4 rounded-xl mb-6 backdrop-filter backdrop-blur-sm shadow-lg transition-all duration-300 animate-fadeIn border-2 border-white">
                            <div className="flex items-center justify-between mb-3">
                                <h4 className="text-lg font-semibold text-white">Código QR de la campaña</h4>
                                <div className="bg-indigo-700 bg-opacity-70 text-white text-xs px-3 py-1 rounded-full border-2 border-white">
                                    Exclusivo
                                </div>
                            </div>
                            <div className="w-full max-w-xs mx-auto">
                                <QrCode />
                            </div>
                        </div>
                    )}
                </div>

                {/* Campaign progress section */}
                <div className="bg-white text-black p-6 w-full rounded-t-3xl shadow-inner border-t-4 border-indigo-500">
                    <div className="flex items-center mb-6">
                        <div className="h-12 w-12 flex items-center justify-center rounded-full bg-gradient-to-br from-indigo-100 to-pink-100 text-indigo-600 mr-4 shadow-md border-2 border-indigo-200">
                            <span className="text-xl">🎯</span>
                        </div>
                        <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#785D99] to-[#785D99]">
                            Progreso de la Campaña
                        </h3>
                    </div>

                    {/* Progress bar with improved animation */}
                    <div className="w-full mb-4 relative">
                        <div className="w-full bg-gray-200 h-8 overflow-hidden shadow-inner rounded-lg border-2 border-gray-300">
                            <div
                                className="bg-gradient-to-r from-purple-400 via-purple-500 to-purple-400 h-8 transition-all duration-1500 ease-out rounded-lg relative"
                                style={{ width: `${campaignData.progreso}%` }}
                            >
                                {/* Shimmer effect */}
                                <div className="absolute inset-0 overflow-hidden">
                                    <div className="absolute inset-0 transform -skew-x-12 bg-white opacity-20"></div>
                                    <div className="absolute inset-0 animate-shimmer"></div>
                                </div>
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-gray-700">
                                {campaignData.progreso}% Completado
                            </div>
                        </div>
                    </div>

                    <div className="text-base text-gray-600 mb-6 bg-gradient-to-r from-gray-50 to-gray-100 p-3 rounded-lg shadow-sm border-l-4 border-[#785D99]">
                        <span className="font-bold">Recaudado: <span className="text-[#785D99] font-bold text-lg">${valueFormatter(campaignData.totalRecaudado)}</span></span>
                    </div>

                    {/* Stats boxes with improved design */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 flex flex-col items-center shadow-md rounded-lg hover:shadow-lg transition duration-300 transform hover:-translate-y-1 border-t-4 border-[#785D99]">
                            <div className="text-[#785D99] text-sm mb-1 font-semibold">Promedio por donación</div>
                            <div className="text-[#785D99] font-bold text-xl">${valueFormatter(campaignData.promedioDonacion)}</div>
                        </div>

                        <div className="bg-gradient-to-br from-pink-50 to-rose-50 p-4 flex flex-col items-center shadow-md rounded-lg hover:shadow-lg transition duration-300 transform hover:-translate-y-1 border-t-4 border-[#785D99]">
                            <div className="text-[#785D99]">Donación más alta</div>
                            <div className="text-[#785D99] font-bold text-xl">${valueFormatter(campaignData.donacionMasAlta)}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CampaignInterface;