import { motion } from "framer-motion";

export default function ServicesSection() {
  const services = [
    {
      title: "Frontend Development",
      description:
        "I build clean, fast, and responsive UI using React, Tailwind, and modern web tools.",
    },
    {
      title: "Backend Development",
      description:
        "I develop secure and scalable APIs with Go, MongoDB, and cloud‑ready architecture.",
    },
    {
      title: "Product & System Design",
      description:
        "I design user‑centric systems with focus on simplicity, performance, and clarity.",
    },
  ];

  return (
    <section
      id="services"
      className="min-h-screen flex flex-col justify-center items-center px-6 py-20 bg-white dark:bg-gray-900"
    >
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-4xl font-bold text-gray-900 dark:text-white mb-12"
      >
        Services
      </motion.h2>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl w-full">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="p-6 rounded-2xl shadow-lg bg-gray-100 dark:bg-gray-800 hover:shadow-xl transition-shadow duration-300"
          >
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              {service.title}
            </h3>
            <p className="text-gray-700 dark:text-gray-300">{service.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
