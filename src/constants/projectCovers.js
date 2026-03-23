/**
 * SEA-O₂ and ReOrbit cover images in `public/`.
 * Next.js serves them at /seao2.png and /reorbit.png.
 *
 * If the grid cards show the wrong artwork for each project (e.g. PDF exports
 * were saved under the opposite filename), set this to `true`:
 */
export const SWAP_SEAO2_REORBIT_COVER_FILES = true;

const RAW_SEAO2 = '/seao2.png';
const RAW_REORBIT = '/reorbit.png';

/** Bump when replacing PNGs so browsers/CDNs don’t keep stale thumbnails. */
const COVER_CACHE = '?v=6';

const seaFile = SWAP_SEAO2_REORBIT_COVER_FILES ? RAW_REORBIT : RAW_SEAO2;
const reoFile = SWAP_SEAO2_REORBIT_COVER_FILES ? RAW_SEAO2 : RAW_REORBIT;

export const SEO2_COVER_SRC = `${seaFile}${COVER_CACHE}`;
export const REORBIT_COVER_SRC = `${reoFile}${COVER_CACHE}`;
