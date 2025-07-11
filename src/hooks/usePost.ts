import { useState, useEffect, useCallback } from 'react';
import apiService from '../service/apiService';
import { postsApi } from "../constants/EndpointsRoutes";

export interface Post {
    id: string;
    title: string;
    content: string;
    imageUrl: string;
}

export interface CreatePostData {
    title: string;
    content: string;
    imageUrl: string;
}

export interface UpdatePostData {
    title?: string;
    content?: string;
    imageUrl?: string;
}

export const usePosts = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [creating, setCreating] = useState(false);
    const [updating, setUpdating] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);

    // Función para obtener todos los posts
    const fetchPosts = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await apiService.getAll<Post[]>(postsApi);
            setPosts(response);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Error al cargar los posts');
            console.error('Error fetching posts:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    // Función para crear un nuevo post
    const createPost = useCallback(async (postData: CreatePostData): Promise<Post | null> => {
        setCreating(true);
        setError(null);
        try {
            const postsData = {
                title: postData.title,
                content: postData.content,
                imageUrl: postData.imageUrl,
            }

            const newPost = await apiService.create<Post>(postsApi, postsData);

            // Actualizar el estado local
            setPosts(prev => [newPost, ...prev]);
            return newPost;
        } catch (err: any) {
            setError(err.response?.data?.message || 'Error al crear el post');
            console.error('Error creating post:', err);
            return null;
        } finally {
            setCreating(false);
        }
    }, []);

    // Función para actualizar un post
    const updatePost = useCallback(async (id: string, updateData: UpdatePostData): Promise<Post | null> => {
        setUpdating(true);
        setError(null);
        try {
            const updatedPost = await apiService.update<Post>(postsApi, id, updateData);

            // Actualizar el estado local
            setPosts(prev => prev.map(post =>
                post.id === id ? { ...post, ...updatedPost } : post
            ));
            return updatedPost;
        } catch (err: any) {
            setError(err.response?.data?.message || 'Error al actualizar el post');
            console.error('Error updating post:', err);
            return null;
        } finally {
            setUpdating(false);
        }
    }, []);

    // Función para eliminar un post
    const deletePost = useCallback(async (id: string): Promise<boolean> => {
        setDeleting(true);
        setError(null);
        try {
            await apiService.delete(postsApi, id);

            // Actualizar el estado local
            setPosts(prev => prev.filter(post => post.id !== id));
            return true;
        } catch (err: any) {
            setError(err.response?.data?.message || 'Error al eliminar el post');
            console.error('Error deleting post:', err);
            return false;
        } finally {
            setDeleting(false);
        }
    }, []);

    // Función para subir imagen genérica
    const uploadImage = useCallback(async (file: File): Promise<string | null> => {
        setUploadingImage(true);
        setError(null);
        try {
            const response = await apiService.uploadImage(file);
            return response.url || response.data?.url;
        } catch (err: any) {
            setError(err.response?.data?.message || 'Error al subir la imagen');
            console.error('Error uploading image:', err);
            return null;
        } finally {
            setUploadingImage(false);
        }
    }, []);

    // Función para subir imagen de post específico
    const uploadPostImage = useCallback(async (postId: string, file: File): Promise<string | null> => {
        setUploadingImage(true);
        setError(null);
        try {
            const response = await apiService.uploadPostImage(postId, file);
            const imageUrl = response.url || response.data?.url;

            // Actualizar el post en el estado local
            setPosts(prev => prev.map(post =>
                post.id === postId ? { ...post, imageUrl } : post
            ));

            return imageUrl;
        } catch (err: any) {
            setError(err.response?.data?.message || 'Error al subir la imagen del post');
            console.error('Error uploading post image:', err);
            return null;
        } finally {
            setUploadingImage(false);
        }
    }, []);

    // Función para eliminar imagen
    const deleteImage = useCallback(async (filename: string): Promise<boolean> => {
        setError(null);
        try {
            await apiService.deleteImage(filename);
            return true;
        } catch (err: any) {
            setError(err.response?.data?.message || 'Error al eliminar la imagen');
            console.error('Error deleting image:', err);
            return false;
        }
    }, []);

    // Función para crear post con imagen
    const createPostWithImage = useCallback(async (
        postData: CreatePostData,
        imageFile?: File
    ): Promise<Post | null> => {
        setCreating(true);
        setError(null);

        let imageUrl = postData.imageUrl;

        try {
            // Si hay archivo de imagen, subirla primero
            if (imageFile) {
                setUploadingImage(true);
                const uploadedImageUrl = await uploadImage(imageFile);
                if (!uploadedImageUrl) {
                    throw new Error('Error al subir la imagen');
                }
                imageUrl = uploadedImageUrl;
                setUploadingImage(false);
            }

            // Crear el post con la URL de la imagen
            const newPost = await apiService.create<Post>(postsApi, {
                ...postData,
                imageUrl,
               });

            // Actualizar el estado local
            setPosts(prev => [newPost, ...prev]);
            return newPost;

        } catch (err: any) {
            setError(err.response?.data?.message || 'Error al crear el post con imagen');
            console.error('Error creating post with image:', err);
            return null;
        } finally {
            setCreating(false);
            setUploadingImage(false);
        }
    }, [uploadImage]);

    // Función para actualizar post con imagen
    const updatePostWithImage = useCallback(async (
        id: string,
        updateData: UpdatePostData,
        imageFile?: File
    ): Promise<Post | null> => {
        setUpdating(true);
        setError(null);

        let imageUrl = updateData.imageUrl;

        try {
            // Si hay archivo de imagen, subirla usando el endpoint específico del post
            if (imageFile) {
                setUploadingImage(true);
                const uploadedImageUrl = await uploadPostImage(id, imageFile);
                if (!uploadedImageUrl) {
                    throw new Error('Error al subir la imagen');
                }
                imageUrl = uploadedImageUrl;
                setUploadingImage(false);
            }

            // Actualizar el post
            const updatedPost = await apiService.update<Post>(postsApi, id, {
                ...updateData,
                imageUrl
            });

            // Actualizar el estado local
            setPosts(prev => prev.map(post =>
                post.id === id ? { ...post, ...updatedPost } : post
            ));

            return updatedPost;

        } catch (err: any) {
            setError(err.response?.data?.message || 'Error al actualizar el post con imagen');
            console.error('Error updating post with image:', err);
            return null;
        } finally {
            setUpdating(false);
            setUploadingImage(false);
        }
    }, [uploadPostImage]);

    // Función para obtener un post por ID
    const getPostById = useCallback((id: string): Post | undefined => {
        return posts.find(post => post.id === id);
    }, [posts]);

    // Función para filtrar posts por tags
    const getPostsByTag = useCallback((tag: string): Post[] => {
        return posts.filter(post => post.tags.includes(tag));
    }, [posts]);

    // Función para limpiar errores
    const clearError = useCallback(() => {
        setError(null);
    }, []);

    // Cargar posts al inicializar el hook
    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    return {
        // Estado
        posts,
        loading,
        error,
        creating,
        updating,
        deleting,
        uploadingImage,

        // Funciones CRUD
        fetchPosts,
        createPost,
        updatePost,
        deletePost,

        // Funciones de imágenes
        uploadImage,
        uploadPostImage,
        deleteImage,

        // Funciones combinadas
        createPostWithImage,
        updatePostWithImage,

        // Funciones de utilidad
        getPostById,
        getPostsByTag,
        clearError,

        // Estado de carga específico
        isLoading: loading || creating || updating || deleting || uploadingImage
    };
};