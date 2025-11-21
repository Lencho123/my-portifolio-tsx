import React from "react";

interface ExperienceCardProps {
  exp: {
    role: string;
    company: string;
    description: string[];
  };
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ exp }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg w-72 flex-shrink-0">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        {exp.role}
      </h3>
      <h4 className="text-gray-700 dark:text-gray-300 font-medium mb-3">
        {exp.company}
      </h4>
      <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
        {exp.description.map((line, i) => (
          <li key={i}>{line}</li>
        ))}
      </ul>
    </div>
  );
};

export default ExperienceCard;
