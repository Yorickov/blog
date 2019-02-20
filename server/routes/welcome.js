export default (router, container) => {
  const { postsDbHandler } = container;
  router.get('/', 'root', (req, res) => {
    const posts = postsDbHandler.getPosts();
    res.render('welcome/index', { posts });
  });
};
