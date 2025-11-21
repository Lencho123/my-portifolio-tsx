import { FaQuoteLeft } from "react-icons/fa";


interface Testimonial {
  name: string;
  role: string;
  photo: string;
  comment: string;
}

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg flex flex-col items-center text-center w-80">
      <img
        src={testimonial.photo}
        alt={testimonial.name}
        className="w-20 h-20 rounded-full mb-4 object-cover"
      />
      <FaQuoteLeft className="text-blue-500 mb-2 text-2xl" />
      <p className="text-gray-700 dark:text-gray-300 mb-4">{testimonial.comment}</p>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{testimonial.name}</h3>
      <p className="text-gray-500 dark:text-gray-400 text-sm">{testimonial.role}</p>
    </div>
  );
};

export default TestimonialCard