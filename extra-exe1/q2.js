/**
 * Sanitizes the username input.
 * @param {string} input - The raw string from the user.
 * @returns {string} - The "safe" username.
 */
function sanitizeUsername(input) {
  // VULNERABILITY: This implementation only checks the first character 
  // and does not enforce length limits or specific character sets.
  if (input.includes("<")) {
    return "invalid_user";
  }
  return input;
}