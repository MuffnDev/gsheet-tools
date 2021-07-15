/**
 * Converts a text into a URL-friendly slug.
 * This can be useful to deal with data with quotes, which can cause issues with GSheet.
 * @param {string} text The input text to "slugify".
 * @return {string} Returns the processed text.
 * @customfunction
 */
function slug(text) {
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
 * Converts a text into a unique URL-friendly slug.
 * @param {string} text The input text to "slugify".
 * @param {any|any[]} [...ranges] The cell or range of values where to find an equivalent slug, so a unique id can be added to the result.
 * @return {string} Returns the processed text.
 */
function slugUnique(text, ...ranges) {
  let occurences = 0;
  const tmpSlug = slug(text);
  forEach(item => {
    if (slug(item) === tmpSlug) {
      occurences++;
    }
  }, ranges);

  occurences--;
  return occurences > 0 ? `${tmpSlug}-${occurences}` : tmpSlug;
}