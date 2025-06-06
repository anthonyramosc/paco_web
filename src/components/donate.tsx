import { useState } from 'react';
import { Heart } from 'lucide-react';
import imgP from   '../assets/images/img.png';
import imgP1 from   '../assets/images/img_1.png';
import imgP2 from   '../assets/images/img_2.png';
import imgP3 from   '../assets/images/img_3.png';


const DONATION_OPTIONS = [
    {
        amount: 1,
        link: 'https://payp.page.link/2k9BP',
        image: imgP,
        message: 'Contribuye con la cantidad que desees. Cada aporte, suma y nos ayuda a seguir adelante. Gracias por ser parte de esto!'
    },
    {
        amount: 10,
        link: 'https://payp.page.link/jJrQa',
        image: imgP1,
        message: 'Recibe un agradecimiento en los créditos. ¡Tu apoyo es muy valioso!'
    },
    {
        amount: 50,
        link: 'https://payp.page.link/TrD8p',
        image: imgP2,
        message: 'Recibe un saludo especial y una figura 3D. ¡Gracias por sumarte!'
    },
    {
        amount: 100,
        link: 'https://payp.page.link/hkULM',
        image: imgP3,
        message: 'Recibe un saludo, una figura 3D, una fotografía y un llavero, hasta donde tu generosidad te lleve. ¡Eres increíble!'
    }
];

export default function DonationComponent() {
    const [hover, setHover] = useState(false);
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
        <div className="max-w-7/12 mx-auto  rounded-3xl p-8 text-white shadow-2xl "
        style={{backgroundColor:"#796196"}}>

            <div className="text-center mb-2" style={{marginTop:"-20px"}}>
                <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-500 rounded-full mb-1">
                    <Heart className="w-8 h-8 text-white" fill="white" />
                </div>
                <h1 className="text-4xl font-bold mb-2 text-orange-300">DONAR</h1>
                <p className="text-lg text-white/90 italic max-w-5xl mx-auto leading-relaxed">
                "Con tu Donación puedes ser parte de este proyecto para crear Prótesis. Si tu corazón te llama a <br/>
                donar más o menos, cada contribución es bienvenida con un profundo agradecimiento"
            </p>
            </div>


            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 flex flex-col justify-center items-center" >
            {/* Donation Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {DONATION_OPTIONS.map((option, index) => (
                    <div key={option.amount} className="backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-orange-400 to-red-500">
                        {/* Profile Image */}
                        <div className="relative h-32 overflow-hidden">
                            <img
                                src={option.image}
                                alt={`Donor ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-0 left-3 bg-[#796196] text-white px-3 py-1 rounded-full font-bold text-lg">
                                ${option.amount}
                            </div>
                        </div>

                        {/* Card Content */}
                        <div className=" h-32  " style={{borderRadius:"10px"}}>
                            <p className="text-white/90 p-1 leading-relaxed" style={{fontSize:"12px"}}>
                                {option.message}
                            </p>
                            <button
                                onClick={() => handleDonationClick(option)}
                                className="absolute bottom-0"
                                style={{
                                    width: '100%',
                                    backgroundColor: hover ? '#796196A8' : '#796196',
                                    color: 'white',
                                    fontWeight: 'bold',
                                    paddingTop: '0.2rem',
                                    paddingBottom: '0.2rem',
                                    borderRadius: '0.5rem',
                                    transition: 'background-color 200ms',
                                }}
                                onMouseEnter={() => setHover(true)}
                                onMouseLeave={() => setHover(false)}
                                >
                                Donar
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Form Section */}

                <p className="text-center text-white/90 mb-6 text-lg">
                    También puedes dejarnos tus datos, estos serán usados para brindarte información sobre más campañas.
                </p>

                <div className=" max-w-4xl rounded-xl bg-white">

                    <div className="grid grid-cols-2 md:grid-cols-2 ">
                        <input
                            type="text"
                            name="cedula"
                            placeholder="Cédula"
                            value={formData.cedula}
                            onChange={handleInputChange}
                            className="w-full p-4 bg-white  backdrop-blur-sm border border-white/30  text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                        />
                        <input
                            type="text"
                            name="nombres"
                            placeholder="Nombres completos"
                            value={formData.nombres}
                            onChange={handleInputChange}
                            className="w-full p-4 bg-white backdrop-blur-sm border border-white/30  text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                        />

                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full p-4 bg-white backdrop-blur-sm border border-white/30  text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                        />
                        <input
                            type="tel"
                            name="telefono"
                            placeholder="Teléfono"
                            value={formData.telefono}
                            onChange={handleInputChange}
                            className="w-full p-4 bg-white backdrop-blur-sm border border-white/30 text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                        />
                    </div>

                    <div className="flex items-start  p-3  ">
                        <input
                            type="checkbox"
                            name="acceptTerms"
                            id="acceptTerms"
                            checked={formData.acceptTerms}
                            onChange={handleInputChange}
                            className="w-5 h-5 mt-0.5 rounded"
                        />
                        <label htmlFor="acceptTerms" className="text-[rgba(121,97,150,0.66)] text-sm leading-relaxed">
                            Acepto los términos y condiciones
                        </label>
                    </div>

                    <button
                        onClick={handleFormSubmit}
                        style={{
                            width: '100%',
                            color: 'rgba(121,97,150,0.66)',
                            fontWeight: 'bold',
                            paddingTop: '1rem',   // Tailwind py-4
                            paddingBottom: '1rem',
                            paddingLeft: '2.5rem', // Tailwind px-6
                            paddingRight: '2.5rem', // Tailwind rounded-lg
                            fontSize: '1.125rem',    // Tailwind text-lg
                            transition: 'background-color 200ms' // Tailwind transition-colors duration-200
                        }}
                    >
                        Aceptar
                    </button>
                </div>
            </div>
        </div>
    );
}