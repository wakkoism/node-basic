const cryptojs = require('crypto-js');

module.exports = db => ({
  requireAuthentication(request, response, next) {
    const token = request.get('Auth') || '';

    db.token.findOne({
      where: {
        tokenHash: cryptojs.MD5(token).toString(),
      },
    }).then((tokenInstance) => {
      if (!tokenInstance) {
        throw new Error();
      }
      request.token = tokenInstance;
      return db.user.findByToken(token);
    }).then((user) => {
      request.user = user;
      next();
    }).catch(() => {
      response.status(401).send();
    });
  },
});
