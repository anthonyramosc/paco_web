import { useState, useRef } from "react";

export default function ContentForm() {
    const [titulo, setTitulo] = useState("");
    const [subtitulo, setSubtitulo] = useState("");
    const [texto, setTexto] = useState("");
    const [fullContent, setFullContent] = useState("");
    const [imagen, setImagen] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleSubmit = () => {
        console.log("Título:", titulo);
        console.log("Subtítulo:", subtitulo);
        console.log("Texto:", texto);
        console.log("Full content:", fullContent);
        console.log("Imagen:", imagen);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImagen(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="w-[1300px] h-[758px] bg-white rounded-lg shadow-md flex flex-col justify-between items-center px-8 py-6">
                <div className="flex gap-8 w-full">
                    {/* Imagen / Uploader */}
                    <div className="flex-shrink-0">
                        <div
                            className="w-[562px] h-[635px] bg-gray-200 rounded-md flex items-center justify-center cursor-pointer overflow-hidden"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            {imagen ? (
                                <img
                                    src={imagen}
                                    alt="Preview"
                                    className="object-cover w-full h-full"
                                />
                            ) : (
                                <div className="text-gray-400 text-center">
                                    <div className="w-12 h-12 mx-auto mb-3 bg-gray-300 rounded-lg flex items-center justify-center">
                                        <svg
                                            className="w-6 h-6 text-gray-500"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                            />
                                        </svg>
                                    </div>
                                    <p className="text-xs text-gray-400">Subir imagen</p>
                                </div>
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                ref={fileInputRef}
                                className="hidden"
                            />
                        </div>
                    </div>

                    {/* Formulario */}
                    <div className="flex-1 border border-gray-200 rounded-lg p-5 space-y-4">
                        {/* Campo Título */}
                        <div>
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
                                className="w-[620px] h-[44px] min-w-[240px] px-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                            />
                        </div>

                        {/* Campo Subtítulo */}
                        <div>
                            <label
                                htmlFor="subtitulo"
                                className="block font-medium text-gray-700 mb-2 text-[24px]"
                            >
                                Subtítulo
                            </label>
                            <input
                                type="text"
                                id="subtitulo"
                                value={subtitulo}
                                onChange={(e) => setSubtitulo(e.target.value)}
                                placeholder="Subtítulo"
                                className="w-[620px] h-[44px] min-w-[240px] px-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                            />
                        </div>

                        {/* Campo Texto */}
                        <div>
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
                                className="w-[620px] h-[135px] px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                            />
                        </div>

                        {/* Campo Full Content */}
                        <div>
                            <label
                                htmlFor="fullContent"
                                className="block font-medium text-gray-700 mb-2 text-[24px]"
                            >
                                Full content
                            </label>
                            <textarea
                                id="fullContent"
                                value={fullContent}
                                onChange={(e) => setFullContent(e.target.value)}
                                placeholder="Full content"
                                className="w-[620px] h-[135px] px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Botón Aceptar */}
                <div className="flex justify-center mt-6">
                    <button
                        onClick={handleSubmit}
                        className="w-[520px] h-[56px] text-[32px] text-white font-medium rounded-md bg-[#AF52DE] hover:bg-[#9e3cd4] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#AF52DE] focus:ring-offset-2"
                    >
                        Aceptar
                    </button>
                </div>
            </div>
        </div>
    );
}
