import { useState, useRef } from "react";
import api from "../../../service/api";

export default function ContentForm() {
    const [titulo, setTitulo] = useState("");
    const [subtitulo, setSubtitulo] = useState("");
    const [texto, setTexto] = useState("");
    const [fullContent, setFullContent] = useState("");
    const [imagen, setImagen] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    // ID del post que quieres actualizar
    const postId = "1ff2a202-b6a7-4622-bf97-99f0924bb1d9";

    const handleSubmit = async () => {
        // Validar que al menos título o contenido tengan contenido
        if (!titulo.trim() && !texto.trim()) {
            setMessage("Por favor, ingresa al menos un título o contenido");
            return;
        }

        setIsLoading(true);
        setMessage("");

        try {
            // Preparar los datos para enviar (solo título y contenido)
            const updateData: any = {};
            if (titulo.trim()) updateData.title = titulo.trim();
            if (texto.trim()) updateData.content = texto.trim();

            const response = await api.patch(`/posts/${postId}`, updateData);
            
            setMessage("¡Post actualizado exitosamente!");
            console.log("Post actualizado:", response.data);
            
        } catch (error: any) {
            console.error("Error:", error);
            let errorMessage = 'Error al actualizar el post';
            
            if (error.response?.data?.message) {
                if (Array.isArray(error.response.data.message)) {
                    errorMessage = error.response.data.message.join(', ');
                } else {
                    errorMessage = error.response.data.message;
                }
            } else if (error.message) {
                errorMessage = error.message;
            }
            
            setMessage(`Error: ${errorMessage}`);
        } finally {
            setIsLoading(false);
        }
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
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="w-full max-w-7xl bg-white rounded-lg shadow-md flex flex-col items-center p-4 md:p-8">
                
                {/* Mensaje de estado */}
                {message && (
                    <div className={`w-full max-w-md mb-4 p-3 rounded-md text-center ${
                        message.includes('Error') 
                            ? 'bg-red-100 text-red-700 border border-red-300' 
                            : 'bg-green-100 text-green-700 border border-green-300'
                    }`}>
                        {message}
                    </div>
                )}

                <div className="flex flex-col lg:flex-row gap-8 w-full">
                    {/* Imagen / Uploader */}
                    <div className="flex-shrink-0 w-full lg:w-auto flex justify-center">
                        <div
                            className="w-full max-w-md lg:w-[562px] h-64 sm:h-80 lg:h-[635px] bg-gray-200 rounded-md flex items-center justify-center cursor-pointer overflow-hidden"
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
                                disabled={isLoading}
                            />
                        </div>
                    </div>

                    {/* Formulario */}
                    <div className="flex-1 border border-gray-200 rounded-lg p-4 md:p-5 space-y-4 min-w-0">
                        {/* Campo Título */}
                        <div>
                            <label
                                htmlFor="titulo"
                                className="block font-medium text-gray-700 mb-2 text-lg md:text-xl lg:text-2xl"
                            >
                                Título
                            </label>
                            <input
                                type="text"
                                id="titulo"
                                value={titulo}
                                onChange={(e) => setTitulo(e.target.value)}
                                placeholder="Título"
                                className="w-full h-11 px-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                disabled={isLoading}
                            />
                        </div>

                        {/* Campo Subtítulo */}
                        <div>
                            <label
                                htmlFor="subtitulo"
                                className="block font-medium text-gray-700 mb-2 text-lg md:text-xl lg:text-2xl"
                            >
                                Subtítulo
                            </label>
                            <input
                                type="text"
                                id="subtitulo"
                                value={subtitulo}
                                onChange={(e) => setSubtitulo(e.target.value)}
                                placeholder="Subtítulo"
                                className="w-full h-11 px-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                disabled={isLoading}
                            />
                        </div>

                        {/* Campo Texto */}
                        <div>
                            <label
                                htmlFor="texto"
                                className="block font-medium text-gray-700 mb-2 text-lg md:text-xl lg:text-2xl"
                            >
                                Texto
                            </label>
                            <textarea
                                id="texto"
                                value={texto}
                                onChange={(e) => setTexto(e.target.value)}
                                placeholder="Texto"
                                className="w-full h-32 md:h-36 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                disabled={isLoading}
                            />
                        </div>

                        {/* Campo Full Content */}
                        <div>
                            <label
                                htmlFor="fullContent"
                                className="block font-medium text-gray-700 mb-2 text-lg md:text-xl lg:text-2xl"
                            >
                                Full content
                            </label>
                            <textarea
                                id="fullContent"
                                value={fullContent}
                                onChange={(e) => setFullContent(e.target.value)}
                                placeholder="Full content"
                                className="w-full h-32 md:h-36 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                disabled={isLoading}
                            />
                        </div>
                    </div>
                </div>

                {/* Botón Aceptar */}
                <div className="flex justify-center mt-6 w-full">
                    <button
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className={`w-full max-w-md md:max-w-lg h-12 md:h-14 text-xl md:text-2xl lg:text-3xl text-white font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#AF52DE] focus:ring-offset-2 ${
                            isLoading 
                                ? 'bg-gray-400 cursor-not-allowed' 
                                : 'bg-[#AF52DE] hover:bg-[#9e3cd4]'
                        }`}
                    >
                        {isLoading ? 'Actualizando...' : 'Actualizar Post'}
                    </button>
                </div>
            </div>
        </div>
    );
}