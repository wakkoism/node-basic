module.exports = db => ({
  requireAuthentication(request, response, next) {
    const token = request.get('Auth');
    db.user
      .findByToken(token)
      .then((user) => {
        request.user = user;
        next();
      }, () => {
        response.status(401).send();
      });
  },
});
