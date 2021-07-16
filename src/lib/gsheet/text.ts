import { forEach } from './arrays';
import { isValid } from './validation';

/**
 * Converts a text into a URL-friendly slug.
 * This can be useful to deal with data with quotes, which can cause issues with GSheet.
 * @param {string} text The input text to "slugify".
 * @return {string} Returns the processed text.
 * @customfunction
 */
export function slug(text: string): string {
  if (!isValid(text)) {
    return '';
  }

  return text
    // Filter string by removing spaces and force lowercase
    .trim()
    .toLowerCase()
    // Process accents, and remove only the combining part, but not the letter
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    // Replace spaces or selected symbols with an hyphen
    .replace(/(\s|#|_|\\|\/|\|)+/g, '-')
    // Remove hyphens doubles
    .replace(/-{2,}/g, '')
    // Finally, remove any other character
    .replace(/[^\w\s#-]/g, '');
}

/**
 * Converts the data in the given range into slugs, as a 1D array.
 * @param {...any} ranges The cell or ranges of values to convert into slugs.
 * @return {string[]} Returns a 1D array with the processed data.
 * @customfunction
 */
export function slugAll(...ranges: any[]): string[] {
  return forEach(item => {
    return slug(item);
  }, ...ranges);
}

/**
 * Converts the data in the given range into unique slugs, as a 1D array. If several values ha the same slug, this function adds a -X
 * suffix to it, where X is the number of occurencies.
 * @param {...any} ranges The cell or range of values to convert into unique slugs.
 * @returns {string[]} Returns a 1D array with the processed data.
 * @customfunction
 */
export function slugAllUnique(...ranges: any[]): string[] {
  const occurrences = new Map<string, number>();

  return forEach(item => {
    if (!isValid(item)) {
      return '';
    }

    let itemSlug = slug(item);
    let nbOccurrences = occurrences.get(itemSlug) || 0;
    occurrences.set(itemSlug, nbOccurrences + 1);
    return nbOccurrences > 0 ? `${itemSlug}-${nbOccurrences}` : itemSlug;
  }, ...ranges);
}