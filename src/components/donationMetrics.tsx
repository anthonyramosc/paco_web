import { useState, useEffect } from "react";
import avatarImage from "../assets/img/123.jpg";
const CampaignInterface = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isQrExpanded, setIsQrExpanded] = useState(false);
    const [shareResult, setShareResult] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 300);
        return () => clearTimeout(timer);
    }, []);


    const userData = {
        name: "Paco",
        id: "#0035000000",
        balance: "$0.00",
        balanceLabel: "Disponible",

    };


    const campaignData = {
        totalRecaudado: 0,
        progreso: 0,
        promedioDonacion: 0,
        donacionMasAlta: 0,
    };

    const valueFormatter = (number: number) =>
        `${Intl.NumberFormat("es-MX").format(number)}`;

    const toggleQrCode = () => {
        setIsQrExpanded(!isQrExpanded);
    };


    const handleShare = async () => {

        const shareData = {
            title: `Campaña de ${userData.name}`,
            text: `¡Apoya mi campaña! He recaudado $${valueFormatter(campaignData.totalRecaudado)} hasta ahora.`,
            url: window.location.href
        };

        try {

            if (navigator.share) {
                await navigator.share(shareData);
                setShareResult('¡Compartido exitosamente!');


                setTimeout(() => {
                    setShareResult('');
                }, 3000);
            } else {

                setShareResult('Tu navegador no soporta compartir. Intenta copiar el enlace manualmente.');


                await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
                setShareResult('¡Enlace copiado al portapapeles!');


                setTimeout(() => {
                    setShareResult('');
                }, 3000);
            }
        } catch (error) {
            console.error('Error sharing:', error);
            setShareResult('Error al compartir. Intenta de nuevo.');


            setTimeout(() => {
                setShareResult('');
            }, 3000);
        }
    };


    const QrCode = () => (
        <div className="bg-white p-4 rounded-lg">
            <svg width="100%" height="100%" viewBox="0 0 29 29" fill="none">
                <rect width="29" height="29" fill="white" />

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

                <rect x="12" y="12" width="5" height="5" fill="indigo" rx="1" />
                <text x="14.5" y="15.5" fontSize="3" fill="white" textAnchor="middle" dominantBaseline="middle">P</text>
            </svg>
            {isQrExpanded &&
                <p className="text-center text-xs mt-2 text-gray-600">Escanea para donar a la campaña</p>
            }
        </div>
    );

    return (

        <div className="flex px-3 sm:px-6 flex-col mb-6 w-full mx-auto" style={{ maxWidth: "1140px", marginTop:"100px" }}>
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


                <div className="p-4 sm:p-6 pt-6 sm:pt-8">
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
                        <div className="flex flex-col sm:flex-row items-center mb-4 sm:mb-0">
                            <div className="relative mb-3 sm:mb-0">
                                <div className="h-24 w-24 sm:h-32 sm:w-32 rounded-full bg-gradient-to-br from-[#785D99] to-pink-500 flex items-center justify-center overflow-hidden border-4 border-white shadow-lg transform hover:scale-105 transition-transform duration-300">
                                    <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                                        <img
                                            src= {avatarImage}
                                            alt="Avatar"
                                            className="h-full w-full object-cover"
                                        /> </div>
                                </div>
                                <div className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-white flex items-center justify-center">
                                    <span className="text-base sm:text-lg">✓</span>
                                </div>
                            </div>
                            <div className="text-center sm:text-left sm:ml-4">
                                <h2 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-200 drop-shadow-md">{userData.name}</h2>
                            </div>
                        </div>

                        <div className="text-center sm:text-right bg-indigo-800 bg-opacity-50 p-3 rounded-lg shadow-inner border-2 border-indigo-400 w-full sm:w-auto">
                            <h3 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-200">{userData.balance}</h3>
                            <p className="text-indigo-200 text-xs">{userData.balanceLabel}</p>
                        </div>
                    </div>


                    {shareResult && (
                        <div className="mb-4 bg-indigo-900 bg-opacity-50 text-white px-4 py-2 rounded-lg animate-fadeIn border border-indigo-400 text-center">
                            {shareResult}
                        </div>
                    )}

                    <div className="flex justify-center sm:justify-end gap-3 sm:gap-4 mb-6">
                        <button
                            className="bg-gradient-to-r from-indigo-600 to-indigo-600 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-center text-sm sm:text-base font-medium hover:from-indigo-700 hover:to-indigo-700 transition duration-300 shadow-lg transform hover:-translate-y-1 border-2 sm:border-4 border-white focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50 relative overflow-hidden flex-1 sm:flex-none"
                            onClick={handleShare}
                        >
                            <span className="relative z-10 text-base sm:text-lg font-bold flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                                </svg>
                                Compartir
                            </span>
                            <div className="absolute inset-0 opacity-20 bg-gradient-to-r from-blue-300 to-indigo-300 animate-pulse"></div>
                        </button>
                        <button
                            className={`bg-gradient-to-r from-indigo-600 to-indigo-600 rounded-lg p-2 sm:p-3 w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center hover:from-indigo-700 hover:to-indigo-700 transition duration-300 shadow-lg transform ${isQrExpanded ? 'rotate-45' : 'hover:-translate-y-1'} border-2 sm:border-4 border-white focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50 relative`}
                            onClick={toggleQrCode}
                        >
                            <div className="absolute inset-0 opacity-20 bg-gradient-to-r from-blue-300 to-indigo-300 animate-pulse rounded-lg"></div>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative z-10">
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

                    {isQrExpanded && (
                        <div className="bg-white bg-opacity-10 p-3 sm:p-4 rounded-xl mb-4 sm:mb-6 backdrop-filter backdrop-blur-sm shadow-lg transition-all duration-300 animate-fadeIn border-2 border-white">
                            <div className="flex items-center justify-between mb-2 sm:mb-3">
                                <h4 className="text-base sm:text-lg font-semibold text-white">Código QR de la campaña</h4>
                                <div className="bg-indigo-700 bg-opacity-70 text-white text-xs px-2 sm:px-3 py-1 rounded-full border-2 border-white">
                                    Exclusivo
                                </div>
                            </div>
                            <div className="w-full max-w-xs mx-auto">
                                <QrCode />
                            </div>
                        </div>
                    )}
                </div>


                <div className="bg-white text-black p-4 sm:p-6 w-full rounded-t-3xl shadow-inner border-t-4 border-indigo-500">
                    <div className="flex items-center mb-4 sm:mb-6">
                        <div className="h-10 w-10 sm:h-12 sm:w-12 flex items-center justify-center rounded-full bg-gradient-to-br from-indigo-100 to-pink-100 text-indigo-600 mr-3 sm:mr-4 shadow-md border-2 border-indigo-200">
                            <span className="text-lg sm:text-xl">🎯</span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#785D99] to-[#785D99]">
                            Progreso de la Campaña
                        </h3>
                    </div>


                    <div className="w-full mb-3 sm:mb-4 relative">
                        <div className="w-full bg-gray-200 h-6 sm:h-8 overflow-hidden shadow-inner rounded-lg border-2 border-gray-300">
                            <div
                                className="bg-gradient-to-r from-purple-400 via-purple-500 to-purple-400 h-6 sm:h-8 transition-all duration-1500 ease-out rounded-lg relative"
                                style={{ width: `${campaignData.progreso}%` }}
                            >

                                <div className="absolute inset-0 overflow-hidden">
                                    <div className="absolute inset-0 transform -skew-x-12 bg-white opacity-20"></div>
                                    <div className="absolute inset-0 animate-shimmer"></div>
                                </div>
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center text-xs sm:text-sm font-bold text-gray-700">
                                {campaignData.progreso}% Completado
                            </div>
                        </div>
                    </div>

                    <div className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 bg-gradient-to-r from-gray-50 to-gray-100 p-2 sm:p-3 rounded-lg shadow-sm border-l-4 border-[#785D99]">
                        <span className="font-bold">Recaudado: <span className="text-[#785D99] font-bold text-base sm:text-lg">${valueFormatter(campaignData.totalRecaudado)}</span></span>
                    </div>


                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-3 sm:p-4 flex flex-col items-center shadow-md rounded-lg hover:shadow-lg transition duration-300 transform hover:-translate-y-1 border-t-4 border-[#785D99]">
                            <div className="text-[#785D99] text-xs sm:text-sm mb-1 font-semibold">Promedio por donación</div>
                            <div className="text-[#785D99] font-bold text-lg sm:text-xl">${valueFormatter(campaignData.promedioDonacion)}</div>
                        </div>

                        <div className="bg-gradient-to-br from-pink-50 to-rose-50 p-3 sm:p-4 flex flex-col items-center shadow-md rounded-lg hover:shadow-lg transition duration-300 transform hover:-translate-y-1 border-t-4 border-[#785D99]">
                            <div className="text-[#785D99] text-xs sm:text-sm mb-1">Donación más alta</div>
                            <div className="text-[#785D99] font-bold text-lg sm:text-xl">${valueFormatter(campaignData.donacionMasAlta)}</div>
                        </div>
                    </div>


                    <style jsx>{`
                        @keyframes fadeIn {
                            from { opacity: 0; transform: translateY(-10px); }
                            to { opacity: 1; transform: translateY(0); }
                        }
                        .animate-fadeIn {
                            animation: fadeIn 0.3s ease-in-out;
                        }
                        @keyframes shimmer {
                            0% { transform: translateX(-100%); }
                            100% { transform: translateX(100%); }
                        }
                        .animate-shimmer {
                            background: linear-gradient(
                                    90deg,
                                    rgba(255, 255, 255, 0) 0%,
                                    rgba(255, 255, 255, 0.2) 50%,
                                    rgba(255, 255, 255, 0) 100%
                            );
                            animation: shimmer 2s infinite;
                        }
                    `}</style>
                </div>
            </div>
        </div>
    );
};

export default CampaignInterface;