/**
 * useReducedMotion — respects prefers-reduced-motion system preference.
 * Returns true if the user has requested reduced motion.
 */
export function useReducedMotion() {
  if (typeof window === 'undefined') return false;
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  return mq.matches;
}
