/**
 * Recursively freeze nested objects / functions within the object.
 * @param {Object} obj 
 * @returns A frozen object with all its frozen nested objects / functions.
 */
export const deepFreeze = (obj) => {
  if (typeof obj === 'undefined') {
    return obj;
  }

  Object.getOwnPropertyNames(obj).forEach((prop) => {
    if (obj[prop] !== null && 
      (typeof obj[prop] === "object" || typeof obj[prop] === "function") &&
      !Object.isFrozen(obj[prop])
    ) {
      deepFreeze(obj[prop]);
    }
  });

  return Object.freeze(obj);
}