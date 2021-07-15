/**
 * Gets the value bound to the given label. In order to make it work correctly, the labels range and the values range must have the same length.
 * @param {string} label The label of the value you want to get.
 * @param {string[]} labels The range of all labels.
 * @param {any[]} values The range of all values.
 * @returns {any} Returns the value bound to the given label.
 * @customfunction
 */
function getLabelledValue(label, labels, values) {
  labels = flatten(labels);
  values = flatten(values);

  const length = Math.min(labels.length, values.length);
  for(let i = 0; i < length; i++) {
    if (labels[i] === label) {
      return values[i];
    }
  }
  return '';
}