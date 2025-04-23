import { useState, FormEvent, useRef } from 'react';

interface FormData {
  nombre: string;
  correo: string;
  mensaje: string;
}

const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    correo: '',
    mensaje: ''
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const whatsappMessage = `Hola, mi nombre es ${formData.nombre}. Mi correo es ${formData.correo}. ${formData.mensaje}`;
    const whatsappURL = `https://wa.me/1234567890?text=${encodeURIComponent(whatsappMessage)}`;

    window.open(whatsappURL, '_blank');

    setFormData({ nombre: '', correo: '', mensaje: '' });
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '20px',
        fontFamily: 'Arial, sans-serif'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: '40px',
          alignItems: 'center'
        }}>
          <div style={{
            flex: '1 1 300px',
            minWidth: '300px',
            order: 1
          }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#1a365d',
              marginBottom: '10px'
            }}>
              Contáctame
            </h2>
            <div style={{
              width: '100%',
              height: '2px',
              backgroundColor: '#3182ce',
              marginBottom: '20px'
            }}></div>

            <p style={{
              fontSize: '16px',
              color: '#4a5568',
              marginBottom: '20px'
            }}>
              ¿Tienes alguna pregunta o quieres colaborar? Déjanos tu mensaje:
            </p>

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '15px' }}>
                <label htmlFor="nombre" style={{
                  display: 'block',
                  marginBottom: '5px',
                  fontSize: '16px',
                  color: '#4a5568'
                }}>
                  Nombre
                </label>
                <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #e2e8f0',
                      borderRadius: '4px',
                      fontSize: '16px'
                    }}
                    required
                />
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label htmlFor="correo" style={{
                  display: 'block',
                  marginBottom: '5px',
                  fontSize: '16px',
                  color: '#4a5568'
                }}>
                  Correo Electrónico
                </label>
                <input
                    type="email"
                    id="correo"
                    name="correo"
                    value={formData.correo}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #e2e8f0',
                      borderRadius: '4px',
                      fontSize: '16px'
                    }}
                    required
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label htmlFor="mensaje" style={{
                  display: 'block',
                  marginBottom: '5px',
                  fontSize: '16px',
                  color: '#4a5568'
                }}>
                  Mensaje
                </label>
                <textarea
                    id="mensaje"
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleChange}
                    rows={6}
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #e2e8f0',
                      borderRadius: '4px',
                      fontSize: '16px',
                      resize: 'vertical'
                    }}
                    required
                />
              </div>

              {selectedFile && (
                  <div style={{
                    padding: '10px',
                    backgroundColor: '#f0f9ff',
                    borderRadius: '4px',
                    marginBottom: '15px',
                    fontSize: '14px',
                    color: '#3182ce'
                  }}>
                    Archivo seleccionado: {selectedFile.name}
                  </div>
              )}

              <button
                  type="submit"
                  style={{
                    width: '100%',
                    backgroundColor: '#2b4db7',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '12px 0',
                    fontSize: '16px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s'
                  }}
              >
                Enviar Mensaje
              </button>
            </form>
          </div>

          <div style={{
            flex: '1 1 300px',
            minWidth: '300px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '400px',
            order: 2
          }}>
            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }}
            />

            <div className="relative w-full group">
              <div
                  className="relative z-40 cursor-pointer group-hover:translate-x-12 group-hover:shadow-2xl group-hover:-translate-y-12 transition-all duration-500 bg-neutral-900 flex items-center justify-center h-64 w-64 mx-auto rounded-xl"
                  onClick={handleUploadClick}
              >
                <svg
                    className="h-12 w-12 text-white/60"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2"></path>
                  <path d="M7 9l5 -5l5 5"></path>
                  <path d="M12 4l0 12"></path>
                </svg>
              </div>
              <div
                  className="absolute border opacity-0 group-hover:opacity-80 transition-all duration-300 border-dashed border-sky-400 inset-0 z-30 bg-transparent flex items-center justify-center h-64 w-64 mx-auto rounded-xl"
              ></div>
            </div>

            <div style={{
              position: 'absolute',
              textAlign: 'center',
              marginTop: '280px',
              fontSize: '16px',
              color: '#4a5568',
              maxWidth: '250px'
            }}>
              Haz clic para subir una imagen
            </div>
          </div>
        </div>
      </div>
  );
};

export default ContactForm;