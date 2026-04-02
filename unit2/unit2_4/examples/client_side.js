//vulnerable Client-Side Access Control
if (user.role === "admin") {
    showAdminPanel();
}

//Client-Side Access Control fix
// Always enforce on backend
if (req.session.role !== "admin") {
    return res.status(403).send("Forbidden");
}