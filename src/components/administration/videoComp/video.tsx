import { useState, useEffect } from "react";
import useTiktok from "../../../hooks/useTiktok";
import type { TikTok } from "../../../interfaces/TikTok";

export default function Videoadm() {

  const [codigo, setCodigo] = useState("");
  const [message, setMessage] = useState("");
  const [selectedTiktok, setSelectedTiktok] = useState<TikTok | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // ID específico que necesitas para actualizar
  const specificId = "9c1a2583-bd91-4cd1-bfe0-fc0e0188f1af";

  // Hook personalizado para manejar TikToks
  const {
    tiktoks,
    loading,
    error,
    fetchTiktoks,
    getTiktokById,
    createTiktok,
    updateTiktok,
    deleteTiktok
  } = useTiktok();

  // Cargar TikToks al montar el componente
  useEffect(() => {
    fetchTiktoks();
  }, [fetchTiktoks]);

  // Cargar el TikTok específico para editar
  useEffect(() => {
    const loadSpecificTiktok = async () => {
      if (specificId) {
        const tiktok = await getTiktokById(specificId);
        if (tiktok) {
          setSelectedTiktok(tiktok);
          setCodigo(tiktok.embed || "");
          setIsEditing(true);
        }
      }
    };
    loadSpecificTiktok();
  }, [specificId, getTiktokById]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!codigo.trim()) {
      setMessage("Por favor, ingresa la URL del video");
      return;
    }

    setMessage("");

    try {
      const updateData = {
        embed: codigo.trim(),
      };

      if (isEditing && specificId) {
        // Actualizar TikTok existente
        const result = await updateTiktok(specificId, updateData);
        if (result) {
          setMessage("Video actualizado exitosamente");
          setCodigo("");
          setIsEditing(false);
          setSelectedTiktok(null);
        }
      } else {
        // Crear nuevo TikTok
        const result = await createTiktok(updateData);
        if (result) {
          setMessage("Video creado exitosamente");
          setCodigo("");
        }
      }
    } catch (err: any) {
      setMessage(`Error: ${err.message || "Error al procesar el video"}`);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setSelectedTiktok(null);
    setCodigo("");
    setMessage("");
  };

  const handleEditTiktok = async (id: string) => {
    const tiktok = await getTiktokById(id);
    if (tiktok) {
      setSelectedTiktok(tiktok);
      setCodigo(tiktok.embed || "");
      setIsEditing(true);
    }
  };

  const handleDeleteTiktok = async (id: string) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este video?")) {
      const success = await deleteTiktok(id);
      if (success) {
        setMessage("Video eliminado exitosamente");
      }
    }
  };

  return (
      <div className="min-h-screen bg-gradient-to-br from-purple-200 to-white p-4">
        <div className="max-w-4xl mx-auto">
          {/* Formulario principal */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border-0 p-6 sm:p-8 mb-8 hover:shadow-2xl transition-all duration-300">
            <div className="text-center mb-8 sm:mb-12">
              <div className="inline-flex items-center gap-2 text-purple-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 sm:w-8 sm:h-8">
                  <path d="M17 10.5V6c0-1.1-.9-2-2-2H5C3.9 4 3 4.9 3 6v12c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2v-4.5l4 4v-11l-4 4z" />
                </svg>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-800 to-purple-800 bg-clip-text text-transparent mb-2">
                {isEditing ? "Editar Video" : "Crear nuevo video"}
              </h1>
              <p className="text-gray-600 text-sm">Gestiona tus videos de TikTok de manera sencilla</p>
            </div>

            <div className="space-y-6">
              {/* Campo URL */}
              <div className="relative">
                <label
                    htmlFor="url"
                    className="block text-base font-semibold text-gray-700 mb-3"
                >
                  URL del Video <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                      type="url"
                      id="url"
                      value={codigo}
                      onChange={(e) => setCodigo(e.target.value)}
                      placeholder="https://www.tiktok.com/@usuario/video/..."
                      className="w-full h-12 px-4 bg-white/50 border-2 border-purple-200/50 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-purple-400 hover:border-purple-300 transition-all duration-200 text-sm backdrop-blur-sm"
                      disabled={loading}
                      required
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/5 to-pink-500/5 pointer-events-none"></div>
                </div>
              </div>

              {/* Mensaje de estado */}
              {(message || error) && (
                  <div
                      className={`w-full p-4 rounded-xl text-center text-sm border-0 shadow-lg backdrop-blur-sm ${
                          message.includes("Error") || error
                              ? "bg-red-50/80 text-red-700"
                              : "bg-green-50/80 text-green-700"
                      }`}
                  >
                    {error || message}
                  </div>
              )}

              {/* Información del ID cuando está editando */}
              {isEditing && (
                  <div className="bg-blue-50/80 backdrop-blur-sm border-0 rounded-xl p-4 text-center shadow-sm">
                    <p className="text-sm text-blue-700">
                      Editando ID: <span className="font-mono bg-blue-100 px-2 py-1 rounded">{specificId}</span>
                    </p>
                  </div>
              )}

              {/* Botón principal */}
              <div className="text-center space-y-4">
                <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full sm:w-auto flex-1 h-12 sm:h-14 px-6 sm:px-8 text-lg sm:text-xl text-white font-bold rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-purple-300 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
                >
                  {loading ? "Procesando..." : (isEditing ? "Actualizar Video" : "Publicar video")}
                </button>

                {isEditing && (
                    <button
                        type="button"
                        onClick={handleCancelEdit}
                        className="w-full h-12 text-gray-700 font-semibold rounded-xl bg-gray-100/80 hover:bg-gray-200/80 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-gray-200 backdrop-blur-sm shadow-md hover:shadow-lg"
                    >
                      Cancelar
                    </button>
                )}
              </div>
            </div>
          </div>

          {/* Lista de TikToks - Mejorado para mobile */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border-0 p-4 sm:p-6 hover:shadow-2xl transition-all duration-300">
            <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-2 sm:gap-4 mb-6 sm:mb-8">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600">
                <path d="M17 10.5V6c0-1.1-.9-2-2-2H5C3.9 4 3 4.9 3 6v12c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2v-4.5l4 4v-11l-4 4z" />
              </svg>
              <h2 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-purple-800 to-purple-800 bg-clip-text text-transparent text-center sm:text-left">
                📹 Videos Existentes
              </h2>
            </div>

            {loading && tiktoks.length === 0 && (
                <div className="text-center py-8">
                  <div className="inline-flex items-center gap-3 text-gray-500">
                    <div className="w-5 h-5 border-2 border-purple-300 border-t-purple-600 rounded-full animate-spin"></div>
                    <p>Cargando videos...</p>
                  </div>
                </div>
            )}

            {tiktoks.length === 0 && !loading && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-gray-400">
                      <path d="M4.5 4.5a3 3 0 00-3 3v9a3 3 0 003 3h15a3 3 0 003-3V7.5a3 3 0 00-3-3H4.5z" />
                    </svg>
                  </div>
                  <p className="text-gray-500">No hay videos disponibles</p>
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {tiktoks.map((tiktok, index) => (
                  <div key={tiktok.id} className="bg-white/60 backdrop-blur-sm border-0 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    {/* Imagen placeholder */}
                    <div className="aspect-video bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 sm:w-12 sm:h-12 text-purple-400">
                        <path d="M4.5 4.5a3 3 0 00-3 3v9a3 3 0 003 3h15a3 3 0 003-3V7.5a3 3 0 00-3-3H4.5zM19.344 3.75c.571 0 1.047.48 1.047 1.053v1.312a.75.75 0 01-.75.75H4.356a.75.75 0 01-.75-.75V4.803c0-.573.476-1.053 1.047-1.053h15.006zM12 9a6 6 0 100 12 6 6 0 000-12zm-3 6a3 3 110 6 3 3 0 010-6z" />
                      </svg>
                    </div>

                    <div className="p-3 sm:p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-800 text-sm truncate flex-1 mr-2">
                          {tiktok.embed.length > 20 ? tiktok.embed.substring(0, 20) + '...' : tiktok.embed}
                        </h3>
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full flex-shrink-0">#{index + 1}</span>
                      </div>
                      <p className="text-xs text-gray-500 mb-4 truncate">
                        {tiktok.embed}
                      </p>

                      <div className="flex gap-2">
                        <button
                            onClick={() => handleEditTiktok(tiktok.id)}
                            className="flex-1 px-2 sm:px-3 py-2 text-white font-medium rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all duration-200 text-xs sm:text-sm shadow-md hover:shadow-lg transform hover:scale-105"
                        >
                          Editar
                        </button>
                        <button
                            onClick={() => handleDeleteTiktok(tiktok.id)}
                            className="flex-1 px-2 sm:px-3 py-2 text-white font-medium rounded-lg bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 transition-all duration-200 text-xs sm:text-sm shadow-md hover:shadow-lg transform hover:scale-105"
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </div>
              ))}
            </div>
          </div>
        </div>
      </div>
  );
}