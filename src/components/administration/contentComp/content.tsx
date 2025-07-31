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

            // Crear preview solo para la nueva imagen seleccionada
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            // Si no hay archivo seleccionado, limpiar preview
            setImageFile(null);
            setImagePreview("");
        }
    };

    // Validar UUID
    const isValidUUID = (str: string): boolean => {
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        return uuidRegex.test(str);
    };

    // Validar URL
    const isValidURL = (str: string): boolean => {
        try {
            new URL(str);
            return true;
        } catch {
            return false;
        }
    };

    // Función para crear post
    const createPost = async (postData: CreatePostDto) => {
        console.log("Creando post con datos:", postData);
        const result = await apiService.create<CreatePostDto>(postsApi, postData);
        console.log("Post creado:", result);
        return result;
    };

    // Función para actualizar post
    const updatePost = async (id: string, postData: UpdatePostDto) => {
        console.log("Actualizando post ID:", id, "con datos:", postData);
        const result = await apiService.update<UpdatePostDto>(postsApi, id, postData);
        console.log("Post actualizado:", result);
        return result;
    };

    // Función para subir imagen
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
            let result;
            let postId: string;

            if (isEditing && selectedPost) {
                // ACTUALIZAR POST EXISTENTE
                setMessage("Actualizando post...");

                const updateData: UpdatePostDto = {
                    title: title.trim(),
                    content: content.trim(),
                    authorId: authorId,
                };

                // Solo incluir imageUrl si hay una imagen existente válida
                if (selectedPost.imageUrl && isValidURL(selectedPost.imageUrl) && !imageFile) {
                    updateData.imageUrl = selectedPost.imageUrl;
                } else if (!imageFile) {
                    // Si no hay imagen nueva ni imagen existente válida, usar placeholder
                    updateData.imageUrl = `https://picsum.photos/400/300?random=${Date.now()}`;
                }
                // Si hay imageFile, no incluir imageUrl aquí, se actualizará después del upload

                console.log("Datos a enviar en actualización:", updateData);

                result = await updatePost(selectedPost.id, updateData);
                postId = selectedPost.id;

                console.log("Post actualizado exitosamente:", result);
            } else {
                // CREAR NUEVO POST
                setMessage("Creando post...");

                const createData: CreatePostDto = {
                    title: title.trim(),
                    content: content.trim(),
                    authorId: authorId,
                    imageUrl: `https://picsum.photos/400/300?random=${Date.now()}` // Placeholder único
                };

                result = await createPost(createData);
                postId = (result as Post).id;

                console.log("Post creado exitosamente:", result);
            }

            // Verificar que tenemos el ID del post
            if (!postId) {
                throw new Error("No se pudo obtener el ID del post");
            }

            // Subir imagen si existe
            if (imageFile) {
                setMessage(isEditing ? "Actualizando imagen..." : "Subiendo imagen...");
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

            // Limpiar formulario y recargar posts
            resetForm();
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
            setLoading(true);
            setMessage("Cargando post para editar...");

            const post = await apiService.getById<Post>(postsApi, id);

            if (post) {
                console.log("Post cargado para edición:", post);

                setSelectedPost(post);
                setTitle(post.title);
                setContent(post.content);
                setImagePreview(""); // Limpiar preview de nuevas imágenes
                setImageFile(null);
                setIsEditing(true);
                setMessage(""); // Limpiar mensaje de carga
            } else {
                setMessage("No se pudo cargar el post para editar");
            }
        } catch (error: any) {
            console.error("Error al cargar post para edición:", error);
            setMessage(`Error al cargar el post: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    // Eliminar post
    const handleDeletePost = async (id: string) => {
        if (window.confirm("¿Estás seguro de que quieres eliminar este post?")) {
            try {
                setLoading(true);
                await apiService.delete(postsApi, id);
                setMessage("Post eliminado exitosamente");
                await fetchPosts();
            } catch (error: any) {
                console.error("Error al eliminar post:", error);
                setMessage(`Error al eliminar el post: ${error.message}`);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-purple-100 via-white to-purple-100 p-6">
            <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl flex flex-col justify-center items-center p-8 md:p-10 mb-8 transform transition-all duration-300 hover:scale-[1.01]">
                <h1 className="text-3xl font-extrabold text-purple-800 mb-8 tracking-wide">
                    {isEditing ? "✨ Editar Publicación" : " Crear Nueva Publicación"}
                </h1>

                <form onSubmit={handleSubmit} className="w-full max-w-2xl space-y-7">
                    {/* Campo título */}
                    <div className="flex flex-col justify-start w-full">
                        <label
                            htmlFor="title"
                            className="block text-lg font-semibold text-gray-700 mb-2"
                        >
                            Título <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Un título pegadizo para tu publicación"
                            className="w-full h-12 px-4 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-3 focus:ring-purple-400 focus:border-transparent transition-all duration-200"
                            disabled={loading}
                            maxLength={200}
                            required
                        />
                    </div>

                    {/* Campo contenido */}
                    <div className="flex flex-col justify-start w-full">
                        <label
                            htmlFor="content"
                            className="block text-lg font-semibold text-gray-700 mb-2"
                        >
                            Contenido <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            id="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Desarrolla tu idea aquí..."
                            className="w-full h-40 px-4 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-3 focus:ring-purple-400 focus:border-transparent resize-y transition-all duration-200"
                            disabled={loading}
                            maxLength={2000}
                            required
                        />
                    </div>

                    {/* Campo imagen */}
                    <div className="flex flex-col justify-start w-full">
                        <label
                            htmlFor="image"
                            className="block text-lg font-semibold text-gray-700 mb-2"
                        >
                            Imagen <span className="text-gray-500 text-base font-normal">(opcional)</span>
                        </label>
                        <input
                            type="file"
                            id="image"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="w-full h-12 px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-3 focus:ring-purple-400 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                            disabled={loading}
                        />

                        {/* Preview solo para imágenes nuevas seleccionadas */}
                        {imagePreview && (
                            <div className="mt-5 text-center">
                                <p className="text-md text-gray-600 mb-3 font-medium">Vista previa de la nueva imagen:</p>
                                <img
                                    src={imagePreview}
                                    alt="Preview de nueva imagen"
                                    className="max-w-full h-56 object-cover rounded-lg border-2 border-purple-300 mx-auto"
                                />
                            </div>
                        )}

                        {/* Mostrar imagen actual solo cuando está editando y no hay nueva imagen */}
                        {isEditing && selectedPost?.imageUrl && !imagePreview && (
                            <div className="mt-5 text-center">
                                <p className="text-md text-gray-600 mb-3 font-medium">Imagen actual del post:</p>
                                <img
                                    src={selectedPost.imageUrl}
                                    alt="Imagen actual del post"
                                    className="max-w-full h-56 object-cover rounded-lg border-2 border-gray-300 opacity-90 mx-auto"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = "https://picsum.photos/400/300?random=2";
                                    }}
                                />
                                <p className="text-sm text-gray-500 mt-2">
                                    Selecciona una nueva imagen para reemplazar la actual.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Mensaje de estado */}
                    {message && (
                        <div
                            className={`w-full text-center p-4 rounded-lg text-lg font-medium transition-all duration-300 ${
                                message.includes("Error") || message.includes("error")
                                    ? "bg-red-100 text-red-700 border border-red-300"
                                    : "bg-green-100 text-green-700 border border-green-300"
                            }`}
                        >
                            {message}
                        </div>
                    )}

                    {/* Información del ID cuando está editando */}
                    {isEditing && selectedPost && (
                        <div className="w-full p-4 bg-blue-50 border border-blue-200 rounded-lg text-blue-800">
                            <p className="text-base font-semibold">
                                Editando publicación: <span className="font-normal text-blue-700">{selectedPost.id}</span>
                            </p>
                            <p className="text-sm text-blue-600 mt-1">
                                Creado: {selectedPost.createdAt ? new Date(selectedPost.createdAt).toLocaleString() : 'N/A'}
                            </p>
                        </div>
                    )}

                    {/* Botones */}
                    <div className="flex flex-col sm:flex-row justify-center gap-5 pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full sm:w-auto flex-1 h-14 px-8 text-xl text-white font-bold rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-purple-300 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
                        >
                            {loading ? "Procesando..." : (isEditing ? "Actualizar Publicación" : "Crear Publicación")}
                        </button>

                        {isEditing && (
                            <button
                                type="button"
                                onClick={handleCancelEdit}
                                className="w-full sm:w-auto flex-1 h-14 px-8 text-xl text-gray-800 font-bold rounded-full bg-gray-200 hover:bg-gray-300 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-gray-300 focus:ring-offset-2 transform hover:scale-105"
                            >
                                Cancelar
                            </button>
                        )}
                    </div>
                </form>
            </div>

            {/* Lista de Posts */}
            <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl p-8 md:p-10">
                <h2 className="text-3xl font-extrabold text-purple-800 mb-8 text-center">
                     Publicaciones Existentes
                </h2>

                {loading && posts.length === 0 && (
                    <div className="text-center py-10">
                        <div className="inline-block animate-spin rounded-full h-10 w-10 border-b-4 border-purple-500"></div>
                        <p className="text-gray-600 mt-4 text-lg">Cargando publicaciones...</p>
                    </div>
                )}

                {posts.length === 0 && !loading && (
                    <div className="text-center py-10">
                        <p className="text-gray-500 text-xl font-medium">¡Aún no hay publicaciones para mostrar! Crea una nueva.</p>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {posts.map((post) => (
                        <div key={post.id} className="relative border border-gray-200 rounded-xl p-5 bg-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group">
                            <div className="mb-4">
                                {post.imageUrl && (
                                    <img
                                        src={post.imageUrl}
                                        alt={post.title}
                                        className="w-full h-56 object-cover rounded-lg mb-4 border border-gray-200"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = "https://picsum.photos/400/300?random=2";
                                        }}
                                    />
                                )}
                                <h3 className="font-semibold text-xl text-gray-900 truncate mb-2" title={post.title}>
                                    {post.title}
                                </h3>
                                <p className="text-sm text-gray-700 line-clamp-4 mb-4">
                                    {post.content}
                                </p>


                            </div>

                            <div className="flex gap-3 mt-6">
                                <button
                                    onClick={() => handleEditPost(post.id)}
                                    disabled={loading}
                                    className="flex-1 px-4 py-2 text-md bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                                >
                                    {loading && selectedPost?.id === post.id ? "..." : "Editar"}
                                </button>
                                <button
                                    onClick={() => handleDeletePost(post.id)}
                                    disabled={loading}
                                    className="flex-1 px-4 py-2 text-md bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                                >
                                    {loading && selectedPost?.id === post.id ? "..." : "Eliminar"}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}