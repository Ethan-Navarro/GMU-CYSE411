/**
 * Renders notifications to the UI.
 * @param {HTMLElement} listEl - The <ul> element.
 * @param {string[]} notifications - Array of notification messages.
 */
function renderNotifications(listEl, notifications) {
  listEl.innerHTML = ""; // Clear list
  notifications.forEach(msg => {
    // VULNERABILITY: Using innerHTML allows DOM-based XSS
    listEl.innerHTML += "<li>" + msg + "</li>";
  });
}

// Example Attack:
// renderNotifications(el, ["System update", "<img src=x onerror=alert('XSS')>"]);