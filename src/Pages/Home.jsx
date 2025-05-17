import { useState, useEffect } from "react";
import { usePostres } from "../Context/PostresContext";
import { Star, Clock, Truck, Phone, Heart } from "lucide-react";
import { FaWhatsapp, FaInstagram, FaTiktok, FaFacebook } from "react-icons/fa";
import PostreCard from "../Components/PostreCard";
import { Link } from "react-router-dom";

const Home = () => {
  const { fetchHomePostres } = usePostres();

  const [homePostres, setHomePostres] = useState([]);

  useEffect(() => {
    const loadPostres = async () => {
      const data = await fetchHomePostres();
      setHomePostres(data);
    };
    loadPostres();

    const updateImage = () => {
      if (window.innerWidth < 640) {
        setImageSrc("/banner-mobile.png");
      } else if (window.innerWidth < 1024) {
        setImageSrc("/banner-desktop.png");
      } else {
        setImageSrc("/banner-desktop.png");
      }
    };

    updateImage();
    window.addEventListener("resize", updateImage);

    return () => window.removeEventListener("resize", updateImage); // Cleanup
  }, []);

  // Responsive Image
  const [imageSrc, setImageSrc] = useState("/banner-desktop.png");

  const SUPABASE_URL = import.meta.env.VITE_SUPABASE_STORAGE_URL;
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img
            src={imageSrc}
            aria-label="Bettys Cakes Background"
            alt="Bettys Cakes Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-opacity-50"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              ¡Bienvenidos a Bettys' Cakes!
            </h1>
            <p className="text-xl text-white mb-8">
              Endulza tus momentos con pasteles únicos y deliciosos
            </p>
            <a
              href="#featured"
              className="inline-block bg-pink-600 text-white px-8 py-3 rounded-lg hover:bg-pink-700 transition-colors"
            >
              Ver Nuestros Postres
            </a>
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2">
                <img
                  src="/hero2.webp"
                  aria-label="Chef Pastelera"
                  alt="Chef Pastelera"
                  className="rounded-lg filter drop-shadow-lg"
                />
              </div>
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold text-pink-600 mb-4">
                  Sobre Mí
                </h2>
                <p className="text-black font-light mb-4">
                  Hola, soy Betty, la pastelera detrás de Bettys' Cakes. Hago
                  repostería artesanal para público en general. Sabemos lo
                  complicado que puede ser encontrar pasteles únicos y
                  deliciosos que cumplan tus expectativas. Por eso, en
                  <strong> Bettys´ Cakes</strong> ofrecemos una atención
                  totalmente personalizada para crear el pastel ideal para esa
                  ocasión especial. Elaboro una amplia variedad de productos
                  como tortas, queques, cheesecakes y tartaletas, usando
                  ingredientes frescos de alta calidad y sin preservantes para
                  que cada bocado sea una experiencia inolvidable.
                </p>
                <p className="text-black font-light mb-4">
                  Hacemos entregas previa coordinación con el cliente. Puedes
                  contactarnos fácilmente por los siguientes medios:
                </p>
                <div className="flex flex-col gap-2 items-start text-pink-600">
                  <div className="flex flex-row flex-wrap gap-4 items-start">
                    <a
                      href="https://wa.me/56978234567"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-pink-600 flex items-center font-semibold hover:underline"
                    >
                      <FaWhatsapp className="w-6 h-6 mr-2" />
                      <span> +56 9 7823 4567</span>
                    </a>
                    <a
                      href="https://www.instagram.com/bettyscakes_77/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-pink-600 flex items-center font-semibold hover:underline"
                    >
                      <FaInstagram className="w-6 h-6 mr-2" />
                      <span>bettyscakes_77</span>
                    </a>
                    <a
                      href="https://www.tiktok.com/@bettyscakes_77"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-pink-600 flex items-center font-semibold hover:underline"
                    >
                      <FaTiktok className="w-6 h-6 mr-2" />
                      <span>bettyscakes_77</span>
                    </a>
                    <a
                      href="https://www.facebook.com/@bettyscakes_77"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-pink-600 flex items-center font-semibold hover:underline"
                    >
                      <FaFacebook className="w-6 h-6 mr-2" />
                      <span>bettysCake</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-pink-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <Star className="w-12 h-12 text-pink-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-pink-600 mb-2">
                Calidad Premium
              </h3>
              <p className="text-gray-600">
                Ingredientes seleccionados y recetas artesanales para el mejor
                sabor
              </p>
            </div>
            <div className="text-center p-6">
              <Clock className="w-12 h-12 text-pink-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-pink-600 mb-2">
                Horneado Diario
              </h3>
              <p className="text-gray-600">
                Postres frescos caseros horneados previo pedido
              </p>
            </div>
            <div className="text-center p-6">
              <Truck className="w-12 h-12 text-pink-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-pink-600 mb-2">
                Modo de entrega Retiro o Domicilio
              </h3>
              <p className="text-gray-600">
                Llevamos la dulzura directamente a tu puerta
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="featured" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-pink-600 mb-8 text-center">
            Nuestros Postres Destacados
          </h2>
          {homePostres.length === 0 ? (
            <p>No hay postres disponibles</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {homePostres.map((postre) => (
                <PostreCard
                  key={postre.id}
                  {...postre}
                  images={postre.imagen_url.map(
                    (url) => `${SUPABASE_URL}/${url}`
                  )}
                />
              ))}
            </div>
          )}
          <div className="flex justify-center mt-8">
            <Link
              to="/menu"
              className="bg-pink-600 text-white px-8 py-3 rounded-lg hover:bg-pink-700 transition-colors"
            >
              Ver Menu
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-pink-600 mb-8">
              ¿Tienes Alguna Pregunta?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Estamos aquí para ayudarte a hacer tu día más dulce
            </p>
            <div className="flex items-center justify-center space-x-4">
              <Phone className="w-6 h-6 text-pink-600" />
              <span className="text-lg text-pink-600">
                Llámanos al: (123) 456-7890
              </span>
            </div>
            <div className="mt-8">
              <button className="bg-pink-600 text-white px-8 py-3 rounded-lg hover:bg-pink-700 transition-colors">
                Contactar
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
