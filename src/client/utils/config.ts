const fullPath = (document.currentScript as any)?.src ?? '';
export const DISTRIBUTION_URL = fullPath.substring(0, fullPath.lastIndexOf('/'));

export const getAssetUrl = (path: string) => `${DISTRIBUTION_URL}/assets/${path}`;
export const capitalizeFirstLetter = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);
