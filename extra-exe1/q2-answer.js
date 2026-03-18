function sanitizeUsername(input) {
  // 1. Requirement: Allow only letters, digits, underscores, and dashes
  // [^...] means "match anything NOT in this set"
  // /g means "global" (replace all occurrences)
  let sanitized = input.replace(/[^A-Za-z0-9_-]/g, "_");

  // 2. Requirement: Limit length to 20 characters
  // substring(start, end) ensures we don't exceed the boundary
  return sanitized.substring(0, 20);
}