import welcome from './welcome';
import posts from './posts';

const controllers = [welcome, posts];

export default (router, container) => (
  controllers.forEach(controller => controller(router, container)));
