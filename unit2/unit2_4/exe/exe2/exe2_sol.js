if (req.session.userId !== req.params.id) {
    return res.status(403).send("Forbidden");
}