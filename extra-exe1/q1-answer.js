function renderNotifications(listEl, notifications) {
  listEl.innerHTML = ""; // Clear list
  
  notifications.forEach(msg => {
    // SECURE: Create a new element and use textContent
    const li = document.createElement("li");
    li.textContent = msg; 
    listEl.appendChild(li);
  });
}