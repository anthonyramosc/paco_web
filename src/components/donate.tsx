import { useState } from 'react';
import { Heart } from 'lucide-react';

const DONATION_OPTIONS = [
    {
        amount: 1,
        link: 'https://payp.page.link/2k9BP',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        message: 'Contribuye con la cantidad que desees. Cada aporte, suma y nos ayuda a seguir adelante. Gracias por ser parte de esto!'
    },
    {
        amount: 10,
        link: 'https://payp.page.link/jJrQa',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        message: 'Recibe un agradecimiento en los créditos. ¡Tu apoyo es muy valioso!'
    },
    {
        amount: 50,
        link: 'https://payp.page.link/TrD8p',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
        message: 'Recibe un saludo especial y una figura 3D. ¡Gracias por sumarte!'
    },
    {
        amount: 100,
        link: 'https://payp.page.link/hkULM',
        image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop&crop=face',
        message: 'Recibe un saludo, una figura 3D, una fotografía y un llavero, hasta donde tu generosidad te lleve. ¡Eres increíble!'
    }
];

export default function DonationComponent() {
    const [formData, setFormData] = useState({
        cedula: '',
        nombres: '',
        email: '',
        telefono: '',
        acceptTerms: false
    });

    const handleDonationClick = (option) => {
        window.open(option.link, '_blank');
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleFormSubmit = () => {
        console.log('Form submitted:', formData);
        // Here you can handle the form submission
    };

    return (
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600 rounded-3xl p-8 text-white shadow-2xl">
            {/* Header */}
            <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-500 rounded-full mb-4">
                    <Heart className="w-8 h-8 text-white" fill="white" />
                </div>
                <h1 className="text-4xl font-bold mb-4 text-orange-300">DONAR</h1>
                <p className="text-lg text-white/90 italic max-w-2xl mx-auto leading-relaxed">
                    "Con tu Donación puedes ser parte de este proyecto para crear Prótesis. Si tu corazón te llama a
                    donar más o menos, cada contribución es bienvenida con un profundo agradecimiento"
                </p>
            </div>

            {/* Donation Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {DONATION_OPTIONS.map((option, index) => (
                    <div key={option.amount} className="bg-white/20 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg">
                        {/* Profile Image */}
                        <div className="relative h-32 bg-gradient-to-br from-orange-400 to-red-500 overflow-hidden">
                            <img
                                src={option.image}
                                alt={`Donor ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute top-3 left-3 bg-orange-500 text-white px-3 py-1 rounded-full font-bold text-lg">
                                ${option.amount}
                            </div>
                        </div>

                        {/* Card Content */}
                        <div className="p-4">
                            <p className="text-sm text-white/90 mb-4 leading-relaxed">
                                {option.message}
                            </p>
                            <button
                                onClick={() => handleDonationClick(option)}
                                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
                            >
                                Donar
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Form Section */}
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6">
                <p className="text-center text-white/90 mb-6 text-lg">
                    También puedes dejarnos tus datos, estos serán usados para brindarte información sobre más campañas.
                </p>

                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            type="text"
                            name="cedula"
                            placeholder="Cédula"
                            value={formData.cedula}
                            onChange={handleInputChange}
                            className="w-full p-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                        />
                        <input
                            type="text"
                            name="nombres"
                            placeholder="Nombres completos"
                            value={formData.nombres}
                            onChange={handleInputChange}
                            className="w-full p-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full p-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                        />
                        <input
                            type="tel"
                            name="telefono"
                            placeholder="Teléfono"
                            value={formData.telefono}
                            onChange={handleInputChange}
                            className="w-full p-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                        />
                    </div>

                    <div className="flex items-start space-x-3 p-4 bg-white/10 rounded-lg">
                        <input
                            type="checkbox"
                            name="acceptTerms"
                            id="acceptTerms"
                            checked={formData.acceptTerms}
                            onChange={handleInputChange}
                            className="w-5 h-5 mt-0.5 accent-orange-500 bg-white/20 border border-white/30 rounded"
                        />
                        <label htmlFor="acceptTerms" className="text-white/90 text-sm leading-relaxed">
                            Acepto los términos y condiciones
                        </label>
                    </div>

                    <button
                        onClick={handleFormSubmit}
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-6 rounded-lg transition-colors duration-200 text-lg"
                    >
                        Aceptar
                    </button>
                </div>
            </div>
        </div>
    );
}