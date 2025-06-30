import { useState } from "react";

export default function Texfrom() {
  const [titulo, setTitulo] = useState("");
  const [texto, setTexto] = useState("");

  const handleSubmit = () => {
    console.log("Título:", titulo);
    console.log("Texto:", texto);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-[1300px] h-[487px] bg-white rounded-lg shadow-md flex flex-col justify-center items-center px-8 py-6">

        {/* Bloque Título */}
        <div className="flex flex-col justify-start w-[1240px] h-[89px]">
          <label
            htmlFor="titulo"
            className="block font-medium text-gray-700 mb-2 text-[24px]"
          >
            Título
          </label>
          <input
            type="text"
            id="titulo"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Título"
            className="w-[1240px] h-[44px] min-w-[240px] px-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          />
        </div>

        {/* Bloque Texto */}
        <div className="flex flex-col justify-start mt-6 w-[1240px] h-[205px]">
          <label
            htmlFor="texto"
            className="block font-medium text-gray-700 mb-2 text-[24px]"
          >
            Texto
          </label>
          <textarea
            id="texto"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            placeholder="Texto"
            className="w-[1240px] h-[175px] px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          />
        </div>

        {/* Botón Aceptar */}
        <button
          onClick={handleSubmit}
          className="mt-6 w-[520px] h-[56px] text-[32px] text-white font-medium rounded-md bg-[#AF52DE] hover:bg-[#9e3cd4] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#AF52DE] focus:ring-offset-2"
        >
          Aceptar
        </button>
      </div>
    </div>
  );
}
