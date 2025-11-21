import React, { useState } from "react";
import { FaEnvelope, FaPhone, FaLinkedin } from "react-icons/fa";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "Full-stack",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Sending...");
    try {
      await fetch("https://your-google-sheet-endpoint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      setStatus("Message sent successfully!");
      setFormData({ name: "", email: "", service: "Full-stack", message: "" });
    } catch (err) {
      setStatus("Failed to send message. Try again.");
    }
  };

  return (
    <section id="contact" className="py-20 bg-white dark:bg-gray-900">
      <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
        Let's Connect!
      </h2>

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10 px-6">
        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="p-3 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="p-3 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            required
          />
          <select
            name="service"
            value={formData.service}
            onChange={handleChange}
            className="p-3 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          >
            <option>Full-stack</option>
            <option>Backend</option>
            <option>Web Development</option>
            <option>Other</option>
          </select>
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            rows={5}
            className="p-3 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            required
          ></textarea>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white py-3 rounded transition"
          >
            Send Message
          </button>
          {status && <p className="text-gray-700 dark:text-gray-300 mt-2">{status}</p>}
        </form>

        {/* Direct Contact Info */}
        <div className="flex-1 flex flex-col gap-4 justify-center">
          <div className="flex items-center gap-4 text-gray-700 dark:text-gray-300">
            <FaEnvelope />
            <a href="mailto:lencholachisa11@gmail.com" className="hover:underline">
                lencholachisa11@gmail.com
            </a>
            </div>

            <div className="flex items-center gap-4 text-gray-700 dark:text-gray-300">
            <FaPhone />
            <a href="tel:+251910510428" className="hover:underline">
                +251 910 510 428
            </a>
            </div>

          <div className="flex items-center gap-4 text-gray-700 dark:text-gray-300">
            <FaLinkedin />
            <a
              href="https://linkedin.com/in/lencholachisa"
              target="_blank"
              rel="noreferrer"
              className="hover:underline"
            >
              LinkedIn Profile
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;