import { useParams } from "react-router-dom";
import { usePostres } from "../Context/PostresContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { FaWhatsapp } from "react-icons/fa";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const MenuDetails = () => {
  const { id } = useParams();
  const { postres } = usePostres();
  const postre = postres.find((p) => p.id === Number(id));

  if (!postre) {
    return (
      <div className="pt-20 text-center">
        <h1 className="text-2xl text-pink-600">Postre no encontrado</h1>
      </div>
    );
  }

  const SUPABASE_URL = import.meta.env.VITE_SUPABASE_STORAGE_URL;

  const images =
    Array.isArray(postre.imagen_url) && postre.imagen_url.length > 0
      ? postre.imagen_url.map(
          (url) => `${SUPABASE_URL}/${url}`
        )
      : ["/placeholder-image.jpg"];

  return (
    <div className="pt-20 pb-8">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Image Slider */}
            <div className="h-[300px] md:h-full lg:h-[600px] relative">
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 5000, disableOnInteraction: false }} 
                loop={images.length > 1}
                className="h-full w-full rounded-l-lg"
              >
                {images.map((imagen, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={imagen}
                      aria-label={`${postre.nombre} - Imagen ${index + 1}`}
                      alt={`${postre.nombre} - Imagen ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Product Details */}
            <div className="p-8 flex flex-col">
              <div className="mb-6">
                <span className="inline-block bg-pink-100 text-pink-600 text-sm px-3 py-1 rounded-full mb-4">
                  {postre.categoria}
                </span>
                <h1 className="text-3xl font-bold text-pink-600 mb-4">
                  {postre.nombre}
                </h1>
                <div className="prose prose-pink max-w-none mb-8">
                  <p className="text-gray-600 text-lg leading-relaxed">
                    {postre.descripcion}
                  </p>
                </div>
              </div>

              <div className="mt-auto">
                <button
                  onClick={() =>
                    window.open(
                      `https://wa.me/1234567890?text=Hola, me interesa el postre ${postre.nombre}`
                    )
                  }
                  className="cursor-pointer w-full bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                >
                  <FaWhatsapp size={24} />
                  Ordenar por WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuDetails;