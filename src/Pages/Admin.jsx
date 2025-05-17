import { usePostres } from "../Context/PostresContext";
import { useState, useRef, useEffect } from "react";
import { Upload, Star, Trash2, Check, X } from "lucide-react";
import { useAuth } from "../Context/AuthContext";
import { FaRegEdit } from "react-icons/fa";
import { supabase } from "../Supabase/SupabaseClient";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Admin = () => {
  const {
    postres,
    addPostre,
    updatePostre,
    deletePostre,
    toggleDestacado,
    categories,
  } = usePostres();
  const [newPostre, setNewPostre] = useState({
    nombre: "",
    descripcion: "",
    categoria: categories[0],
    imagen_url: [],
  });
  const [editPostre, setEditPostre] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [duplicateFiles, setDuplicateFiles] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const fileInputRef = useRef(null);
  const { logout } = useAuth();
  const [imagePreviews, setImagePreviews] = useState([]);

  useEffect(() => {
    return () => {
      imagePreviews.forEach((preview) => URL.revokeObjectURL(preview.preview));
    };
  }, [imagePreviews]);

  const validateForm = () => {
    const errors = {};

    if (!newPostre.nombre.trim()) {
      errors.nombre = "El nombre es requerido";
    }

    if (!newPostre.descripcion.trim()) {
      errors.descripcion = "La descripción es requerida";
    }

    if (!newPostre.categoria) {
      errors.categoria = "La categoría es requerida";
    }

    if (imageFiles.length === 0 && !editPostre) {
      errors.imagenes = "Debe seleccionar al menos una imagen";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPostre({ ...newPostre, [name]: value });
    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: "" });
    }
  };

  const handleImageChange = async (e) => {
    if (!e.target.files?.length) {
      setFormErrors({
        ...formErrors,
        imagenes: "Debe seleccionar al menos una imagen",
      });
      return;
    }

    const selectedFiles = Array.from(e.target.files);

    setImageFiles((prev) => [...prev, ...selectedFiles]);
    setFormErrors({ ...formErrors, imagenes: "" });

    const newPreviews = selectedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImagePreviews((prev) => [...prev, ...newPreviews]);

    const existingImages = await Promise.all(
      selectedFiles.map(async (file) => {
        const fileName = `public/${file.name}`;
        const exists = await fileExists(fileName);
        return exists ? file.name : null;
      })
    );

    const duplicateImages = existingImages.filter((name) => name !== null);
    setDuplicateFiles(duplicateImages);

    if (duplicateImages.length > 0) {
      showNotification(
        `Las siguientes imágenes ya existen: ${duplicateImages.join(", ")}`,
        "error"
      );
    }

    setNewPostre((prev) => ({
      ...prev,
      imagen_url: [...prev.imagen_url, ...selectedFiles],
    }));
  };

  const fileExists = async (fileName) => {
    const { data, error } = await supabase.storage
      .from("postres-images")
      .list("public", { search: fileName });

    if (error) throw error;
    return data.length > 0;
  };

  const uploadImages = async (files) => {
    const uploadedUrls = [];
    const newDuplicateFiles = [];

    for (const file of files) {
      const fileName = `public/${file.name}`;
      const exists = await fileExists(fileName);

      if (exists) {
        newDuplicateFiles.push(file.name);
        showNotification(`La imagen ${file.name} ya existe`, "error");
        continue;
      }

      const { data, error } = await supabase.storage
        .from("postres-images")
        .upload(fileName, file);

      if (error) {
        showNotification(`Error al subir la imagen ${file.name}`, "error");
        continue;
      }
      uploadedUrls.push(data?.path);
    }

    if (newDuplicateFiles.length > 0) {
      setDuplicateFiles(newDuplicateFiles);
      showNotification(
        `Las siguientes imágenes ya existen: ${newDuplicateFiles.join(", ")}`,
        "error"
      );
    }

    return uploadedUrls;
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFiles = Array.from(e.dataTransfer.files);

      setImageFiles((prev) => [...prev, ...droppedFiles]);

      const newPreviews = droppedFiles.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));

      setImagePreviews((prev) => [...prev, ...newPreviews]);

      const existingImages = await Promise.all(
        droppedFiles.map(async (file) => {
          const fileName = `public/${file.name}`;
          const exists = await fileExists(fileName);
          return exists ? file.name : null;
        })
      );

      const duplicateImages = existingImages.filter((name) => name !== null);
      setDuplicateFiles(duplicateImages);

      if (duplicateImages.length > 0) {
        showNotification(
          `Las siguientes imágenes ya existen: ${duplicateImages.join(", ")}`,
          "error"
        );
      }

      setNewPostre((prev) => ({
        ...prev,
        imagen_url: [...prev.imagen_url, ...droppedFiles],
      }));
      setFormErrors({ ...formErrors, imagenes: "" });
    }
  };

  const handleRemoveImage = (index) => {
    URL.revokeObjectURL(imagePreviews[index].preview);

    setImagePreviews((prev) => prev.filter((_, i) => i !== index));

    setImageFiles((prev) => prev.filter((_, i) => i !== index));

    setNewPostre((prev) => ({
      ...prev,
      imagen_url: prev.imagen_url.filter((_, i) => i !== index),
    }));
  };

  const showNotification = (message, type) => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((notif) => notif.id !== id));
    }, 5000);
  };

  const handleDestacadoToggle = async (id, destacado) => {
    try {
      await toggleDestacado(id, destacado);
      showNotification(
        destacado
          ? "Postre removido de destacados"
          : "Postre marcado como destacado",
        "success"
      );
    } catch (error) {
      showNotification("Error al actualizar el estado destacado", "error");
    }
  };

  const handleEdit = (postre) => {
    setEditPostre(postre);
    setNewPostre({
      nombre: postre.nombre,
      descripcion: postre.descripcion,
      categoria: postre.categoria,
      imagen_url: postre.imagen_url,
    });
    setImageFiles(postre.imagen_url);
    setFormErrors({});
  };

  const handleCancelEdit = () => {
    imagePreviews.forEach((preview) => URL.revokeObjectURL(preview.preview));

    setEditPostre(null);
    setNewPostre({
      nombre: "",
      descripcion: "",
      categoria: categories[0],
      imagen_url: [],
    });
    setImageFiles([]);
    setImagePreviews([]);
    setFormErrors({});
    setDuplicateFiles([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      showNotification(
        "Por favor complete todos los campos requeridos",
        "error"
      );
      return;
    }

    if (duplicateFiles.length > 0) {
      showNotification(
        `Las siguientes imágenes ya existen: ${duplicateFiles.join(", ")}`,
        "error"
      );
      return;
    }

    try {
      const imageUrls = await uploadImages(imageFiles);

      if (imageUrls.length === 0) {
        showNotification("Error al subir las imágenes", "error");
        return;
      }

      const postreWithImages = { ...newPostre, imagen_url: imageUrls };

      if (editPostre) {
        await updatePostre(editPostre.id, postreWithImages);
        setEditPostre(null);
        showNotification("Postre actualizado exitosamente", "success");
      } else {
        await addPostre(postreWithImages);
        showNotification("Postre agregado exitosamente", "success");
      }

      setNewPostre({
        nombre: "",
        descripcion: "",
        categoria: categories[0],
        imagen_url: [],
      });
      setImageFiles([]);
      setDuplicateFiles([]);
      setFormErrors({});
    } catch (error) {
      showNotification("Error al guardar el postre", "error");
    }
  };

  const SUPABASE_URL = import.meta.env.VITE_SUPABASE_STORAGE_URL;

  return (
    <div className="pt-20 pb-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-pink-600 mb-8">
            Panel de Administración
          </h1>
          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded-md mt-6 block"
          >
            Cerrar Sesión
          </button>
        </div>

        {notifications.map((notif, index) => (
          <div
            key={notif.id}
            className={`fixed right-4 p-4 rounded-lg shadow-lg transition-all duration-500 
      ${notif.type === "success" ? "bg-green-500" : "bg-red-500"} 
      text-white flex items-center gap-2 z-50`}
            style={{
              top: `${index * 60 + 20}px`, // Espaciado dinámico entre notificaciones
              opacity: 1,
              transform: `translateY(0)`,
            }}
          >
            {notif.type === "success" ? <Check size={20} /> : <X size={20} />}
            {notif.message}
          </div>
        ))}

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-pink-600 mb-4">
            {editPostre ? "Editar Postre" : "Agregar Nuevo Postre"}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Nombre
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={newPostre.nombre}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 ${
                    formErrors.nombre ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {formErrors.nombre && (
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors.nombre}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Categoría
                </label>
                <select
                  name="categoria"
                  value={newPostre.categoria}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 ${
                    formErrors.categoria ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                {formErrors.categoria && (
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors.categoria}
                  </p>
                )}
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Descripción
                </label>
                <textarea
                  name="descripcion"
                  value={newPostre.descripcion}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 ${
                    formErrors.descripcion
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  rows={4}
                />
                {formErrors.descripcion && (
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors.descripcion}
                  </p>
                )}
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Imágenes
                </label>
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center ${
                    dragActive
                      ? "border-pink-500 bg-pink-50"
                      : formErrors.imagenes
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    multiple
                    accept="image/*"
                    className="hidden"
                    name="imagenes"
                  />
                  <div className="flex flex-col items-center">
                    <Upload className="w-12 h-12 text-gray-400 mb-4" />
                    <p className="text-gray-600 mb-2">
                      Arrastra y suelta tus imágenes aquí o
                    </p>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="text-pink-600 hover:text-pink-700"
                    >
                      selecciona los archivos
                    </button>
                  </div>
                  {imageFiles.length > 0 && (
                    <div className="mt-4">
                      <p className="text-sm text-gray-600">
                        {imageFiles.length} archivo(s) seleccionado(s)
                      </p>
                    </div>
                  )}
                  {formErrors.imagenes && (
                    <p className="text-red-500 text-xs mt-1">
                      {formErrors.imagenes}
                    </p>
                  )}
                  {duplicateFiles.length > 0 && (
                    <div className="mt-4 text-sm text-red-500">
                      <p>Las siguientes imágenes ya existen:</p>
                      <ul>
                        {duplicateFiles.map((fileName, index) => (
                          <li key={index}>{fileName}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                {imagePreviews.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">
                      Previsualización de Imágenes
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {imagePreviews.map((preview, index) => (
                        <div
                          key={index}
                          className="relative bg-gray-100 p-2 rounded-lg shadow-md"
                        >
                          <img
                            src={preview.preview}
                            aria-label={`Preview ${index + 1}`}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-32 object-cover rounded-md"
                          />
                          <div className="text-xs text-gray-700 mt-2">
                            <p className="truncate">
                              <strong>Nombre:</strong> {preview.file.name}
                            </p>
                            <p>
                              <strong>Tipo:</strong> {preview.file.type}
                            </p>
                            <p>
                              <strong>Tamaño:</strong>{" "}
                              {(preview.file.size / 1024).toFixed(2)} KB
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(index)}
                            className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex gap-4 mt-6">
              <button
                type="submit"
                className="bg-pink-600 text-white py-2 px-6 rounded-lg hover:bg-pink-700 transition-colors flex items-center gap-2"
              >
                <Check size={20} />
                {editPostre ? "Actualizar Postre" : "Agregar Postre"}
              </button>
              {editPostre && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="bg-gray-400 text-white py-2 px-6 rounded-lg hover:bg-gray-500 transition-colors flex items-center gap-2"
                >
                  <X size={20} />
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-pink-600 mb-4">
            Postres Existentes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {postres.map((postre) => (
              <div
                key={postre.id}
                className="border rounded-lg p-4 relative group"
              >
                <div className="absolute top-2 right-2 flex gap-2 z-10">
                  <button
                    onClick={() =>
                      handleDestacadoToggle(postre.id, postre.postre_destacado)
                    }
                    className={`p-2 rounded-full transition-colors ${
                      postre.postre_destacado
                        ? "bg-yellow-400 hover:bg-yellow-500"
                        : "bg-gray-200 hover:bg-gray-300"
                    }`}
                    title={
                      postre.postre_destacado
                        ? "Quitar de destacados"
                        : "Marcar como destacado"
                    }
                  >
                    <Star
                      size={20}
                      className={`transition-colors ${
                        postre.postre_destacado
                          ? "text-white fill-yellow-400"
                          : "text-gray-600"
                      }`}
                    />
                  </button>
                  <button
                    onClick={() => handleEdit(postre)}
                    className="p-2 rounded-full transition-colors bg-blue-400 hover:bg-blue-500"
                    title="Editar postre"
                  >
                    <FaRegEdit size={20} className="text-white" />
                  </button>
                  <button
                    onClick={() => deletePostre(postre.id)}
                    className="p-2 bg-red-100 rounded-full hover:bg-red-200 transition-colors"
                    title="Eliminar postre"
                  >
                    <Trash2 size={20} className="text-red-600" />
                  </button>
                </div>

                <Swiper
                  modules={[Navigation, Pagination, Autoplay]}
                  navigation
                  pagination={{ clickable: true }}
                  autoplay={{ delay: 5000, disableOnInteraction: false }}
                  loop={postre.imagen_url.length > 1}
                  className="aspect-[16/9] w-full object-cover"
                >
                  {postre.imagen_url.map((imageUrl, index) => (
                    <SwiperSlide key={index}>
                      <img
                        src={`${SUPABASE_URL}/${imageUrl}`}
                        aria-label={`${postre.nombre} - Imagen ${index + 1}`}
                        alt={postre.nombre}
                        className="aspect-[16/9] w-full object-cover"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="inline-block bg-pink-100 text-pink-600 text-sm px-3 py-1 rounded-full mb-4">
                      {postre.categoria}
                    </span>
                  </div>
                  <h3 className="font-semibold text-lg">{postre.nombre}</h3>
                  <p className="text-gray-600 line-clamp-2">
                    {postre.descripcion}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
