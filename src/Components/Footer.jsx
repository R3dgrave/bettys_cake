import { FaTiktok, FaInstagram, FaFacebook } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-pink-50 border-t border-pink-200">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between md:gap-x-6 lg:gap-x-0">
          <div className="mb-6 md:mb-0">
            <Link to="/" className="flex items-center gap-2">
              <img
                src="/logo.png"
                aria-label="Bettys' Cakes"
                alt="Bettys' Cakes"
                className="w-10 h-10"
              />
              <span className="self-center text-2xl font-semibold whitespace-normal break-words text-pink-600">
                Bettys' Cakes
              </span>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-pink-900 uppercase">
                Enlaces
              </h2>
              <ul className="text-pink-600 font-medium">
                <li className="mb-4">
                  <Link to="/" className="hover:text-pink-700">
                    Inicio
                  </Link>
                </li>
                <li className="mb-4">
                  <Link to="/menu" className="hover:text-pink-700">
                    Menú
                  </Link>
                </li>
                <li>
                  <Link to="/contacto" className="hover:text-pink-700">
                    Contacto
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-pink-900 uppercase">
                Contacto
              </h2>
              <ul className="text-pink-600 font-medium">
                <li className="mb-4">
                  <p>Tel: +56 9 7823 4567</p>
                </li>
                <li>
                  <p className="whitespace-normal break-words">
                    Email: bettyscakes_2023@gmail.com
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-pink-200 sm:mx-auto lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-pink-600 sm:text-center">
            © 2024 Bettys' Cakes™. Todos los derechos reservados.
          </span>
          <div className="flex mt-4 space-x-5 sm:justify-center sm:mt-0">
            <a
              href="#"
              className="text-pink-600 hover:text-pink-700"
              aria-label="Facebook"
            >
              <FaTiktok size={24} />
              <span className="sr-only">Facebook</span>
            </a>
            <a
              href="#"
              className="text-pink-600 hover:text-pink-700"
              aria-label="Instagram"
            >
              <FaInstagram size={24} />
              <span className="sr-only">Instagram</span>
            </a>
            <a
              href="#"
              className="text-pink-600 hover:text-pink-700"
              aria-label="Twitter"
            >
              <FaFacebook size={24} />
              <span className="sr-only">Twitter</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
