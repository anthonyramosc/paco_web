import { useState, useEffect } from 'react';

const NewsSection = () => {
    const [activeNewsFilter, setActiveNewsFilter] = useState('TESTIMONIOS');
    const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
    const [visibleNewsCount, setVisibleNewsCount] = useState(3);
    const [expandedArticle, setExpandedArticle] = useState(null);

    // News data array
    const newsItems = [
        {
            id: 1,
            title: "Embajadores de VisitaEcuador revelan rutas secretas de la Amazonía",
            content: "Tres destacados aventureros comparten experiencias transformadoras en destinos poco explorados del oriente ecuatoriano, destacando el turismo sostenible y el contacto directo con comunidades indígenas como experiencias imperdibles.",
            fullContent: "Los guías profesionales Andrés Córdova, Lucía Vega y Santiago Pinos, presentaron sus experiencias en la Amazonía ecuatoriana durante el evento 'Rutas del Profundo' en el Centro de Convenciones Metropolitano. Los tres aventureros documentaron durante tres meses rutas poco conocidas en Sucumbíos, Cuyabeno y Pastaza, interactuando con guías locales y comunidades indígenas. 'Lo que descubrimos es mucho más allá del turismo tradicional de la selva. Son experiencias que conectan al visitante con saberes ancestrales y una biodiversidad asombrosa'. Entre los hallazgos destacan la 'Ruta de las Cascadas Sagradas' en Timbián Alto, el avistamiento de fauna nocturna de jaguares en la Reserva Limoncocha, y las expediciones río abajo por los tributarios menos explorados del río Napo. Vega destaca que compartieron más de 300 especies de aves, algunas raramente vistas por turistas convencionales.",
            date: "26 de febrero de 2024",
            readTime: "5 min",
            tags: ["TESTIMONIOS"],
            image: "https://test.tryclicksolutions.com/wp-content/uploads/2024/11/328074845_907657527106548_5780452344093047139_n.jpeg"
        },
        {
            id: 2,
            title: "Descubre los senderos ocultos de la Sierra ecuatoriana",
            content: "Nuevas rutas de montaña revelan paisajes impresionantes en los Andes ecuatorianos, con opciones para diversos niveles de experiencia.",
            fullContent: "Un grupo de montañistas ha documentado más de 15 nuevas rutas en la Sierra ecuatoriana que no aparecen en las guías turísticas tradicionales. Estas rutas ofrecen vistas panorámicas excepcionales, contacto con comunidades locales y experiencias auténticas alejadas del turismo masivo. Desde caminatas sencillas hasta ascensos técnicos, hay opciones para todos los niveles.",
            date: "22 de febrero de 2024",
            readTime: "4 min",
            tags: ["TESTIMONIOS", "EXPERIENCIAS"],
            image: "/api/placeholder/400/250?text=Sierra"
        },
        {
            id: 3,
            title: "Comunidades costeras preservan manglares centenarios",
            content: "Iniciativas locales en Esmeraldas y Manabí están recuperando extensas áreas de manglar, vitales para el ecosistema costero y la economía local.",
            fullContent: "Las comunidades pesqueras de San Lorenzo y Pedernales han logrado recuperar más de 2,000 hectáreas de manglar en los últimos cinco años. Este ecosistema no solo protege la costa de la erosión y los efectos del cambio climático, sino que también es fundamental para la reproducción de especies marinas comerciales. El proyecto ha incrementado en un 40% la captura sostenible de cangrejo rojo y conchas, mejorando significativamente la economía local.",
            date: "18 de febrero de 2024",
            readTime: "6 min",
            tags: ["TESTIMONIOS", "CONSERVACIÓN"],
            image: "/api/placeholder/400/250?text=Manglares"
        },
        {
            id: 4,
            title: "Festival de las Orquídeas celebra su décima edición",
            content: "Cuenca se engalana con la exhibición de más de 500 especies de orquídeas nativas, atrayendo a botánicos y turistas de todo el mundo.",
            fullContent: "La décima edición del Festival Internacional de las Orquídeas reúne este año a especialistas de 12 países y exhibe más de 500 especies nativas ecuatorianas, varias de ellas en peligro de extinción. El evento incluye talleres de conservación, exposiciones fotográficas y recorridos guiados por los viveros más importantes de la región. Ecuador, que alberga más de 4,200 especies de orquídeas, refuerza con este festival su posición como uno de los países con mayor diversidad de estas plantas en el mundo.",
            date: "10 de febrero de 2024",
            readTime: "3 min",
            tags: ["EVENTOS", "EXPERIENCIAS"],
            image: "/api/placeholder/400/250?text=Orquídeas"
        },
        {
            id: 5,
            title: "Nuevas tendencias en ecoturismo transforman la industria",
            content: "El turismo regenerativo gana terreno en Ecuador, con propuestas que no solo minimizan el impacto ambiental sino que contribuyen activamente a la restauración de ecosistemas.",
            fullContent: "Operadores turísticos ecuatorianos están adoptando el modelo de turismo regenerativo, que va más allá del ecoturismo tradicional al incluir actividades que contribuyen a la restauración de ecosistemas degradados. Los visitantes participan en proyectos de reforestación, monitoreo de especies amenazadas y apoyo a iniciativas comunitarias sostenibles. Esta tendencia, que está creciendo un 25% anualmente, está transformando la forma en que los viajeros experimentan destinos como Galápagos, la Amazonía y los páramos andinos.",
            date: "5 de febrero de 2024",
            readTime: "5 min",
            tags: ["TENDENCIAS", "CONSERVACIÓN"],
            image: "/api/placeholder/400/250?text=Ecoturismo"
        },
        {
            id: 6,
            title: "Gastronomía ancestral gana reconocimiento internacional",
            content: "Técnicas de cocina indígena y productos nativos ecuatorianos captan la atención de chefs internacionales y revistas especializadas.",
            fullContent: "La gastronomía ancestral ecuatoriana, especialmente las técnicas de fermentación, ahumado y conservación de las nacionalidades amazónicas y andinas, está siendo adoptada por reconocidos chefs internacionales. Ingredientes como el ishpingo, el paico y diversas variedades de tubérculos andinos están apareciendo en menús de restaurantes premiados en Europa y Norteamérica. Este fenómeno ha impulsado el turismo gastronómico en Ecuador, con un aumento del 30% en rutas culinarias durante el último año.",
            date: "1 de febrero de 2024",
            readTime: "4 min",
            tags: ["TENDENCIAS", "EXPERIENCIAS"],
            image: "/api/placeholder/400/250?text=Gastronomía"
        }
    ];

    // Available filters
    const filters = ["TENDENCIAS", "EVENTOS", "TESTIMONIOS", "CONSERVACIÓN", "EXPERIENCIAS"];

    const filteredNews = activeNewsFilter
        ? newsItems.filter(item => item.tags.includes(activeNewsFilter))
        : newsItems;

    useEffect(() => {
        setCurrentNewsIndex(0);
        setVisibleNewsCount(Math.min(2, filteredNews.length));
    }, [activeNewsFilter, filteredNews.length]);

    const nextNews = () => {
        if (currentNewsIndex < filteredNews.length - 1) {
            setCurrentNewsIndex(currentNewsIndex + 1);
        } else {
            setCurrentNewsIndex(0);
        }
    };

    const prevNews = () => {
        if (currentNewsIndex > 0) {
            setCurrentNewsIndex(currentNewsIndex - 1);
        } else {
            setCurrentNewsIndex(filteredNews.length - 1);
        }
    };

    const getVisibleNews = () => {
        const result = [];
        for (let i = 0; i < visibleNewsCount; i++) {
            const index = (currentNewsIndex + i) % filteredNews.length;
            result.push(filteredNews[index]);
        }
        return result;
    };

    const visibleNews = getVisibleNews();

    const toggleExpandArticle = (id) => {
        setExpandedArticle(expandedArticle === id ? null : id);
    };

    return (
        <div className="bg-white py-8 ">
            <div className="container mx-auto px-4 flex  flex-col">
                <div className="flex  px-22 flex-col mb-6 w-6/7">
                    <h2 className="text-2xl  font-bold text-blue-700 mb-2">
                        Superando Limites
                    </h2>
                    <div className="w-full h-1 bg-blue-500 mb-6" style={{backgroundColor:"#5A67F9FF"}}></div>


                    <div className="mb-8">
                    <div className="flex items-center mb-4">
                        <svg className="w-5 h-5 text-[#5A67F9FF] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
                        </svg>
                        <span className="text-gray-600">Filtrar por:</span>
                    </div>

                    <div className="flex flex-wrap gap-2 ">
                        {filters.map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setActiveNewsFilter(filter)}
                                style={{
                                    paddingTop: '0.25rem',
                                    paddingBottom: '0.25rem',
                                    paddingLeft: '1rem',
                                    paddingRight: '1rem',
                                    borderRadius: '9999px',
                                    fontSize: '0.875rem',
                                    backgroundColor: activeNewsFilter === filter ? '#5A67F9FF' : '#ffffff',
                                    color: activeNewsFilter === filter ? '#ffffff' : '#374151',
                                    fontWeight: activeNewsFilter === filter ? 500 : 'normal',
                                    border: activeNewsFilter === filter ? 'none' : '1px solid #e5e7eb',
                                    cursor: 'pointer',
                                    transition: 'background-color 0.2s ease'
                                }}
                                onMouseEnter={(e) => {
                                    if (activeNewsFilter !== filter) {
                                        e.target.style.backgroundColor = '#f3f4f6';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (activeNewsFilter !== filter) {
                                        e.target.style.backgroundColor = '#ffffff';
                                    }
                                }}

                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>
                </div>
<div className="flex justify-center items-center">
                {filteredNews.length > 0 ? (
                    <div className="w-6/7 flex justify-center items-center">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ">
                            {visibleNews.map((newsItem) => (
                                <div key={newsItem.id} className="bg-white rounded-lg overflow-hidden shadow border border-gray-200">

                                    <div className="relative">
                                        <img
                                            src={newsItem.image}
                                            alt={newsItem.title}
                                            className="w-full h-80 object-cover"
                                        />
                                        <div className="absolute top-2 left-2">
                      <span className="bg-green-500 text-white text-xs px-3 py-1 rounded-full uppercase font-medium">
                        {newsItem.tags[0]}
                      </span>
                                        </div>
                                    </div>

                                    <div className="p-4">
                                        <h3 className="text-lg font-bold mb-2">{newsItem.title}</h3>
                                        <p className="text-gray-600 text-sm mb-4">
                                            {expandedArticle === newsItem.id ? newsItem.fullContent : newsItem.content}
                                        </p>

                                        {/* Date and read time */}
                                        <div className="flex items-center text-gray-500 text-xs mb-4">
                                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                            </svg>
                                            <span>{newsItem.date}</span>
                                            <span className="mx-2">•</span>
                                            <span>{newsItem.readTime}</span>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex justify-between items-center">
                                            <button
                                                className="text-gray-500 hover:text-gray-700 text-sm flex items-center"
                                                onClick={() => {
                                                    if (navigator.share) {
                                                        navigator.share({
                                                            title: newsItem.title,
                                                            text: newsItem.content,
                                                            url: window.location.href
                                                        });
                                                    }
                                                }}
                                            >
                                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path>
                                                </svg>
                                                Compartir
                                            </button>

                                            <button
                                                className={`${expandedArticle === newsItem.id ? 'bg-[#5A67F9FF]' : 'bg-[#5A67F9FF]'} text-white px-4 py-1 rounded-full text-sm flex items-center`}
                                                onClick={() => toggleExpandArticle(newsItem.id)}
                                                style={{backgroundColor: "#5A67F9FF", borderRadius:"20px"}}
                                            >
                                                {expandedArticle === newsItem.id ? 'Colapsar' : 'Seguir leyendo'}
                                                <svg
                                                    className={`w-4 h-4 ml-1 transform ${expandedArticle === newsItem.id ? 'rotate-90' : ''}`}
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

                        {/* Navigation controls */}
                        {filteredNews.length > 3 && (
                            <div className="flex justify-center mt-6 space-x-4">
                                <button
                                    onClick={prevNews}
                                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 p-2 rounded-full"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                                    </svg>
                                </button>

                                {/* Progress indicator */}
                                <div className="flex items-center space-x-2">
                                    {Array.from({ length: Math.ceil(filteredNews.length / visibleNewsCount) }).map((_, index) => {
                                        const isActive = Math.floor(currentNewsIndex / visibleNewsCount) === index;
                                        return (
                                            <div
                                                key={index}
                                                className={`h-3 rounded-full transition-all ${
                                                    isActive ? 'bg-[#5A67F9FF] w-6' : 'bg-gray-300 w-3'
                                                }`}

                                            />
                                        );
                                    })}
                                </div>

                                <button
                                    onClick={nextNews}
                                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 p-2 rounded-full"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                                    </svg>
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="bg-white rounded-xl shadow-lg p-8 text-center border border-red-200">
                        <svg className="w-16 h-16 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <p className="text-gray-500 text-lg">No hay noticias disponibles con el filtro seleccionado.</p>
                        <button
                            onClick={() => setActiveNewsFilter(null)}
                            className="mt-4 text-red-600 font-medium hover:text-red-700 border-b-2 border-red-600 pb-1"
                        >
                            Ver todas las noticias
                        </button>
                    </div>
                )}
</div>
            </div>
        </div>
    );
};

export default NewsSection;