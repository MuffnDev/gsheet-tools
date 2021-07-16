import { flatten } from './arrays';
import { asBoolean } from './conversion';
import { gcd } from './math';
import { isValid } from './validation';

/**
 * Gets the label that has the minimum units.
 * @param {any[]} labels The list of labels.
 * @param {number[]} units The number of units of each label.
 * @param {boolean} [include0=false] By default, 0 units is considered as an empty cell, and so that value is ignored. Set this parameter to true to include 0.
 * @return Returns the label that has the minimum units.
 * @customfunction
 */
export function minUnits(labels: any[], units: number[], include0 = false): any {
  labels = flatten(labels);
  units = flatten(units);
  include0 = asBoolean(include0);

  const length = Math.min(labels.length, units.length);
  let minLabel = null;
  let minUnits = null;
  // For each label
  for (let i = 0; i < length; i++) {
    // If the label doesn't have any unit and 0 is excluded, skip
    if (!isValid(units[i]) || (!include0 && units[i] === 0)) {
      continue;
    }

    // If the current label has less units than the current max, replace it
    if (minUnits === null || units[i] < minUnits) {
      minUnits = units[i];
      minLabel = labels[i];
    }
  }

  return minLabel;
}

/**
 * Gets the label that has the maximum units.
 * @param {any[]} labels The list of labels.
 * @param {number[]} units The number of units of each label.
 * @param {boolean} [include0=false] By default, 0 units is considered as an empty cell, and so that value is ignored. Set this parameter to true to include 0.
 * @return Returns the label that has the maximum units.
 * @customfunction
 */
export function maxUnits(labels: any[], units: number[], include0 = false): any {
  labels = flatten(labels);
  units = flatten(units);
  include0 = asBoolean(include0);

  const length = Math.min(labels.length, units.length);
  let maxLabel = null;
  let maxUnits = null;
  // For each label
  for (let i = 0; i < length; i++) {
    // If the label doesn't have any unit and 0 is excluded, skip
    if (!isValid(units[i]) || (!include0 && units[i] === 0)) {
      continue;
    }

    // If the current label has more units than the current max, replace it
    if (maxUnits === null || units[i] > maxUnits) {
      maxUnits = units[i];
      maxLabel = labels[i];
    }
  }

  return maxLabel;
}

/**
 * Gets the label bound to the median value of the units.
 * @param {any[]} labels The list of labels.
 * @param {number[]} units The number of units of each label.
 * @param {boolean} [descending=0] By default, units and their bound labels are sorted by ascending orders. Set this parameter to true to sort them in descending order.
 * @param {boolean} [include0=false] By default, 0 units is considered as an empty cell, and so that value is ignored. Set this parameter to true to include 0.
 * @return Returns the label bound to the median value of the units.
 * @customfunction
 */
export function medianUnits(labels: any[], units: number[], descending = false, include0 = false): any {
  labels = flatten(labels);
  units = flatten(units);
  descending = asBoolean(include0);
  include0 = asBoolean(include0);

  let length = Math.min(labels.length, units.length);
  // Create a "bindings" array, which is a collection of objects that group labels and their units.
  const bindings = [];
  for (let i = 0; i < length; i++) {
    bindings.push({label: labels[i], units: units[i]});
  }
  // Sort bindings per units (ascending by default, descending if the parameter is set to true)
  bindings.sort((a, b) => {
    if (a.units === b.units) { return 0; }
    const comp = a.units - b.units;
    return !descending ? comp : comp * -1;
  });

  // Add the number of units of each label in an array, so we can get the median one
  const labelsArray = [];
  // Compute the GCD of units, so we can reduce the amount of labels to add into the array
  const unitsGCD = gcd(units);
  for (let i = 0; i < bindings.length; i++) {
    // If the label doesn't have any unit and 0 is excluded, skip
    if (!isValid(bindings[i].units) || (!include0 && bindings[i].units === 0)) {
      continue;
    }

    for (let j = 0; j < bindings[i].units / unitsGCD; j++) {
      labelsArray.push(bindings[i].label);
    }
  }

  return labelsArray.length > 0 ? labelsArray[Math.floor(labelsArray.length / 2)]: '';
}