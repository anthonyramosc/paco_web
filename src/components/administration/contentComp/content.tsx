import { useState, useRef } from "react";
import { usePosts } from "../../../hooks/usePost";
import Cookies from "js-cookie";
export default function ContentForm() {
    const [titulo, setTitulo] = useState("");
    const [texto, setTexto] = useState("");
    const [imagen, setImagen] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [message, setMessage] = useState("");
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    // Usamos el hook usePosts
    const {
        updatePostWithImage,
        uploadingImage,
        updating,
        error,
        clearError
    } = usePosts();

    // ID del post a actualizar (debería venir como prop o de alguna configuración)
    const postId = "1ff2a202-b6a7-4622-bf97-99f0924bb1d9";

    const handleSubmit = async () => {
        // Validar que al menos título o contenido tengan contenido
        if (!titulo.trim() && !texto.trim() && !selectedFile) {
            setMessage("Por favor, ingresa al menos un título, contenido o selecciona una imagen");
            return;
        }

        setMessage("");
        clearError();

        try {
            const updateData = {
                title: titulo.trim(),
                content: texto.trim()
            };

            await updatePostWithImage(postId, updateData, selectedFile || undefined);

            setMessage("¡Post actualizado exitosamente!");
            // Limpiar el formulario después de una actualización exitosa
            if (selectedFile) {
                setSelectedFile(null);
                setImagen(null);
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
            }
        } catch (err) {
            console.error("Error al actualizar el post:", err);
            setMessage(error || "Error al actualizar el post");
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Validar tipo de archivo
            if (!file.type.startsWith('image/')) {
                setMessage("Por favor, selecciona un archivo de imagen válido");
                return;
            }

            // Validar tamaño (por ejemplo, máximo 5MB)
            if (file.size > 5 * 1024 * 1024) {
                setMessage("La imagen es demasiado grande. Máximo 5MB");
                return;
            }

            setSelectedFile(file);

            // Crear preview
            const reader = new FileReader();
            reader.onload = () => {
                setImagen(reader.result as string);
            };
            reader.readAsDataURL(file);

            // Limpiar mensaje de error si existía
            setMessage("");
        }
    };

    const removeImage = () => {
        setImagen(null);
        setSelectedFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="w-full max-w-7xl bg-white rounded-lg shadow-md flex flex-col items-center p-4 md:p-8">
                {/* Mensaje de estado */}
                {message && (
                    <div className={`w-full max-w-md mb-4 p-3 rounded-md text-center ${
                        message.includes('Error') || error
                            ? 'bg-red-100 text-red-700 border border-red-300'
                            : 'bg-green-100 text-green-700 border border-green-300'
                    }`}>
                        {message}
                    </div>
                )}

                <div className="flex flex-col lg:flex-row gap-8 w-full">
                    {/* Imagen / Uploader */}
                    <div className="flex-shrink-0 w-full lg:w-auto flex justify-center">
                        <div className="w-full max-w-md lg:w-[562px] h-64 sm:h-80 lg:h-[635px] bg-gray-200 rounded-md flex items-center justify-center cursor-pointer overflow-hidden relative">
                            {imagen ? (
                                <div className="relative w-full h-full">
                                    <img
                                        src={imagen}
                                        alt="Preview"
                                        className="object-cover w-full h-full"
                                    />
                                    <button
                                        onClick={removeImage}
                                        disabled={updating || uploadingImage}
                                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition-colors"
                                    >
                                        ×
                                    </button>
                                    <div
                                        className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
                                        onClick={() => fileInputRef.current?.click()}
                                    >
                                        <p className="text-white text-sm">Cambiar imagen</p>
                                    </div>
                                </div>
                            ) : (
                                <div
                                    className="text-gray-400 text-center cursor-pointer"
                                    onClick={() => fileInputRef.current?.click()}
                                >
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
                                    <p className="text-xs text-gray-400">
                                        Subir imagen
                                        <br />
                                        <span className="text-xs text-gray-300">Máximo 5MB</span>
                                    </p>
                                </div>
                            )}

                            {uploadingImage && (
                                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                    <div className="text-white text-center">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
                                        <p className="text-sm">Subiendo imagen...</p>
                                    </div>
                                </div>
                            )}

                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                ref={fileInputRef}
                                className="hidden"
                                disabled={updating || uploadingImage}
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
                                disabled={updating || uploadingImage}
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
                                disabled={updating || uploadingImage}
                            />
                        </div>

                        {selectedFile && (
                            <div className="bg-blue-50 p-3 rounded-md">
                                <p className="text-sm text-blue-700">
                                    <strong>Imagen seleccionada:</strong> {selectedFile.name}
                                </p>
                                <p className="text-xs text-blue-600">
                                    Tamaño: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                                </p>
                                <p className="text-xs text-blue-600">
                                    Tipo: {selectedFile.type}
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Botón Aceptar */}
                <div className="flex justify-center mt-6 w-full">
                    <button
                        onClick={handleSubmit}
                        disabled={updating || uploadingImage}
                        className={`w-full max-w-md md:max-w-lg h-12 md:h-14 text-xl md:text-2xl lg:text-3xl text-white font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#AF52DE] focus:ring-offset-2 ${
                            updating || uploadingImage
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-[#AF52DE] hover:bg-[#9e3cd4]'
                        }`}
                    >
                        {uploadingImage ? 'Subiendo imagen...' :
                            updating ? 'Actualizando...' : 'Actualizar Post'}
                    </button>
                </div>
            </div>
        </div>
    );
}