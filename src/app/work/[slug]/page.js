import { notFound } from "next/navigation";
import ProjectDetail from "../../components/ProjectDetail";
import {
  getNextProject,
  getProjectImages,
  getProjectById,
  PROJECTS,
  PERSONAL,
} from "../../data/portfolio";

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.id }));
}

export function generateMetadata({ params }) {
  const project = getProjectById(params.slug);
  if (!project) return {};

  return {
    title: project.name,
    description: project.description,
    alternates: { canonical: `/work/${project.id}/` },
    openGraph: {
      title: `${project.name} | ${PERSONAL.name}`,
      description: project.description,
      url: new URL(`/work/${project.id}/`, PERSONAL.website).href,
      images: [
        {
          url: getProjectImages(project)[0]?.src || project.thumbnail,
          alt: `${project.name} interface`,
        },
      ],
    },
  };
}

export default function ProjectPage({ params }) {
  const project = getProjectById(params.slug);
  if (!project) notFound();

  return (
    <ProjectDetail project={project} nextProject={getNextProject(project)} />
  );
}
