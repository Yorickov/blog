export default (router, container) => {
  const { usersDbHandler } = container;
  router
    .get('/users/new', 'users#new', (req, res) => {
      res.render('users/new', { form: {}, errors: {} });
    })
    .post('/users', 'users#create', (req, res) => {
      const { nickname, password } = req.body;
      const errors = {};

      if (!nickname) {
        errors.nickname = "Can't be blank";
      } else {
        const uniq = usersDbHandler.getUsers()
          .find(user => user.nickname === nickname) === undefined;
        if (!uniq) {
          errors.nickname = 'Nickname already exist';
        }
      }
      if (!password) {
        errors.password = "Can't be blank";
      }

      if (Object.keys(errors).length === 0) {
        usersDbHandler.addUser(nickname, password);
        res.redirect(router.namedRoutes.build('root'));
        return;
      }
      res.status(422);
      res.render('users/new', { form: req.body, errors });
    });
};
