import TestimonialCard from "../components/TestimonialCard";

interface Testimonial {
  name: string;
  role: string;
  photo: string;
  comment: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Ruth Johnson",
    role: "Project Teammate",
    photo: "/testimonials/ruth.jpg",
    comment: "Lencho is calm, methodical, and provides clear guidance. Great to collaborate with!",
  },
  {
    name: "Michael Smith",
    role: "Teaching Assistant",
    photo: "/testimonials/michael.jpg",
    comment: "Impressive problem-solving skills and consistent attention to detail.",
  },
  {
    name: "Sarah Lee",
    role: "Supervisor",
    photo: "/testimonials/sarah.jpg",
    comment: "Demonstrates strong ownership and delivers high-quality work on time.",
  },
];


const TestimonialSection = () => {
  return (
    <section id="testimonial" className="py-20 bg-gray-50 dark:bg-gray-900">
      <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
        Testimonials
      </h2>

      <div className="flex flex-wrap justify-center gap-8 px-6 md:px-20">
        {testimonials.map((t, index) => (
          <TestimonialCard key={index} testimonial={t} />
        ))}
      </div>
    </section>
  );
};

export default TestimonialSection;
