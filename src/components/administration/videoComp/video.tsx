import { useState } from "react";

export default function Videoadm() {
  const [nombre, setNombre] = useState("");
  const [codigo, setCodigo] = useState("");

  const handleSubmit = () => {
    console.log("Nombre:", nombre);
    console.log("Código:", codigo);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-6xl bg-white rounded-lg shadow-md flex flex-col justify-center items-center p-4 md:p-8">

        {/* Bloque Nombre */}
        <div className="flex flex-col justify-start w-full mb-6">
          <label
            htmlFor="nombre"
            className="block font-medium text-gray-700 mb-2 text-lg md:text-xl lg:text-2xl"
          >
            Nombre
          </label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre"
            className="w-full h-11 px-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          />
        </div>

        {/* Bloque URL */}
        <div className="flex flex-col justify-start w-full mb-6">
          <label
            htmlFor="url"
            className="block font-medium text-gray-700 mb-2 text-lg md:text-xl lg:text-2xl"
          >
            URL
          </label>
          <input
            type="text"
            id="url"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            placeholder="URL del video"
            className="w-full h-11 px-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          />
        </div>

        {/* Botón Aceptar */}
        <button
          onClick={handleSubmit}
          className="w-full max-w-md md:max-w-lg h-12 md:h-14 text-xl md:text-2xl lg:text-3xl text-white font-medium rounded-md bg-[#AF52DE] hover:bg-[#9e3cd4] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#AF52DE] focus:ring-offset-2"
        >
          Aceptar
        </button>
      </div>
    </div>
  );
}