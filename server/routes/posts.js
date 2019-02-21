export default (router, container) => {
  const { postsDbHandler } = container;
  router
    .get('/posts', 'posts#index', (req, res) => {
      const posts = postsDbHandler.getPosts();
      res.render('posts/index', { posts });
    })
    .get('/posts/new', 'posts#new', (req, res) => {
      res.render('posts/new', { form: {}, errors: {} });
    })
    .get('/posts/:id', 'posts#show', (req, res) => {
      const post = postsDbHandler.getPosts()
        .find(item => item.id.toString() === req.params.id);
      res.render('posts/show', { post });
    })
    .post('/posts', 'posts#create', (req, res) => {
      const { title, body } = req.body;
      const errors = {};

      if (!title) {
        errors.title = "Can't be blank";
      }
      if (!body) {
        errors.body = "Can't be blank";
      }

      if (Object.keys(errors).length === 0) {
        const post = postsDbHandler.createPost(title, body);
        postsDbHandler.addPost(post);
        res.redirect(router.namedRoutes.build('posts#show', { id: post.id }));
        return;
      }
      res.status(422);
      res.render('posts/new', { form: req.body, errors });
    })
    .get('/posts/:id/edit', 'posts#edit', (req, res) => {
      const post = postsDbHandler.getPosts()
        .find(item => item.id.toString() === req.params.id);
      res.render('posts/edit', { post, form: post, errors: {} });
    })
    .patch('/posts/:id', 'posts#update', (req, res) => {
      const post = postsDbHandler.getPosts()
        .find(item => item.id.toString() === req.params.id);

      const { title, body } = req.body;
      const errors = {};
      if (!title) {
        errors.title = "Can't be blank";
      }
      if (!body) {
        errors.body = "Can't be blank";
      }
      if (Object.keys(errors).length === 0) {
        post.title = title;
        post.body = body;
        res.redirect(router.namedRoutes.build('posts#show', { id: post.id }));
        return;
      }

      res.status(422);
      res.render('posts/edit', { post, form: req.body, errors });
    })
    .delete('/posts/:id', 'posts#destroy', (req, res) => {
      postsDbHandler.deletePost(req.params.id);
      res.redirect(router.namedRoutes.build('posts#index'));
    });
};
