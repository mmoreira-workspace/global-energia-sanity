import { createClient } from "@sanity/client";

export type SanityButton = {
  buttonText?: string;
  buttonUrl?: string;
};

export type SiteSettings = {
  logoUrl?: string;
  footerText?: string;
  headerButtons?: SanityButton[];
};

export type HomePageData = {
  teaser?: {
    homeTitle?: string;
    logoUrl?: string;
    teaserBackgroundUrl?: string;
    teaserBackgroundVideoUrl?: string;
    buttons?: SanityButton[];
  };
  sobreNos?: {
    title?: string;
    description?: string;
    imageUrl?: string;
  };
  projetos?: {
    title?: string;
    description?: string;
    image1Url?: string;
    image2Url?: string;
    buttons?: SanityButton[];
  };
  faq?: {
    title?: string;
    listOfFaq?: {
      question?: string;
      answer?: string;
    }[];
  };
};

export type Project = {
  title?: string;
  slug?: string;
  description?: string;
  location?: string;
  category?: string;
  mainImageUrl?: string;
};

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "j87m344w";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01";

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
});

const revalidate = 60;

const siteSettingsQuery = `
*[_type == "siteSettings"][0]{
  footerText,
  "logoUrl": logo.asset->url,
  headerButtons[]{
    buttonText,
    "buttonUrl": coalesce(buttonUrl, select(defined(internalLink->slug.current) => "/projects/" + internalLink->slug.current))
  }
}
`;

const homePageQuery = `
*[_type == "homePage"][0]{
  "teaser": teaser->{
    homeTitle,
    "logoUrl": logo.asset->url,
    "teaserBackgroundUrl": teaserBackground.asset->url,
    "teaserBackgroundVideoUrl": teaserBackgroundVideo.asset->url,
    buttons[]{
      buttonText,
      "buttonUrl": coalesce(buttonUrl, select(defined(internalLink->slug.current) => "/projects/" + internalLink->slug.current))
    }
  },
  "sobreNos": sobreNos->{
    title,
    description,
    "imageUrl": image.asset->url
  },
  "projetos": projetos->{
    title,
    description,
    "image1Url": image1.asset->url,
    "image2Url": image2.asset->url,
    buttons[]{
      buttonText,
      "buttonUrl": coalesce(buttonUrl, select(defined(internalLink->slug.current) => "/projects/" + internalLink->slug.current))
    }
  },
  "faq": faq->{
    title,
    listOfFaq[]{
      question,
      answer
    }
  }
}
`;

const projectsQuery = `
*[_type == "projectPage"] | order(date desc){
  title,
  "slug": slug.current,
  description,
  location,
  category,
  "mainImageUrl": mainImage.asset->url
}
`;

export async function getSiteSettings(): Promise<SiteSettings | null> {
  return client.fetch<SiteSettings>(siteSettingsQuery, {}, { next: { revalidate } });
}

export async function getHomePageData(): Promise<HomePageData | null> {
  return client.fetch<HomePageData>(homePageQuery, {}, { next: { revalidate } });
}

export async function getProjects(): Promise<Project[]> {
  return client.fetch<Project[]>(projectsQuery, {}, { next: { revalidate } });
}
