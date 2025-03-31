import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../Supabase/SupabaseClient";

const PostresContext = createContext();

export const PostresProvider = ({ children }) => {
  const [postres, setPostres] = useState([]);
  const categories = ["Tortas", "Cheesecakes", "Queques", "Postres"];

  const fetchPostres = async () => {
    const { data, error } = await supabase.from("postres").select("*");
    if (error) throw error;
    else setPostres(data);
  };

  const addPostre = async (postre) => {
    const { data, error } = await supabase
      .from("postres")
      .insert([{ ...postre, postre_destacado: false }])
      .select();
    if (error) throw error;
    else setPostres([...postres, ...data]);
  };

  const updatePostre = async (id, updatedPostre) => {
    const { data, error } = await supabase
      .from("postres")
      .update(updatedPostre)
      .eq("id", id)
      .select();

    if (error) {
      
    } else {
      setPostres(
        postres.map((postre) =>
          postre.id === id ? { ...postre, ...updatedPostre } : postre
        )
      );
    }
  };

  const toggleDestacado = async (id, estadoActual) => {
    const { error } = await supabase
      .from("postres")
      .update({ postre_destacado: !estadoActual })
      .eq("id", id);
    if (error) {
      throw error;
    } else {
      setPostres(
        postres.map((postre) =>
          postre.id === id ? { ...postre, postre_destacado: !estadoActual } : postre
        )
      );
    }
  };

  const deletePostre = async (id) => {
    const { error } = await supabase.from("postres").delete().eq("id", id);
    if (error) throw error;
    else setPostres(postres.filter((p) => p.id !== id));
  };

  const fetchHomePostres = async () => {
    const { data, error } = await supabase
      .from("postres")
      .select("*")
      .eq("postre_destacado", true);
  
    if (error) throw error;

    return data;
  };

  useEffect(() => {
    fetchPostres();
  }, []);

  return (
    <PostresContext.Provider
      value={{
        postres,
        fetchPostres,
        addPostre,
        updatePostre,
        deletePostre,
        toggleDestacado,
        fetchHomePostres,
        categories,
      }}
    >
      {children}
    </PostresContext.Provider>
  );
};

export const usePostres = () => {
  return useContext(PostresContext);
};
