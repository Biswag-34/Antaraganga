import manifest from '@/content/media-manifest.json';
export function getMedia(id: string) {
  const asset = manifest.images.find((a) => a.id === id);
  if (!asset) throw new Error(`Unknown media: ${id}`);
  return asset;
}
export const artwork = (path: string) => `/media/support/${path}`;
