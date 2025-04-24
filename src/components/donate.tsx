import { useState, FormEvent } from 'react';

interface DonateFormData {
  fullName: string;
  idNumber: string;
  email: string;
  phone: string;
  amount: string;
  acceptTerms: boolean;
}

interface DonateProps {
  onSubmit: (formData: DonateFormData) => void;
}

const DonateComponent = ({ onSubmit }: DonateProps) => {
  const [formData, setFormData] = useState<DonateFormData>({
    fullName: '',
    idNumber: '',
    email: '',
    phone: '',
    amount: '',
    acceptTerms: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleAnonymousDonate = () => {
    console.log('Donación anónima iniciada');
  };

  return (
    <div className="bg-indigo-500 relative py-16 px-6">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10">
        {/* IZQUIERDA */}
        <div className="lg:w-1/2 w-full space-y-6">
          <h2 className="text-white text-3xl font-bold text-center lg:text-left">DONAR</h2>
          <p className="text-white text-lg text-center lg:text-left">
            “Con tu Donacion puedes ser parte de este de esta ayuda para crear Prótesis. Si tu corazón te llama a donar más o menos, cada contribución es bienvenida con un profundo agradecimiento”
          </p>

          <div className="rounded-full "  style={{ display:"flex", justifyContent:"center"}}>
            <button
              onClick={handleAnonymousDonate}
              className=" text-white font-bold py-2 px-6 rounded transition duration-300"
              style={{backgroundColor:'#f54900', display:"flex", justifyContent:"center"}}
            >
              DONAR ANÓNIMAMENTE
            </button>
          </div>

          <p className="text-white text-lg text-center lg:text-left">
            También puedes dejarnos tus datos, estos serán usados para brindarte información sobre como se usa tu donación.
          </p>

          <form onSubmit={handleSubmit} className="space-y-3 flex flex-col gap-3">
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Nombres completos"
              className="w-full h-10 p-3 bg-white rounded focus:outline-none"
              required
            />

            <input
              type="text"
              name="idNumber"
              value={formData.idNumber}
              onChange={handleChange}
              placeholder="Número de cédula"
              className="w-full h-10 p-3 bg-white rounded focus:outline-none"
              required
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Correo electrónico"
              className="w-full h-10 p-3 bg-white rounded focus:outline-none"
              required
            />

            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Número de teléfono"
              className="w-full h-10 p-3 bg-white rounded focus:outline-none"
              required
            />

            <input
              type="text"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Cantidad a donar"
              className="w-full h-10 p-3 bg-white rounded focus:outline-none"
              required
            />

            <div className="flex items-center text-white text-sm">
              <input
                type="checkbox"
                id="terms"
                name="acceptTerms"
                checked={formData.acceptTerms}
                onChange={handleChange}
                className="mr-2"
                required
              />
              <label htmlFor="terms">Aceptar términos y condiciones</label>
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-1 px-4 rounded transition duration-300 h-11"
              style={{backgroundColor:'#f54900'}}
            >
              DONAR
            </button>
          </form>
        </div>

        {/* DERECHA: VIDEO */}
        <div className="lg:w-1/2 w-full flex justify-center">
          <div className="rounded-xl overflow-hidden shadow-lg max-w-xs w-full aspect-[9/16]">
            <video controls className="w-full h-full object-cover rounded-xl">
              <source src="https://test.tryclicksolutions.com/wp-content/uploads/2024/11/cuento-contigo-59395984-4484compartir-es-una-ayuda-sin-limites-protesis-pacoel_mwnUaka0.mp4" type="video/mp4" />
              Tu navegador no soporta videos.
            </video>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonateComponent;
