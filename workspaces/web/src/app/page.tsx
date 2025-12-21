/* eslint-disable @next/next/no-img-element */
import TeaserButtons from "@/components/TeaserButtons";
import FaqList from "@/components/FaqList";
import Layout from "@/components/Layout";
import ProjectsCarousel from "@/components/ProjectsCarousel";
import { getHomePageData, getSiteSettings } from "@/lib/sanity";

export default async function Home() {
  const [homeData, siteSettings] = await Promise.all([
    getHomePageData({ preview: false }),
    getSiteSettings({ preview: false }),
  ]);

  const headerButtons = siteSettings?.headerButtons || [];
  const footerText = siteSettings?.footerText;

  if (!homeData) {
    return (
      <Layout headerButtons={headerButtons} footerText={footerText}>
        <section className="container about-us">
          <div className="container container-about-us">
            <h2 className="text simple-h2">Conteúdo não encontrado</h2>
            <p className="text simple-paragraph">
              Não foi possível carregar os dados da página inicial no momento.
            </p>
          </div>
        </section>
      </Layout>
    );
  }

  const { teaser, sobreNos, projetos, faq } = homeData;

  return (
    <Layout headerButtons={headerButtons} footerText={footerText}>
      <section className="container home-teaser">
        {teaser?.teaserBackgroundVideoUrl ? (
          <video
            className="home-teaser-image-bg"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
          >
            <source src={teaser.teaserBackgroundVideoUrl} type="video/mp4" />
          </video>
        ) : teaser?.teaserBackgroundUrl ? (
          <img
            src={teaser.teaserBackgroundUrl}
            alt="Teaser Background"
            className="image home-teaser-image-bg"
            loading="eager"
            fetchPriority="high"
          />
        ) : null}
        <div className="container container-teaser">
          <div className="container container-text">
            {teaser?.logoUrl ? (
              <img
                src={teaser.logoUrl}
                alt="Logo"
                className="image home-teaser-logo"
                loading="eager"
                fetchPriority="high"
              />
            ) : null}
            {teaser?.homeTitle ? (
              <h1 className="text simple-h1">{teaser.homeTitle}</h1>
            ) : null}
          </div>
          {teaser?.buttons?.length ? (
            <TeaserButtons buttons={teaser.buttons} />
          ) : null}
        </div>

      </section>

      {sobreNos ? (
        <section className="container about-us" id="sobre-nos">
          <div className="container container-about-us">
            <h2 className="text simple-h2">{sobreNos.title}</h2>
            <p className="text simple-paragraph">{sobreNos.description}</p>
          </div>
        </section>
      ) : null}

      {projetos ? (
        <section className="container projects" id="projetos">
          <div className="container container-projects">
            <h2 className="text simple-h2">{projetos.title}</h2>
            {projetos.projectList && projetos.projectList.length > 0 ? (
              <ProjectsCarousel projects={projetos.projectList} />
            ) : (
              <div className="project-images">
                {projetos.image1Url ? (
                  <img
                    src={projetos.image1Url}
                    alt="Project Image 1"
                    className="project-image"
                    loading="lazy"
                  />
                ) : null}
                {projetos.image2Url ? (
                  <img
                    src={projetos.image2Url}
                    alt="Project Image 2"
                    className="project-image"
                    loading="lazy"
                  />
                ) : null}
              </div>
            )}
            {Array.isArray(projetos.buttons) && projetos.buttons.length
              ? projetos.buttons.map((button, index) => (
                <div key={index} className="button">
                  <a href={button.buttonUrl || "#"} className="button-link">
                    {button.buttonText}
                  </a>
                </div>
              ))
              : null}
          </div>
        </section>
      ) : null}

      {faq ? (
        <section className="container faq" id="faq">
          <h2 className="text simple-h2">{faq.title}</h2>
          <FaqList items={faq.listOfFaq} />
        </section>
      ) : null}
    </Layout>
  );
}
