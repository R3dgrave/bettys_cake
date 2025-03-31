import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const PostreCard = ({ id, nombre, descripcion, categoria, images= [] }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl h-full flex flex-col">
        <Link to={`/postre/${id}`} key={id} className="flex flex-col h-full">
          <div className="relative w-full">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              loop={images.length > 1}
              className="aspect-square"
            >
              {images.map((imagen, index) => (
                <SwiperSlide key={index} className="h-full">
                  <img
                    src={imagen}
                    alt={`${nombre} - Imagen ${index + 1}`}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="p-4 flex flex-col flex-grow">
              <div className="flex items-start justify-between mb-3">
                <motion.span
                  className="inline-block bg-pink-100 text-pink-600 text-sm px-3 py-1 rounded-full"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {categoria}
                </motion.span>
              </div>
              <h3 className="text-xl font-semibold text-pink-600 mb-2 line-clamp-2">
                {nombre}
              </h3>
              <p className="text-gray-600 line-clamp-1 flex-grow">
                {descripcion}
              </p>
              <motion.div
                className="mt-4 text-pink-600 font-medium text-sm"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                Ver detalles →
              </motion.div>
            </div>
          </div>
        </Link>
      </div>
    </motion.div>
  );
};

export default PostreCard;
