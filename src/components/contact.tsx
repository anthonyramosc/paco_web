import { useState, FormEvent, useRef } from 'react';

interface FormData {
  nombre: string;
  correo: string;
  mensaje: string;
}

interface ValidationErrors {
  nombre?: string;
  correo?: string;
  mensaje?: string;
  archivo?: string;
}

const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    correo: '',
    mensaje: ''
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragAreaRef = useRef<HTMLDivElement>(null);

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};
    let isValid = true;

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido';
      isValid = false;
    }

    if (!formData.correo.trim()) {
      newErrors.correo = 'El correo electrónico es requerido';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.correo)) {
      newErrors.correo = 'Por favor ingresa un correo electrónico válido';
      isValid = false;
    }

    if (!formData.mensaje.trim()) {
      newErrors.mensaje = 'El mensaje es requerido';
      isValid = false;
    }

    if (selectedFile && selectedFile.size > 5 * 1024 * 1024) {
      newErrors.archivo = 'El archivo no debe superar los 5MB';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));

    // Limpiar error cuando el usuario comienza a escribir
    if (errors[name as keyof ValidationErrors]) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: undefined
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, archivo: 'El archivo no debe superar los 5MB' }));
      } else {
        setSelectedFile(file);
        setErrors(prev => ({ ...prev, archivo: undefined }));
      }
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (dragAreaRef.current) {
      dragAreaRef.current.classList.add('border-blue-500');
      dragAreaRef.current.classList.add('bg-blue-50');
    }
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (dragAreaRef.current) {
      dragAreaRef.current.classList.remove('border-blue-500');
      dragAreaRef.current.classList.remove('bg-blue-50');
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (dragAreaRef.current) {
      dragAreaRef.current.classList.remove('border-blue-500');
      dragAreaRef.current.classList.remove('bg-blue-50');
    }

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        if (file.size > 5 * 1024 * 1024) {
          setErrors(prev => ({ ...prev, archivo: 'El archivo no debe superar los 5MB' }));
        } else {
          setSelectedFile(file);
          setErrors(prev => ({ ...prev, archivo: undefined }));
        }
      } else {
        setErrors(prev => ({ ...prev, archivo: 'Solo se permiten archivos de imagen' }));
      }
    }
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulamos un retardo para mostrar el estado de envío
      await new Promise(resolve => setTimeout(resolve, 1000));

      const whatsappMessage = `Hola, mi nombre es ${formData.nombre}. Mi correo es ${formData.correo}. ${formData.mensaje}`;
      const whatsappURL = `https://wa.me/1234567890?text=${encodeURIComponent(whatsappMessage)}`;

      window.open(whatsappURL, '_blank');

      setSubmitSuccess(true);
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);

      // Restablecer el formulario
      setFormData({ nombre: '', correo: '', mensaje: '' });
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
      <div className="w-full max-w-6xl mx-auto px-4 py-12 font-sans">
        <div className="flex flex-col md:flex-row md:gap-8 items-start">

          <div className="w-full md:w-1/2 mb-8 md:mb-0">
            <h2 className="text-2xl font-bold text-blue-700 mb-2">
              Contáctame
            </h2>
            <div className="w-full h-1 bg-blue-500 mb-6"></div>

            <p className="text-gray-600 mb-6">
              ¿Tienes alguna pregunta o quieres colaborar? Déjanos tu mensaje:
            </p>

            {submitSuccess && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  <span>Mensaje enviado correctamente.</span>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="nombre" className="block mb-1 text-gray-600">
                  Nombre
                </label>
                <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border ${errors.nombre ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:ring-1 focus:ring-blue-500`}
                />
                {errors.nombre && (
                    <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>
                )}
              </div>

              <div>
                <label htmlFor="correo" className="block mb-1 text-gray-600">
                  Correo Electrónico
                </label>
                <input
                    type="email"
                    id="correo"
                    name="correo"
                    value={formData.correo}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border ${errors.correo ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:ring-1 focus:ring-blue-500`}
                />
                {errors.correo && (
                    <p className="text-red-500 text-sm mt-1">{errors.correo}</p>
                )}
              </div>

              <div>
                <label htmlFor="mensaje" className="block mb-1 text-gray-600">
                  Mensaje
                </label>
                <textarea
                    id="mensaje"
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleChange}
                    rows={5}
                    className={`w-full px-3 py-2 border ${errors.mensaje ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:ring-1 focus:ring-blue-500 resize-y`}
                />
                {errors.mensaje && (
                    <p className="text-red-500 text-sm mt-1">{errors.mensaje}</p>
                )}
              </div>

              {selectedFile && (
                  <div className="flex items-center justify-between bg-blue-50 border border-blue-100 rounded p-3">
                    <div className="flex items-center">
                      <svg className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-sm text-blue-800 truncate max-w-xs">{selectedFile.name}</span>
                    </div>
                    <button
                        type="button"
                        onClick={removeFile}
                        className="text-red-500 hover:text-red-700"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
              )}

              {errors.archivo && (
                  <p className="text-red-500 text-sm">{errors.archivo}</p>
              )}

              <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition duration-300 flex justify-center items-center ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                  style={{backgroundColor:"#5A67F9FF"}}
              >
                {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Enviando...
                    </>
                ) : 'Enviar Mensaje'}
              </button>
            </form>
          </div>

          <div className="w-full md:w-1/2 flex justify-start">
            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
            />

            <div
                ref={dragAreaRef}
                className="w-full max-w-sm h-64 border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all duration-300"
                onClick={handleUploadClick}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
              <svg className="h-12 w-12 text-blue-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <p className="text-gray-600 text-center mb-1">
                Arrastra una imagen aquí<br />o haz clic para seleccionar
              </p>
              <p className="text-xs text-gray-500">Máximo 5MB</p>
            </div>
          </div>
        </div>
      </div>
  );
};

export default ContactForm;