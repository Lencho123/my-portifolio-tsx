import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ExperienceCard from "../components/ExperienceCard";

const experiences = [
  {
    role: "Full-Stack Developer",
    company: "Kenna Learning",
    description: [
      "Built multilingual learning platform",
      "Real-time features using WebSockets",
      "Go + React + MongoDB + Supabase",
    ],
  },
  {
    role: "Backend Engineer",
    company: "RemedyMate",
    description: [
      "APIs that analyze input and provide suggestions",
      "Optimized for low-bandwidth use",
      "Go + Next.js + Flutter",
    ],
  },
  {
    role: "Backend Engineer",
    company: "IKnow",
    description: [
      "CRUD APIs for exam management",
      "Documentation for future maintainability",
      "Go + MongoDB + Supabase",
    ],
  },
  {
    role: "Data Science Challenge (Top 5 Finish)",
    company: "Zindi",
    description: [
      "PM2.5 prediction using satellite + weather data",
      "Feature engineering & model optimization",
    ],
  },
];

const ExperienceSection: React.FC = () => {
  const [cards, setCards] = useState(experiences);

  useEffect(() => {
      setCards((prev) => {
        const first = prev[0];
        const rest = prev.slice(1);
        return [...rest, first]; // move first card to end
      });

  }, []);

  const prevCard = () => {
    setCards((prev) => {
      const last = prev[prev.length - 1];
      const rest = prev.slice(0, prev.length - 1);
      return [last, ...rest]; // move last card to start
    });
  };

  const nextCard = () => {
    setCards((prev) => {
      const first = prev[0];
      const rest = prev.slice(1);
      return [...rest, first]; // move first card to end
    });
  };

  return (
    <section id="experience" className="py-20 bg-gray-50 dark:bg-gray-900 relative">
      <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
        Professional Experience
      </h2>

      {/* Navigation Buttons */}
      <button
        onClick={prevCard}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 p-3 bg-white dark:bg-gray-800 rounded-full shadow hover:bg-gray-100 dark:hover:bg-gray-700 transition"
      >
        <FaChevronLeft />
      </button>
      <button
        onClick={nextCard}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 p-3 bg-white dark:bg-gray-800 rounded-full shadow hover:bg-gray-100 dark:hover:bg-gray-700 transition"
      >
        <FaChevronRight />
      </button>

      {/* Carousel */}
      <div className="flex justify-center overflow-hidden px-6 md:px-20">
        <motion.div
          className="flex gap-6"
          animate={{ x: "-33.333%" }}
          transition={{ repeat: Infinity, repeatType: "loop", duration: 20, ease: "linear" }}
        >
          {cards.concat(cards).map((exp, index) => (
            <ExperienceCard key={index} exp={exp} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;
