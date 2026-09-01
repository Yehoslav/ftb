import { PUBLIC_DEMO } from '$env/static/public';

/**
 * True when this build targets the colleague-facing demo site.
 *
 * Set PUBLIC_DEMO="1" at build time on the demo deploy so it stays out of
 * search indexes (robots meta + X-Robots-Tag). The production build leaves it
 * unset. Do not gate on $app/environment dev — the demo is a production build.
 */
export const isDemo = ['1', 'true', 'TRUE'].includes(PUBLIC_DEMO);