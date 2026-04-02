req.session.regenerate(() => {
    req.session.user = username;
});