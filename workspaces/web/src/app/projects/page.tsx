/* eslint-disable @next/next/no-img-element */
import Layout from "@/components/Layout";
import { getProjects, getSiteSettings } from "@/lib/sanity";
import "@/styles/projects.scss";

export default async function ProjectsPage() {
  const [projects, siteSettings] = await Promise.all([
    getProjects({ preview: false }),
    getSiteSettings({ preview: false }),
  ]);

  const headerButtons = siteSettings?.headerButtons || [];
  const footerText = siteSettings?.footerText;
  const projectList = projects || [];

  return (
    <Layout headerButtons={headerButtons} footerText={footerText}>
      <section className="container project-page">
        <h1 className="text simple-h1">Projetos Realizados</h1>
        {projectList.length === 0 ? (
          <p className="text simple-paragraph">
            Nenhum projeto disponível no momento.
          </p>
        ) : (
          <div className="project-grid">
            {projectList.map((project, index) => (
              <div key={project.slug || index} className="project-card">
                {project.mainImageUrl ? (
                  <img
                    src={project.mainImageUrl}
                    alt={project.title || "Projeto"}
                    className="project-image"
                  />
                ) : null}
                <div className="project-info">
                  <h2 className="text simple-h2">{project.title}</h2>
                  <p className="text simple-paragraph">{project.description}</p>
                  {project.location ? (
                    <p className="text location">
                      <strong>Local:</strong> {project.location}
                    </p>
                  ) : null}
                  {project.category ? (
                    <p className="text category">
                      <strong>Categoria:</strong> {project.category}
                    </p>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </Layout>
  );
}
