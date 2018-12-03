/* eslint no-param-reassign: ["error", { "props": false }] */

let lastId = 0;

/**
 * generate unique ID for key
 * @param {String} prefix the prefix for the id
 * @return {String} the unique ID
 */
// eslint-disable-next-line
export function keyGenerator(prefix = "folio") {
  lastId += 1;
  return prefix + lastId;
}
