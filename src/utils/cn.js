import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Utility for merging Tailwind classes with conflict resolution.
 * @param {...(string|undefined|null|boolean|object)} inputs
 * @returns {string}
 */
export const cn = (...inputs) => twMerge(clsx(inputs))
