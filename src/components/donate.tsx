import { useState, useEffect } from 'react';
import { DollarSign, Heart, ThumbsUp, Gift, Zap } from 'lucide-react';

const DONATION_OPTIONS = [
  { amount: 5, link: 'https://payp.page.link/jJrQa' },
  { amount: 10, link: 'https://payp.page.link/TrD8p' },
  { amount: 15, link: 'https://payp.page.link/A8nyK' },
  { amount: 20, link: 'https://payp.page.link/hkULM' },
  { amount: 50, link: 'https://payp.page.link/ysYCM' }
];

export default function DonationComponent() {
  const [selectedAmount, setSelectedAmount] = useState(10);
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
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (selectedAmount) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 500);
      return () => clearTimeout(timer);
    }
  }, [selectedAmount]);

  const handleDonationClick = (amount) => {
    setSelectedAmount(amount);
  };

  const handleDonateClick = () => {
    if (selectedAmount !== null) {
      const donationOption = DONATION_OPTIONS.find(option => option.amount === selectedAmount);
      if (donationOption) {
        window.open(donationOption.link, '_blank');
        setShowThankYou(true);
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

    if (formData.customAmount) {
      console.log("Custom amount donation:", formData.customAmount);
    } else {
      handleDonateClick();
    }

    setShowThankYou(true);
    setTimeout(() => {
      setShowThankYou(false);
    }, 5000);
  };

  return (
      <div className="flex flex-col w-full md:w-6/10 mx-auto rounded-lg overflow-hidden shadow-2xl bg-gradient-to-br from-[#7A6297FF] to-[#7A6297FF] text-white">
        <div className="relative w-full">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500"></div>

          <div className="p-8">
            <div className="mb-6 text-center">
              <div className="inline-flex items-center justify-center p-2 bg-orange-500 rounded-full mb-4">
                <Heart className="h-8 w-8 text-white" fill="white" />
              </div>
              <h1 className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-orange-300">DONAR</h1>
              <p className="text-lg mb-6 text-gray-100 italic">
                "Con tu Donación puedes ser parte de este proyecto para
                crear Prótesis. Si tu corazón te llama a donar más o menos, cada
                contribución es bienvenida con un profundo agradecimiento"
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl mb-6">
              <div className="grid grid-cols-5 gap-3 mb-6">
                {DONATION_OPTIONS.map((option) => (
                    <button
                        key={option.amount}
                        onClick={() => handleDonationClick(option.amount)}
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: '0.75rem', // p-3
                          borderRadius: '0.5rem', // rounded-lg
                          transition: 'all 300ms ease', // transition-all duration-300
                          transform: selectedAmount === option.amount ? 'scale(1.05)' : 'none', // scale-105
                          backgroundColor:
                              selectedAmount === option.amount ? '#f97316' : 'rgba(255, 255, 255, 0.2)', // bg-orange-500 o bg-white/20
                          color: 'white', // text-white en ambos casos
                          border: selectedAmount === option.amount ? '2px solid white' : 'none',
                          boxShadow:
                              selectedAmount === option.amount ? '0 10px 15px rgba(0, 0, 0, 0.1)' : 'none', // shadow-lg
                        }}

                    >
                      <DollarSign style={{
                        height: '1.25rem', // h-5
                        width: '1.25rem',  // w-5
                        marginBottom: '0.25rem', // mb-1
                        color: selectedAmount === option.amount ? 'white' : '#f3f4f6' // text-white o text-gray-100
                      }}
                      />
                      <span className="font-bold text-lg">{option.amount}</span>
                    </button>
                ))}
              </div>

              <button
                  onClick={handleAnonymousDonation}
                  style={{
                    width: '100%',
                    background: 'linear-gradient(to right, #f97316, #ea580c)', // from-orange-500 to-orange-600
                    color: 'white',
                    fontWeight: 'bold',
                    paddingTop: '1rem',
                    paddingBottom: '1rem',
                    paddingLeft: '1.5rem',
                    paddingRight: '1.5rem',
                    borderRadius: '0.5rem',
                    marginBottom: '1.5rem',
                    transition: 'all 300ms ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    transform: 'translateY(0)', // hover state sería translateY(0.25rem)
                  }}
              >
                <Zap className="h-5 w-5" />
                <span>DONAR ANÓNIMAMENTE ${selectedAmount || '--'}</span>
              </button>

              <div className="relative">
                <div className="absolute inset-0  rounded-lg blur"></div>
                <p className="relative text-center p-3 text-gray-100">
                  También puedes dejarnos tus datos, estos serán usados para
                  brindarte información sobre mas campañas.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                    type="text"
                    name="fullName"
                    placeholder="Nombres completos"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full p-4 bg-white rounded-lg border border-purple-300/50 bg-white/10 backdrop-blur-sm text-white placeholder-gray-800 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
                />
                <input
                    type="text"
                    name="idNumber"
                    placeholder="Número de cédula"
                    value={formData.idNumber}
                    onChange={handleInputChange}
                    className="w-full bg-white p-4 rounded-lg border border-purple-300/50 bg-white/10 backdrop-blur-sm text-white placeholder-gray-800 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                    type="email"
                    name="email"
                    placeholder="Correo electrónico"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-white p-4 rounded-lg border border-purple-300/50 bg-white/10 backdrop-blur-sm text-white placeholder-gray-800 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
                />
                <input
                    type="tel"
                    name="phone"
                    placeholder="Número de teléfono"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-white p-4 rounded-lg border border-purple-300/50 bg-white/10 backdrop-blur-sm text-white placeholder-gray-800 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
                />
              </div>

              <div className="flex items-center p-3 bg-white/10 rounded-lg">
                <input
                    type="checkbox"
                    name="acceptTerms"
                    id="acceptTerms"
                    checked={formData.acceptTerms}
                    onChange={handleInputChange}
                    className="w-5 h-5 mr-3 accent-orange-500 "
                />
                <label htmlFor="acceptTerms" className="text-sm">
                  Acepto los términos y condiciones
                </label>
              </div>

              <button
                  onClick={handleFormSubmit}
                  style={{
                    width: '100%',
                    background: 'linear-gradient(to right, #f97316, #ea580c)', // from-orange-500 to-orange-600
                    color: 'white',
                    fontWeight: 'bold',
                    paddingTop: '1rem',     // py-4
                    paddingBottom: '1rem',
                    paddingLeft: '1.5rem',  // px-6
                    paddingRight: '1.5rem',
                    borderRadius: '0.5rem', // rounded-lg
                    transition: 'all 300ms ease', // transition-all duration-300
                    boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)', // shadow-lg
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.75rem', // gap-3
                    transform: 'translateY(0)', // base
                  }}
              >
                <Gift className="h-6 w-6" />
                <span className="text-xl">DONAR ${selectedAmount || formData.customAmount || '--'}</span>
              </button>
            </div>

            {showThankYou && (
                <div className="mt-6 p-4 bg-gradient-to-r from-green-400/90 to-green-500/90 backdrop-blur-sm rounded-lg flex items-center justify-center text-white animate-pulse shadow-lg">
                  <ThumbsUp className="h-6 w-6 mr-2" />
                  <span className="font-medium">¡Gracias por tu donación! Tu apoyo hace la diferencia.</span>
                </div>
            )}
          </div>
        </div>

        <style jsx>{`
        @keyframes pulse-animation {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        .pulse-animation {
          animation: pulse-animation 0.5s ease-in-out;
        }
      `}</style>
      </div>
  );
}