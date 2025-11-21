import { type FC } from "react";
import ProjectCard from "../components/ProjectCard";


const projects = [
{
name: "Kenna Learning",
description: "Multilingual learning platform with real‑time features.",
tech: ["React", "Go", "MongoDB", "Supabase"],
img: "/projects/kenna.png",
github: "https://github.com/kenna",
live: "https://kenna.live",
},
{
name: "RemedyMate",
description: "Health suggestion platform optimized for low bandwidth.",
tech: ["Go", "Next.js", "Flutter"],
img: "/projects/remedymate.png",
github: "https://github.com/remedymate",
live: "https://remedymate.live",
},
{
name: "IKnow",
description: "Backend APIs for exam content management.",
tech: ["Go", "MongoDB", "Supabase"],
img: "/projects/iknow.png",
github: "https://github.com/iknow",
live: "https://iknow.live",
},
{
name: "BankDash Dashboard",
description: "Modular analytics dashboard with admin insights.",
tech: ["React", "TypeScript", "TailwindCSS"],
img: "/projects/bankdash.png",
github: "https://github.com/bankdash",
live: "https://bankdash.live",
},
];


const ProjectSection: FC = () => {
return (
<section id="portfolio" className="py-20">
<div className="container mx-auto px-4">
<h2 className="text-3xl font-bold mb-12 text-center">Portfolio Projects</h2>


<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
{projects.map((project, i) => (
<ProjectCard key={i} project={project} />
))}
</div>
</div>
</section>
);
};


export default ProjectSection;