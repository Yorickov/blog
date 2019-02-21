import welcome from './welcome';
import posts from './posts';
import sessions from './sessions';
import users from './users';

const controllers = [welcome, posts, sessions, users];

export default (router, container) => (
  controllers.forEach(controller => controller(router, container)));
