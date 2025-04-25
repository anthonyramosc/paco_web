import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";


interface DonationData {
    name: string;
    value: number;
    icon: string;
    description: string;
}

interface CustomTooltipProps {
    active?: boolean;
    payload?: Array<{
        payload: DonationData;
    }>;
}

interface CustomizedLabelProps {
    cx: number;
    cy: number;
    midAngle: number;
    innerRadius: number;
    outerRadius: number;
    percent: number;
    index: number;
    value: number;
    name: string;
}

interface ChartSectionProps {
    title: string;
    data: DonationData[];
    colorMap: string[];
    totalLabel: string;
    isMoney?: boolean;
    icon: string;
}

const SegmentacionDashboard: React.FC = () => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [animationKey, setAnimationKey] = useState<number>(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
            setAnimationKey(1); // Trigger animations
        }, 300);
        return () => clearTimeout(timer);
    }, []);

    // Datos de ejemplo mejorados
    const datosDonaciones: DonationData[] = [
        { name: "Total de Donaciones", value: 150, icon: "👤", description: "Número de donantes" },
        { name: "Donaciones Únicas", value: 95, icon: "🔄", description: "Donaciones no recurrentes" },
        { name: "Donaciones Recurrentes", value: 55, icon: "♻️", description: "Donaciones mensuales" },
    ];

    const datosRecaudacion: DonationData[] = [
        { name: "Monto Recaudado", value: 5000, icon: "💰", description: "Total recaudado hasta hoy" },
        { name: "Pendiente", value: 5000, icon: "⏳", description: "Falta para alcanzar la meta" },
    ];

    const colorMapDonaciones: string[] = [
        "#3b82f6", // Azul
        "#8b5cf6", // Púrpura
        "#06b6d4", // Cian
    ];

    const colorMapRecaudacion: string[] = [
        "#ec4899", // Rosa
        "#f59e0b", // Naranja
    ];

    const valueFormatter = (number: number): string => `${Intl.NumberFormat("es-MX").format(number)}`;

    const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div className="bg-white p-1  shadow-lg rounded-lg border border-gray-200">
                    <p className="font-bold flex items-center gap-2">
                        <span>{data.icon}</span>
                        <span>{data.name}</span>
                    </p>
                    <p className="text-gray-600 text-sm">{data.description}</p>
                    <p className="font-bold text-lg mt-1">
                        {data.name.includes("Monto") || data.name.includes("Pendiente")
                            ? `$${valueFormatter(data.value)}`
                            : valueFormatter(data.value)}
                    </p>
                </div>
            );
        }
        return null;
    };

    const CustomizedLabel: React.FC<CustomizedLabelProps> = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
        const RADIAN = Math.PI / 180;
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text
                x={x}
                y={y}
                fill="#fff"
                textAnchor={x > cx ? 'start' : 'end'}
                dominantBaseline="central"
                className="font-bold"
            >
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    const ChartSection: React.FC<ChartSectionProps> = ({ title, data, colorMap, totalLabel, isMoney = false, icon }) => {
        const total = data.reduce((sum, item) => sum + item.value, 0);

        return (
            <div className={`bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg overflow-hidden  w-4/6
                transition-all duration-500 transform hover:shadow-xl mb-6
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

                <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center">
                            <div className="h-12 w-12 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600 mr-4">
                                <span className="text-2xl">{icon}</span>
                            </div>
                            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">{title}</h3>
                        </div>
                        <div className="bg-indigo-50 px-4 py-2 rounded-full hidden md:flex items-center">
                            <span className="text-indigo-700 font-medium">{totalLabel}: </span>
                            <span className="font-bold ml-2 text-indigo-800">
                                {isMoney ? `$${valueFormatter(total)}` : valueFormatter(total)}
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="w-full md:w-1/2 h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart key={animationKey}>
                                    <Pie
                                        data={data}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={CustomizedLabel}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="value"
                                        animationBegin={300}
                                        animationDuration={1500}
                                        isAnimationActive={isVisible}
                                        className="cursor-pointer"
                                    >
                                        {data.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={colorMap[index % colorMap.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip content={<CustomTooltip />} />
                                    <Legend
                                        formatter={(value) => <span className="text-gray-800">{value}</span>}
                                        iconType="circle"
                                        layout="vertical"
                                        verticalAlign="middle"
                                        align="right"
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="w-full md:w-1/2">
                            <div className="bg-gray-50 rounded-lg p-4 shadow-inner">
                                <h4 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2 flex items-center">
                                    <span className="mr-2">{icon}</span> Detalles
                                </h4>
                                {data.map((item, index) => (
                                    <div
                                        key={item.name}
                                        className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0 hover:bg-gray-50 rounded-md px-2 transition-all duration-200"
                                        style={{
                                            animation: isVisible ? `fadeInUp ${0.3 + index * 0.1}s ease-out forwards` : 'none',
                                        }}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div
                                                className="w-10 h-10 rounded-full flex items-center justify-center text-white"
                                                style={{ backgroundColor: colorMap[index % colorMap.length] }}
                                            >
                                                <span className="text-xl">{item.icon}</span>
                                            </div>
                                            <div>
                                                <div className="font-medium">{item.name}</div>
                                                <div className="text-xs text-gray-500">{item.description}</div>
                                            </div>
                                        </div>
                                        <div
                                            className="text-lg font-bold"
                                            style={{ color: colorMap[index % colorMap.length] }}
                                        >
                                            {isMoney ? `$${valueFormatter(item.value)}` : valueFormatter(item.value)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    // Componente de Barra de Progreso
    const ProgressBar: React.FC = () => {
        const totalRecaudado: number = 5000;
        const meta: number = 10000;
        const progreso: number = (totalRecaudado / meta) * 100;

        const getProgressColor = (): string => {
            if (progreso < 30) return "bg-red-500";
            if (progreso < 60) return "bg-yellow-500";
            if (progreso < 90) return "bg-blue-500";
            return "bg-green-500";
        };

        const progressColorClass: string = getProgressColor();

        return (
            <div className={`bg-white rounded-xl shadow-lg overflow-hidden  w-4/6
                transition-all duration-500 transform hover:shadow-xl mb-6
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center">
                            <div className="h-12 w-12 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600 mr-4">
                                <span className="text-2xl">🎯</span>
                            </div>
                            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                                Progreso de la Campaña
                            </h3>
                        </div>
                    </div>

                    <div className="w-full">
                        <div className="relative">
                            <div className="w-full bg-gray-200 rounded-full h-10 overflow-hidden shadow-inner">
                                <div
                                    className={`${progressColorClass} h-10 rounded-full transition-all duration-1000 ease-out relative`}
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

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                            <div className="bg-indigo-50 rounded-lg p-4 flex flex-col items-center">
                                <div className="text-indigo-700 text-sm">Promedio por donación</div>
                                <div className="text-indigo-900 font-bold text-xl">${valueFormatter(totalRecaudado / 150)}</div>
                            </div>

                            <div className="bg-pink-50 rounded-lg p-4 flex flex-col items-center">
                                <div className="text-pink-700 text-sm">Donación más alta</div>
                                <div className="text-pink-900 font-bold text-xl">${valueFormatter(500)}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className={`space-y-6 px-4 transition-all duration-500 flex flex-col justify-center items-center ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <ProgressBar />
            <ChartSection
                title="Tipos de Donantes"
                data={datosDonaciones}
                colorMap={colorMapDonaciones}
                totalLabel="Total de Donantes"
                icon="👥"
            />
            <ChartSection
                title="Estado de Recaudación"
                data={datosRecaudacion}
                colorMap={colorMapRecaudacion}
                totalLabel="Meta Total"
                isMoney={true}
                icon="💰"
            />
        </div>
    );
};

export default SegmentacionDashboard;