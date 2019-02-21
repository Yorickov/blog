import assert from 'assert';

import uaParser from 'ua-parser-js';
import AccessDeniedError from './AccessDeniedError';

export const uaParserMiddlware = (req, res, next) => {
  req.useragent = uaParser(req.headers['user-agent']);
  next();
};

export const requiredAuth = (req, res, next) => { // eslint-disable-line
  if (res.locals.currentUser.isGuest()) {
    return next(new AccessDeniedError());
  }
  next();
};

export const flashFn = () => (req, res, next) => {
  assert(req.session, 'a req.session is required!');
  res.locals.flash = req.session.flash || [];
  req.session.flash = [];
  res.flash = (type, message) => {
    req.session.flash.push({ type, message });
  };
  next();
};
