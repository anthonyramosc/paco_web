import { useState, useEffect } from "react";
import apiService from "../../../service/apiService";
import { postsApi } from "../../../constants/EndpointsRoutes";
import type { CreatePostDto, Post, UpdatePostDto } from "../../../interfaces/Post.ts";
import Cookie from "js-cookie";

export default function Content() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState<Post[]>([]);
    const [selectedPost, setSelectedPost] = useState<Post | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const authorId = Cookie.get('userId');

    // ID específico que necesitas para actualizar
    const specificId = "9c1a2583-bd91-4cd1-bfe0-fc0e0188f1af";

    // Cargar posts al montar el componente
    useEffect(() => {
        fetchPosts();
    }, []);

    // Función para obtener todos los posts
    const fetchPosts = async () => {
        setLoading(true);
        try {
            const response = await apiService.getAll<Post[]>(postsApi);
            setPosts(response);
        } catch (error: any) {
            setMessage(`Error al cargar posts: ${error.message}`);
            console.error("Error fetching posts:", error);
        } finally {
            setLoading(false);
        }
    };

    // Manejar selección de archivo
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Validar tipo de archivo
            if (!file.type.startsWith('image/')) {
                setMessage("Por favor selecciona un archivo de imagen válido");
                return;
            }

            // Validar tamaño (máximo 5MB)
            if (file.size > 5 * 1024 * 1024) {
                setMessage("El archivo debe ser menor a 5MB");
                return;
            }

            setImageFile(file);

            // Crear preview
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    // Validar UUID
    const isValidUUID = (str: string): boolean => {
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        return uuidRegex.test(str);
    };

    // Función para crear post (primera petición)
    const createPostWithoutImage = async (postData: Omit<CreatePostDto, 'imageUrl'>) => {
        // Crear post sin imagen primero
        const postDataWithPlaceholder: CreatePostDto = {
            ...postData,
            imageUrl: "https://picsum.photos/400/300?random=1" // URL placeholder que funciona
        };

        const result = await apiService.create<CreatePostDto>(postsApi, postDataWithPlaceholder);
        return result;
    };

    // Función para actualizar post (primera petición)
    const updatePostWithoutImage = async (id: string, postData: Omit<CreatePostDto, 'imageUrl'>) => {
        // Si está editando y no hay imagen nueva, mantener la existente
        let imageUrl = selectedPost?.imageUrl || "https://picsum.photos/400/300?random=1";

        const updateData: CreatePostDto = {
            ...postData,
            imageUrl
        };

        const result = await apiService.update<CreatePostDto>(postsApi, id, updateData);
        return result;
    };

    // Función para subir imagen (segunda petición)
    const uploadImageToPost = async (postId: string, file: File) => {
        try {
            console.log("Subiendo imagen para post:", postId);
            const uploadResponse = await apiService.uploadPostImage(postId, file);
            console.log("Respuesta de upload:", uploadResponse);
            return uploadResponse;
        } catch (error) {
            console.error("Error al subir imagen:", error);
            throw error;
        }
    };

    // Manejar envío del formulario
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validaciones
        if (!title.trim()) {
            setMessage("El título es requerido");
            return;
        }

        if (!content.trim()) {
            setMessage("El contenido es requerido");
            return;
        }

        if (!authorId) {
            setMessage("El ID del autor es requerido");
            return;
        }

        if (!isValidUUID(authorId)) {
            setMessage("El ID del autor debe ser un UUID válido");
            return;
        }

        setLoading(true);
        setMessage("");

        try {
            const postData = {
                title: title.trim(),
                content: content.trim(),
                authorId: authorId,
            };

            let createdOrUpdatedPost;

            if (isEditing && specificId) {
                // ACTUALIZAR: Primera petición - actualizar post
                setMessage("Actualizando post...");
                createdOrUpdatedPost = await updatePostWithoutImage(specificId, postData);
            } else {
                // CREAR: Primera petición - crear post
                setMessage("Creando post...");
                createdOrUpdatedPost = await createPostWithoutImage(postData);
            }

            // Verificar que tenemos el post creado/actualizado
            if (!createdOrUpdatedPost) {
                throw new Error("No se pudo crear/actualizar el post");
            }

            // Obtener el ID del post (para crear es el ID del post creado, para actualizar es el specificId)
            const postId = isEditing ? specificId : createdOrUpdatedPost.id;

            if (!postId) {
                throw new Error("No se pudo obtener el ID del post");
            }

            // Segunda petición - subir imagen si existe
            if (imageFile) {
                setMessage("Subiendo imagen...");
                try {
                    await uploadImageToPost(postId, imageFile);
                    setMessage(isEditing ? "Post actualizado exitosamente con imagen" : "Post creado exitosamente con imagen");
                } catch (imageError) {
                    console.error("Error al subir imagen:", imageError);
                    setMessage(isEditing ? "Post actualizado, pero hubo un error al subir la imagen" : "Post creado, pero hubo un error al subir la imagen");
                }
            } else {
                setMessage(isEditing ? "Post actualizado exitosamente" : "Post creado exitosamente");
            }

            resetForm();

            // Recargar lista de posts
            await fetchPosts();

        } catch (error: any) {
            console.error("Error processing post:", error);
            setMessage(`Error: ${error.message || "Error al procesar el post"}`);
        } finally {
            setLoading(false);
        }
    };

    // Resetear formulario
    const resetForm = () => {
        setTitle("");
        setContent("");
        setImageFile(null);
        setImagePreview("");
        setIsEditing(false);
        setSelectedPost(null);
    };

    // Cancelar edición
    const handleCancelEdit = () => {
        resetForm();
        setMessage("");
    };

    // Editar post
    const handleEditPost = async (id: string) => {
        try {
            const post = await apiService.getById<Post>(postsApi, id);
            if (post) {
                setSelectedPost(post);
                setTitle(post.title);
                setContent(post.content);
                setImagePreview(post.imageUrl || "");
                setIsEditing(true);
            }
        } catch (error: any) {
            setMessage(`Error al cargar el post: ${error.message}`);
        }
    };

    // Eliminar post
    const handleDeletePost = async (id: string) => {
        if (window.confirm("¿Estás seguro de que quieres eliminar este post?")) {
            try {
                await apiService.delete(postsApi, id);
                setMessage("Post eliminado exitosamente");
                await fetchPosts();
            } catch (error: any) {
                setMessage(`Error al eliminar el post: ${error.message}`);
            }
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-start bg-gray-50 p-4">
            <div className="w-full max-w-6xl bg-white rounded-lg shadow-md flex flex-col justify-center items-center p-4 md:p-8 mb-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">
                    {isEditing ? "Editar Post" : "Crear Nuevo Post"}
                </h1>

                <form onSubmit={handleSubmit} className="w-full max-w-2xl">
                    {/* Campo título */}
                    <div className="flex flex-col justify-start w-full mb-6">
                        <label
                            htmlFor="title"
                            className="block font-medium text-gray-700 mb-2 text-lg md:text-xl lg:text-2xl"
                        >
                            Título <span className="text-sm text-red-500 font-normal">*</span>
                        </label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Ingresa el título del post"
                            className="w-full h-11 px-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                            disabled={loading}
                            maxLength={200}
                            required
                        />
                    </div>

                    {/* Campo contenido */}
                    <div className="flex flex-col justify-start w-full mb-6">
                        <label
                            htmlFor="content"
                            className="block font-medium text-gray-700 mb-2 text-lg md:text-xl lg:text-2xl"
                        >
                            Contenido <span className="text-sm text-red-500 font-normal">*</span>
                        </label>
                        <textarea
                            id="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Escribe el contenido del post"
                            className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-vertical"
                            disabled={loading}
                            maxLength={2000}
                            required
                        />
                    </div>

                    {/* Campo imagen */}
                    <div className="flex flex-col justify-start w-full mb-6">
                        <label
                            htmlFor="image"
                            className="block font-medium text-gray-700 mb-2 text-lg md:text-xl lg:text-2xl"
                        >
                            Imagen <span className="text-sm text-gray-500 font-normal">(opcional)</span>
                        </label>
                        <input
                            type="file"
                            id="image"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="w-full h-11 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                            disabled={loading}
                        />
                        {imagePreview && (
                            <div className="mt-3">
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="max-w-full h-48 object-cover rounded-md border border-gray-300"
                                />
                            </div>
                        )}
                    </div>

                    {/* Mensaje de estado */}
                    {message && (
                        <div
                            className={`w-full mb-4 p-3 rounded-md text-center ${
                                message.includes("Error") || message.includes("error")
                                    ? "bg-red-100 text-red-700 border border-red-300"
                                    : "bg-green-100 text-green-700 border border-green-300"
                            }`}
                        >
                            {message}
                        </div>
                    )}

                    {/* Información del ID cuando está editando */}
                    {isEditing && (
                        <div className="w-full mb-4 p-2 text-xs text-gray-500 text-center">
                            <br />
                            Editando ID: {specificId}
                        </div>
                    )}

                    {/* Botones */}
                    <div className="flex justify-center gap-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full max-w-md h-12 md:h-14 text-xl md:text-2xl lg:text-3xl text-white font-medium rounded-md bg-[#AF52DE] hover:bg-[#9e3cd4] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#AF52DE] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? "Procesando..." : (isEditing ? "Actualizar" : "Crear")}
                        </button>

                        {isEditing && (
                            <button
                                type="button"
                                onClick={handleCancelEdit}
                                className="w-full max-w-md h-12 md:h-14 text-xl md:text-2xl lg:text-3xl text-gray-700 font-medium rounded-md bg-gray-200 hover:bg-gray-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                            >
                                Cancelar
                            </button>
                        )}
                    </div>
                </form>
            </div>

            {/* Lista de Posts */}
            <div className="w-full max-w-6xl bg-white rounded-lg shadow-md p-4 md:p-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Posts Existentes</h2>

                {loading && posts.length === 0 && (
                    <div className="text-center py-4">
                        <p className="text-gray-500">Cargando posts...</p>
                    </div>
                )}

                {posts.length === 0 && !loading && (
                    <div className="text-center py-4">
                        <p className="text-gray-500">No hay posts disponibles</p>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {posts.map((post) => (
                        <div key={post.id} className="border border-gray-200 rounded-lg p-4">
                            <div className="mb-3">
                                {post.imageUrl && (
                                    <img
                                        src={post.imageUrl}
                                        alt={post.title}
                                        className="w-full h-48 object-cover rounded-md mb-3"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = "https://picsum.photos/400/300?random=2";
                                        }}
                                    />
                                )}
                                <h3 className="font-medium text-gray-800 truncate mb-2">
                                    {post.title}
                                </h3>
                                <p className="text-sm text-gray-600 line-clamp-3 mb-2">
                                    {post.content}
                                </p>
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleEditPost(post.id)}
                                    className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => handleDeletePost(post.id)}
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