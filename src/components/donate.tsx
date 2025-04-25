import React, { useState, FormEvent, useEffect } from 'react';
import { CreditCard, AlertCircle, Check, ChevronLeft } from 'lucide-react';

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

// Predefined donation amounts
const DONATION_AMOUNTS = [10, 25, 50, 100];

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
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [customAmountSelected, setCustomAmountSelected] = useState<boolean>(true);

  // Format card number with spaces
  useEffect(() => {
    if (cardData.cardNumber) {
      const formatted = cardData.cardNumber.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
      if (formatted !== cardData.cardNumber) {
        setCardData(prev => ({ ...prev, cardNumber: formatted }));
      }
    }
  }, [cardData.cardNumber]);

  // Format expiry date with slash
  useEffect(() => {
    if (cardData.expiryDate && !cardData.expiryDate.includes('/')) {
      if (cardData.expiryDate.length === 2) {
        setCardData(prev => ({ ...prev, expiryDate: cardData.expiryDate + '/' }));
      }
    }
  }, [cardData.expiryDate]);

  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.isAnonymous) {
      if (!formData.nombre_completo.trim()) {
        newErrors.nombre_completo = 'El nombre es requerido';
      }

      if (!formData.correo_electronico.trim()) {
        newErrors.correo_electronico = 'El correo electrónico es requerido';
      } else if (!validateEmail(formData.correo_electronico)) {
        newErrors.correo_electronico = 'Ingrese un correo electrónico válido';
      }
    }

    if (!formData.cantidad_donar || parseFloat(formData.cantidad_donar) <= 0) {
      newErrors.cantidad_donar = 'Ingrese una cantidad válida';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateCardData = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!cardData.cardName.trim()) {
      newErrors.cardName = 'El nombre en la tarjeta es requerido';
    }

    if (!cardData.cardNumber.trim()) {
      newErrors.cardNumber = 'El número de tarjeta es requerido';
    } else if (cardData.cardNumber.replace(/\s/g, '').length !== 16) {
      newErrors.cardNumber = 'El número debe tener 16 dígitos';
    }

    if (!cardData.expiryDate.trim()) {
      newErrors.expiryDate = 'La fecha de expiración es requerida';
    } else if (!/^\d{2}\/\d{2}$/.test(cardData.expiryDate)) {
      newErrors.expiryDate = 'Formato MM/AA requerido';
    }

    if (!cardData.cvv.trim()) {
      newErrors.cvv = 'El CVV es requerido';
    } else if (!/^\d{3,4}$/.test(cardData.cvv)) {
      newErrors.cvv = 'El CVV debe tener 3 o 4 dígitos';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }

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
      // Add specific validations for card inputs
      let newValue = value;

      if (name === 'cardNumber') {
        // Only allow numbers and spaces
        newValue = value.replace(/[^\d\s]/g, '').substring(0, 19);
      } else if (name === 'expiryDate') {
        // Only allow format MM/YY
        newValue = value.replace(/[^\d/]/g, '').substring(0, 5);
      } else if (name === 'cvv') {
        // Only allow numbers
        newValue = value.replace(/\D/g, '').substring(0, 4);
      }

      setCardData(prevData => ({
        ...prevData,
        [name]: newValue,
      }));
    }
  };

  const selectDonationAmount = (amount: number) => {
    setFormData(prev => ({
      ...prev,
      cantidad_donar: amount.toString()
    }));
    setCustomAmountSelected(false);
  };

  const handleCustomAmountSelect = () => {
    setCustomAmountSelected(true);
  };

  const simulatePaymentProcessing = (): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(Math.random() > 0.1); // 90% success rate for simulation
      }, 1500);
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormMessage({ type: null, text: null });

    if (showCard) {
      if (!validateCardData()) {
        return;
      }

      setIsSubmitting(true);
      try {
        const paymentSuccess = await simulatePaymentProcessing();

        if (paymentSuccess) {
          setFormMessage({
            type: 'success',
            text: `¡Gracias por tu generosa donación de $${parseFloat(formData.cantidad_donar).toFixed(2)}! Tu apoyo hace la diferencia.`,
          });

          // Reset form after successful submission
          setFormData({
            isAnonymous: false,
            nombre_completo: '',
            cedula: '',
            correo_electronico: '',
            cantidad_donar: '',
          });

          setCardData({
            cardName: '',
            cardNumber: '',
            expiryDate: '',
            cvv: '',
          });

          setShowCard(false);
          setCustomAmountSelected(true);
        } else {
          setFormMessage({
            type: 'error',
            text: 'Lo sentimos, hubo un problema procesando tu pago. Por favor, intenta nuevamente.',
          });
        }
      } catch (error) {
        setFormMessage({
          type: 'error',
          text: 'Ocurrió un error inesperado. Por favor, intenta más tarde.',
        });
      } finally {
        setIsSubmitting(false);
      }
    } else {
      if (!validateForm()) {
        return;
      }

      setShowCard(true);
    }
  };

  const handleCancel = () => {
    setShowCard(false);
    setErrors({});
  };

  return (
      <section id="donar" className="py-16 bg-blue-100">
        <div className="container mx-auto px-4 ">
          <div className="text-center mb-10">
            <h3 className="text-3xl font-bold mb-4 text-blue-800">Realiza tu Donación</h3>
            <p className="text-lg mb-2 max-w-3xl mx-auto text-gray-700">
              Cada contribución, grande o pequeña, nos acerca a nuestro objetivo.
            </p>
            <p className="text-lg max-w-3xl mx-auto text-gray-700">
              Tu apoyo es fundamental para continuar nuestra labor.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row justify-center w-6/6 items-start gap-8">
            <div className="w-1/2 ml-21">
              <div className="bg-white p-6 rounded-lg shadow-lg">

                <div className="rounded-xl  overflow-hidden shadow-md mb-6" style={{height:"550px"}}>
                  <video
                      controls
                      className="w-full  aspect-video object-cover"
                      style={{height:"550px"}}
                  >
                    <source src="https://test.tryclicksolutions.com/wp-content/uploads/2024/11/cuento-contigo-59395984-4484compartir-es-una-ayuda-sin-limites-protesis-pacoel_mwnUaka0.mp4" type="video/mp4" />
                    Tu navegador no soporta videos.
                  </video>
                </div>

                <div className="space-y-4 text-gray-700">
                  <p className="text-sm italic text-gray-500 mt-4">
                    Tu donación puede ser deducible de impuestos. Consulta con tu asesor fiscal.
                  </p>
                </div>
              </div>
            </div>
            <div className=" w-1/2">
              <form
                  id="donation-form"
                  className="bg-white p-6 sm:p-8 rounded-lg shadow-xl w-full mx-auto"
                  onSubmit={handleSubmit}
                  noValidate
                  aria-labelledby="donation-form-title"
              >
                <h4 id="donation-form-title" className="text-xl font-semibold mb-6 text-gray-800">
                  {showCard ? 'Detalles de Pago' : 'Información de Donación'}
                </h4>

                {!showCard ? (
                    <>
                      <div className="mb-6">
                        <label className="flex items-center cursor-pointer gap-2">
                          <input
                              type="checkbox"
                              id="donar_anonimamente"
                              name="isAnonymous"
                              checked={formData.isAnonymous}
                              onChange={handleInputChange}
                              className=" mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
                          />
                          <span className="ml-3  text-gray-600 text-lg">Quiero donar anónimamente</span>
                        </label>
                      </div>

                      <div
                          className={`space-y-4 transition-opacity duration-300 ease-in-out ${
                              formData.isAnonymous ? 'opacity-50 pointer-events-none' : 'opacity-100'
                          }`}
                      >
                        <div>
                          <label htmlFor="nombre_completo" className="block mb-2 font-medium text-gray-700">
                            Nombre Completo <span className="text-red-500">*</span>
                          </label>
                          <input
                              type="text"
                              id="nombre_completo"
                              name="nombre_completo"
                              value={formData.nombre_completo}
                              onChange={handleInputChange}
                              required={!formData.isAnonymous}
                              disabled={formData.isAnonymous}
                              aria-describedby={errors.nombre_completo ? "nombre-error" : undefined}
                              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 ${
                                  errors.nombre_completo ? 'border-red-500' : 'border-gray-300'
                              }`}
                          />
                          {errors.nombre_completo && (
                              <p id="nombre-error" className="mt-1 text-sm text-red-600 flex items-center">
                                <AlertCircle size={16} className="mr-1" /> {errors.nombre_completo}
                              </p>
                          )}
                        </div>

                        <div>
                          <label htmlFor="cedula" className="block mb-2 font-medium text-gray-700">
                            Cédula <span className="text-gray-500">(Opcional)</span>
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

                        <div>
                          <label htmlFor="correo_electronico" className="block mb-2 font-medium text-gray-700">
                            Correo Electrónico <span className="text-red-500">*</span>
                          </label>
                          <input
                              type="email"
                              id="correo_electronico"
                              name="correo_electronico"
                              value={formData.correo_electronico}
                              onChange={handleInputChange}
                              required={!formData.isAnonymous}
                              disabled={formData.isAnonymous}
                              aria-describedby={errors.correo_electronico ? "email-error" : undefined}
                              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 ${
                                  errors.correo_electronico ? 'border-red-500' : 'border-gray-300'
                              }`}
                          />
                          {errors.correo_electronico && (
                              <p id="email-error" className="mt-1 text-sm text-red-600 flex items-center">
                                <AlertCircle size={16} className="mr-1" /> {errors.correo_electronico}
                              </p>
                          )}
                        </div>
                      </div>

                      <div className="mt-6 mb-4">
                        <label className="block mb-3 font-medium text-gray-700">
                          Cantidad a Donar (USD) <span className="text-red-500">*</span>
                        </label>

                        <div className="grid grid-cols-2 gap-2 mb-4 sm:grid-cols-4">
                          {DONATION_AMOUNTS.map((amount) => (
                              <button
                                  key={amount}
                                  type="button"
                                  onClick={() => selectDonationAmount(amount)}
                                  className={`px-4 py-2 border rounded-md transition-all ${
                                      formData.cantidad_donar === amount.toString() && !customAmountSelected
                                          ? 'bg-blue-500 text-white border-blue-600'
                                          : 'bg-gray-50 text-gray-700 border-gray-300 hover:bg-gray-100'
                                  }`}
                              >
                                ${amount}
                              </button>
                          ))}
                        </div>

                        <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                        $
                      </span>
                          <input
                              type="number"
                              id="cantidad_donar"
                              name="cantidad_donar"
                              value={formData.cantidad_donar}
                              onChange={(e) => {
                                handleInputChange(e as React.ChangeEvent<HTMLInputElement>);
                                handleCustomAmountSelect();
                              }}
                              min="1"
                              step="any"
                              required
                              placeholder="Otra cantidad"
                              aria-describedby={errors.cantidad_donar ? "amount-error" : undefined}
                              className={`w-full pl-8 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                  errors.cantidad_donar ? 'border-red-500' : 'border-gray-300'
                              }`}
                          />
                        </div>
                        {errors.cantidad_donar && (
                            <p id="amount-error" className="mt-1 text-sm text-red-600 flex items-center">
                              <AlertCircle size={16} className="mr-1" /> {errors.cantidad_donar}
                            </p>
                        )}
                      </div>
                    </>
                ) : (
                    <>
                      <button
                          type="button"
                          onClick={handleCancel}
                          className="mb-4 flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        <ChevronLeft size={16} className="mr-1" /> Volver
                      </button>

                      <div className="mb-4 p-3 bg-blue-50 rounded-md"
                           style={{border: "2px solid blue"}}>
                        <p className="flex items-center text-sm"
                           style={{color: "blue"}}>
                          <CreditCard size={16} className="mr-2" />
                          Realizando donación de <span className="font-bold ml-1">${parseFloat(formData.cantidad_donar).toFixed(2)} USD</span>
                        </p>
                      </div>

                      <div className="mb-4">
                        <label htmlFor="cardName" className="block mb-2 font-medium text-gray-700">
                          Nombre en la Tarjeta <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="cardName"
                            name="cardName"
                            value={cardData.cardName}
                            onChange={handleInputChange}
                            placeholder="Como aparece en la tarjeta"
                            required
                            aria-describedby={errors.cardName ? "cardName-error" : undefined}
                            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                errors.cardName ? 'border-red-500' : 'border-gray-300'
                            }`}
                        />
                        {errors.cardName && (
                            <p id="cardName-error" className="mt-1 text-sm text-red-600 flex items-center">
                              <AlertCircle size={16} className="mr-1" /> {errors.cardName}
                            </p>
                        )}
                      </div>

                      <div className="mb-4">
                        <label htmlFor="cardNumber" className="block mb-2 font-medium text-gray-700">
                          Número de Tarjeta <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="cardNumber"
                            name="cardNumber"
                            value={cardData.cardNumber}
                            onChange={handleInputChange}
                            placeholder="0000 0000 0000 0000"
                            required
                            aria-describedby={errors.cardNumber ? "cardNumber-error" : undefined}
                            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                errors.cardNumber ? 'border-red-500' : 'border-gray-300'
                            }`}
                        />
                        {errors.cardNumber && (
                            <p id="cardNumber-error" className="mt-1 text-sm text-red-600 flex items-center">
                              <AlertCircle size={16} className="mr-1" /> {errors.cardNumber}
                            </p>
                        )}
                      </div>

                      <div className="flex mb-4 gap-4">
                        <div className="w-1/2">
                          <label htmlFor="expiryDate" className="block mb-2 font-medium text-gray-700">
                            Fecha Expiración <span className="text-red-500">*</span>
                          </label>
                          <input
                              type="text"
                              id="expiryDate"
                              name="expiryDate"
                              value={cardData.expiryDate}
                              onChange={handleInputChange}
                              placeholder="MM/AA"
                              required
                              aria-describedby={errors.expiryDate ? "expiry-error" : undefined}
                              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                  errors.expiryDate ? 'border-red-500' : 'border-gray-300'
                              }`}
                          />
                          {errors.expiryDate && (
                              <p id="expiry-error" className="mt-1 text-sm text-red-600 flex items-center">
                                <AlertCircle size={16} className="mr-1" /> {errors.expiryDate}
                              </p>
                          )}
                        </div>

                        <div className="w-1/2">
                          <label htmlFor="cvv" className="block mb-2 font-medium text-gray-700">
                            CVV <span className="text-red-500">*</span>
                          </label>
                          <input
                              type="text"
                              id="cvv"
                              name="cvv"
                              value={cardData.cvv}
                              onChange={handleInputChange}
                              placeholder="123"
                              required
                              aria-describedby={errors.cvv ? "cvv-error" : undefined}
                              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                  errors.cvv ? 'border-red-500' : 'border-gray-300'
                              }`}
                          />
                          {errors.cvv && (
                              <p id="cvv-error" className="mt-1 text-sm text-red-600 flex items-center">
                                <AlertCircle size={16} className="mr-1" /> {errors.cvv}
                              </p>
                          )}
                        </div>
                      </div>

                      <p className="mb-4 text-sm text-gray-500">
                        Tus datos de pago están seguros. Utilizamos cifrado para proteger tu información.
                      </p>
                    </>
                )}

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full font-bold py-3 rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
                    style={{
                      border: "2px solid blue",
                      borderRadius: "20px",
                      backgroundColor: "white",
                      color: "blue"
                    }}
                >
                  {isSubmitting ? (
                      <span className="flex items-center">
        <svg className="animate-spin mr-2 h-5 w-5"
             style={{color: "blue"}}
             xmlns="http://www.w3.org/2000/svg"
             fill="none"
             viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Procesando...
      </span>
                  ) : (
                      showCard ? "Completar Donación" : "Continuar"
                  )}
                </button>
              </form>

              {formMessage.text && (
                  <div
                      className={`mt-6 p-4 rounded-md text-sm w-full flex items-start ${
                          formMessage.type === 'success'
                              ? 'bg-green-50 border border-green-200 text-green-800'
                              : 'bg-red-50 border border-red-200 text-red-800'
                      }`}
                      role="alert"
                  >
                    {formMessage.type === 'success' ? (
                        <Check size={20} className="mr-2 flex-shrink-0 mt-0.5" />
                    ) : (
                        <AlertCircle size={20} className="mr-2 flex-shrink-0 mt-0.5" />
                    )}
                    <span>{formMessage.text}</span>
                  </div>
              )}
            </div>


          </div>
        </div>
      </section>
  );
};

export default DonationForm;