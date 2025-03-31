import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { supabase } from "../Supabase/SupabaseClient";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isResetPassword, setIsResetPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Por favor ingresa tu correo y contraseña.");
      return;
    }

    if (!validateEmail(email)) {
      setError("El correo electrónico ingresado no es válido.");
      return;
    }

    try {
      await login(email, password);
      navigate("/admin");
    } catch (err) {
      setError("Credenciales inválidas. Verifica tu correo y contraseña.");
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!email) {
      setError("Por favor ingresa tu correo electrónico.");
      return;
    }

    if (!validateEmail(email)) {
      setError("El correo electrónico ingresado no es válido.");
      return;
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + "/reset-password",
    });
    if (error) {
      setError("Error al restablecer la contraseña. " + error.message);
    } else {
      setMessage(
        "Se ha enviado un enlace para restablecer la contraseña a tu correo."
      );
    }
  };

  return (
    <div className="pt-20 pb-8">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
          <h1 className="text-2xl font-bold text-pink-600 mb-6 text-center">
            {isResetPassword ? "Restablecer Contraseña" : "Iniciar Sesión"}
          </h1>

          {error && (
            <div className="text-red-500 bg-red-100 p-3 mb-4 rounded-md">
              {error}
            </div>
          )}

          {message && (
            <div className="text-green-500 bg-green-100 p-3 mb-4 rounded-md">
              {message}
            </div>
          )}

          <form onSubmit={isResetPassword ? handleResetPassword : handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500"
              />
            </div>
            {!isResetPassword && (
              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Contraseña
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500"
                />
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-pink-600 text-white py-2 px-4 rounded-lg hover:bg-pink-700 transition-colors"
            >
              {isResetPassword ? "Restablecer Contraseña" : "Iniciar Sesión"}
            </button>

            {!isResetPassword ? (
              <button
                type="button"
                onClick={() => setIsResetPassword(true)}
                className="w-full flex justify-end mt-4 text-pink-600 hover:underline"
              >
                ¿Olvidaste tu contraseña?
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsResetPassword(false)}
                className="w-full flex justify-end mt-4 text-pink-600 hover:underline"
              >
                Volver a Iniciar Sesión
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
