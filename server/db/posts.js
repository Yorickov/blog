import Post from '../models/Post';

let posts = [
  new Post('hello', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam a commodi perspiciatis magnam, quos quia vitae. Accusamus, voluptas, blanditiis. Sapiente, ratione cumque doloremque repellat laborum temporibus quis quia, quaerat facilis eligendi tempore nulla aliquid. Amet doloribus perspiciatis, inventore libero sunt qui explicabo iusto quidem maiores! Laboriosam dolores, molestias totam aspernatur eaque quo tempore possimus? Unde odit est quo eligendi dolores enim blanditiis ex inventore natus. Dolore sit facilis tempora id vel fugiat, saepe eum sed doloribus, libero praesentium reiciendis cupiditate explicabo perferendis architecto facere iste. Sint porro sit ea voluptas, quaerat possimus suscipit corrupti illum saepe, quia consectetur, odit numquam.'),
];

export default {
  addPost(post) {
    posts.push(post);
  },
  getPosts() {
    return posts;
  },
  createPost(title, body) {
    return new Post(title, body);
  },
  deletePost(id) {
    posts = posts.filter(post => post.id.toString() !== id);
  },
};
