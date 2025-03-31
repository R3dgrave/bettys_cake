import { useState, useEffect } from "react";
import { usePostres } from "../Context/PostresContext";
import { supabase } from "../Supabase/SupabaseClient";
import PostreCard from "../Components/PostreCard";
import { motion } from "framer-motion";

const Menu = () => {
  const { postres } = usePostres();
  const [filtro, setFiltro] = useState("todo");
  const [categorias, setCategorias] = useState(["todo"]);

  useEffect(() => {
    const fetchCategorias = async () => {
      const { data, error } = await supabase
        .from("postres")
        .select("categoria");
      if (!error) {
        const categoriasUnicas = [
          "todo",
          ...new Set(data.map((p) => p.categoria)),
        ];
        setCategorias(categoriasUnicas);
      }
    };
    fetchCategorias();
  }, []);

  const postresFiltrados =
    filtro === "todo"
      ? postres
      : postres.filter((postre) => postre.categoria === filtro);

  const SUPABASE_URL = import.meta.env.VITE_SUPABASE_STORAGE_URL;

  return (
    <div className="pt-16 pb-8">
      <div className="container mx-auto px-4 py-8">
        <motion.h1
          className="text-3xl font-bold text-pink-600 mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Nuestro Menú
        </motion.h1>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {categorias.map((categoria) => (
            <motion.button
              key={categoria}
              onClick={() => setFiltro(categoria)}
              className={`cursor-pointer uppercase px-4 py-2 rounded-full transition-colors ${
                filtro === categoria
                  ? "bg-pink-600 text-white"
                  : "bg-pink-100 text-pink-600 hover:bg-pink-200"
              }`}
              whileHover={{ scale: 1.1 }}
            >
              {categoria}
            </motion.button>
          ))}
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {postresFiltrados.length > 0 ? (
            postresFiltrados.map((postre) => {
              const images =
                Array.isArray(postre.imagen_url) && postre.imagen_url.length > 0
                  ? postre.imagen_url.map((url) => `${SUPABASE_URL}/${url}`)
                  : ["/placeholder-image.jpg"];
              return <PostreCard key={postre.id} {...postre} images={images} />;
            })
          ) : (
            <div className="col-span-full text-center">
              <p className="text-gray-600">No hay postres disponibles</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Menu;
