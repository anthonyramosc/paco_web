import { useCallback, useState } from "react";
import apiService from "../service/apiService";
import { tikTokVideosApi } from "../constants/EndpointsRoutes";
import type { TikTok, CreateTikTokVideoDto, UpdateTikTokVideoDto } from "../interfaces/TikTok";

interface UseTikTokReturn {
    tiktoks: TikTok[];
    loading: boolean;
    error: string | null;
    fetchTiktoks: () => Promise<void>;
    getTiktokById: (id: string) => Promise<TikTok | null>;
    createTiktok: (data: CreateTikTokVideoDto) => Promise<TikTok | null>;
    updateTiktok: (id: string, data: UpdateTikTokVideoDto) => Promise<TikTok | null>;
    deleteTiktok: (id: string) => Promise<boolean>;
}

const useTiktok = (): UseTikTokReturn => {
    const [tiktoks, setTiktoks] = useState<TikTok[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Obtener todos los TikToks
    const fetchTiktoks = useCallback(async (): Promise<void> => {
        setLoading(true);
        setError(null);
        try {
            const response = await apiService.getAll<TikTok[]>(tikTokVideosApi);
            setTiktoks(response);
        } catch (err: any) {
            setError(err.message || "Error al obtener los TikToks");
            console.error("Error fetching TikToks:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    // Obtener un TikTok por ID
    const getTiktokById = useCallback(async (id: string): Promise<TikTok | null> => {
        setLoading(true);
        setError(null);
        try {
            const response = await apiService.getById<TikTok>(tikTokVideosApi, id);
            return response;
        } catch (err: any) {
            setError(err.message || "Error al obtener el TikTok");
            console.error("Error fetching TikTok by ID:", err);
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    // Crear un nuevo TikTok
    const createTiktok = useCallback(async (data: CreateTikTokVideoDto): Promise<TikTok | null> => {
        setLoading(true);
        setError(null);
        try {
            const response = await apiService.create<CreateTikTokVideoDto>(tikTokVideosApi, data);
            // Actualizar la lista local
            await fetchTiktoks();
            return response as TikTok;
        } catch (err: any) {
            setError(err.message || "Error al crear el TikTok");
            console.error("Error creating TikTok:", err);
            return null;
        } finally {
            setLoading(false);
        }
    }, [fetchTiktoks]);

    // Actualizar un TikTok existente
    const updateTiktok = useCallback(async (id: string, data: UpdateTikTokVideoDto): Promise<TikTok | null> => {
        setLoading(true);
        setError(null);
        try {
            const response = await apiService.update<UpdateTikTokVideoDto>(tikTokVideosApi, id, data);
            // Actualizar la lista local
            await fetchTiktoks();
            return response as TikTok;
        } catch (err: any) {
            setError(err.message || "Error al actualizar el TikTok");
            console.error("Error updating TikTok:", err);
            return null;
        } finally {
            setLoading(false);
        }
    }, [fetchTiktoks]);

    // Eliminar un TikTok
    const deleteTiktok = useCallback(async (id: string): Promise<boolean> => {
        setLoading(true);
        setError(null);
        try {
            await apiService.delete(tikTokVideosApi, id);
            // Actualizar la lista local
            await fetchTiktoks();
            return true;
        } catch (err: any) {
            setError(err.message || "Error al eliminar el TikTok");
            console.error("Error deleting TikTok:", err);
            return false;
        } finally {
            setLoading(false);
        }
    }, [fetchTiktoks]);

    return {
        tiktoks,
        loading,
        error,
        fetchTiktoks,
        getTiktokById,
        createTiktok,
        updateTiktok,
        deleteTiktok
    };
};

export default useTiktok;