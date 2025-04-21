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
    <div className="relative bg-indigo-500 py-6 px-4 text-white">
      <div className="max-w-2xl mx-auto z-10">
        <h2 className="text-3xl font-semibold text-center mb-8">CONTÁCTAME</h2>

        <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
          <div className="w-full">
            <label htmlFor="name" className="block mb-1">Nombre</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Tu nombre aquí"
              className="w-full px-4 py-2 rounded bg-white text-gray-700 border border-white focus:outline-none"
              required
            />
          </div>

          <div className="w-full">
            <label htmlFor="phone" className="block mb-1">Teléfono</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="opcional"
              className="w-full px-4 py-2 rounded bg-white text-gray-700 border border-white focus:outline-none"
            />
          </div>

          <div className="w-full">
            <label htmlFor="message" className="block mb-1">Mensaje para Paco</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Aquí escribe tu mensaje"
              className="w-full px-4 py-2 rounded bg-white text-gray-700 border border-white h-32 focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded transition duration-300"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
