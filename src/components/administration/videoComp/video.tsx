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
    <div className="min-h-screen flex flex-col items-center justify-start bg-gray-50 p-4">
      <div className="w-full max-w-6xl bg-white rounded-lg shadow-md flex flex-col justify-center items-center p-4 md:p-8 mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          {isEditing ? "Editar Video" : "Crear Nuevo Video"}
        </h1>
        
        <form onSubmit={handleSubmit} className="w-full">
          {/* Campo nombre */}
          <div className="flex flex-col justify-start w-full mb-6">
            <label
              htmlFor="nombre"
              className="block font-medium text-gray-700 mb-2 text-lg md:text-xl lg:text-2xl"
            >
              Nombre <span className="text-sm text-gray-500 font-normal">(opcional)</span>
            </label>
         
          </div>

          {/* Campo URL */}
          <div className="flex flex-col justify-start w-full mb-6">
            <label
              htmlFor="url"
              className="block font-medium text-gray-700 mb-2 text-lg md:text-xl lg:text-2xl"
            >
              URL <span className="text-sm text-red-500 font-normal">*</span>
            </label>
            <input
              type="url"
              id="url"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              placeholder="https://www.tiktok.com/@usuario/video/..."
              className="w-full h-11 px-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              disabled={loading}
              required
            />
          </div>

          {/* Mensaje de estado */}
          {(message || error) && (
            <div
              className={`w-full max-w-md md:max-w-lg mb-4 p-3 rounded-md text-center mx-auto ${
                message.includes("Error") || error
                  ? "bg-red-100 text-red-700 border border-red-300"
                  : "bg-green-100 text-green-700 border border-green-300"
              }`}
            >
              {error || message}
            </div>
          )}

          {/* Información del ID cuando está editando */}
          {isEditing && (
            <div className="w-full max-w-md md:max-w-lg mb-4 p-2 text-xs text-gray-500 text-center mx-auto">
              <br />
              Editando ID: {specificId}
            </div>
          )}

          {/* Botones */}
          <div className="flex justify-center gap-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full max-w-md md:max-w-lg h-12 md:h-14 text-xl md:text-2xl lg:text-3xl text-white font-medium rounded-md bg-[#AF52DE] hover:bg-[#9e3cd4] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#AF52DE] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Procesando..." : (isEditing ? "Actualizar" : "Crear")}
            </button>
            
            {isEditing && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="w-full max-w-md md:max-w-lg h-12 md:h-14 text-xl md:text-2xl lg:text-3xl text-gray-700 font-medium rounded-md bg-gray-200 hover:bg-gray-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
              >
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Lista de TikToks */}
      <div className="w-full max-w-6xl bg-white rounded-lg shadow-md p-4 md:p-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Videos Existentes</h2>
        
        {loading && tiktoks.length === 0 && (
          <div className="text-center py-4">
            <p className="text-gray-500">Cargando videos...</p>
          </div>
        )}

        {tiktoks.length === 0 && !loading && (
          <div className="text-center py-4">
            <p className="text-gray-500">No hay videos disponibles</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tiktoks.map((tiktok) => (
            <div key={tiktok.id} className="border border-gray-200 rounded-lg p-4">
              <div className="mb-3">
                <h3 className="font-medium text-gray-800 truncate">
                  {tiktok.nombre || "Sin nombre"}
                </h3>
                <p className="text-sm text-gray-500 truncate">
                  {tiktok.embed}
                </p>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => handleEditTiktok(tiktok.id)}
                  className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDeleteTiktok(tiktok.id)}
                  className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}