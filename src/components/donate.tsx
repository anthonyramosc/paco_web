import { useState } from 'react';
import { DollarSign, Heart, ExternalLink, ThumbsUp, Video } from 'lucide-react';

const DONATION_OPTIONS = [
  { amount: 5, link: 'https://payp.page.link/jJrQa' },
  { amount: 10, link: 'https://payp.page.link/TrD8p' },
  { amount: 15, link: 'https://payp.page.link/A8nyK' },
  { amount: 20, link: 'https://payp.page.link/hkULM' },
  { amount: 50, link: 'https://payp.page.link/ysYCM' }
];

export default function DonationComponent() {
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [showThankYou, setShowThankYou] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    idNumber: '',
    email: '',
    phone: '',
    customAmount: '',
    acceptTerms: false
  });
  const [anonymousDonation, setAnonymousDonation] = useState(false);

  const handleDonationClick = (amount) => {
    setSelectedAmount(amount);
  };

  const handleDonateClick = () => {
    if (selectedAmount !== null) {
      const donationOption = DONATION_OPTIONS.find(option => option.amount === selectedAmount);
      if (donationOption) {
        // Open payment URL in a new tab
        window.open(donationOption.link, '_blank');
        // Show thank you message
        setShowThankYou(true);
        // Hide the message after 5 seconds
        setTimeout(() => {
          setShowThankYou(false);
        }, 5000);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleAnonymousDonation = () => {
    setAnonymousDonation(true);

    handleDonateClick();
  };

  const handleFormSubmit = (e) => {
    if (e) e.preventDefault();

    console.log("Processing donation with form data:", formData);


    if (formData.customAmount) {

      console.log("Custom amount donation:", formData.customAmount);
    } else {
      // Si no hay monto personalizado, usar el monto seleccionado
      handleDonateClick();
    }

    // Mostrar mensaje de agradecimiento
    setShowThankYou(true);
    // Ocultar el mensaje después de 5 segundos
    setTimeout(() => {
      setShowThankYou(false);
    }, 5000);
  };

  return (
      <div className="flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-[#785D99] text-white rounded-lg overflow-hidden">
        {/* Columna Izquierda */}
        <div className="w-full lg:w-2/3 p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-center mb-4">DONAR</h1>
            <p className="text-center text-lg mb-6">
              "Con tu Donación puedes ser parte de este de esta ayuda para
              crear Prótesis. Si tu corazón te llama a donar más o menos, cada
              contribución es bienvenida con un profundo agradecimiento"
            </p>

            {/* Opciones de donación visibles */}


            <button
                onClick={handleAnonymousDonation}
                className="w-full bg-orange-600 text-white font-bold py-3 px-6 rounded-md mb-6 transition-all duration-200 hover:bg-orange-700"
                style={{backgroundColor:"#EA580C"}}
            >
              DONAR ANÓNIMAMENTE ${selectedAmount || '--'}
            </button>

            <p className="text-center mb-4">
              También puedes dejarnos tus datos, estos serán usados para
              brindarte información sobre como se usa tu donación.
            </p>

            <div className="space-y-4 flex flex-col gap-3">
              <input
                  type="text"
                  name="fullName"
                  placeholder="Nombres completos"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-md border text-gray-700"
                  style={{backgroundColor:"white"}}
              />
              <input
                  type="text"
                  name="idNumber"
                  placeholder="Número de cédula"
                  value={formData.idNumber}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-md border text-gray-700"
                  style={{backgroundColor:"white"}}
              />
              <input
                  type="email"
                  name="email"
                  placeholder="Correo electrónico"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-md border text-gray-700"
                  style={{backgroundColor:"white"}}
              />
              <input
                  type="tel"
                  name="phone"
                  placeholder="Número de teléfono"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-md border text-gray-700"
                  style={{backgroundColor:"white"}}
              />

              <div className="grid grid-cols-5 gap-2 mb-6">
              {DONATION_OPTIONS.map((option) => (
                  <button
                      key={option.amount}
                      onClick={() => handleDonationClick(option.amount)}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '0.5rem', // p-2 = 8px = 0.5rem
                        borderRadius: '0.5rem', // rounded-lg ~ 0.5rem
                        backgroundColor: selectedAmount === option.amount ? '#EA580C' : '#F3F4F6', // bg-blue-500 : bg-gray-100
                        color: selectedAmount === option.amount ? '#FFFFFF' : '#1F2937', // text-white : text-gray-800
                        border: '2px solid',
                        borderColor: selectedAmount === option.amount ? 'white' : 'transparent', // border-blue-600 : border-transparent
                        transition: 'all 0.2s ease' // transition-all duration-200
                      }}

                  >
                    <DollarSign className="h-4 w-4 mb-1" />
                    <span className="font-bold">{option.amount}</span>
                  </button>
              ))}
            </div>
              <div className="flex items-center">
                <input
                    type="checkbox"
                    name="acceptTerms"
                    id="acceptTerms"
                    checked={formData.acceptTerms}
                    onChange={handleInputChange}
                    className="mr-2"
                />
                <label htmlFor="acceptTerms" className="text-sm">
                  Aceptar términos y condiciones
                </label>
              </div>

              <button
                  onClick={handleFormSubmit}
                  style={{backgroundColor:"#EA580C"}}
                  className="w-full bg-orange-600 text-white font-bold py-3 px-6 rounded-md transition-all duration-200 hover:bg-orange-700 flex items-center justify-center gap-2"
              >
                <Heart className="h-5 w-5" />
                <span>DONAR ${selectedAmount || formData.customAmount || '--'}</span>
              </button>
            </div>
          </div>

          {showThankYou && (
              <div className="mt-4 p-3 bg-green-100 border border-green-300 rounded-lg flex items-center text-green-700">
                <ThumbsUp className="h-5 w-5 mr-2" />
                <span>¡Gracias por tu donación! Apreciamos tu apoyo.</span>
              </div>
          )}
        </div>

        {/* Columna Derecha - Video
        <div className="w-full lg:w-1/3 bg-gray-100 relative">
          <div className="aspect-video h-full w-full bg-gray-800 flex justify-center items-center">
            <img
                src="/api/placeholder/400/320"
                alt="Video de donación"
                className="h-full w-full object-cover"
            />
            <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 flex justify-between items-center p-2 text-white">
              <div className="flex items-center">
                <span>0:00 / 1:25</span>
              </div>
              <div className="flex items-center space-x-4">
                <button className="p-1">
                  <span className="sr-only">Mute</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 3.75v12.5L4.75 12H1.5V8h3.25L10 3.75z" />
                  </svg>
                </button>
                <button className="p-1">
                  <span className="sr-only">Fullscreen</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3.75 3.75v4.5h1.5v-3h3v-1.5h-4.5zm0 12.5h4.5v-1.5h-3v-3h-1.5v4.5zm12.5-12.5h-4.5v1.5h3v3h1.5v-4.5zm0 12.5v-4.5h-1.5v3h-3v1.5h4.5z" />
                  </svg>
                </button>
                <button className="p-1">
                  <span className="sr-only">Options</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 6a2 2 0 100-4 2 2 0 000 4zM10 12a2 2 0 100-4 2 2 0 000 4zM10 18a2 2 0 100-4 2 2 0 000 4z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>*/}
      </div>
  );
}