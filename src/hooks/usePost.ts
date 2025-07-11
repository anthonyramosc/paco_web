import { useState, useCallback } from 'react';
import apiService from "../service/apiService.ts";
import { postsApi } from '../constants/EndpointsRoutes';

// Tipos para el hook
interface Post {
    id: string;
    title?: string;
    content?: string;
    imageUrl?: string;
    createdAt?: string;
    updatedAt?: string;
}

interface UpdatePostData {
    title?: string;
    content?: string;
    imageUrl?: string;
}

interface UsePostsReturn {
    // Estados
    posts: Post[];
    loading: boolean;
    updating: boolean;
    uploadingImage: boolean;
    error: string | null;

    // Métodos
    getPosts: () => Promise<Post[] | null>;
    getPostById: (id: string) => Promise<Post | null>;
    createPost: (data: UpdatePostData) => Promise<Post | null>;
    updatePost: (id: string, data: UpdatePostData) => Promise<Post | null>;
    deletePost: (id: string) => Promise<boolean>;
    uploadPostImage: (postId: string, file: File) => Promise<string | null>;
    clearError: () => void;
}

export const usePosts = (): UsePostsReturn => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(false);
    const [updating, setUpdating] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Limpiar errores
    const clearError = useCallback(() => {
        setError(null);
    }, []);

    // Obtener todos los posts
    const getPosts = useCallback(async (): Promise<Post[] | null> => {
        try {
            setLoading(true);
            setError(null);

            const response = await apiService.getAll<Post[]>(postsApi);
            setPosts(response);
            return response;
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || err.message || 'Error al obtener los posts';
            setError(errorMessage);
            console.error('Error getting posts:', err);
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    // Obtener post por ID
    const getPostById = useCallback(async (id: string): Promise<Post | null> => {
        try {
            setLoading(true);
            setError(null);

            const response = await apiService.getById<Post>(postsApi, id);
            return response;
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || err.message || 'Error al obtener el post';
            setError(errorMessage);
            console.error('Error getting post by id:', err);
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    // Crear nuevo post
    const createPost = useCallback(async (data: UpdatePostData): Promise<Post | null> => {
        try {
            setUpdating(true);
            setError(null);

            const response = await apiService.create<UpdatePostData>(postsApi, data);

            // Actualizar lista de posts localmente
            setPosts(prev => [response as Post, ...prev]);

            return response as Post;
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || err.message || 'Error al crear el post';
            setError(errorMessage);
            console.error('Error creating post:', err);
            return null;
        } finally {
            setUpdating(false);
        }
    }, []);

    // Actualizar post existente
    const updatePost = useCallback(async (id: string, data: UpdatePostData): Promise<Post | null> => {
        try {
            setUpdating(true);
            setError(null);

            console.log('Actualizando post con datos:', data);

            const response = await apiService.update<UpdatePostData>(postsApi, id, data);

            console.log('Respuesta del servidor al actualizar post:', response);

            // Actualizar lista de posts localmente
            setPosts(prev => prev.map(post =>
                post.id === id ? { ...post, ...response } : post
            ));

            return response as Post;
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || err.message || 'Error al actualizar el post';
            setError(errorMessage);
            console.error('Error updating post:', err);
            return null;
        } finally {
            setUpdating(false);
        }
    }, []);

    // Eliminar post
    const deletePost = useCallback(async (id: string): Promise<boolean> => {
        try {
            setLoading(true);
            setError(null);

            await apiService.delete(postsApi, id);

            // Actualizar lista de posts localmente
            setPosts(prev => prev.filter(post => post.id !== id));

            return true;
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || err.message || 'Error al eliminar el post';
            setError(errorMessage);
            console.error('Error deleting post:', err);
            return false;
        } finally {
            setLoading(false);
        }
    }, []);

    // Subir imagen para un post (usando el endpoint específico)
    const uploadPostImage = useCallback(async (postId: string, file: File): Promise<string | null> => {
        try {
            setUploadingImage(true);
            setError(null);

            console.log('Iniciando upload de imagen para post:', postId);
            console.log('Archivo:', {
                name: file.name,
                size: file.size,
                type: file.type
            });

            // Usar el método específico para subir imagen de post
            const response = await apiService.uploadPostImage(postId, file);

            console.log('Respuesta del servidor (upload imagen):', response);

            // Según tu controller, la respuesta tiene esta estructura:
            // {
            //   success: true,
            //   message: "Imagen de post actualizada exitosamente",
            //   data: {
            //     url: imageUrl,
            //     filename: file.filename,
            //     originalName: file.originalname,
            //     size: file.size,
            //     mimetype: file.mimetype,
            //   },
            // }

            let imageUrl = null;

            if (response.success && response.data) {
                imageUrl = response.data.url;
            } else {
                // Fallback para otras posibles estructuras de respuesta
                imageUrl = response.url || response.imageUrl || response.data?.url || response.data?.imageUrl;
            }

            if (!imageUrl) {
                throw new Error('No se recibió URL de la imagen del servidor');
            }

            console.log('URL de imagen obtenida:', imageUrl);

            return imageUrl;
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || err.message || 'Error al subir la imagen';
            setError(errorMessage);
            console.error('Error uploading image:', err);
            console.error('Error details:', {
                status: err.response?.status,
                data: err.response?.data,
                config: err.config
            });
            return null;
        } finally {
            setUploadingImage(false);
        }
    }, []);

    return {
        // Estados
        posts,
        loading,
        updating,
        uploadingImage,
        error,

        // Métodos
        getPosts,
        getPostById,
        createPost,
        updatePost,
        deletePost,
        uploadPostImage,
        clearError,
    };
};