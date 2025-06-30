import React, { useState } from "react";

const Videoadm: React.FC = () => {
    const [nombre, setNombre] = useState("");
    const [codigo, setCodigo] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Nombre:", nombre);
        console.log("Código:", codigo);
    };

    return (
        <div className="w-[1300px] h-[487px] mx-auto mt-10 border rounded-lg p-6 flex flex-col items-center gap-6 shadow-md bg-white">
            <div className="w-[1240px] h-[89px] flex items-center justify-center">
                <h1 className="text-[32px] font-semibold text-gray-800">Videos</h1>
            </div>

            <form
                onSubmit={handleSubmit}
                className="w-[1240px] h-[205px] flex flex-col justify-between"
            >
                <div className="flex flex-col gap-2">
                    <label htmlFor="nombre" className="text-[24px] font-medium text-gray-700">
                        Nombre
                    </label>
                    <input
                        id="nombre"
                        type="text"
                        placeholder="Nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        className="w-full min-w-[240px] h-[44px] border border-gray-300 rounded px-4 text-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                </div>

                <div className="flex flex-col gap-2 mt-4">
                    <label htmlFor="URL" className="text-[24px] font-medium text-gray-700">
                        URL
                    </label>
                    <input
                        id="URL"
                        type="text"
                        placeholder="URL"
                        value={codigo}
                        onChange={(e) => setCodigo(e.target.value)}
                        className="w-full min-w-[240px] h-[44px] border border-gray-300 rounded px-4 text-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                </div>

                <div className="flex justify-center mt-6">
                    <button
                        type="submit"
                        className="w-[520px] h-[56px] text-[32px] text-white text-[20px] bg-[#AF52DE] hover:bg-purple-600 rounded transition-all"
                    >
                        Aceptar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Videoadm;