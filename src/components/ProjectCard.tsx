import { type FC } from "react";


interface ProjectProps {
project: {
name: string;
description: string;
tech: string[];
img: string;
github: string;
live: string;
};
}


const ProjectCard: FC<ProjectProps> = ({ project }) => {
return (
<div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:scale-105 transition-transform">
<img src={project.img} alt={project.name} className="w-full h-40 object-cover" />


<div className="p-5">
<h3 className="text-xl font-semibold mb-2">{project.name}</h3>


<p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
{project.description}
</p>


<div className="flex flex-wrap gap-2 mb-4">
{project.tech.map((t, i) => (
<span
key={i}
className="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-700 rounded-full"
>
{t}
</span>
))}
</div>


<div className="flex justify-between">
<a
href={project.github}
target="_blank"
className="text-blue-600 dark:text-blue-400 hover:underline"
>
GitHub
</a>
<a
href={project.live}
target="_blank"
className="text-green-600 dark:text-green-400 hover:underline"
>
Live Demo
</a>
</div>
</div>
</div>
);
};


export default ProjectCard;