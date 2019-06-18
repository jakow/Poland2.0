export interface Opengraph {
  title: string;
  description: string;
  url: string;
  image: string;
  type?: string;
}

export interface TwitterCard {
  site: string;
  title: string;
  description: string;
  image: string;
  imageAlt?: string;
}

export function twitterUsername(twitterUrl: string) {
  const lastSlash = twitterUrl.lastIndexOf('/');
  const uname = twitterUrl.endsWith('/') ? twitterUrl.slice(lastSlash + 1, -1) : twitterUrl.slice(lastSlash + 1);
  return '@' + uname;
}
