import React, { useState, useEffect } from "react";
import { DonutChart } from "@tremor/react";

const SegmentacionDashboard = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 300);
        return () => clearTimeout(timer);
    }, []);

    const datosDonaciones = [
        { name: "Total de Donaciones", value: 150, icon: "👤" },
        { name: "Monto Recaudado", value: 5000, icon: "💰" },
        { name: "Meta", value: 10000, icon: "🎯" },
    ];

    const colorMapDonaciones = {
        "Total de Donaciones": "#3b82f6", // Azul
        "Monto Recaudado": "#ec4899",     // Rosa
        "Meta": "#10b981",                // Verde
    };

    const valueFormatter = (number: number) => `${Intl.NumberFormat("es-MX").format(number)}`;

    interface DonutSectionProps {
        title: string;
        data: { name: string; value: number; icon: string }[];
        colorMap: { [key: string]: string };
        totalLabel: string;
    }

    const DonutSection: React.FC<DonutSectionProps> = ({ title, data, colorMap, totalLabel }) => {
        const totalRecaudado = data.find((item) => item.name === "Monto Recaudado")?.value || 0;
        const meta = data.find((item) => item.name === "Meta")?.value || 1;
        const progreso = (totalRecaudado / meta) * 100;

        const getProgressColor = () => {
            if (progreso < 30) return "bg-red-500";
            if (progreso < 60) return "bg-yellow-500";
            if (progreso < 90) return "bg-blue-500";
            return "bg-green-500";
        };

        const progressColorClass = getProgressColor();

        return (
            <div className={`bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg overflow-hidden 
                transition-all duration-500 transform hover:scale-[1.01] hover:shadow-xl mb-6
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <div className="p-6">
                    <div className="flex items-center justify-center mb-6">
                        <div className="h-12 w-12 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600 mr-4">
                            <span className="text-2xl">📊</span>
                        </div>
                        <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">{title}</h3>
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="w-full md:w-1/2 max-w-xs mx-auto">
                            <DonutChart
                                data={data}
                                category="value"
                                index="name"
                                valueFormatter={valueFormatter}
                                showAnimation={true}
                                showTooltip={true}
                                showLabel={true}
                                className="h-64"
                            />
                        </div>

                        <div className="w-full md:w-1/2">
                            <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                                <span className="mr-2">🚀</span> Progreso de Donaciones
                            </h4>
                            <div className="relative">
                                <div className="w-full bg-gray-200 rounded-full h-8 overflow-hidden shadow-inner">
                                    <div
                                        className={`${progressColorClass} h-8 rounded-full transition-all duration-1000 ease-out relative`}
                                        style={{ width: `${progreso}%` }}
                                    >
                                        <div className="absolute inset-0 flex items-center justify-center text-white text-sm font-medium">
                                            {Math.round(progreso)}%
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-between text-sm text-gray-600 mt-2">
                                    <span className="font-medium">Recaudado: <span className="text-pink-600">${valueFormatter(totalRecaudado)}</span></span>
                                    <span className="font-medium">Meta: <span className="text-green-600">${valueFormatter(meta)}</span></span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full mt-8">
                        <div className="bg-gray-50 rounded-lg p-4 shadow-inner">
                            <h4 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">Detalles de Donaciones</h4>
                            {data.map((item, index) => (
                                <div
                                    key={item.name}
                                    className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0 hover:bg-gray-50 rounded-md px-2 transition-all duration-200"
                                    style={{
                                        animation: `fadeInUp ${0.3 + index * 0.1}s ease-out forwards`,
                                    }}
                                >
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="w-10 h-10 rounded-full flex items-center justify-center text-white"
                                            style={{ backgroundColor: colorMap[item.name] }}
                                        >
                                            <span className="text-xl">{item.icon}</span>
                                        </div>
                                        <span className="font-medium">{item.name}</span>
                                    </div>
                                    <div
                                        className="text-lg font-bold"
                                        style={{ color: colorMap[item.name] }}
                                    >
                                        {item.name === "Total de Donaciones"
                                            ? valueFormatter(item.value)
                                            : `$${valueFormatter(item.value)}`}
                                    </div>
                                </div>
                            ))}

                            <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
                                <span className="text-sm text-gray-500">{totalLabel}:</span>
                                <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                                    ${valueFormatter(totalRecaudado)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className={`space-y-6 px-4 transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <DonutSection
                title="Distribución de Donaciones"
                data={datosDonaciones}
                colorMap={colorMapDonaciones}
                totalLabel="Total Recaudado"
            />
        </div>
    );
};

export default SegmentacionDashboard;
