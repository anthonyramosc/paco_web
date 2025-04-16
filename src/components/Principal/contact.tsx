import { useState, FormEvent } from 'react';

interface ContactFormData {
  name: string;
  phone: string;
  message: string;
}

const Contact = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    phone: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
    alert('Mensaje enviado con éxito');
    setFormData({ name: '', phone: '', message: '' });
  };

  return (
    <div className="w-full bg-blue-600 py-12 px-4">
      <div className="max-w-md mx-auto">
        <h2 className="text-3xl font-semibold text-center text-white mb-8">CONTÁCTAME</h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <div className="mb-4 w-full">
            <label htmlFor="name" className="block text-white mb-2">Nombre</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Tu nombre aquí"
              className="w-full px-4 py-2 rounded bg-white border border-blue-600"
              required
            />
          </div>
          
          <div className="mb-4 w-full">
            <label htmlFor="phone" className="block text-white mb-2">Teléfono</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="opcional"
              className="w-full px-4 py-2 rounded bg-white border border-blue-600"
            />
          </div>
          
          <div className="mb-6 w-full">
            <label htmlFor="message" className="block text-white mb-2">Mensaje para Paco</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Aquí escribe tu mensaje"
              className="w-full px-4 py-2 rounded bg-white border border-blue-600 h-32"
              required
            ></textarea>
          </div>
          
          <button 
            type="submit"
            className="w-full max-w-md bg-orange-500 hover:bg-orange-600 text-white py-3 rounded transition duration-300"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
