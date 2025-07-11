import { useState, useRef } from "react";
import { usePosts } from "../../../hooks/usePost";

export default function ContentForm() {
    const [titulo, setTitulo] = useState("");
    const [texto, setTexto] = useState("");
    const [imagen, setImagen] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [message, setMessage] = useState("");
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    // ID del post a actualizar - puedes hacerlo dinámico según necesites
    const postId = "1ff2a202-b6a7-4622-bf97-99f0924bb1d9";

    // Usar el hook de posts
    const {
        updatePost,
        uploadPostImage,
        updating,
        uploadingImage,
        error,
        clearError
    } = usePosts();

    const handleSubmit = async () => {
        // Validar que al menos título, contenido o imagen tengan contenido
        if (!titulo.trim() && !texto.trim() && !selectedFile) {
            setMessage("Por favor, ingresa al menos un título, contenido o imagen");
            return;
        }

        clearError();
        setMessage("");

        try {
            let hasTextChanges = false;
            let hasImageChanges = false;

            // 1. PRIMERA PETICIÓN: Actualizar texto (título y contenido) si hay cambios
            if (titulo.trim() || texto.trim()) {
                setMessage("Actualizando texto del post...");

                const textData: any = {};
                if (titulo.trim()) textData.title = titulo.trim();
                if (texto.trim()) textData.content = texto.trim();

                const updatedPost = await updatePost(postId, textData);

                if (updatedPost) {
                    hasTextChanges = true;
                    setMessage("Texto actualizado exitosamente");
                } else {
                    setMessage("Error al actualizar el texto del post");
                    return;
                }
            }

            // 2. SEGUNDA PETICIÓN: Subir imagen si hay una seleccionada
            if (selectedFile) {
                setMessage(hasTextChanges ? "Texto actualizado. Subiendo imagen..." : "Subiendo imagen...");

                const imageUrl = await uploadPostImage(postId, selectedFile);

                if (imageUrl) {
                    hasImageChanges = true;
                    setMessage(hasTextChanges ? "Post e imagen actualizados exitosamente" : "Imagen actualizada exitosamente");
                } else {
                    setMessage(hasTextChanges ? "Texto actualizado, pero error al subir imagen" : "Error al subir la imagen");
                    return;
                }
            }

            // 3. MENSAJE FINAL DE ÉXITO
            if (hasTextChanges && hasImageChanges) {
                setMessage("¡Post actualizado completamente!");
            } else if (hasTextChanges) {
                setMessage("¡Texto del post actualizado exitosamente!");
            } else if (hasImageChanges) {
                setMessage("¡Imagen del post actualizada exitosamente!");
            }

            // Limpiar el formulario después de 3 segundos
            setTimeout(() => {
                setTitulo("");
                setTexto("");
                setSelectedFile(null);
                setImagen(null);
                setMessage("");
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
            }, 3000);

        } catch (err: any) {
            console.error("Error:", err);
            setMessage(`Error: ${err.message || 'Error al actualizar el post'}`);
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            console.log('Archivo seleccionado:', {
                name: file.name,
                size: file.size,
                type: file.type,
            });

            // Validar tipo de archivo
            if (!file.type.startsWith('image/')) {
                setMessage("Por favor, selecciona un archivo de imagen válido");
                return;
            }

            // Validar tamaño (máximo 5MB)
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
            clearError();
        }
    };

    const removeImage = () => {
        setImagen(null);
        setSelectedFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    // Función para probar la conectividad del servidor
    const testConnection = async () => {
        try {
            setMessage('Probando conexión con el servidor...');

            // Crear un archivo dummy muy pequeño para probar
            const canvas = document.createElement('canvas');
            canvas.width = 1;
            canvas.height = 1;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.fillStyle = '#FF0000';
                ctx.fillRect(0, 0, 1, 1);
            }

            canvas.toBlob(async (blob) => {
                if (blob) {
                    const testFile = new File([blob], 'test.png', { type: 'image/png' });

                    try {
                        const result = await uploadPostImage(postId, testFile);
                        if (result) {
                            setMessage('✅ Conexión exitosa con el servidor');
                        } else {
                            setMessage('❌ Error en la conexión');
                        }
                    } catch (error: any) {
                        setMessage('❌ Error en la conexión: ' + error.message);
                    }
                }
            }, 'image/png');

        } catch (error) {
            console.error('Error en test de conexión:', error);
            setMessage('❌ Error en test de conexión');
        }
    };

    // Función para actualizar solo el texto
    const handleUpdateTextOnly = async () => {
        if (!titulo.trim() && !texto.trim()) {
            setMessage("Por favor, ingresa al menos un título o contenido");
            return;
        }

        clearError();
        setMessage("Actualizando texto del post...");

        try {
            const textData: any = {};
            if (titulo.trim()) textData.title = titulo.trim();
            if (texto.trim()) textData.content = texto.trim();

            const updatedPost = await updatePost(postId, textData);

            if (updatedPost) {
                setMessage("¡Texto del post actualizado exitosamente!");

                // Limpiar solo los campos de texto después de 3 segundos
                setTimeout(() => {
                    setTitulo("");
                    setTexto("");
                    setMessage("");
                }, 3000);
            } else {
                setMessage("Error al actualizar el texto del post");
            }
        } catch (err: any) {
            console.error("Error:", err);
            setMessage(`Error: ${err.message || 'Error al actualizar el texto'}`);
        }
    };

    // Función para actualizar solo la imagen
    const handleUpdateImageOnly = async () => {
        if (!selectedFile) {
            setMessage("Por favor, selecciona una imagen");
            return;
        }

        clearError();
        setMessage("Subiendo imagen...");

        try {
            const imageUrl = await uploadPostImage(postId, selectedFile);

            if (imageUrl) {
                setMessage("¡Imagen actualizada exitosamente!");

                // Limpiar solo la imagen después de 3 segundos
                setTimeout(() => {
                    setSelectedFile(null);
                    setImagen(null);
                    setMessage("");
                    if (fileInputRef.current) {
                        fileInputRef.current.value = '';
                    }
                }, 3000);
            } else {
                setMessage("Error al subir la imagen");
            }
        } catch (err: any) {
            console.error("Error:", err);
            setMessage(`Error: ${err.message || 'Error al subir la imagen'}`);
        }
    };

    // Mostrar errores del hook
    const displayMessage = message || error;
    const isLoading = updating || uploadingImage;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 p-4">
            <div className="w-full max-w-7xl bg-white rounded-xl shadow-xl flex flex-col items-center p-6 md:p-8">

                {/* Header */}
                <div className="text-center mb-6">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                        Actualizar Post
                    </h1>
                    <p className="text-gray-600">
                        Edita el contenido, título o imagen de tu post
                    </p>
                </div>

                {/* Mensaje de estado */}
                {displayMessage && (
                    <div className={`w-full max-w-md mb-6 p-4 rounded-lg text-center font-medium ${
                        displayMessage.includes('Error') || displayMessage.includes('❌')
                            ? 'bg-red-100 text-red-700 border-l-4 border-red-500'
                            : displayMessage.includes('✅') || displayMessage.includes('exitosamente')
                                ? 'bg-green-100 text-green-700 border-l-4 border-green-500'
                                : 'bg-blue-100 text-blue-700 border-l-4 border-blue-500'
                    }`}>
                        {displayMessage}
                    </div>
                )}

                {/* Botones de debug y acciones individuales */}
                <div className="flex flex-wrap justify-center gap-4 mb-6">
                    <button
                        onClick={testConnection}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors duration-200 font-medium"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Probando...' : 'Probar Conexión'}
                    </button>

                    <button
                        onClick={handleUpdateTextOnly}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition-colors duration-200 font-medium"
                        disabled={isLoading || (!titulo.trim() && !texto.trim())}
                    >
                        {updating ? 'Actualizando...' : 'Solo Texto'}
                    </button>

                    <button
                        onClick={handleUpdateImageOnly}
                        className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:bg-gray-400 transition-colors duration-200 font-medium"
                        disabled={isLoading || !selectedFile}
                    >
                        {uploadingImage ? 'Subiendo...' : 'Solo Imagen'}
                    </button>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 w-full">
                    {/* Imagen / Uploader */}
                    <div className="flex-shrink-0 w-full lg:w-auto flex justify-center">
                        <div className="w-full max-w-md lg:w-[562px] h-64 sm:h-80 lg:h-[635px] bg-gray-100 rounded-xl flex items-center justify-center cursor-pointer overflow-hidden relative border-2 border-dashed border-gray-300 hover:border-purple-400 transition-colors duration-200">
                            {imagen ? (
                                <div className="relative w-full h-full">
                                    <img
                                        src={imagen}
                                        alt="Preview"
                                        className="object-cover w-full h-full rounded-xl"
                                    />
                                    {/* Botón para remover imagen */}
                                    <button
                                        onClick={removeImage}
                                        disabled={isLoading}
                                        className="absolute top-3 right-3 bg-red-500 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg"
                                    >
                                        ×
                                    </button>
                                    {/* Overlay para cambiar imagen */}
                                    <div
                                        className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-xl"
                                        onClick={() => fileInputRef.current?.click()}
                                    >
                                        <p className="text-white text-lg font-medium">Cambiar imagen</p>
                                    </div>
                                </div>
                            ) : (
                                <div
                                    className="text-gray-500 text-center cursor-pointer p-8"
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                                        <svg
                                            className="w-8 h-8 text-gray-400"
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
                                    <p className="text-lg font-medium text-gray-600 mb-2">
                                        Subir imagen
                                    </p>
                                    <p className="text-sm text-gray-400">
                                        Arrastra una imagen aquí o haz clic para seleccionar
                                        <br />
                                        <span className="text-xs">Máximo 5MB • PNG, JPG, JPEG</span>
                                    </p>
                                </div>
                            )}

                            {/* Indicador de carga de imagen */}
                            {uploadingImage && (
                                <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center rounded-xl">
                                    <div className="text-white text-center">
                                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white mx-auto mb-3"></div>
                                        <p className="text-lg font-medium">Subiendo imagen...</p>
                                    </div>
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
                    <div className="flex-1 border border-gray-200 rounded-xl p-6 space-y-6 min-w-0 bg-gray-50">
                        {/* Campo Título */}
                        <div>
                            <label
                                htmlFor="titulo"
                                className="block font-semibold text-gray-700 mb-3 text-lg md:text-xl"
                            >
                                Título
                            </label>
                            <input
                                type="text"
                                id="titulo"
                                value={titulo}
                                onChange={(e) => setTitulo(e.target.value)}
                                placeholder="Escribe el título del post..."
                                className="w-full h-12 px-4 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200"
                                disabled={isLoading}
                            />
                        </div>

                        {/* Campo Texto */}
                        <div>
                            <label
                                htmlFor="texto"
                                className="block font-semibold text-gray-700 mb-3 text-lg md:text-xl"
                            >
                                Contenido
                            </label>
                            <textarea
                                id="texto"
                                value={texto}
                                onChange={(e) => setTexto(e.target.value)}
                                placeholder="Escribe el contenido del post..."
                                className="w-full h-40 px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200"
                                disabled={isLoading}
                            />
                        </div>

                        {/* Información sobre la imagen seleccionada */}
                        {selectedFile && (
                            <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                                <div className="flex items-center space-x-2 mb-2">
                                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <p className="text-sm font-medium text-blue-700">
                                        Imagen seleccionada: {selectedFile.name}
                                    </p>
                                </div>
                                <div className="text-xs text-blue-600 space-y-1">
                                    <p>Tamaño: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                                    <p>Tipo: {selectedFile.type}</p>
                                </div>
                            </div>
                        )}

                        {/* Información del post */}
                        <div className="bg-gray-100 border border-gray-200 p-4 rounded-lg">
                            <div className="flex items-center space-x-2 mb-2">
                                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <p className="text-sm font-medium text-gray-700">
                                    Información del Post
                                </p>
                            </div>
                            <div className="text-xs text-gray-500 space-y-1">
                                <p><strong>Post ID:</strong> {postId}</p>
                                <p>Este formulario actualiza el post existente</p>
                                <p className="text-green-600"><strong>Estrategia:</strong> Peticiones separadas para texto e imagen</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Botón Actualizar Todo */}
                <div className="flex justify-center mt-8 w-full">
                    <button
                        onClick={handleSubmit}
                        disabled={isLoading || (!titulo.trim() && !texto.trim() && !selectedFile)}
                        className={`w-full max-w-md h-14 text-xl font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-purple-300 shadow-lg ${
                            isLoading || (!titulo.trim() && !texto.trim() && !selectedFile)
                                ? 'bg-gray-400 cursor-not-allowed text-gray-600'
                                : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white transform hover:scale-105'
                        }`}
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center space-x-2">
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                <span>Procesando...</span>
                            </div>
                        ) : (
                            'Actualizar Post Completo'
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}