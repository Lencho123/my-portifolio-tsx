import { FaGithub, FaLinkedin, FaYoutube, FaTiktok, FaFacebook } from "react-icons/fa";

const Footer = () => {
  const navLinks = ["Home", "Services", "Portfolio", "Experience", "Contact"];

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 py-6">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        {/* Left: Copyright */}
        <div className="text-gray-700 dark:text-gray-300 mb-4 md:mb-0">
          © 2025 Lencho Lachisa
        </div>

        {/* Center: Navigation Links */}
        <div className="flex gap-6 mb-4 md:mb-0">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Right: Social Icons */}
        <div className="flex gap-4">
          <a href="https://github.com/lencholachisa" target="_blank" rel="noreferrer">
            <FaGithub className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition" />
          </a>
          <a href="https://linkedin.com/in/lencholachisa" target="_blank" rel="noreferrer">
            <FaLinkedin className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition" />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noreferrer">
            <FaYoutube className="text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition" />
          </a>
          <a href="https://tiktok.com" target="_blank" rel="noreferrer">
            <FaTiktok className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition" />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noreferrer">
            <FaFacebook className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
