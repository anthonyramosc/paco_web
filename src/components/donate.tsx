import React, { useState, FormEvent } from 'react';

interface DonationData {
  isAnonymous: boolean;
  nombre_completo: string;
  cedula: string;
  correo_electronico: string;
  cantidad_donar: string;
}

interface CardData {
  cardName: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

type FormMessage = {
  type: 'success' | 'error' | null;
  text: string | null;
};

const DonationForm: React.FC = () => {
  const [formData, setFormData] = useState<DonationData>({
    isAnonymous: false,
    nombre_completo: '',
    cedula: '',
    correo_electronico: '',
    cantidad_donar: '',
  });
  const [cardData, setCardData] = useState<CardData>({
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });
  const [formMessage, setFormMessage] = useState<FormMessage>({ type: null, text: null });
  const [showCard, setShowCard] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    if (name in formData) {
      setFormData(prevData => ({
        ...prevData,
        [name]: type === 'checkbox' ? checked : value,
      }));

      if (name === 'isAnonymous' && checked) {
        setFormData(prevData => ({
          ...prevData,
          nombre_completo: '',
          cedula: '',
          correo_electronico: '',
        }));
      }
    } else if (name in cardData) {
      setCardData(prevData => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (showCard) {
      if (!cardData.cardName || !cardData.cardNumber || !cardData.expiryDate || !cardData.cvv) {
        setFormMessage({ type: 'error', text: 'Por favor, complete todos los datos de la tarjeta.' });
        return;
      }

      console.log('Donation Data:', formData);
      console.log('Card Data:', cardData);

      setFormMessage({
        type: 'success',
        text: `¡Gracias por tu generosa donación de $${parseFloat(formData.cantidad_donar).toFixed(2)}! Tu apoyo hace la diferencia.`,
      });

      setShowCard(false);
      setCardData({
        cardName: '',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
      });
    } else {
      setFormMessage({ type: null, text: null });

      if (!formData.isAnonymous) {
        if (!formData.nombre_completo || !formData.correo_electronico) {
          setFormMessage({ type: 'error', text: 'Por favor, complete todos los campos requeridos (Nombre y Correo).' });
          return;
        }
      }
      if (!formData.cantidad_donar || parseFloat(formData.cantidad_donar) <= 0) {
        setFormMessage({ type: 'error', text: 'Por favor, ingrese una cantidad válida para donar.' });
        return;
      }

      setShowCard(true);
    }
  };

  return (
      <section id="donar" className="py-16 bg-blue-100 text-center">

        <div className="container mx-auto px-4" style={{ paddingLeft: '220px', paddingRight: '220px' }}>
          <h3 className="text-3xl font-bold mb-4 text-blue-800">Realiza tu Donación</h3>
          <p className="text-lg mb-8 max-w-3xl mx-auto text-gray-700">
            Cada contribución, grande o pequeña, nos acerca a nuestro objetivo. Tu apoyo es fundamental.
          </p>

          <div className="flex flex-col lg:flex-row justify-center items-start gap-8">
            <div className="lg:w-1/2">
              <form
                  id="donation-form"
                  className="bg-white p-8 sm:p-10 rounded-lg shadow-xl inline-block text-left max-w-lg w-full mx-auto mt-4"
                  onSubmit={handleSubmit}
                  noValidate
              >
                {!showCard ? (
                    <>
                      <div className="mb-6 flex items-center">
                        <input
                            type="checkbox"
                            id="donar_anonimamente"
                            name="isAnonymous"
                            checked={formData.isAnonymous}
                            onChange={handleInputChange}
                            className="mr-3 h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
                        />
                        <label htmlFor="donar_anonimamente" className="text-gray-600 cursor-pointer">
                          Quiero donar anónimamente
                        </label>
                      </div>

                      <div className={`transition-opacity duration-300 ease-in-out ${formData.isAnonymous ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
                        <div className="mb-5">
                          <label htmlFor="nombre_completo" className="block mb-2 font-semibold text-gray-700">
                            Nombre Completo:
                          </label>
                          <input
                              type="text"
                              id="nombre_completo"
                              name="nombre_completo"
                              value={formData.nombre_completo}
                              onChange={handleInputChange}
                              required={!formData.isAnonymous}
                              disabled={formData.isAnonymous}
                              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                          />
                        </div>

                        <div className="mb-5">
                          <label htmlFor="cedula" className="block mb-2 font-semibold text-gray-700">
                            Cédula (Opcional):
                          </label>
                          <input
                              type="text"
                              id="cedula"
                              name="cedula"
                              value={formData.cedula}
                              onChange={handleInputChange}
                              disabled={formData.isAnonymous}
                              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                          />
                        </div>

                        <div className="mb-5">
                          <label htmlFor="correo_electronico" className="block mb-2 font-semibold text-gray-700">
                            Correo Electrónico:
                          </label>
                          <input
                              type="email"
                              id="correo_electronico"
                              name="correo_electronico"
                              value={formData.correo_electronico}
                              onChange={handleInputChange}
                              required={!formData.isAnonymous}
                              disabled={formData.isAnonymous}
                              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                          />
                        </div>
                      </div>

                      <div className="mb-6">
                        <label htmlFor="cantidad_donar" className="block mb-2 font-semibold text-gray-700">
                          Cantidad a Donar (USD):
                        </label>
                        <input
                            type="number"
                            id="cantidad_donar"
                            name="cantidad_donar"
                            value={formData.cantidad_donar}
                            onChange={handleInputChange}
                            min="1"
                            step="any"
                            required
                            placeholder="Ej: 25.00"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </>
                ) : (
                    <div className="flex flex-col justify-around bg-gray-800 p-4 border border-white border-opacity-30 rounded-lg shadow-md mb-6">
                      <div className="flex flex-row items-center justify-between mb-3">
                        <input
                            className="w-full h-10 border-none outline-none text-sm bg-gray-800 text-white font-semibold caret-orange-500 pl-2 mb-3 flex-grow"
                            type="text"
                            name="cardName"
                            id="cardName"
                            placeholder="Full Name"
                            value={cardData.cardName}
                            onChange={handleInputChange}
                        />
                      </div>
                      <div className="flex flex-col space-y-3">
                        <input
                            className="w-full h-10 border-none outline-none text-sm bg-gray-800 text-white font-semibold caret-orange-500 pl-2"
                            type="text"
                            name="cardNumber"
                            id="cardNumber"
                            placeholder="0000 0000 0000 0000"
                            value={cardData.cardNumber}
                            onChange={handleInputChange}
                        />
                        <div className="flex flex-row justify-between">
                          <input
                              className="w-full h-10 border-none outline-none text-sm bg-gray-800 text-white font-semibold caret-orange-500 pl-2"
                              type="text"
                              name="expiryDate"
                              id="expiryDate"
                              placeholder="MM/AA"
                              value={cardData.expiryDate}
                              onChange={handleInputChange}
                          />
                          <input
                              className="w-full h-10 border-none outline-none text-sm bg-gray-800 text-white font-semibold caret-orange-500 pl-2"
                              type="text"
                              name="cvv"
                              id="cvv"
                              placeholder="CVV"
                              value={cardData.cvv}
                              onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>
                )}

                <button
                    type="submit"
                    style={{
                      backgroundColor: "#1e3a8a",
                      color: "white",
                      borderRadius: "4px",
                      padding: "12px",
                      width: "100%",
                      fontWeight: "bold",
                      border: "1px solid #16a34a",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                    }}
                    className="w-full bg-cyan-500 text-white font-bold py-3 rounded-md border border-cyan-600 transition-transform duration-150 active:scale-95 shadow-md"
                >
                  {showCard ? "Confirmar Donación" : "Donar Ahora"}
                </button>

                {showCard && (
                    <button
                        type="button"
                        onClick={() => setShowCard(false)}
                        className="w-full mt-4 bg-gray-300 text-gray-700 font-bold py-2 rounded-md border border-gray-400 transition-transform duration-150 active:scale-95 shadow-md"
                    >
                      Cancelar
                    </button>
                )}
              </form>

              {formMessage.text && (
                  <div
                      id="form-message"
                      className={`mt-6 p-3 rounded-md text-sm max-w-lg mx-auto ${
                          formMessage.type === 'success' ? 'bg-green-100 border border-green-300 text-green-800' : ''
                      } ${
                          formMessage.type === 'error' ? 'bg-red-100 border border-red-300 text-red-800' : ''
                      }`}
                      role="alert"
                  >
                    {formMessage.text}
                  </div>
              )}
            </div>

            <div className="lg:w-1/2 w-full flex justify-center">
              <div className="rounded-xl overflow-hidden shadow-lg max-w-xs w-full aspect-[9/18]">
                <video controls className="w-full h-full object-cover rounded-xl">
                  <source src="https://test.tryclicksolutions.com/wp-content/uploads/2024/11/cuento-contigo-59395984-4484compartir-es-una-ayuda-sin-limites-protesis-pacoel_mwnUaka0.mp4" type="video/mp4" />
                  Tu navegador no soporta videos.
                </video>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
};

export default DonationForm;