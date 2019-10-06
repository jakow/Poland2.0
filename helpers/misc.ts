import getConfig from 'next/config';

const { publicRuntimeConfig, serverRuntimeConfig } = getConfig();

export const api = async (path: string, init?: RequestInit) => {
  const host = serverRuntimeConfig.host || publicRuntimeConfig.host;
  const response = await fetch(`${host}/${path}`, init);
  const json = await response.json();
  if (!response.ok) {
    throw Error(json.message);
  }

  return json;
};
