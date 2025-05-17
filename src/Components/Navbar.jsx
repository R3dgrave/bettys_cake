import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { FaTiktok, FaInstagram, FaFacebook } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-pink-50 fixed w-full z-20 top-0 start-0 border-b border-pink-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center space-x-3">
          <img
            src="/logo.png"
            aria-label="Bettys' Cakes"
            alt="Bettys' Cakes"
            className="w-8 h-8"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-pink-600">
            Bettys' Cakes
          </span>
        </Link>

        <div className="flex md:hidden space-x-3 md:space-x-0">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-pink-600 rounded-lg md:hidden hover:bg-pink-100 focus:outline-none focus:ring-2 focus:ring-pink-200"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <div
          className={`${isOpen ? "block" : "hidden"} w-full md:block md:w-auto`}
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-pink-100 rounded-lg bg-pink-50 md:space-x-8 md:flex-row md:mt-0 md:border-0 md:bg-pink-50">
            <li>
              <Link
                to="/"
                className="block py-2 px-3 text-pink-600 rounded hover:bg-pink-100 md:hover:bg-transparent md:hover:text-pink-700 md:p-0"
                aria-label="Inicio"
              >
                Inicio
              </Link>
            </li>
            <li>
              <Link
                to="/menu"
                className="block py-2 px-3 text-pink-600 rounded hover:bg-pink-100 md:hover:bg-transparent md:hover:text-pink-700 md:p-0"
                aria-label="Menú"
              >
                Menú
              </Link>
            </li>
            <li>
              <Link
                to="/contacto"
                className="block py-2 px-3 text-pink-600 rounded hover:bg-pink-100 md:hover:bg-transparent md:hover:text-pink-700 md:p-0"
                aria-label="Contacto"
              >
                Contacto
              </Link>
            </li>
          </ul>
          <div className="flex justify-center space-x-5 mt-4 md:hidden">
            <a
              href="#"
              className="text-pink-600 hover:text-pink-700"
              aria-label="TikTok"
            >
              <FaTiktok size={24} />
              <span className="sr-only">TikTok</span>
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
              aria-label="Facebook"
            >
              <FaFacebook size={24} />
              <span className="sr-only">Facebook</span>
            </a>
          </div>
        </div>

        <div className="hidden md:flex mt-4 space-x-5 sm:mt-0">
          <a
            href="#"
            className="text-pink-600 hover:text-pink-700"
            aria-label="TikTok"
          >
            <FaTiktok size={24} />
            <span className="sr-only">TikTok</span>
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
            aria-label="Facebook"
          >
            <FaFacebook size={24} />
            <span className="sr-only">Facebook</span>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
