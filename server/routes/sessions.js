import encrypt from '../lib/encrypt';
import { requiredAuth } from '../lib/middlwares';

export default (router, container) => {
  const { usersDbHandler } = container;
  router
    .get('/session/new', 'session#new', (req, res) => {
      res.render('session/new', { form: {} });
    })
    .post('/session', 'session#create', (req, res) => {
      const { nickname, password } = req.body;
      const user = usersDbHandler.getUsers()
        .find(item => item.nickname === nickname);
      if (user && user.passwordDigest === encrypt(password)) {
        req.session.nickname = user.nickname;
        res.redirect(router.namedRoutes.build('root'));
        return;
      }
      res.status(422);
      res.render('session/new', { form: req.body, error: 'Invalid nickname or password' });
    })
    .delete('/session', 'session#destroy', requiredAuth, (req, res) => {
      delete req.session.nickname;
      res.flash('info', `See you, ${res.locals.currentUser.nickname}`);
      res.redirect(router.namedRoutes.build('root'));
    });
};
