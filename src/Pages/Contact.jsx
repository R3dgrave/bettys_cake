import { Phone, Mail } from "lucide-react";
import { FaWhatsapp, FaInstagram, FaTiktok, FaFacebook } from "react-icons/fa";

const Contact = () => {
  const contactInfo = {
    whatsapp: "+1234567890",
    instagram: "@bettyscakes_77",
    tiktok: "@bettyscakes_77",
    facebook: "@bettyscakes_77",
    email: "info@bettyscakes.com",
    phone: "(123) 456-7890",
  };

  return (
    <div className="pt-20 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-pink-600 text-center mb-8">
            Contáctanos
          </h1>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Contact Information */}
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-pink-600 mb-6">
                  Información de Contacto
                </h2>

                <div className="space-y-4">
                  <a
                    href={`tel:${contactInfo.phone}`}
                    className="flex items-center space-x-4 text-gray-600 hover:text-pink-600 transition-colors"
                  >
                    <div className="bg-pink-100 p-3 rounded-full">
                      <Phone className="w-6 h-6 text-pink-600" />
                    </div>
                    <span>{contactInfo.phone}</span>
                  </a>

                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="flex items-center space-x-4 text-gray-600 hover:text-pink-600 transition-colors"
                  >
                    <div className="bg-pink-100 p-3 rounded-full">
                      <Mail className="w-6 h-6 text-pink-600" />
                    </div>
                    <span>{contactInfo.email}</span>
                  </a>
                </div>
              </div>

              {/* Social Media */}
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-pink-600 mb-6">
                  Redes Sociales
                </h2>

                <div className="space-y-4">
                  <a
                    href={`https://wa.me/${contactInfo.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-4 text-gray-600 hover:text-green-600 transition-colors"
                  >
                    <div className="bg-green-100 p-3 rounded-full">
                      <FaWhatsapp className="w-6 h-6 text-green-600" />
                    </div>
                    <span>WhatsApp</span>
                  </a>

                  <a
                    href={`https://instagram.com/${contactInfo.instagram.substring(
                      1
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-4 text-gray-600 hover:text-purple-600 transition-colors"
                  >
                    <div className="bg-purple-100 p-3 rounded-full">
                      <FaInstagram className="w-6 h-6 text-purple-600" />
                    </div>
                    <span>{contactInfo.instagram}</span>
                  </a>

                  <a
                    href={`https://tiktok.com/${contactInfo.tiktok}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-4 text-gray-600 hover:text-black transition-colors"
                  >
                    <div className="bg-gray-100 p-3 rounded-full">
                      <FaTiktok className="w-6 h-6 text-black" />
                    </div>
                    <span>{contactInfo.tiktok}</span>
                  </a>

                  <a
                    href={`https://facebook.com/${contactInfo.facebook}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-4 text-gray-600 hover:text-black transition-colors"
                  >
                    <div className="bg-gray-100 p-3 rounded-full">
                      <FaFacebook className="w-6 h-6 text-blue-600" />
                    </div>
                    <span>{contactInfo.facebook}</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="mt-12">
              <h2 className="text-2xl font-semibold text-pink-600 mb-6">
                Envíanos un Mensaje
              </h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Nombre
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500"
                      placeholder="Tu nombre"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500"
                      placeholder="tu@email.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Mensaje
                  </label>
                  <textarea
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500 h-32"
                    placeholder="Tu mensaje..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="bg-pink-600 text-white px-8 py-3 rounded-lg hover:bg-pink-700 transition-colors"
                >
                  Enviar Mensaje
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
