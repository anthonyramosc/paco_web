import { useState, useEffect } from 'react';
import img1 from '../assets/img/paco1.jpg'
import img3 from '../assets/img/paco12.jpg'
import img4 from '../assets/img/paco5.jpg'
import img5 from '../assets/img/paco6.jpg'
import img7 from '../assets/img/paco7.jpg'
import img8 from '../assets/img/paco8.jpg'
import img9 from '../assets/img/paco9.jpg'

const NewsSection = () => {
    const [activeNewsFilter, setActiveNewsFilter] = useState('TESTIMONIOS');
    const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
    const [visibleNewsCount, setVisibleNewsCount] = useState(3);
    const [expandedArticle, setExpandedArticle] = useState(null);

    // News data array - updated content to relate to images and PacoElMorlaco's prosthetics
    const newsItems = [
        {
            id: 2,
            title: "Pedaleando con propósito: la libertad no tiene límites",
            content: "Salir a recorrer el mundo en bicicleta es una experiencia liberadora, y con una prótesis adecuada como las que ofrece PacoElMorlaco, es totalmente posible sin limitaciones.",
            fullContent: "Salir a recorrer el mundo en bicicleta es una experiencia liberadora, y con una prótesis adecuada como las que ofrece PacoElMorlaco, es totalmente posible sin limitaciones. Nuestros usuarios comparten cómo han vuelto a disfrutar del ciclismo gracias a nuestras prótesis especialmente diseñadas para actividades deportivas, permitiéndoles acceder a rutas y experiencias que parecían imposibles después de una amputación. La tecnología adaptativa está transformando vidas, un pedaleo a la vez.",
            date: "22 de febrero de 2024",
            readTime: "4 min",
            tags: ["TESTIMONIOS", "EXPERIENCIAS"],
            image: img9
        },
        {
            id: 3,
            title: "Un nuevo impulso: la prótesis que acompaña cada kilómetro",
            content: "La prótesis de PacoElMorlaco no solo apoya el movimiento, también sostiene una actitud firme de no renunciar al placer de rodar libremente. Diseñada para resistir exigencias deportivas.",
            fullContent: "La prótesis de PacoElMorlaco no solo apoya el movimiento, también sostiene una actitud firme de no renunciar al placer de rodar libremente. Diseñada para resistir exigencias deportivas, cada componente ha sido probado en condiciones extremas para garantizar durabilidad y confianza. El disfrute al aire libre no tiene por qué detenerse. La prótesis se convierte en aliada para continuar pedaleando, para levantar la bicicleta con orgullo, y para celebrar la vida sin restricciones. Un símbolo de resiliencia, autonomía y amor por el deporte.",
            date: "18 de febrero de 2024",
            readTime: "6 min",
            tags: ["TESTIMONIOS", "CONSERVACIÓN"],
            image: img7
        },
        {
            id: 4,
            title: "Tecnología con propósito: historias que inspiran",
            content: "Las prótesis de PacoElMorlaco no son solo artefactos mecánicos, son parte del viaje de personas que han decidido no rendirse. Cada ajuste responde a necesidades específicas.",
            fullContent: "Las prótesis de PacoElMorlaco no son solo artefactos mecánicos, son parte del viaje de personas que han decidido no rendirse. Cada ajuste responde a necesidades específicas, cada material es seleccionado por su función y durabilidad. Desde la movilidad hasta las actividades más simples, cada uso es una victoria. Nuestros usuarios han compartido cómo actividades que parecían imposibles ahora forman parte de su rutina diaria, transformando la adversidad en oportunidad gracias a nuestra tecnología adaptativa.",
            date: "10 de febrero de 2024",
            readTime: "3 min",
            tags: ["EVENTOS", "EXPERIENCIAS"],
            image: img1
        },
        {
            id: 5,
            title: "Fuerza y superación: una nueva forma de vivir al máximo",
            content: "Gracias al uso de prótesis de brazo de PacoElMorlaco, nuestros usuarios han transformado los límites en oportunidades. Desde levantar una bicicleta en la playa hasta actividades cotidianas.",
            fullContent: "Gracias al uso de prótesis de brazo de PacoElMorlaco, nuestros usuarios han transformado los límites en oportunidades. Desde levantar una bicicleta en la playa hasta disfrutar de actividades cotidianas como beber agua, demuestran que la tecnología y la determinación humana pueden cambiar vidas. Las prótesis no solo reemplazan, sino que empoderan. Con materiales ligeros pero resistentes, diseños ergonómicos y mecanismos de ajuste precisos, cada prótesis está hecha a medida para maximizar la funcionalidad y comodidad del usuario.",
            date: "5 de febrero de 2024",
            readTime: "5 min",
            tags: ["TENDENCIAS", "CONSERVACIÓN"],
            image: img4
        },
        {
            id: 6,
            title: "Vivir sin barreras con PacoElMorlaco",
            content: "El esfuerzo, la adaptabilidad y prótesis bien diseñadas pueden transformar lo imposible en cotidiano. PacoElMorlaco dedica cada creación a devolver independencia.",
            fullContent: "El esfuerzo, la adaptabilidad y prótesis bien diseñadas pueden transformar lo imposible en cotidiano. PacoElMorlaco dedica cada creación a devolver independencia y confianza. Nuestras prótesis permiten a los usuarios retomar actividades que creían perdidas, desde deportes extremos hasta tareas diarias. La combinación de tecnología de punta, materiales de alta calidad y un diseño centrado en el usuario ha posicionado a nuestras soluciones como referentes en el campo de las prótesis adaptativas para deportistas y personas activas.",
            date: "1 de febrero de 2024",
            readTime: "4 min",
            tags: ["TENDENCIAS", "EXPERIENCIAS"],
            image: img5
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
        <div className="bg-white py-8">
            <div className="container mx-auto px-4 flex flex-col">
                <div className="flex px-22 flex-col mb-6 w-6/7">
                    <h2 className="text-2xl font-bold text-[#785D99]">
                        Superando Limites
                    </h2>
                    <div className="w-full h-1 bg-purple-500 mb-6" style={{backgroundColor:"#785D99"}}></div>

                    <div className="mb-8">
                        <div className="flex items-center mb-4">
                            <svg className="w-5 h-5 text-[#785D99] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
                            </svg>
                            <span className="text-[#785D99]">Filtrar por:</span>
                        </div>

                        <div className="flex flex-wrap gap-2">
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
                                        backgroundColor: activeNewsFilter === filter ? '#59277A' : '#ffffff',
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
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {visibleNews.map((newsItem) => (
                                    <div key={newsItem.id} className="bg-white rounded-lg overflow-hidden shadow border border-gray-200">
                                        <div className="relative">
                                            <img
                                                src={newsItem.image}
                                                alt={newsItem.title}
                                                className="w-full h-80 object-cover"
                                            />
                                            <div className="absolute top-2 left-2">
                                                <span className="bg-[#785D99] text-white text-xs px-3 py-1 rounded-full uppercase font-medium">
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
                                            <div className="flex items-center text-[#785D99]">
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
                                                                url: "http://pacoelmorlaco.com/"
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
                                                    className="bg-[] text-white px-4 py-1 rounded-full text-sm flex items-center"
                                                    style={{backgroundColor:"#785D99", borderRadius:"9999px"}}
                                                    onClick={() => toggleExpandArticle(newsItem.id)}
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
                            {filteredNews.length > 2 && (
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
                                                        isActive ? 'bg-[#785D99] w-6' : 'bg-gray-300 w-3'
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