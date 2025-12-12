import { createClient, type ClientConfig } from "next-sanity";

export type SanityButton = {
  buttonText?: string;
  anchorLink?: string;
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
    projectList?: Project[];
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
  date?: string;
};

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION;
const readToken = process.env.SANITY_API_READ_TOKEN;
const studioUrl = process.env.SANITY_STUDIO_URL;
const defaultRevalidate = 60;

type FetchOptions = {
  preview?: boolean;
};

const sharedConfig: ClientConfig = {
  projectId,
  dataset,
  apiVersion,
};

function getClient(preview: boolean) {
  if (preview && readToken) {
    return createClient({
      ...sharedConfig,
      token: readToken,
      useCdn: false,
      perspective: "previewDrafts",
      stega: { enabled: true, studioUrl },
    });
  }

  return createClient({
    ...sharedConfig,
    useCdn: true,
    perspective: "published",
    stega: { enabled: false },
  });
}

const siteSettingsQuery = `
*[_type == "siteSettings"][0]{
  footerText,
  "logoUrl": logo.asset->url,
  headerButtons[]{
    buttonText,
    anchorLink,
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
      anchorLink,
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
      anchorLink,
      "buttonUrl": coalesce(buttonUrl, select(defined(internalLink->slug.current) => "/projects/" + internalLink->slug.current))
    },
    "projectList": projectList[]->{
      title,
      "slug": slug.current,
      description,
      location,
      category,
      "mainImageUrl": mainImage.asset->url,
      date
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
  "mainImageUrl": mainImage.asset->url,
  date
}
`;

export async function getSiteSettings({ preview = false }: FetchOptions = {}): Promise<SiteSettings | null> {
  const client = getClient(preview);
  const fetchOptions = preview ? { cache: "no-store" as const } : { next: { revalidate: defaultRevalidate } };
  return client.fetch<SiteSettings>(siteSettingsQuery, {}, fetchOptions);
}

export async function getHomePageData({ preview = false }: FetchOptions = {}): Promise<HomePageData | null> {
  const client = getClient(preview);
  const fetchOptions = preview ? { cache: "no-store" as const } : { next: { revalidate: defaultRevalidate } };
  return client.fetch<HomePageData>(homePageQuery, {}, fetchOptions);
}

export async function getProjects({ preview = false }: FetchOptions = {}): Promise<Project[]> {
  const client = getClient(preview);
  const fetchOptions = preview ? { cache: "no-store" as const } : { next: { revalidate: defaultRevalidate } };
  return client.fetch<Project[]>(projectsQuery, {}, fetchOptions);
}
