async function fetchUserProfile(url) {
  try {
    const response = await fetch(url);

    // SECURE: Fetch does NOT throw on 404 or 500 errors. 
    // We must check the 'ok' property (status 200-299).
    if (!response.ok) {
      console.error(`Server error: ${response.status}`);
      return null;
    }

    // SECURE: Wrap JSON parsing in a try/catch (done by the outer block here)
    // in case the server returns invalid JSON data.
    const data = await response.json();
    return data;

  } catch (err) {
    // SECURE: Return null on network or parsing failure.
    // Do NOT return a "default guest profile" here, as that creates
    // a logic bypass where a failed request grants access.
    console.error("Connection or Data error:", err);
    return null; 
  }
}