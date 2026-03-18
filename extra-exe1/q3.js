/**
 * Fetches user profile from a URL.
 * @param {string} url 
 * @returns {Object|null}
 */
async function fetchUserProfile(url) {
  try {
    const response = await fetch(url);
    // VULNERABILITY: Missing check for response.ok. 
    // If the server returns 404, 'data' might be an error page HTML, 
    // but the code will try to parse it as JSON.
    const data = await response.json();
    return data;
  } catch (err) {
    // VULNERABILITY: "Silent fail" or returning a generic object 
    // that might bypass later security checks.
    console.log("Error fetching profile");
    return { role: "guest" }; 
  }
}