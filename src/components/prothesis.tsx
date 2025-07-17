import { useState, useEffect, useCallback } from 'react';
import { usePosts } from '../hooks/usePost';
import type { Post } from '../interfaces/Post';

const NewsSection = () => {
    const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
    const [visibleNewsCount, setVisibleNewsCount] = useState(3);
    const [expandedArticle, setExpandedArticle] = useState<string | null>(null);
    const [isMobile, setIsMobile] = useState(false);

    // Usar el hook personalizado
    const { posts, loading, error, getPosts } = usePosts();

    // Transformar los posts de la API al formato esperado por el componente
    const transformPostsToNewsItems = useCallback((apiPosts: Post[]) => {
        return apiPosts.map((post, index) => ({
            id: post.id,
            title: post.title,
            content: post.content.substring(0, 150) + (post.content.length > 150 ? '...' : ''),
            fullContent: post.content,
            date: post.createdAt ? new Date(post.createdAt).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }) : new Date().toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }),
            readTime: `${Math.ceil(post.content.split(' ').length / 200)} min`,
            image: post.imageUrl || `https://picsum.photos/400/300?random=${index + 1}`
        }));
    }, []);

    const newsItems = transformPostsToNewsItems(posts);

    // Función para determinar si es móvil
    const checkIsMobile = useCallback(() => {
        return window.innerWidth < 768;
    }, []);

    // Función para calcular el número de elementos visibles
    const calculateVisibleCount = useCallback(() => {
        const mobile = checkIsMobile();
        setIsMobile(mobile);

        if (mobile) {
            return 1;
        } else {
            // En escritorio, mostrar 2 elementos si hay al menos 2
            return Math.min(2, newsItems.length);
        }
    }, [newsItems.length, checkIsMobile]);

    // Cargar posts al montar el componente
    useEffect(() => {
        getPosts();
    }, [getPosts]);

    // Manejar cambios de tamaño de pantalla
    useEffect(() => {
        const handleResize = () => {
            const newVisibleCount = calculateVisibleCount();
            setVisibleNewsCount(newVisibleCount);
        };

        // Ejecutar al montar y en cada cambio de tamaño
        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [calculateVisibleCount]);

    const nextNews = () => {
        if (currentNewsIndex < newsItems.length - visibleNewsCount) {
            setCurrentNewsIndex(currentNewsIndex + 1);
        } else {
            setCurrentNewsIndex(0);
        }
    };

    const prevNews = () => {
        if (currentNewsIndex > 0) {
            setCurrentNewsIndex(currentNewsIndex - 1);
        } else {
            setCurrentNewsIndex(Math.max(0, newsItems.length - visibleNewsCount));
        }
    };

    const getVisibleNews = () => {
        if (newsItems.length === 0) return [];

        const result = [];
        const startIndex = Math.min(currentNewsIndex, Math.max(0, newsItems.length - visibleNewsCount));

        for (let i = 0; i < visibleNewsCount && i < newsItems.length; i++) {
            const index = (startIndex + i) % newsItems.length;
            if (newsItems[index]) {
                result.push(newsItems[index]);
            }
        }
        return result;
    };

    const visibleNews = getVisibleNews();

    const toggleExpandArticle = (id: string) => {
        setExpandedArticle(expandedArticle === id ? null : id);
    };

    // Función para refrescar los posts
    const handleRefresh = async () => {
        await getPosts();
    };

    // Verificar si debemos mostrar controles de navegación
    const shouldShowNavigation = newsItems.length > visibleNewsCount;

    return (
        <div className="bg-white py-8">
            <div className="container mx-auto px-4 md:px-6 flex flex-col">

                <div className="flex flex-col mb-6 w-full md:w-6/7 px-2 md:px-22">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl md:text-2xl font-bold text-[#785D99]">
                            Superando Límites
                        </h2>
                        <button
                            onClick={handleRefresh}
                            disabled={loading}
                            className="px-3 py-1 text-sm bg-[#785D99] text-white rounded hover:bg-[#59277A] transition-colors disabled:opacity-50"
                        >
                            {loading ? 'Cargando...' : 'Actualizar'}
                        </button>
                    </div>
                    <div className="w-full h-1 bg-purple-500 mb-4 md:mb-6" style={{backgroundColor:"#785D99"}}></div>

                    {/* Mostrar error si existe */}
                    {error && (
                        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                            <p className="text-sm">{error}</p>
                        </div>
                    )}
                </div>

                <div className="flex justify-center items-center">
                    {loading && posts.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#785D99]"></div>
                            <p className="mt-4 text-gray-500">Cargando posts...</p>
                        </div>
                    ) : newsItems.length > 0 ? (
                        <div className="w-full md:w-6/7 flex flex-col justify-center items-center">
                            <div className={`grid gap-4 md:gap-8 w-full ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
                                {visibleNews.map((newsItem) => (
                                    <div key={newsItem.id} className="bg-white rounded-lg overflow-hidden shadow border border-gray-200">
                                        <div className="relative">
                                            <img
                                                src={newsItem.image}
                                                alt={newsItem.title}
                                                className="w-full h-48 md:h-80 object-cover"
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).src = `https://picsum.photos/400/300?random=${Math.floor(Math.random() * 1000)}`;
                                                }}
                                            />
                                        </div>

                                        <div className="p-3 md:p-4">
                                            <h3 className="text-base md:text-lg font-bold mb-2">{newsItem.title}</h3>
                                            <p className="text-gray-600 text-xs md:text-sm mb-3 md:mb-4">
                                                {expandedArticle === newsItem.id ? newsItem.fullContent : newsItem.content}
                                            </p>

                                            <div className="flex items-center text-[#785D99] text-xs md:text-sm">
                                                <svg className="w-3 h-3 md:w-4 md:h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                                </svg>
                                                <span>{newsItem.date}</span>
                                                <span className="mx-2">•</span>
                                                <span>{newsItem.readTime}</span>
                                            </div>

                                            <div className="flex justify-between items-center mt-3">
                                                <button
                                                    className="text-gray-500 hover:text-gray-700 text-xs md:text-sm flex items-center"
                                                    onClick={() => {
                                                        if (navigator.share) {
                                                            navigator.share({
                                                                title: newsItem.title,
                                                                text: newsItem.content,
                                                                url: "http://pacoelmorlaco.com/"
                                                            });
                                                        }
                                                    }}
                                                >
                                                    <svg className="w-3 h-3 md:w-4 md:h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path>
                                                    </svg>
                                                    Compartir
                                                </button>

                                                <button
                                                    className="text-white px-3 py-1 md:px-4 md:py-1 rounded-full text-xs md:text-sm flex items-center"
                                                    style={{backgroundColor:"#785D99"}}
                                                    onClick={() => toggleExpandArticle(newsItem.id)}
                                                >
                                                    {expandedArticle === newsItem.id ? 'Colapsar' : 'Seguir leyendo'}
                                                    <svg
                                                        className={`w-3 h-3 md:w-4 md:h-4 ml-1 transform transition-transform ${expandedArticle === newsItem.id ? 'rotate-90' : ''}`}
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {shouldShowNavigation && (
                                <div className="flex justify-center mt-4 md:mt-6 space-x-3 md:space-x-4">
                                    <button
                                        onClick={prevNews}
                                        className="bg-gray-200 hover:bg-gray-300 text-gray-700 p-1 md:p-2 rounded-full transition-colors"
                                        aria-label="Anterior"
                                    >
                                        <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                                        </svg>
                                    </button>

                                    <div className="flex items-center space-x-1 md:space-x-2">
                                        {Array.from({ length: Math.max(1, Math.ceil(newsItems.length / Math.max(1, visibleNewsCount))) }).map((_, index) => {
                                            const totalPages = Math.ceil(newsItems.length / Math.max(1, visibleNewsCount));
                                            const currentPage = Math.floor(currentNewsIndex / Math.max(1, visibleNewsCount));
                                            const isActive = currentPage === index;
                                            return (
                                                <div
                                                    key={index}
                                                    className={`h-2 md:h-3 rounded-full transition-all ${
                                                        isActive ? 'bg-[#785D99] w-4 md:w-6' : 'bg-gray-300 w-2 md:w-3'
                                                    }`}
                                                />
                                            );
                                        })}
                                    </div>

                                    <button
                                        onClick={nextNews}
                                        className="bg-gray-200 hover:bg-gray-300 text-gray-700 p-1 md:p-2 rounded-full transition-colors"
                                        aria-label="Siguiente"
                                    >
                                        <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                                        </svg>
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl shadow-lg p-4 md:p-8 text-center border border-red-200 w-full md:w-auto">
                            <svg className="w-12 h-12 md:w-16 md:h-16 text-red-400 mx-auto mb-3 md:mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <p className="text-gray-500 text-base md:text-lg">No hay posts disponibles.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NewsSection;