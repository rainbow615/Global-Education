/**
 * must include uppercase
 * must include lowercase
 * must include special character
 * must include number
 */
export const passwordPattern = (options = {}) => {
  let exp = '^';
  options.lowercase && exp += '(?=.*[a-z])';
  options.uppercase && exp += '(?=.*[A-Z])';
  options.special && exp += '(?=.*[-+_!@#$%^&*.,?])';
  options.number && exp += '(?=.*\\d)';
  exp += '.+$'
  return new RegExp(exp)
}
