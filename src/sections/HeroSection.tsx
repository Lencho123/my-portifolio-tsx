import React from "react";
import profilePic from "../assets/images/profile2.jpg"; // replace with your image path
import { FaLinkedin, FaGithub } from "react-icons/fa";

const HeroSection: React.FC = () => {
  return (
    <section
      id="home"
      className="min-h-screen py-2 flex flex-col md:flex-row items-center justify-center px-4 md:px-20 bg-white dark:bg-gray-900"
    >
      {/* Left: Profile Image */}
      <div className="w-48 h-48 md:w-64 md:h-64 mb-8 md:mb-0 md:mr-12 flex-shrink-0 ">
        <div className="w-full h-full rounded-full overflow-hidden border-4 border-blue-500 animate-pulse">
          <img
            src={profilePic}
            alt="Lencho Lachisa"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Right: Introduction */}
      <div className="flex-1 text-center md:text-left">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Software Engineer | Full-Stack Developer | Backend Specialist
        </h1>
        <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg md:text-xl">
          I build scalable web applications, craft APIs, and bring ideas to life with
          clean and efficient code.
        </p>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-4 mb-6">
          <a
            href="#contact"
            className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Hire Me
          </a>
        </div>

        {/* Social Links */}
        <div className="flex justify-center md:justify-start gap-6 text-2xl text-gray-700 dark:text-gray-300">
          <a href="https://www.linkedin.com/in/lencho-lachisa-linckedin/" target="_blank" rel="noreferrer">
            <FaLinkedin className="hover:text-blue-500 transition-colors" />
          </a>
          <a href="https://github.com/lencho123" target="_blank" rel="noreferrer">
            <FaGithub className="hover:text-gray-800 dark:hover:text-white transition-colors" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
